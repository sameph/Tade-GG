import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X, Upload } from "lucide-react";

interface PostHeaderProps {
  onCancel: () => void;
  onSave: () => void;
  onPublish: () => void;
  isEditing: boolean;
  isSubmitting?: boolean;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  onCancel,
  onSave,
  onPublish,
  isEditing,
  isSubmitting = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 font-serif">
        {isEditing ? "Edit Post" : "Create New Post"}
      </h2>

      <div className="flex flex-col-reverse xs:flex-row gap-3 w-full sm:w-auto">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 w-full xs:w-auto"
          >
            <X size={16} className="mr-2" />
            Cancel
          </Button>
          <Button
            onClick={onSave}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full xs:w-auto"
          >
            <Save size={16} className="mr-2" />
            {isEditing ? "Update" : "Save"}
          </Button>
        </div>

        <Button
          onClick={onPublish}
          className="bg-green-500 hover:bg-green-600 text-white"
          disabled={isSubmitting}
        >
          <Upload size={16} className="mr-2" />
          {isSubmitting ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </div>
  );
};

export default PostHeader;
