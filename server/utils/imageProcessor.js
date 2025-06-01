import sharp from "sharp";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

const __dirname = path.resolve();
const VALID_EXTENSIONS = [".jpeg", ".jpg", ".png", ".gif", ".webp"];

export const processImage = async (file) => {
  try {
    // Validate file extension
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!VALID_EXTENSIONS.includes(fileExtension)) {
      throw new Error("Invalid file extension");
    }

    const uploadDir = path.join(__dirname, "public/gallery");
    const fileId = uuidv4();
    const originalFilename = `img-${fileId}${fileExtension}`;
    const thumbnailFilename = `thumb-${originalFilename}`;
    const mediumFilename = `medium-${originalFilename}`;

    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const originalPath = path.join(uploadDir, originalFilename);
    const thumbnailPath = path.join(uploadDir, thumbnailFilename);
    const mediumPath = path.join(uploadDir, mediumFilename);

    // Process all image versions in parallel
    const [metadata] = await Promise.all([
      sharp(file.buffer).metadata(),
      sharp(file.buffer).toFile(originalPath),
      sharp(file.buffer)
        .resize(300)
        .toFormat("jpeg", { quality: 80 })
        .toFile(thumbnailPath),
      sharp(file.buffer)
        .resize(800)
        .toFormat("jpeg", { quality: 85 })
        .toFile(mediumPath),
    ]);

    return {
      original: {
        filename: originalFilename,
        url: `/api/files/${originalFilename}`,
        width: metadata.width,
        height: metadata.height,
      },
      thumbnail: {
        filename: thumbnailFilename,
        url: `/api/files/${thumbnailFilename}`,
        width: 300,
        height: Math.round((300 * metadata.height) / metadata.width),
      },
      medium: {
        filename: mediumFilename,
        url: `/api/files/${mediumFilename}`,
        width: 800,
        height: Math.round((800 * metadata.height) / metadata.width),
      },
      size: file.size,
      mimeType: file.mimetype,
    };
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};

export const deleteImageFiles = async (filename) => {
  try {
    const uploadDir = path.join(__dirname, "public/gallery");
    const baseName = filename.replace(/^(img-|thumb-|medium-)/, "");
    
    const filesToDelete = [
      path.join(uploadDir, `img-${baseName}`),
      path.join(uploadDir, `thumb-img-${baseName}`),
      path.join(uploadDir, `medium-img-${baseName}`),
    ];

    await Promise.all(
      filesToDelete.map(async (filePath) => {
        try {
          await fs.unlink(filePath);
        } catch (err) {
          if (err.code !== "ENOENT") throw err; 
        }
      })
    );
  } catch (error) {
    console.error("Error deleting image files:", error);
    throw error;
  }
};