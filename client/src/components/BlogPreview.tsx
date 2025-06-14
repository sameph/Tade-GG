import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Coffee, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollReveal from "@/components/ScrollReveal";

// Types
interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  mainImage: { url: string };
  category: string;
  createdAt: string;
}

// Utility
const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const BlogPreview = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blogs/latest");
        const data = await res.json();
        if (data.success) {
          setPosts(data.posts);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="section-padding bg-gradient-to-b from-white to-tadegg-cream/30">
      <div className="container mx-auto">
        {/* ... section title ... */}

        {/* Loaded State */}
        {!isLoading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <ScrollReveal
                key={post._id}
                direction="bottom"
                delay={index * 150}
              >
                <Link to={`/blog/${post.slug}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-[380px] flex flex-col">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={`${BASE_URL}${post.mainImage?.url}`}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-medium text-tadegg-burgundy">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <Coffee size={16} className="text-tadegg-green" />
                        <span className="text-sm text-tadegg-brown/70">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-tadegg-burgundy transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-tadegg-brown/80 mb-4 line-clamp-2 text-sm">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto flex items-center text-tadegg-green font-medium group-hover:text-tadegg-burgundy transition-colors">
                        <span>Read More</span>
                        <ArrowRight
                          size={16}
                          className="ml-1 transform transition-transform group-hover:translate-x-2"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPreview;
