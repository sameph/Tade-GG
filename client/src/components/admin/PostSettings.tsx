import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckCircle,  User, Tag } from "lucide-react";

interface Props {
  post: any;
  onChange: (e: React.ChangeEvent<any>) => void;
  tagsString: string;
}

export const PostSettings = ({ post, onChange, tagsString }: Props) => (
  <Card className="border border-gray-100 shadow-sm">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-serif text-[#3D550C] flex items-center gap-2">
        <CheckCircle size={18} />
        Post Settings
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
     
      <div>
        <Label htmlFor="author" className="font-medium text-gray-700 flex items-center gap-2">
          <User size={14} className="text-[#3D550C]" />
          Author
        </Label>
        <Input id="author" name="author" value={post.author} onChange={onChange} />
      </div>

      <div>
        <Label htmlFor="category" className="font-medium text-gray-700 flex items-center gap-2">
          <Tag size={14} className="text-[#3D550C]" />
          Category
        </Label>
        <Input id="category" name="category" value={post.category} onChange={onChange} />
      </div>

      <div>
        <Label htmlFor="tags" className="font-medium text-gray-700 flex items-center gap-2">
          <Tag size={14} className="text-[#3D550C]" />
          Tags (comma separated)
        </Label>
        <Input id="tags" name="tags" value={tagsString} onChange={onChange} />
      </div>
    </CardContent>
  </Card>
);
