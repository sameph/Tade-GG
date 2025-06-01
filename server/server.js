import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import fs from "fs";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import blogRoutes from "./routes/post.route.js";
import fileRoutes from "./routes/file.route.js"; // <-- You should register this too!

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ─── Middleware ───────────────────────────────────────────────
app.use(helmet());
app.use(
  "/gallery",
  express.static("public/gallery", {
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*"); // or specific domain
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:8080",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-Filename"],
  maxAge: 3600,
}));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/gallery", express.static(path.join(__dirname, "public/gallery")));

// ─── Ensure Upload Directory ─────────────────────────────────
const uploadDir = path.join(__dirname, "public/gallery");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// ─── API Routes ───────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gallery", fileRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// ─── Production Handling ──────────────────────────────────────
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

// ─── Graceful Shutdown ────────────────────────────────────────
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => console.log("Process terminated"));
});

// ─── Start Server ─────────────────────────────────────────────
const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running in ${process.env.NODE_ENV || "development"} on port ${PORT}`);
});
