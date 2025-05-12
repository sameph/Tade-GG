import React from 'react';
import { useToast } from '@/hooks/use-toast';
import BlogDashboard from '@/components/admin/BlogDashboard';

const Admin = () => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3D550C]/90 to-[#98042D]/90">
      <BlogDashboard onLogout={handleLogout} />
    </div>
  );
};

export default Admin;
