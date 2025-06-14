import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Coffee,
  Calendar,
  ArrowLeft,
  ChevronLeft,
  ChevronDown,
  Home,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollReveal from "@/components/ScrollReveal";
import Recommended from "@/components/blog/recommended";
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

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
  author: string;
  category: string;
  tags: string[];
  mainImage: {
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

const formatBlogDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const ChevronUp = ({ size, className }: { size: number; className?: string }) => (
  <ChevronDown className={`rotate-180 ${className || ""}`} size={size} />
);

const ChevronRight = ({ size }: { size: number }) => (
  <ChevronLeft className="rotate-180" size={size} />
);

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/blogs/${slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError("Post not found");
          } else {
            throw new Error("Failed to fetch post");
          }
          return;
        }

        const data = await response.json();
        if (data.success && data.post) {
          setPost(data.post);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post. Please try again later.");
        toast.error("Failed to load post", toastOptions);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();

    const handleScroll = () => {
      setShowFloatingNav(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 left-4 z-50">
          <Link
            to="/blog"
            className="inline-flex items-center text-white hover:text-tadegg-cream bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to blog</span>
          </Link>
        </div>

        <div className="pt-28 pb-12 bg-tadegg-offWhite min-h-screen">
          <div className="container mx-auto px-4">
            <article className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <div className="max-w-4xl mx-auto">
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-10 w-3/4 mb-6" />
                <Skeleton className="h-6 w-48 mb-8 pb-8" />
                <div className="aspect-[16/9] mb-8">
                  <Skeleton className="h-full w-full rounded-lg" />
                </div>
                <div className="space-y-4 mb-8">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            </article>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 left-4 z-50">
          <Link
            to="/blog"
            className="inline-flex items-center text-tadegg-green hover:text-tadegg-burgundy bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to blog</span>
          </Link>
        </div>

        <div className="pt-28 pb-12 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <Coffee size={48} className="mx-auto text-tadegg-brown/30 mb-4" />
            <h2 className="text-3xl font-serif font-semibold mb-4 text-tadegg-green">
              {error || "Blog post not found"}
            </h2>
            <Link to="/blog">
              <Button className="bg-tadegg-burgundy hover:bg-tadegg-burgundy/90 mr-2">
                Return to Blog
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-tadegg-green text-tadegg-green"
              onClick={() => navigate("/")}
            >
              <Home size={16} className="mr-2" />
              Home Page
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div
        className={`fixed z-40 top-4 left-4 transition-opacity duration-300 ${
          showFloatingNav ? "opacity-0" : "opacity-100"
        }`}
      >
        <Link
          to="/blog"
          className="inline-flex items-center text-white hover:text-tadegg-cream bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full shadow-md group"
        >
          <ChevronLeft
            size={18}
            className="mr-1 transform group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to blog</span>
        </Link>
      </div>

      <div
        className={`fixed z-40 bottom-5 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
          showFloatingNav
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-tadegg-cream">
          <button
            onClick={() => navigate("/blog")}
            className="p-2 rounded-full hover:bg-tadegg-cream/50 transition-colors"
            title="Back to Blog"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-tadegg-cream/50 transition-colors"
            title="Home Page"
          >
            <Home size={18} />
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2 rounded-full hover:bg-tadegg-cream/50 transition-colors"
            title="Back to Top"
          >
            <ChevronUp size={18} />
          </button>
        </div>
      </div>

      <div className="bg-tadegg-offWhite min-h-screen">
        <ScrollReveal direction="bottom" duration={900}>
          <div className="h-[40vh] md:h-[50vh] relative">
            <img
              src={`${BASE_URL}${post.mainImage.url}`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="container mx-auto px-4 md:px-8 py-10">
                <div className="max-w-4xl">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-tadegg-burgundy text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-white/90">
                      <Calendar size={14} />
                      <span>{formatBlogDate(post.createdAt)}</span>
                    </div>
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-4 text-white">
                    {post.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="container mx-auto px-4">
          <article className="bg-white rounded-xl shadow-md overflow-hidden -mt-10 relative z-10">
            <div className="p-6 md:p-10">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal direction="bottom" delay={300} duration={700}>
                  <div className="flex items-center justify-between gap-3 mb-8 pb-6 border-b border-tadegg-cream">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-tadegg-cream flex items-center justify-center">
                        <span className="font-medium text-xl text-tadegg-burgundy">
                          {post.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-tadegg-green block">
                          {post.author}
                        </span>
                        <span className="text-sm text-tadegg-brown/70">
                          Author
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="bottom" delay={400} duration={700}>
                  <div className="custom-quill-content max-w-none">
                    <p className="text-xl font-serif text-tadegg-brown/90 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div
                      className="react-quill-content"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="bottom" delay={500} duration={700}>
                  <div className="mt-12 pt-8 border-t border-tadegg-cream">
                    <h3 className="font-serif font-semibold text-lg text-tadegg-green mb-4">
                      Related Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-tadegg-cream/70 px-3 py-1 rounded-full text-sm text-tadegg-brown hover:bg-tadegg-cream transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="bottom" delay={600} duration={700}>
                  <div className="mt-10 pt-6 border-t border-tadegg-cream">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <Link
                        to="/blog"
                        className="flex items-center gap-2 text-tadegg-green hover:text-tadegg-burgundy transition-colors group"
                      >
                        <ChevronLeft
                          size={20}
                          className="group-hover:-translate-x-1 transition-transform"
                        />
                        <span>Back to all articles</span>
                      </Link>
                      <Link
                        to="/"
                        className="flex items-center gap-2 text-tadegg-green hover:text-tadegg-burgundy transition-colors group"
                      >
                        <Home size={18} />
                        <span>Return to homepage</span>
                        <ChevronRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>

                <div className="fixed top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-tadegg-cream to-transparent z-40" />
              </div>
            </div>
          </article>
        </div>

        <Recommended currentPostSlug={post.slug} />
        <Footer />
      </div>
    </div>
  );
};

export default BlogPost;
