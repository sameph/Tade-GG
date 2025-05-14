import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function Account() {
  const navigate = useNavigate();
  const { user, changePassword } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !password || !confirm) {
      toast.warn("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await changePassword(name, password, user.email);
      toast.success("✅ Password changed successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error("❌ Failed to change password");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f6ef] flex items-center justify-center px-4 py-10">
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Sidebar Profile Card */}
        <div className="bg-[#193617] text-white p-8 md:w-1/3 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold uppercase">
              {user.name?.[0]}
            </div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-300">{user.email}</p>
            <p className="text-xs mt-4 text-gray-400">Edit your profile and password settings</p>
          </motion.div>
        </div>

        {/* Main Form Area */}
        <div className="p-8 md:w-2/3">
          <h2 className="text-3xl font-bold text-[#193617] mb-6 text-center">Profile Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#193617]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email (disabled) */}
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="email"
                value={user.email}
                disabled
                className="pl-10 pr-4 py-3 w-full bg-gray-100 border border-gray-300 rounded-xl text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#193617]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#193617]"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {confirm && password && confirm !== password && (
              <p className="text-red-500 text-sm -mt-4">Passwords do not match</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#99042d] hover:bg-[#7c0324] text-white py-3 rounded-xl font-semibold transition-all duration-200"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
