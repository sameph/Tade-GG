import ImageKit from "imagekit";
import { BlogPost } from "../models/blog.model.js";
import { generateUniqueSlug } from "../utils/helper.js";
import mongoose from "mongoose";

// Initialize ImageKit
const imageKit = new ImageKit({
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
  urlEndpoint: process.env.IK_URL_ENDPOINT,
});



// Create a new blog post

export const createPost = async (req, res) => {
  try {
    let { title, excerpt, content, status, author, category, tags, mainImage, slug } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and author are required.",
      });
    }

    // Generate slug if not provided or check uniqueness
    slug = slug ? await generateUniqueSlug(slug) : await generateUniqueSlug(title);

    const post = new BlogPost({
      title,
      excerpt,
      content,
      status,
      author,
      category,
      tags,
      mainImage,
      slug,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      slug: post.slug,
      post,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteBlogPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid post ID" });
  }

  try {
    const deletedPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Post "${deletedPost.title}" deleted successfully.`,
      post: deletedPost,
    });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ success: false, message: "Server error during deletion" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const update = req.body;

    const post = await BlogPost.findOneAndUpdate({ slug }, update, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Upload authentication for ImageKit
export const uploadAuth = async (req, res) => {
  const { token, expire, signature } = imageKit.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: process.env.IK_PUBLIC_KEY });
};

// Get all blog posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const publishPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await BlogPost.findByIdAndUpdate(
      id,
      { status: "published" },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Publish error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Get recommended posts (excluding current post)
export const getRecommendedPosts = async (req, res) => {
  try {
    const { exclude, limit = 3 } = req.query;
    
    const query = { 
      status: 'published',
      slug: { $ne: exclude } 
    };

    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('slug title excerpt category mainImage createdAt');

    res.status(200).json({ 
      success: true, 
      posts 
    });
  } catch (error) {
    console.error("Error fetching recommended posts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Get a single post by slug
export const getPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await BlogPost.findOne({ slug });
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
