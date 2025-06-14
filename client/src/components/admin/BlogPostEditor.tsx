import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FeaturedImageUploader } from "./FeaturedImageUploader";
import { PostSettings } from "./PostSettings";
import PostHeader from "./PostHeader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const toastOptions = {
  position: "top-center" as const,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored" as const,
};

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
}

type BlogPostEditorProps = {
  post: Partial<BlogPost>;
  onCancel: () => void;
  onSuccess?: (post: BlogPost, isNew: boolean) => void;
  isEditing?: boolean;
};

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({
  post: initialPost,
  onCancel,
  onSuccess,
  isEditing = false,
}) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [editedPost, setEditedPost] = useState<Partial<BlogPost>>(initialPost);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
    const imageUrl = initialPost.mainImage?.url || null;
    if (!imageUrl) return null;

    return imageUrl.startsWith("http") ? imageUrl : `${BASE_URL}${imageUrl}`;
  });

  const tagsString = Array.isArray(editedPost.tags)
    ? editedPost.tags.join(", ")
    : editedPost.tags || "";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error(
        "Only image files allowed (jpeg, jpg, png, gif, webp)",
        toastOptions
      );
      return;
    }

    // Check file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Maximum size is 5MB", toastOptions);
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setEditedPost((prev) => ({ ...prev, mainImage: null }));
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleContentChange = (value: string) => {
    setEditedPost((prev) => ({ ...prev, content: value }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "tags") {
      setEditedPost((prev) => ({
        ...prev,
        tags: value.split(",").map((tag) => tag.trim()),
      }));
    } else {
      setEditedPost((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitPost = async (finalStatus: "draft" | "published") => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append the file if selected
      if (selectedFile) {
        formData.append("mainImage", selectedFile);
      } else if (editedPost.mainImage === null) {
        // If user removed image, tell backend
        formData.append("mainImage", "");
      }

      // Append all other post data EXCEPT status and mainImage
      Object.entries(editedPost).forEach(([key, value]) => {
        if (
          value !== undefined &&
          key !== "mainImage" &&
          key !== "status" // skip status here
        ) {
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });

      // Always append status explicitly
      formData.append("status", finalStatus);

      const method = editedPost._id ? "PUT" : "POST";
      const url = editedPost._id
        ? `/api/blogs/${editedPost.slug}`
        : "/api/blogs/create";

      const response = await fetch(url, {
        method,
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save post");
      }

      const data = await response.json();
      toast.success(
        `Post ${editedPost._id ? "updated" : "created"} successfully!`,
        toastOptions
      );

      if (onSuccess) {
        onSuccess(data.post, !editedPost._id);
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save post",
        toastOptions
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSavePost = () => submitPost("draft");
  const handlePublishPost = () => submitPost("published");

  return (
    <div className="bg-white/90 rounded-xl border border-gray-100 shadow-lg p-6">
      <PostHeader
        onCancel={onCancel}
        onSave={handleSavePost}
        onPublish={handlePublishPost}
        isEditing={isEditing}
        isSubmitting={isSubmitting}
        status={editedPost.status}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <Label htmlFor="title">Post Title</Label>
            <Input
              id="title"
              name="title"
              value={editedPost.title || ""}
              onChange={handleInputChange}
              placeholder="Enter post title"
              className="text-2xl font-bold"
              required
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={editedPost.excerpt || ""}
              onChange={handleInputChange}
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
              value={editedPost.content || ""}
              onChange={handleContentChange}
              modules={quillModules}
              placeholder="Write your post content here..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <PostSettings
            post={editedPost}
            onChange={handleInputChange}
            tagsString={tagsString}
          />

          <FeaturedImageUploader
            image={previewUrl}
            onChange={handleFileChange}
            onRemove={handleRemoveImage}
            isUploading={isSubmitting}
            uploadProgress={0} // You can implement progress tracking if needed
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPostEditor;
