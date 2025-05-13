import express from "express";
import {
  login,
  logout,
  google,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  getAllUsers,
  getAdminUsers,
  inviteAdmin
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { ownerOnly } from "../middleware/ownerOnly.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.get("/users", verifyToken, getAllUsers);
router.get("/users/admins", verifyToken, getAdminUsers);

router.post("/login", login);
router.post("/google", google);
router.post("/logout", logout);

router.post("/users/invite-admin", verifyToken, ownerOnly, inviteAdmin);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;