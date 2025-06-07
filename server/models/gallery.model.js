import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema({
  filename: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  alt: { type: String, required: true },
  category: { type: String, required: true, index: true },
  size: { type: Number, required: true }, 
  mimeType: { type: String, required: true },
}, { timestamps: true });

galleryImageSchema.index({ category: 1, createdAt: -1 });

export const GalleryImage = mongoose.model("GalleryImage", galleryImageSchema);
