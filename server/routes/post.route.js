// router.js
import express from "express";
import {
  createPost,
  deleteBlogPost,
  getAllPosts,
  getPostBySlug,
  getRecommendedPosts,
  latest,
  updatePost,
} from "../controllers/blog.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Public routes
router.get("/", getAllPosts);
router.get("/latest", latest);
router.get("/recommended", getRecommendedPosts);
router.get("/:slug", getPostBySlug);

// Authenticated routes
router.post("/create", verifyToken, createPost);
router.put("/:slug", verifyToken, updatePost);
router.delete("/:id", verifyToken, deleteBlogPost);

export default router;