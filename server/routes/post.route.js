import express from "express";
import {
  createPost,
  deleteBlogPost,
  getAllPosts,
  getPostBySlug,
  getRecommendedPosts,
  publishPost,
  updatePost,
  uploadAuth
} from "../controllers/blog.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { BlogPost } from "../models/blog.model.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/create", verifyToken, createPost);
router.get("/upload-auth", uploadAuth)
// Get all posts (optionally filtered or paginated)

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
router.put("/:id/publish", verifyToken, publishPost);
router.delete("/:id", deleteBlogPost);
router.put("/:slug", verifyToken, updatePost);

router.get("/:slug", getPostBySlug);

export default router;
