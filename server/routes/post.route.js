import express from "express";
import {
  createPost,
  getAllPosts,
  getPostBySlug,
  getRecommendedPosts,
  uploadAuth,
  // updatePost,
  // deletePost,
  // getPublishedPosts,
} from "../controllers/blog.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth)
// Get all posts (optionally filtered or paginated)
router.post("/create", verifyToken, createPost);
router.get("/", getAllPosts);

// Get recommended posts (exclude current post)
router.get("/recommended", getRecommendedPosts);
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
