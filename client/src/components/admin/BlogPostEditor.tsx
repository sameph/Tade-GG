import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FeaturedImageUploader } from "./FeaturedImageUploader";
import { PostSettings } from "./PostSettings";
import PostHeader from "./PostHeader";
import { createBlogPost } from "./utils/createPosts";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { upload } from "@imagekit/react";
import { useAuthStore } from "@/store/authStore";

export interface BlogPost {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: "published" | "draft";
  author: string;
  category?: string;
  tags: string[];
  mainImage?: {
    url: string;
    alt?: string;
  };
  createdAt?: string;
  updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  featured?: boolean;
}

type BlogPostEditorProps = {
  post: Partial<BlogPost>;
  onChange: (e: { target: { name: string; value: string | string[] } }) => void;
  onCancel: () => void;
  isEditing?: boolean;
};

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({
  post,
  onChange,
  onCancel,
  isEditing = false,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const tagsString = Array.isArray(post.tags)
    ? post.tags.join(", ")
    : post.tags || "";

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: [1, 2, 3, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const getImagekitAuth = async () => {
    const res = await fetch("/api/blogs/upload-auth");
    if (!res.ok) throw new Error("ImageKit auth failed");
    return await res.json();
  };

  const uploadImage = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadProgress(0);
    try {
      const auth = await getImagekitAuth();
      const { url } = await upload({
        file,
        fileName: `${Date.now()}-${file.name}`,
        ...auth,
        onProgress: (e) =>
          setUploadProgress(Math.round((e.loaded / e.total) * 100)),
      });
      return url;
    } finally {
      setIsUploading(false);
    }
  };

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleSave = async (status: "draft" | "published" = "draft") => {
    setIsSubmitting(true);

    try {
      if (!post.title || !post.content) {
        toast({
          title: "Missing fields",
          description: "Post title and content are required.",
          variant: "destructive",
        });
        return;
      }

      let imageUrl = post.mainImage?.url;
      if (selectedFile && status === "published") {
        imageUrl = await uploadImage(selectedFile);
      }

      const payload: BlogPost = {
        ...post,
        slug: post.slug || generateSlug(post.title),
        author: user?.name || "admin",
        status,
        tags:
          typeof post.tags === "string"
            ? post.tags.split(",").map((t) => t.trim())
            : post.tags || [],
        mainImage: imageUrl ? { url: imageUrl } : undefined,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || "",
      } as BlogPost;

      const response = await createBlogPost(payload);

      toast({
        title: status === "published" ? "Post published!" : "Draft saved",
        description: "Your changes have been saved.",
      });

      if (status === "published") {
        navigate(`/blog/${response?.post?.slug}`);
      }
    } catch (error) {
      console.error("Post save error:", error);
      toast({
        title: "Save failed",
        description: "There was an error saving your post.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum size is 2MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setLocalPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    onChange({ target: { name: "mainImage.url", value: "" } });
    setSelectedFile(null);
    setLocalPreview(null);
  };

  const handleContentChange = (value: string) => {
    onChange({ target: { name: "content", value } });
  };

  return (
    <div className="bg-white/90 rounded-xl border border-gray-100 shadow-lg p-6">
      <PostHeader
        onCancel={onCancel}
        onSave={() => handleSave("draft")}
        onPublish={() => handleSave("published")}
        isEditing={isEditing}
        isSubmitting={isSubmitting}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <Label htmlFor="title">Post Title</Label>
            <Input
              id="title"
              name="title"
              value={post.title || ""}
              onChange={(e) =>
                onChange({ target: { name: "title", value: e.target.value } })
              }
              placeholder="Enter post title"
              className="text-2xl font-bold"
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={post.excerpt || ""}
              onChange={(e) =>
                onChange({ target: { name: "excerpt", value: e.target.value } })
              }
              placeholder="Brief summary"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <ReactQuill
              id="content"
              theme="snow"
              className="flex-1 border border-gray-200 rounded-lg bg-white min-h-[300px] h-[400px]"
              value={post.content || ""}
              onChange={handleContentChange}
              modules={quillModules}
            />
          </div>
        </div>

        <div className="space-y-6">
          <PostSettings
            post={post}
            onChange={onChange}
            tagsString={tagsString}
          />
          <FeaturedImageUploader
            image={localPreview || post.mainImage?.url || ""}
            onChange={handleFileChange}
            onRemove={handleRemoveImage}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPostEditor;


