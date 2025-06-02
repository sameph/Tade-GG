import express from "express";
import {
  createPost,
  deleteBlogPost,
  getAllPosts,
  getPostBySlug,
  getRecommendedPosts,
  latest,
  publishPost,
  updatePost,
  uploadAuth
} from "../controllers/blog.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/create", verifyToken, createPost);
router.get("/upload-auth", uploadAuth)

// /routes/blog.js
router.get("/latest", latest);

// Get recommended posts (exclude current post)
router.get("/recommended", getRecommendedPosts);
router.put("/:id/publish", verifyToken, publishPost);
router.delete("/:id", deleteBlogPost);
router.put("/:slug", verifyToken, updatePost);

router.get("/:slug", getPostBySlug);

export default router;
