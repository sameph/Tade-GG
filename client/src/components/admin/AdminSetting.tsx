import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "react-toastify";
import { Mail, Users, UserRoundPlus, ArrowLeft, User } from "lucide-react";
import axios from "axios";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAuthStore } from "@/store/authStore";

interface AdminUser {
  _id: string;
  email: string;
  name?: string;
  role: "admin" | "owner";
  lastLogin: string | null;
  isVerified: boolean;
}

const AdminSettings = ({ onBack }: { onBack?: () => void }) => {
  const [inviteEmail, setInviteEmail] = useState("");
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthStore();

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/api/auth/users/admins", {
          withCredentials: true,
        });

        if (Array.isArray(data.users)) {
          setAdminUsers(data.users);
        } else {
          throw new Error("Invalid response format: users should be an array");
        }
      } catch (error) {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to fetch admin users"
          : "Failed to fetch admin users";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchAdminUsers();
  }, [user]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inviteEmail || !inviteEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      await axios.post(
        "/api/auth/users/invite-admin",
        { email: inviteEmail },
        { withCredentials: true }
      );

      setAdminUsers((prev) => [
        ...prev,
        {
          _id: `pending-${Date.now()}`,
          email: inviteEmail,
          role: "admin",
          lastLogin: null,
          isVerified: false,
        },
      ]);

      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail("");
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to send invitation"
        : "Failed to send invitation";
      toast.error(errorMessage);
    }
  };

  const formatLastLogin = (date: string | null) => {
    return date ? new Date(date).toLocaleDateString() : "Never";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3D550C]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-red-500 text-lg font-medium">{error}</div>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="hover:bg-[#3D550C]/10 hover:text-[#3D550C]"
        >
          Retry
        </Button>
      </div>
    );
  }

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
          <CardDescription>
            Manage who has admin access to the blog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adminUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No admin users found
              </div>
            ) : (
              adminUsers.map((admin) => (
                <div
                  key={admin._id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-[#98042D]/10 text-[#98042D]">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                      <AvatarImage src="" alt={admin.name || ""} />
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {admin.name || admin.email.split("@")[0]}
                      </p>
                      <p className="text-sm text-gray-500">{admin.email}</p>
                      {!admin.isVerified && (
                        <Badge
                          variant="outline"
                          className="mt-1 text-xs bg-yellow-100 text-yellow-800 border-yellow-200"
                        >
                          Pending Verification
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={admin.role === "owner" ? "secondary" : "outline"}
                      className={
                        admin.role === "owner"
                          ? "bg-[#98042D]/10 text-[#98042D] hover:bg-[#98042D]/20 border-none"
                          : ""
                      }
                    >
                      {admin.role.charAt(0).toUpperCase() + admin.role.slice(1)}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      Last active: {formatLastLogin(admin.lastLogin)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {user?.role === "owner" && (
        <Card className="border-none shadow-md bg-white/90">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-full bg-[#3D550C]/10">
                <UserRoundPlus className="h-5 w-5 text-[#3D550C]" />
              </div>
              <CardTitle className="text-xl font-serif">
                Invite New Admin
              </CardTitle>
            </div>
            <CardDescription>
              Send invitations to new team members
            </CardDescription>
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
            New admins will receive an email with instructions to set up their
            account.
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AdminSettings;
