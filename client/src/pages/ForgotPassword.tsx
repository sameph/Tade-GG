import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DialogFooter } from '@/components/ui/dialog';

interface ForgotPasswordProps {
  onClose: () => void;
}

const ForgotPassword = ({ onClose }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sending a verification code
    setTimeout(() => {
      toast({
        title: "Verification Code Sent",
        description: "Please check your email for the 6-digit verification code.",
      });
      // Store email in session storage for the verification step
      sessionStorage.setItem('resetEmail', email);
      // Navigate to the verification code page
      navigate('/admin/verify-code');
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reset-email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <Input
            id="reset-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
        <p className="text-sm text-muted-foreground">
          We'll send a 6-digit verification code to this email address.
        </p>
      </div>
      
      <DialogFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          className="mr-2"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-[#98042D] hover:bg-[#98042D]/90"
          disabled={isLoading || !email}
        >
          {isLoading ? "Sending..." : "Send Verification Code"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ForgotPassword;
