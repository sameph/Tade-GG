import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Mail, Users, UserRoundPlus, ArrowLeft } from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin';
  lastActive: string;
  avatar?: string;
}

interface AdminSettingsProps {
  onBack?: () => void;
}

const AdminSettings = ({ onBack }: AdminSettingsProps) => {
  const { toast } = useToast();
  const [inviteEmail, setInviteEmail] = useState('');
  
  // Mock data for admin users - in a real app, this would come from your backend
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    {
      id: '1',
      name: 'Abebe Bekele',
      email: 'abebe@tadegg.com',
      role: 'owner',
      lastActive: '2025-05-09',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: '2',
      name: 'Makeda Solomon',
      email: 'makeda@tadegg.com',
      role: 'admin',
      lastActive: '2025-05-06'
    }
  ]);
  
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteEmail || !inviteEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send an invitation through your backend
    // For now, we'll simulate adding a new admin
    const newAdmin: AdminUser = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: 'admin',
      lastActive: 'Never'
    };
    
    setAdminUsers([...adminUsers, newAdmin]);
    setInviteEmail('');
    
    toast({
      title: "Invitation Sent",
      description: `An invitation has been sent to ${inviteEmail}`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {onBack && (
        <Button 
          variant="outline"
          onClick={onBack}
          className="mb-4 flex items-center gap-2 hover:bg-[#3D550C]/10 hover:text-[#3D550C]"
        >
          <ArrowLeft size={16} />
          Back to Blog Management
        </Button>
      )}
      
      <Card className="border-none shadow-md bg-white/90">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-full bg-[#3D550C]/10">
              <Users className="h-5 w-5 text-[#3D550C]" />
            </div>
            <CardTitle className="text-xl font-serif">Admin Team</CardTitle>
          </div>
          <CardDescription>Manage who has admin access to the blog</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adminUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-[#98042D]/10 text-[#98042D]">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={user.role === 'owner' ? 'secondary' : 'outline'} className={
                    user.role === 'owner' ? 'bg-[#98042D]/10 text-[#98042D] hover:bg-[#98042D]/20 border-none' : ''
                  }>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    Last active: {user.lastActive}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-md bg-white/90">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-full bg-[#3D550C]/10">
              <UserRoundPlus className="h-5 w-5 text-[#3D550C]" />
            </div>
            <CardTitle className="text-xl font-serif">Invite New Admin</CardTitle>
          </div>
          <CardDescription>Send invitations to new team members</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInvite} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex gap-3">
                <div className="relative flex-grow">
                  <Mail className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="colleague@example.com"
                    className="pl-10 focus-visible:ring-[#3D550C]"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-[#3D550C] to-[#98042D] hover:opacity-90"
                >
                  Send Invitation
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-gray-500 border-t border-gray-100 pt-4">
          New admins will receive an email with instructions to set up their account.
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSettings;
