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


// Start server
const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gallery", fileRoutes);


app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*name', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


