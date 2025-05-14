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
import { toast } from "sonner"; // Using sonner for better toast notifications
import {
  Mail,
  Users,
  UserRoundPlus,
  ArrowLeft,
  User,
  Trash2,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAuthStore } from "@/store/authStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "../ui/skeleton";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [showDialog, setShowDialog] = useState(false);

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
          throw new Error("Invalid response format");
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
    setIsSubmitting(true);

    if (!inviteEmail || !inviteEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatLastLogin = (date: string | null) => {
    if (!date) return "Never";
    const lastLoginDate = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return lastLoginDate.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
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
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
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
        
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="text-red-500 text-lg font-medium">{error}</div>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="hover:bg-[#3D550C]/10 hover:text-[#3D550C]"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {onBack && (
        <Button
          variant="outline"
          onClick={onBack}
          className="mb-4 flex items-center gap-2 hover:bg-[#3D550C]/10 hover:text-[#3D550C] text-sm sm:text-base"
        >
          <ArrowLeft size={16} />
          Back to Blog Management
        </Button>
      )}

      <Card className="border-none shadow-sm bg-white/90">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-full bg-[#3D550C]/10">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#3D550C]" />
            </div>
            <CardTitle className="text-lg sm:text-xl font-serif">Admin Team</CardTitle>
          </div>
          <CardDescription className="text-sm sm:text-base">
            Manage who has admin access to the blog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {adminUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No admin users found
              </div>
            ) : (
              adminUsers.map((admin) => (
                <div
                  key={admin._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-gray-50 gap-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                      <AvatarFallback className="bg-[#98042D]/10 text-[#98042D]">
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                      </AvatarFallback>
                      <AvatarImage src="" alt={admin.name || ""} />
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        {admin.name || admin.email.split("@")[0]}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">{admin.email}</p>
                      {!admin.isVerified && (
                        <Badge
                          variant="outline"
                          className="mt-1 text-xs bg-yellow-100 text-yellow-800 border-yellow-200"
                        >
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 ml-12 sm:ml-0">
                    <Badge
                      variant={admin.role === "owner" ? "secondary" : "outline"}
                      className={
                        admin.role === "owner"
                          ? "bg-[#98042D]/10 text-[#98042D] hover:bg-[#98042D]/20 border-none text-xs sm:text-sm"
                          : "text-xs sm:text-sm"
                      }
                    >
                      {admin.role.charAt(0).toUpperCase() + admin.role.slice(1)}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      Last active: {formatLastLogin(admin.lastLogin)}
                    </div>
                    {user?.role === "owner" && user._id !== admin._id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-100 h-8 px-2 sm:px-3 text-xs sm:text-sm"
                        onClick={() => {
                          setSelectedAdmin(admin);
                          setShowDialog(true);
                        }}
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {user?.role === "owner" && (
        <Card className="border-none shadow-sm bg-white/90">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-full bg-[#3D550C]/10">
                <UserRoundPlus className="h-4 w-4 sm:h-5 sm:w-5 text-[#3D550C]" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-serif">
                Invite New Admin
              </CardTitle>
            </div>
            <CardDescription className="text-sm sm:text-base">
              Send invitations to new team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">Email Address</Label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="colleague@example.com"
                      className="pl-9 h-10 sm:h-11 focus-visible:ring-[#3D550C] text-sm sm:text-base"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#3D550C] to-[#98042D] hover:opacity-90 h-10 sm:h-11"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Send Invitation"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="text-xs sm:text-sm text-gray-500 border-t border-gray-100 pt-4">
            New admins will receive an email with instructions to set up their
            account.
          </CardFooter>
        </Card>
      )}

      {/* Delete Confirmation Modal */}
      {selectedAdmin && (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent className="max-w-[95%] sm:max-w-md rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-600 text-lg sm:text-xl">
                Remove Admin?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm sm:text-base">
                Are you sure you want to remove{" "}
                <span className="font-semibold text-black">
                  {selectedAdmin.email}
                </span>{" "}
                from the admin team? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={async () => {
                  try {
                    await axios.delete(`/api/auth/users/${selectedAdmin._id}`, {
                      withCredentials: true,
                    });
                    setAdminUsers((prev) =>
                      prev.filter((a) => a._id !== selectedAdmin._id)
                    );
                    toast.success(`Removed admin: ${selectedAdmin.email}`);
                  } catch (error) {
                    const errorMessage = axios.isAxiosError(error)
                      ? error.response?.data?.message || "Failed to remove admin"
                      : "Failed to remove admin";
                    toast.error(errorMessage);
                  } finally {
                    setShowDialog(false);
                    setSelectedAdmin(null);
                  }
                }}
              >
                Confirm Removal
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default AdminSettings;