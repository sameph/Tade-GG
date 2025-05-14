import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "react-toastify";

interface ForgotPasswordProps {
  onClose: () => void;
}

const toastOptions = {
  position: "top-center" as const,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored" as const,
};

const ForgotPassword = ({ onClose }: ForgotPasswordProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.", toastOptions);

      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send verification code");
      }

      toast.success(
        "Please check your email for the 6-digit verification code.",
        toastOptions
      );

      sessionStorage.setItem("resetEmail", email);
      navigate("/login");
      onClose();
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred. Please try again.",
        toastOptions
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reset-email">Email Address</Label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            id="reset-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
            autoFocus
          />
        </div>
        <p className="text-sm text-muted-foreground">
          We’ll send a 6-digit verification code to this email address.
        </p>
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-[#98042D] hover:bg-[#98042D]/90"
          disabled={isLoading || !email.includes("@")}
        >
          {isLoading ? "Sending..." : "Send Verification Code"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ForgotPassword;
