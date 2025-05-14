import express from "express";
import {
  createPost,
  deleteBlogPost,
  getAllPosts,
  getPostBySlug,
  getRecommendedPosts,
  publishPost,
  updatePost,
  uploadAuth,
  // updatePost,
  // deletePost,
  // getPublishedPosts,
} from "../controllers/blog.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { BlogPost } from "../models/blog.model.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth)
// Get all posts (optionally filtered or paginated)
router.post("/create", verifyToken, createPost);
router.get("/", getAllPosts);

// /routes/blog.js
router.get("/latest", async (req, res) => {
  try {
    const posts = await BlogPost.find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(3);
    res.status(200).json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get recommended posts (exclude current post)
router.get("/recommended", getRecommendedPosts);
router.delete("/:id", deleteBlogPost);
router.put("/:slug", verifyToken, updatePost);
router.put("/:id/publish", verifyToken, publishPost);

// Get only published posts
// router.get("/published", getPublishedPosts);

// Get a single post by slug
router.get("/:slug", getPostBySlug);

// Create a new post (authenticated)

// Update a post by slug (authenticated)
// router.put("/:slug", verifyToken, updatePost);

// Delete a post by slug (authenticated)
// router.delete("/:slug", verifyToken, deletePost);

export default router;
