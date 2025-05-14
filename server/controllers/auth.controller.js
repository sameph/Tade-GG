import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
	sendPasswordResetEmail,
	sendResetSuccessEmail,
	sendWelcomeEmail,
} from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";
import transporter from "../config/nodemailer.js";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "../mailtrap/emailTemplates.js";

// ... (keep all your existing functions)

export const getAllUsers = async (req, res) => {
	try {
		
		const users = await User.find()
			.select("-password -resetPasswordToken -resetPasswordExpiresAt -verificationToken -verificationTokenExpiresAt")
			.sort({ createdAt: -1 });
		res.status(200).json({ success: true, users });
	} catch (error) {
		console.log("Error in getAllUsers ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};
// @desc    Get all admin users
// @route   GET /api/users/admins
// @access  Private/Admin
export const getAdminUsers = async (req, res) => {
  try {
    // Only owners and admins can see this list
    if (req.user.role !== 'owner' && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const users = await User.find({ role: { $in: ['owner', 'admin'] } })
      .select("-password -resetPasswordToken -resetPasswordExpiresAt -verificationToken -verificationTokenExpiresAt");

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log("Error in getAdminUsers ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Invite a new admin
// @route   POST /api/users/invite-admin
// @access  Private/Owner
export const inviteAdmin = async (req, res) => {
  const { email } = req.body;

  try {
    // Only owners can invite admins
    if (req.user.role !== 'owner') {
      return res.status(403).json({ success: false, message: "Only owners can invite admins" });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: "Please provide a valid email" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Create verification token (6-digit code)
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    const verificationLink = `${process.env.CLIENT_URL}/login`;

    // Hash the default password
    const hashedPassword = await bcryptjs.hash("tadegg123", 10); // saltRounds = 10

    // Create unverified admin user
    const user = new User({
      email,
      name: "Admin",
      password: hashedPassword,
      role: 'admin',
      verificationToken,
      verificationTokenExpiresAt,
      invitedBy: req.user._id
    });

    await user.save();
    generateTokenAndSetCookie(res, user._id);

    const htmlContent = VERIFICATION_EMAIL_TEMPLATE
      .replace("{verificationCode}", verificationToken)
      .replace("{verificationLink}", verificationLink)
      .replace("{year}", new Date().getFullYear());

    // Send verification email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Admin Invitation",
      text: `You have been invited to join as an admin. Your verification code is ${verificationToken}. Please verify your email within 24 hours.`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Admin invitation sent",
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.log("Error in inviteAdmin ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
export const resendVerificationToken = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.isVerified) {
      return res.status(400).json({ message: "User not found or already verified" });
    }

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    const verificationLink = `${process.env.CLIENT_URL}/login`;

    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = verificationTokenExpiresAt;
    await user.save();

    const htmlContent = VERIFICATION_EMAIL_TEMPLATE
      .replace("{verificationCode}", verificationToken)
      .replace("{verificationLink}", verificationLink)
      .replace("{year}", new Date().getFullYear());

    // Send verification email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Admin Invitation",
      text: `You have been invited to join as an admin. Your verification code is ${verificationToken}. Please verify your email within 24 hours.`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Verification code resent" });
  } catch (err) {
    console.error("Resend error:", err);
    res.status(500).json({ message: "Failed to resend code" });
  }
};
export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    const htmlContent = WELCOME_EMAIL_TEMPLATE
      .replace("{name}", user.name || "Admin")
      .replace("{dashboardLink}", "https://app.tedegg.com/admin/")
      .replace("{year}", new Date().getFullYear());

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Welcome to Tede GG – Admin Access Granted",
      html: htmlContent,
    });

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("error in verifyEmail", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const changePassword = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Name and password are required" });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change Password Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const google = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Check if the user exists first
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // If the user exists, generate a token and send response
    const token = generateTokenAndSetCookie(res, user._id);
		user.lastLogin = new Date();
		await user.save();
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined, // Hide password from response
      },
    });

  } catch (error) {
    console.error("Error in google login:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Don't log in unverified users yet — just let the frontend handle redirection
    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};


export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const deleteAdmin = async (req, res) => {
  try {
    const currentUser = req.user; // from verifyToken middleware
    const targetUserId = req.params.id;

    if (currentUser.role !== "owner") {
      return res.status(403).json({ message: "Only owners can delete admins" });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (targetUser.role === "owner") {
      return res.status(403).json({ message: "Cannot delete another owner" });
    }

    await User.findByIdAndDelete(targetUserId);
    return res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    console.error("Error deleting admin:", err);
    res.status(500).json({ message: "Server error" });
  }
}


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: "Please provide a valid email" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate 6-digit verification code
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    const hashedPassword = await bcryptjs.hash("tadegg123", 10);


    // Save token to user
    user.resetPasswordToken = verificationToken;
    user.resetPasswordExpiresAt = verificationTokenExpiresAt;
    user.password = hashedPassword;

    await user.save();

    // Email content
    const verificationLink = `${process.env.CLIENT_URL}/login`; // Link to your reset UI
    const htmlContent = VERIFICATION_EMAIL_TEMPLATE
      .replace("{verificationCode}", verificationToken)
      .replace("{verificationLink}", verificationLink)
      .replace("{year}", new Date().getFullYear());

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Tadegg Admin Password Reset",
      text: `Use this verification code to reset your password: ${verificationToken}`,
      html: htmlContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Verification code sent to your email address",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.user).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};