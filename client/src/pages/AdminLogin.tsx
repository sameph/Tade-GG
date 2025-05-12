import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import ForgotPassword from './ForgotPassword';
import { useAuthStore } from "../store/authStore";
// import { useEffect } from 'react';
// import { useUserStore } from '../store/userStore';

const AdminLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState<boolean>(false);
  const { login, isLoading, error } = useAuthStore();
  const { googleLogin } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "Login Successful",
        description: "Welcome to Tadegg Admin Dashboard",
        variant: "default",
      });
      navigate('/admin'); 
    } catch (err) {
      toast({
        title: "Login Failed",
        description: error || "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast({
        title: "Login Successful",
        description: "Welcome to Tadegg Admin Dashboard",
        variant: "default",
      });
      navigate('/admin');
    } catch (err) {
      toast({
        title: "Login Failed",
        description: useAuthStore.getState().error || "Something went wrong with Google authentication",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl">
        {/* Left side - Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Ethiopian Coffee" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl font-serif font-bold text-white mb-6">Welcome Back</h2>
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl border border-white/30">
              <p className="text-white text-xl mb-4">"The finest coffee begins with secured access."</p>
              <p className="text-tadegg-gold font-medium">~ Tadegg Coffee Exporters</p>
            </div>
            
            <div className="absolute bottom-8 left-8">
              <span className="text-white/70 text-sm">© 2025 Tadegg Coffee</span>
            </div>
          </div>
        </div>
        
        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 bg-white p-6 sm:p-12">
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900">Admin Access</h3>
            <p className="text-gray-600 mt-2">Enter your credentials to login</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <Input 
                  id="email"
                  type="email" 
                  placeholder="admin@tadegg.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-[#3D550C] focus:ring-[#3D550C]"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <button 
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)} 
                  className="text-[#98042D] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#3D550C] hover:bg-[#3D550C]/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Sign in"}
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
              </svg>
              Sign in with Google
            </Button>
            
            <p className="text-center text-sm text-gray-600 mt-8">
              Need help? Contact{" "}
              <a href="mailto:support@tadegg.com" className="text-[#3D550C] font-medium hover:underline">
                support@tadegg.com
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Your Password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a verification code to reset your password.
            </DialogDescription>
          </DialogHeader>
          <ForgotPassword onClose={() => setForgotPasswordOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLogin;