
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Coffee, ArrowRight } from "lucide-react";
import { useBlogPosts, formatBlogDate } from "@/hooks/useBlog";
import { urlFor } from "@/lib/sanity";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollReveal from "@/components/ScrollReveal";

const BlogPreview = () => {
  const { data: posts, isLoading, error } = useBlogPosts();

  // Loading state
  if (isLoading) {
    return (
      <section className="section-padding bg-gradient-to-b from-white to-tadegg-cream/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="section-title">Coffee Insights</h2>
              <p className="section-subtitle">
                Explore our latest articles and insights about Ethiopian coffee, industry trends, and more.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm h-[380px]">
                <Skeleton className="h-48 w-full" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="section-padding bg-tadegg-cream/30">
        <div className="container mx-auto text-center">
          <h2 className="section-title text-red-500">Unable to load blog posts</h2>
          <p>Please try again later</p>
        </div>
      </section>
    );
  }

  // Display only first 3 posts for preview
  const previewPosts = posts?.slice(0, 3) || [];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-tadegg-cream/30">
      <div className="container mx-auto">
        <ScrollReveal direction="bottom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="section-title relative">
                <span className="absolute -top-6 text-5xl text-tadegg-burgundy/10 font-serif">Stories</span>
                Coffee Insights
              </h2>
              <p className="section-subtitle">
                Explore our latest articles and insights about Ethiopian coffee, industry trends, and more.
              </p>
            </div>
            <Link to="/blog" className="mt-4 md:mt-0 group">
              <Button variant="outline" className="border-tadegg-green text-tadegg-green hover:bg-tadegg-green hover:text-white group-hover:pl-6 group-hover:pr-8 transition-all">
                View All Articles
                <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewPosts.map((post, index) => (
            <ScrollReveal key={post._id} direction="bottom" delay={index * 150}>
              <Link to={`/blog/${post.slug}`} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-[380px] flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={urlFor(post.mainImage).width(600).height(340).url()}
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
                      <span className="text-sm text-tadegg-brown/70">{formatBlogDate(post.publishedAt)}</span>
                    </div>
                    
                    <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-tadegg-burgundy transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-tadegg-brown/80 mb-4 line-clamp-2 text-sm">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center text-tadegg-green font-medium group-hover:text-tadegg-burgundy transition-colors">
                      <span>Read More</span>
                      <svg
                        className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
