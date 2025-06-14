import { Coffee } from "lucide-react";
import ScrollReveal from "../ScrollReveal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
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

interface RecommendedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  mainImage: {
    url: string;
  };
  createdAt: string;
}


interface RecommendedProps {
  currentPostSlug: string;
}

const Recommended = ({ currentPostSlug }: RecommendedProps) => {
  const [recommendedPosts, setRecommendedPosts] = useState<RecommendedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    const fetchRecommendedPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/api/blogs/recommended?exclude=${currentPostSlug}&limit=3`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch recommended posts");
        }

        const data = await response.json();
        if (data.success && data.posts) {
          setRecommendedPosts(data.posts);
        }
      } catch (err) {
        console.error("Error fetching recommended posts:", err);
        toast.error("Failed to load recommendations", toastOptions);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedPosts();
  }, [currentPostSlug]);

  if (isLoading) {
    return (
      <ScrollReveal direction="bottom" delay={700} duration={800}>
        <div className="my-16">
          <h3 className="text-2xl font-serif text-tadegg-green font-semibold mb-8 text-center">
            You might also enjoy
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="h-40 overflow-hidden">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    );
  }

  if (recommendedPosts.length === 0) {
    return null; // Don't show section if no recommendations
  }

  return (
    <ScrollReveal direction="bottom" delay={700} duration={800}>
      <div className="my-16">
        <h3 className="text-2xl font-serif text-tadegg-green font-semibold mb-8 text-center">
          You might also enjoy
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {recommendedPosts.map((post) => (
            <Link 
              to={`/blog/${post.slug}`} 
              key={post.slug}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="h-40 overflow-hidden">
                {post.mainImage?.url ? (
                  <img
                    src={`${BASE_URL}${post.mainImage.url}`}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="bg-tadegg-cream/30 h-full w-full flex items-center justify-center">
                    <Coffee size={32} className="text-tadegg-brown/50" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-tadegg-burgundy mb-1 block">
                  {post.category}
                </span>
                <h4 className="text-lg font-serif font-medium text-tadegg-green group-hover:text-tadegg-burgundy transition-colors">
                  {post.title}
                </h4>
                <p className="text-sm text-tadegg-brown/70 mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default Recommended;