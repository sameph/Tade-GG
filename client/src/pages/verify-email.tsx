import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function OtpInputPage({ email }) {
  const {
    verifyEmail,
    resendVerificationToken,
    isLoading,
    error,
    message,
  } = useAuthStore();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [cooldown, setCooldown] = useState(0);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
    if (!/^\d{6}$/.test(pasted.join(""))) return;

    setOtp(pasted);
    pasted.forEach((char, idx) => {
      if (inputsRef.current[idx]) {
        inputsRef.current[idx].value = char;
      }
    });
    inputsRef.current[Math.min(5, pasted.length - 1)]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      toast.warn("Please enter the full 6-digit code!", {
        style: {
          backgroundColor: "#fff3cd",
          color: "#856404",
        },
      });
      return;
    }

    try {
      await verifyEmail(code);
      toast.success("✅ Email verified successfully!", {
        style: {
          backgroundColor: "#d1e7dd",
          color: "#0f5132",
        },
      });
      setTimeout(() => navigate("/profile"), 1500);
    } catch {
      toast.error("❌ Invalid or expired verification code", {
        style: {
          backgroundColor: "#f8d7da",
          color: "#842029",
        },
      });
    }
  };

  const handleResend = async () => {
    if (!email || cooldown > 0) return;
    try {
      await resendVerificationToken(email);
      setCooldown(60);
    } catch (_) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl px-8 py-10 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-4">
          <ShieldCheck className="text-green-600 w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Email</h2>
        <p className="text-gray-600 mb-4">
          Enter the 6-digit code sent to <strong>{email}</strong>
        </p>

        <form
          className="flex gap-2 justify-center mb-4"
          onPaste={handlePaste}
          onSubmit={(e) => e.preventDefault()}
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-12 h-14 text-center text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ))}
        </form>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

        <button
          onClick={handleVerify}
          disabled={isLoading}
          className="w-full bg-green-600 text-white px-6 py-2 mt-2 rounded-full font-semibold hover:bg-green-700 transition-all"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>

        <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
          <span>Didn't get the code?</span>
          <button
            onClick={handleResend}
            disabled={cooldown > 0}
            className="text-green-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {cooldown > 0 ? (
              <span className="flex items-center gap-1">
                <Clock size={16} /> {cooldown}s
              </span>
            ) : (
              "Resend"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
