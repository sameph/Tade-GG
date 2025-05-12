import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, ListOrdered, Quote, Code, Link } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface EditorToolbarProps {
  onFormat: (format: string) => void;
}

export const EditorToolbar = ({ onFormat }: EditorToolbarProps) => (
  <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-100">
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("bold")}>
      <Bold size={16} />
    </Button>
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("italic")}>
      <Italic size={16} />
    </Button>
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("underline")}>
      <Underline size={16} />
    </Button>
    <Separator orientation="vertical" className="mx-1 h-8" />
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("list")}>
      <ListOrdered size={16} />
    </Button>
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("quote")}>
      <Quote size={16} />
    </Button>
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("code")}>
      <Code size={16} />
    </Button>
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onFormat("link")}>
      <Link size={16} />
    </Button>
  </div>
);
