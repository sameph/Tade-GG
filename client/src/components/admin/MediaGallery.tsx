/* -------------------------------------------------------------------------- */
/*  MediaGallery.tsx                                                          */
/* -------------------------------------------------------------------------- */
import React, { useState, useEffect, useCallback } from "react";
import { Plus, Trash, X, Loader2, ImagePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const API =
  (import.meta.env.VITE_API_URL?.replace(/\/$/, "") as string | undefined) ?? "";

interface GalleryImage {
  _id: string;
  filename: string;
  url: string;
  alt: string;
  category: string;
  createdAt?: string;
  size?: number;
}

interface MediaGalleryProps {
  onBack: () => void;
}

const initialUploadState = {
  file: null as File | null,
  preview: "",
  alt: "",
  category: "Farm",
};

const PAGE_SIZE = 9;

export default function MediaGallery({ onBack }: MediaGalleryProps) {
  const { toast } = useToast();

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Pagination

  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [upload, setUpload] = useState<typeof initialUploadState>(initialUploadState);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    const controller = new AbortController();
    try {
      const res = await fetch(`${API}/api/gallery`, {
        credentials: "include",
        signal: controller.signal,
      });
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setImages(data.images ?? []);
      setPage(1); // reset to first page on fetch
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        toast({
          title: "Error",
          description: "Failed to load images",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  }, [toast]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`${API}/api/gallery/${deleteTarget.filename}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      toast({ title: "Deleted", description: "Image removed" });
      await fetchImages();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete",
        variant: "destructive",
      });
    } finally {
      setDeleteTarget(null);
    }
  };

  const onFileSelect = (file?: File) => {
    if (!file) return;
    const ok = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!ok.includes(file.type)) {
      return toast({
        title: "Invalid file type",
        description: "JPG, JPEG, PNG, GIF or WEBP only",
        variant: "destructive",
      });
    }
    if (file.size > 5 * 1024 * 1024) {
      return toast({
        title: "File too large",
        description: "Max 5 MB",
        variant: "destructive",
      });
    }
    setUpload((p) => ({
      ...p,
      file,
      preview: URL.createObjectURL(file),
    }));
  };

  const handleUpload = async () => {
    if (!upload.file || !upload.alt.trim()) {
      return toast({
        title: "Missing data",
        description: "Add alt text & choose an image",
        variant: "destructive",
      });
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("image", upload.file);
      form.append("alt", upload.alt.trim());
      form.append("category", upload.category);

      const res = await fetch(`${API}/api/gallery/upload`, {
        method: "POST",
        body: form,
        credentials: "include",
      });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Upload failed");
      }
      toast({ title: "Success", description: "Image uploaded" });
      await fetchImages();
      setUpload(initialUploadState);
      setUploadOpen(false);
    } catch (err: any) {
      toast({
        title: "Upload failed",
        description: err?.message ?? "Unknown error",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const absolute = (rel: string) =>
    API ? `${API}${rel.startsWith("/") ? "" : "/"}${rel}` : rel;

  const paginatedImages = images.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(images.length / PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Media Gallery</h2>
          <p className="text-sm text-gray-500">Upload, preview and delete public gallery images</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            <X size={16} className="mr-1" />
            Back
          </Button>
          <Button className="bg-[#3D550C] hover:bg-[#3D550C]/90" onClick={() => setUploadOpen(true)}>
            <Plus size={16} className="mr-1" />
            Add
          </Button>
        </div>
      </div>

      {/* Gallery List */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-full pb-[75%] bg-gray-200 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No images yet</p>
          <Button className="mt-4 bg-[#3D550C] hover:bg-[#3D550C]/90" onClick={() => setUploadOpen(true)}>
            <Plus size={16} className="mr-1" />
            Add your first image
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedImages.map((img) => (
              <Card key={img._id} className="relative overflow-hidden group border-none shadow-md">
                <div className="aspect-w-16 aspect-h-12 relative">
                  <img
                    src={absolute(img.url)}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-opacity duration-300"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A//www.w3.org/2000/svg'%20viewBox%3D'0%200%20160%20120'%3E%3Crect%20width%3D'160'%20height%3D'120'%20fill%3D'%23ddd'/%3E%3Ctext%20x%3D'50%25'%20y%3D'50%25'%20dominant-baseline%3D'middle'%20text-anchor%3D'middle'%20fill%3D'%23999'%20font-size%3D'12'%3EImage%20not%20found%3C/text%3E%3C/svg%3E")
                    }
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    onClick={() => setDeleteTarget(img)}
                  >
                    <Trash size={14} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-tadegg-gold uppercase mb-1 tracking-wider">{img.category}</p>
                      <p className="font-medium text-sm line-clamp-1">{img.alt}</p>
                      {img.createdAt && (
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(img.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}

      {/* Delete Dialog */}
      <Dialog open={Boolean(deleteTarget)} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete image</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The image file will be removed from the server.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add image</DialogTitle>
            <DialogDescription>Max 5 MB • JPG, JPEG, PNG, GIF or WEBP</DialogDescription>
          </DialogHeader>
          {upload.preview ? (
            <img
              src={upload.preview}
              alt="Preview"
              className="w-full rounded-lg mb-4 object-cover max-h-64"
            />
          ) : (
            <label
              htmlFor="file"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-400 transition-colors"
            >
              <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-gray-500">Drag & drop or click to select</span>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={(e) => onFileSelect(e.target.files?.[0])}
                className="hidden"
              />
            </label>
          )}
          <div className="space-y-4">
            <div>
              <Label htmlFor="alt">Alt / description</Label>
              <Input
                id="alt"
                placeholder="Describe the image"
                value={upload.alt}
                onChange={(e) => setUpload((p) => ({ ...p, alt: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Category"
                value={upload.category}
                onChange={(e) => setUpload((p) => ({ ...p, category: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setUpload(initialUploadState);
                setUploadOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-[#3D550C] hover:bg-[#3D550C]/90"
            >
              {uploading && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
