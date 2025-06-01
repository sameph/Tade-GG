import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

// 🔧 MongoDB URI
const MONGO_URI = process.env.MONGO_URI 

// ✅ Create user function
const createUser = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const email = "samuelephrem07@gmail.com";
    const plainPassword = "admin123";
    const name = "Admin User";
    const role = "owner"; // or "admin"

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role,
      isVerified: true, // optional: set to true if you want to skip verification
    });

    console.log("✅ User created:", user);
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error creating user:", err);
    mongoose.disconnect();
  }
};

createUser();
