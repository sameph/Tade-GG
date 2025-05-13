import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useAuthStore } from '@/store/authStore';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const verifyEmail = useAuthStore((state) => state.verifyEmail); // Zustand action
  const setIsLoading = useAuthStore((state) => state.isLoading); // Zustand loading state
  const isLoading = useAuthStore((state) => state.isLoading); // Zustand loading state

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('resetEmail');
    if (!savedEmail) {
      navigate('/login');
      toast({
        title: 'Error',
        description: 'Please login or signup again.',
        variant: 'destructive',
      });
      return;
    }
    setEmail(savedEmail);
    startCountdown();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [navigate, toast]);

  const startCountdown = () => {
    setCountdown(60);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1 && intervalRef.current) clearInterval(intervalRef.current);
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerify = async () => {
    try {
      await verifyEmail(code);
      toast({
        title: 'Success',
        description: 'Your email has been verified!',
      });
      setTimeout(() => navigate('/admin'), 1500);
    } catch (err) {
      toast({
        title: 'Verification Failed',
        description: 'Invalid or expired code.',
        variant: 'destructive',
      });
    }
  };

  const handleResendCode = () => {
    setIsResending(true);
    // You would call your resend API here
    setTimeout(() => {
      toast({
        title: 'Code Sent',
        description: `A new code was sent to ${maskEmail(email)}.`,
      });
      startCountdown();
      setIsResending(false);
    }, 1500);
  };

  const maskEmail = (email: string) => {
    const [user, domain] = email.split('@');
    return `${user[0]}***${user[user.length - 1]}@${domain}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3D550C]/10 to-[#98042D]/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-[#3D550C] text-white text-center py-6">
            <img
              src="https://images.unsplash.com/photo-1462917882517-e150004895fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              alt="Tadegg Logo"
              className="mx-auto mb-4 w-20 h-20 rounded-full border-4 border-white object-cover"
            />
            <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
            <CardDescription className="text-white/80 mt-2">
              We sent a 6-digit code to <strong>{maskEmail(email)}</strong>.
            </CardDescription>
          </CardHeader>

          <CardContent className="py-6 space-y-6">
            <div className="flex justify-center">
              <InputOTP value={code} onChange={setCode} maxLength={6} autoFocus>
                <InputOTPGroup>
                  {[...Array(6)].map((_, idx) => (
                    <InputOTPSlot
                      key={idx}
                      index={idx}
                      className="rounded-lg border border-gray-300 w-12 h-12 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#3D550C]"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="text-center text-sm text-gray-600">
              {countdown > 0 ? (
                <p>
                  Resend code in <span className="font-medium">{countdown}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="text-[#98042D] hover:underline transition"
                >
                  {isResending ? 'Resending...' : 'Resend Code'}
                </button>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 px-6 pb-6">
            <Button
              className="w-full bg-[#3D550C] hover:bg-[#2C400A] transition"
              disabled={code.length !== 6 || isLoading}
              onClick={handleVerify}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/admin')}
            >
              Back to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;
