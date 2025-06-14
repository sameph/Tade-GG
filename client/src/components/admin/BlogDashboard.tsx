import React, { useState, useEffect, useCallback } from "react";
import { BlogPost } from "@/types/blog";
import BlogPostCard from "./BlogPostCard";
import BlogPostEditor from "./BlogPostEditor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, Images, Users } from "lucide-react";
import AdminSettings from "./AdminSetting";
import { UserProfile } from "./UserProfile";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MediaGallery from "./MediaGallery";

const toastOptions = {
  position: "top-center" as const,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored" as const,
};
const POSTS_PER_PAGE = 6;

const BlogDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState<string>("posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/blogs`);
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      const data = await response.json();
      if (data.success && data.posts) {
        setPosts(data.posts);
      } else {
        throw new Error(data.message || "Failed to fetch posts");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      toast.error("Failed to load blog posts", toastOptions);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleEditPost = (post: BlogPost) => {
    setActivePost(post);
    setIsEditing(true);
    setActiveTab("posts");
  };

  const handleNewPost = () => {
    setActivePost({
      _id: "",
      title: "",
      excerpt: "",
      content: "",
      author: "current_user_id", // Replace with actual user ID
      category: "",
      tags: [],
      mainImage: { url: "" },
      status: "draft",
      slug: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(true);
    setActiveTab("posts");
  };

  const handleDeletePost = (id: string) => {
    setIsDialogOpen(true);
    setSelectedPostId(id);
  };

  const confirmDelete = async () => {
    if (!selectedPostId) return;

    setIsDeleting(true);

    try {
      const post = posts.find((p) => p._id === selectedPostId);
      if (!post) throw new Error("Post not found");

      const res = await fetch(`/api/blogs/${post._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete the post");
      }

      setPosts((prev) => prev.filter((p) => p._id !== selectedPostId));
      toast.success(`"${post.title}" has been removed.`, toastOptions);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete the post"
      );
    } finally {
      setIsDialogOpen(false);
      setSelectedPostId(null);
      setIsDeleting(false);
    }
  };

  const handleEditorSuccess = (updatedPost: BlogPost, isNew: boolean) => {
    setPosts(prevPosts => 
      isNew 
        ? [updatedPost, ...prevPosts] 
        : prevPosts.map(p => p._id === updatedPost._id ? updatedPost : p)
    );
    setIsEditing(false);
    setActivePost(null);
  };

  const handleBackToPosts = () => setActiveTab("posts");

  const publishedCount = posts.filter(
    (post) => post.status === "published"
  ).length;
  const draftCount = posts.filter((post) => post.status === "draft").length;

  // Search and pagination logic
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] flex-col space-y-4">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-300 tracking-wide uppercase">
          Loading blog posts...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-tadegg-burgundy hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-[95%]">
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8 mb-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center">
            <div
              className="rounded-full mr-4 shadow-lg cursor-pointer transition-transform hover:scale-105 hover:shadow-xl duration-300 w-14 h-14 flex items-center justify-center"
              onClick={() => navigate("/")}
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="w-15 h-15 object-contain rounded-full"
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-br from-[#3D550C] to-[#98042D] bg-clip-text text-transparent">
                Tadegg Blog Admin
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Manage your coffee blog content
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-[180px]"
            />

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-3 w-[400px]">
                <TabsTrigger
                  value="posts"
                  className="data-[state=active]:bg-[#3D550C]/10 data-[state=active]:text-[#3D550C]"
                >
                  <FileText size={18} className="mr-2" />
                  Blog Posts
                </TabsTrigger>
                <TabsTrigger
                  value="media"
                  className="data-[state=active]:bg-[#3D550C]/10 data-[state=active]:text-[#3D550C]"
                >
                  <Images size={18} className="mr-2" />
                  Media
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-[#3D550C]/10 data-[state=active]:text-[#3D550C]"
                >
                  <Users size={18} className="mr-2" />
                  Admin Team
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button variant="outline" onClick={handleNewPost}>
              <Plus size={18} className="mr-1" /> New Post
            </Button>

            <UserProfile />
          </div>
        </div>

        {!isEditing ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="posts">
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Published</CardTitle>
                    <CardDescription>Visible to users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{publishedCount}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Drafts</CardTitle>
                    <CardDescription>Still editing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{draftCount}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total</CardTitle>
                    <CardDescription>All posts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{posts.length}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Posts */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
                {paginatedPosts.map((post) => (
                  <BlogPostCard
                    key={post._id}
                    post={post}
                    onEdit={() => handleEditPost(post)}
                    onDelete={() => handleDeletePost(post._id)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === i + 1
                          ? "bg-tadegg-burgundy text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="media">
              <MediaGallery
                onBack={handleBackToPosts}
              />
            </TabsContent>

            <TabsContent value="settings">
              <AdminSettings />
            </TabsContent>
          </Tabs>
        ) : (
          <BlogPostEditor
            post={activePost || {
              _id: "",
              title: "",
              excerpt: "",
              content: "",
              author: "",
              category: "",
              tags: [],
              mainImage: { url: "" },
              status: "draft",
              slug: "",
              createdAt: "",
              updatedAt: "",
            }}
            onCancel={() => {
              setIsEditing(false);
              setActivePost(null);
            }}
            onSuccess={handleEditorSuccess}
            isEditing={!!activePost?._id}
          />
        )}
      </div>

      {/* Confirm Delete Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogDashboard;