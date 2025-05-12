import React, { useState, useEffect } from 'react';
import { Clock, User, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data.posts || []); // Changed to match backend response
      } catch (err) {
        setError(err.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const displayedPosts = blogPosts.filter(post => {
    return (
      post.status === 'published' && (
        searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-red-500">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 text-tadegg-burgundy hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Search Bar */}
      <div className="mb-12 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input 
            type="text" 
            placeholder="Search for blog posts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border-2 border-gray-100 focus:border-tadegg-burgundy focus:ring-0 rounded-full"
          />
        </div>
      </div>
      
      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => (
            <article key={post._id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl duration-300">
              {post.mainImage?.url && (
                <div className="h-56 overflow-hidden">
                  <img 
                    src={post.mainImage.url} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  {post.category && (
                    <span className="bg-tadegg-cream text-tadegg-burgundy text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  )}
                  <div className="flex items-center text-gray-500 text-xs">
                    <Clock size={14} className="mr-1" />
                    {calculateReadTime(post.content)} min read
                  </div>
                </div>
                
                <h3 className="text-xl font-serif font-bold mb-3 text-tadegg-green hover:text-tadegg-burgundy transition-colors">
                  <a href={`/blog/${post.slug}`} className="hover:underline">{post.title}</a>
                </h3>
                
                {post.excerpt && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                
                <footer className="flex items-center justify-between mt-6">
                  <div className="flex items-center">
                    <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      <User size={14} className="text-gray-500" />
                    </div>
                    <span className="text-xs text-gray-600">{post.author}</span>
                  </div>
                  <time className="text-xs text-gray-500" dateTime={new Date(post.createdAt).toISOString()}>
                    {formatDate(post.createdAt)}
                  </time>
                </footer>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-1 md:col-span-3 text-center py-12">
            <p className="text-gray-600 text-lg">
              {blogPosts.length === 0 
                ? "No blog posts available yet." 
                : "No blog posts found matching your search."}
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="mt-4 text-tadegg-burgundy hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to calculate read time
function calculateReadTime(content) {
  if (!content) return 0;
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Helper function to format date
function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export default BlogList;