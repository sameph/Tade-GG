// scripts/createAdmin.js
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect("mongodb+srv://sameph:tadegg@cluster0.pcjiuni.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const Admin = mongoose.model("Admin", adminSchema);

(async () => {
  const hashedPassword = await bcryptjs.hashSync("admin123", 10); 
  await Admin.create({
    email: "admin@tadegg.com",
    password: hashedPassword,
  });
  console.log("Admin created");
  mongoose.connection.close();
})();
