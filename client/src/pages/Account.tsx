import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const toastOptions = {
  position: "top-center" as const,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored" as const,
};

export default function Account() {
  const navigate = useNavigate();
  const { user, changePassword } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !password || !confirm) {
      toast.error("Please fill in all fields", toastOptions);
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters", toastOptions);
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match", toastOptions);
      return;
    }

    setIsSubmitting(true);
    try {
      await changePassword(name, password, user.email);
      toast.success("Password updated successfully! Redirecting...", {
        ...toastOptions,
        autoClose: 2000,
      });
      setTimeout(() => navigate("/login"), 2500);
    } catch (error: any) {
      toast.error(
        `Failed to update password: ${
          error?.response?.data?.message || error.message
        }`,
        {
          ...toastOptions,
          autoClose: 4000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center text-[#193617] hover:text-[#99042d] mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Admin Dashboard
        </button>

        <div className="flex flex-col md:flex-row w-full rounded-3xl shadow-xl overflow-hidden bg-white border border-gray-200">
          {/* Sidebar Profile Card */}
          <div className="bg-gradient-to-b from-[#193617] to-[#2a5c3a] text-white p-8 md:w-1/3 flex items-center justify-center relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#99042d] via-[#d46a4a] to-[#99042d]"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6 flex flex-col items-center"
            >
              <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center text-4xl font-bold uppercase border-2 border-white/20">
                {user.name?.[0]}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-300 mt-1">{user.email}</p>
              </div>
              <div className="w-full h-px bg-white/20"></div>
              <p className="text-sm text-gray-300 text-center">
                Manage your profile information and security settings
              </p>
            </motion.div>
          </div>

          {/* Main Form Area */}
          <div className="p-8 md:w-2/3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#193617] mb-2">
                Account Settings
              </h2>
              <p className="text-gray-500 mb-8">
                Update your profile and security details
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="relative">
                  <User
                    className="absolute top-3 left-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#193617] focus:border-transparent transition-all duration-200"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail
                    className="absolute top-3 left-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="pl-10 pr-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-xl text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock
                    className="absolute top-3 left-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#193617] focus:border-transparent transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-[#193617]"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <Lock
                    className="absolute top-3 left-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#193617] focus:border-transparent transition-all duration-200"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-[#193617]"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <AnimatePresence>
                  {confirm && password && confirm !== password && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-sm"
                    >
                      Passwords do not match
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${
                      isSubmitting
                        ? "bg-[#99042d]/80 cursor-not-allowed"
                        : "bg-[#99042d] hover:bg-[#7c0324]"
                    } text-white py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
