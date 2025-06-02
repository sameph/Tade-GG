import express from "express";
import { deleteImage, gallery, singleImage, uploadImage } from "../controllers/files.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/", gallery);
router.get("/:filename", singleImage);
router.post("/image/upload", verifyToken, uploadImage);
router.delete("/:filename", verifyToken, deleteImage);

export default router;
