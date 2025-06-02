import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { GalleryImage } from "../models/gallery.model.js";


const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "public/gallery");

// Multer config
const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `img-${uuidv4()}${ext}`);
  }
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


export const gallery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [images, total] = await Promise.all([
      GalleryImage.find().sort({ createdAt: -1 }).skip(skip).limit(limit).select("-__v"),
      GalleryImage.countDocuments()
    ]);

    res.json({ success: true, images, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    console.error("Fetch gallery error:", err);
    res.status(500).json({ success: false, message: "Error fetching gallery" });
  }
}


export const singleImage = (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: "Image not found" });
  }
  res.set("Cache-Control", "public, max-age=31536000");
  res.sendFile(filePath);
}

export const uploadImage = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(413).json({ success: false, message: "File too large (max 5MB)" });
    } else if (err) {
      return res.status(415).json({ success: false, message: err.message });
    }

    const { file, body } = req;
    const { alt, category } = body;

    if (!file) return res.status(400).json({ success: false, message: "No image uploaded" });
    if (!alt || !category) return res.status(400).json({ success: false, message: "Alt and category are required" });

    try {
      const image = await GalleryImage.create({
        filename: file.filename,
        url: `/gallery/${file.filename}`,
        alt,
        category,
        size: file.size,
        mimeType: file.mimetype
      });
      res.status(201).json({ success: true, image, message: "Image uploaded" });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ success: false, message: "Upload failed" });
    }
  });
}


export const deleteImage = async (req, res) => {
  try {
    const { filename } = req.params;
    const image = await GalleryImage.findOneAndDelete({ filename });
    if (!image) return res.status(404).json({ success: false, message: "Image not found" });

    const filePath = path.join(uploadDir, filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.json({ success: true, message: "Image deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ success: false, message: "Delete failed" });
  }
}