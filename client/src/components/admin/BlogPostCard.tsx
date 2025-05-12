import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Tag, Edit, Trash2 } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { formatBlogDate } from '@/hooks/useBlog';

interface BlogPostCardProps {
  post: BlogPost;
  onEdit: () => void;
  onDelete: () => void;
}

const BlogPostCard = ({ post, onEdit, onDelete }: BlogPostCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in border-none shadow-md bg-white/80">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.mainImage.url} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-2 right-2">
          <Badge variant={post.status === 'published' ? 'default' : 'secondary'} className={`${
            post.status === 'published' 
              ? 'bg-emerald-500 hover:bg-emerald-600' 
              : 'bg-amber-500 hover:bg-amber-600'
          } font-medium shadow-sm`}>
            {post.status === 'published' ? 'Published' : 'Draft'}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-2 text-xs text-white">
          <Calendar size={14} className="drop-shadow-md" />
          <span className="drop-shadow-md">{formatBlogDate(post.createdAt)}</span>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1 font-serif">{post.title}</CardTitle>
        <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs bg-[#3D550C]/10 text-[#3D550C] px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <Tag size={14} />
          <span>{post.category}</span>
          <span className="mx-1">•</span>
          <span>By {post.author}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between border-t border-gray-100 mt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="hover:bg-[#3D550C]/10 hover:text-[#3D550C] text-gray-600"
        >
          <Edit size={14} className="mr-1" />
          Edit
        </Button>
        <Button
          variant="ghost" 
          size="sm"
          onClick={onDelete}
          className="hover:bg-red-50 hover:text-red-600 text-gray-600"
        >
          <Trash2 size={14} className="mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;