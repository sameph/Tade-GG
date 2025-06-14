import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
  image: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  isUploading: boolean;
  uploadProgress: number;
}

export const FeaturedImageUploader = ({
  image,
  onChange,
  onRemove,
  isUploading,
  uploadProgress,
}: Props) => {
  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <ImageIcon size={18} />
          Featured Image
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="image-upload" className="font-medium mb-2">
            Select Image
          </Label>

          <div className="flex justify-center">
            <label
              htmlFor="image-upload"
              className={`relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                image
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300 hover:border-gray-400 bg-gray-50"
              }`}
              onClick={(e) => isUploading && e.preventDefault()}
            >
              {!image && (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <Upload size={32} className="mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Click to select an image
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    JPG, PNG, GIF, WEBP (Max 5MB)
                  </p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                className="hidden"
                onChange={onChange}
                disabled={isUploading}
              />
            </label>
          </div>

          {isUploading && (
            <div className="w-full mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Uploading: {uploadProgress}%
              </p>
            </div>
          )}

          {image && (
            <div className="relative mt-2 rounded-md overflow-hidden border border-gray-200 group">
              <img
                src={image}
                alt="Featured preview"
                className="w-full h-60 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    onRemove();
                  }}
                  disabled={isUploading}
                >
                  <X size={16} className="mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};