import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X, Upload, Loader2 } from "lucide-react";

interface PostHeaderProps {
  onCancel: () => void;
  onSave: () => void;
  onPublish: () => void;
  isEditing: boolean;
  isSubmitting?: boolean;
  status?: "draft" | "published";
}

const PostHeader: React.FC<PostHeaderProps> = ({
  onCancel,
  onSave,
  onPublish,
  isEditing,
  isSubmitting = false,
  status = "draft",
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 font-serif">
          {isEditing ? "Edit Post" : "Create New Post"}
        </h2>
        {isEditing && (
          <p className="text-sm text-gray-500 mt-1">
            Status: <span className="font-medium capitalize">{status}</span>
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse xs:flex-row gap-3 w-full sm:w-auto">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 w-full xs:w-auto"
            disabled={isSubmitting}
          >
            <X size={16} className="mr-2" />
            Cancel
          </Button>
          <Button
            onClick={onSave}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full xs:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <Save size={16} className="mr-2" />
            )}
            {isEditing ? "Update Draft" : "Save Draft"}
          </Button>
        </div>

        <Button
          onClick={onPublish}
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 size={16} className="mr-2 animate-spin" />
          ) : (
            <Upload size={16} className="mr-2" />
          )}
          {status === "published" && isEditing
            ? "Update Published Post"
            : "Publish"}
        </Button>
      </div>
    </div>
  );
};

export default PostHeader;