import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import blogRoutes from "./routes/post.route.js";
import fileRoutes from "./routes/file.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Static files
const galleryPath = path.join(__dirname, "public/gallery");
if (!fs.existsSync(galleryPath)) fs.mkdirSync(galleryPath, { recursive: true });

app.use("/gallery", express.static(galleryPath));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gallery", fileRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

// Error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start server
const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
