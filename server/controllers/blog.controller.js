import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { fileURLToPath } from "url";
import { BlogPost } from "../models/blog.model.js";
import { generateUniqueSlug } from "../utils/helper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../public/blog");
const allowedMimes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `blog-${uuidv4()}${ext}`);
  },
});

const fileFilter = (_, file, cb) =>
  allowedMimes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only image files allowed (jpeg, jpg, png, gif, webp)"));

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const deleteOldImage = (imagePath) => {
  if (!imagePath) return;

  // Extract filename from path (works for "/blog/xxx.jpg" → "xxx.jpg")
  const fileName = path.basename(imagePath);

  // Skip deletion if it's the placeholder image
  if (fileName === "placeholder-image.jpg") {
    console.log("Skipping deletion of placeholder image.");
    return;
  }

  try {
    const fullPath = path.join(__dirname, "../public", imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`Deleted old image: ${fileName}`);
    }
  } catch (err) {
    console.error("Error deleting old image:", err);
  }
};


// CREATE
export const createPost = async (req, res) => {
  upload.single("mainImage")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(413)
        .json({ success: false, message: "File too large (max 5MB)" });
    } else if (err) {
      return res.status(415).json({ success: false, message: err.message });
    }

    try {
      let { title, excerpt, content, status, author, category, tags, slug } =
        req.body;

      // Validate required fields
      if (!title || !content || !author) {
        return res.status(400).json({
          success: false,
          message: "Title, content, and author are required.",
        });
      }

      // Validate status field
      if (status && !["draft", "published"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be either 'draft' or 'published'",
        });
      }

      // Default status if not provided
      if (!status) {
        status = "draft";
      }

      // Debugging: log received status
      console.log("Received status:", status);
      console.log("Type of status:", typeof status);

      slug = slug
        ? await generateUniqueSlug(slug)
        : await generateUniqueSlug(title);

      const imagePath = req.file ? `/blog/${req.file.filename}` : null;

      const post = await BlogPost.create({
        title,
        excerpt,
        content,
        status,
        author,
        category,
        tags,
        mainImage: imagePath ? { url: imagePath } : undefined,
        slug,
      });

      res.status(201).json({
        success: true,
        message: "Post created successfully",
        slug: post.slug,
        post,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  });
};

// UPDATE
export const updatePost = async (req, res) => {
  upload.single("mainImage")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(413)
        .json({ success: false, message: "File too large (max 5MB)" });
    } else if (err) {
      return res.status(415).json({ success: false, message: err.message });
    }

    try {
      const { slug } = req.params;
      const update = req.body;

      const existingPost = await BlogPost.findOne({ slug });
      if (!existingPost) {
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      }

      // Validate status field if provided
      if (update.status && !["draft", "published"].includes(update.status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be either 'draft' or 'published'",
        });
      }

      // Debugging: log received status in update
      console.log("Received status (update):", update.status);
      console.log("Type of status:", typeof update.status);

      if (req.file) {
        deleteOldImage(existingPost.mainImage?.url);
        update.mainImage = { url: `/blog/${req.file.filename}` };
      } else if (
        typeof update.mainImage !== "undefined" &&
        (update.mainImage === null || update.mainImage === "")
      ) {
        deleteOldImage(existingPost.mainImage?.url);
        update.mainImage = null;
      } else {
        delete update.mainImage; // Don't update mainImage field at all
      }

      const post = await BlogPost.findOneAndUpdate({ slug }, update, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({ success: true, post });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  });
};

// DELETE
export const deleteBlogPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid post ID" });
  }

  try {
    const postToDelete = await BlogPost.findById(id);
    if (!postToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    deleteOldImage(postToDelete.mainImage?.url);
    const deletedPost = await BlogPost.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: `Post "${deletedPost.title}" deleted successfully.`,
      post: deletedPost,
    });
  } catch (error) {
    console.error("Delete Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during deletion" });
  }
};

// GET ALL
export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await BlogPost.countDocuments();

    res.status(200).json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET BY SLUG
export const getPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await BlogPost.findOne({ slug });
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET RECOMMENDED
export const getRecommendedPosts = async (req, res) => {
  try {
    const { exclude, limit = 3 } = req.query;

    const posts = await BlogPost.find({
      status: "published",
      slug: { $ne: exclude },
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select("slug title excerpt category mainImage createdAt");

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching recommended posts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET LATEST (HOMEPAGE)
export const latest = async (req, res) => {
  try {
    const posts = await BlogPost.find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(3);
    res.status(200).json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
