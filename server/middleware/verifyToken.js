import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.user).select("-password");
		if (!user) {
			return res.status(401).json({ success: false, message: "Unauthorized - user not found" });
		}

		req.user = user;
		next();
	} catch (error) {
		console.log("Error in verifyToken middleware:", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};
