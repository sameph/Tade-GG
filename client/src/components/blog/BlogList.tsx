import React, { useState, useEffect, useRef } from 'react';
import { Clock, User, Search, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';



const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const containerRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data.posts || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search query
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

  // Pagination calculations
  const totalItems = displayedPosts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = displayedPosts.slice(startIndex, endIndex);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage]);

  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate page numbers with truncation
  const getPageNumbers = (): (number | string)[] => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of middle pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're at the start or end
      if (currentPage <= 3) {
        end = 3;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 2;
      }
      
      // Add ellipsis if needed after first page
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed before last page
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

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
    <div className="container mx-auto px-4 py-16" ref={containerRef}>
      {/* Search and Controls */}
      <div className="mb-12 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto md:flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              type="text" 
              placeholder="Search for blog posts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border-2 border-gray-100 focus:border-tadegg-burgundy focus:ring-0 rounded-full"
            />
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">Posts per page:</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => setItemsPerPage(Number(value))}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder={itemsPerPage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {currentItems.length > 0 ? (
          currentItems.map((post) => (
            <article key={post._id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl duration-300">
              {post.mainImage?.url && (
                <div className="h-56 overflow-hidden">
                  <img 
                    src={`${BASE_URL}${post.mainImage.url}`}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-{endIndex} of {totalItems} posts
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-tadegg-burgundy hover:bg-tadegg-cream'}`}
            >
              <ChevronLeft size={20} />
            </button>
            
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-1 text-gray-500">
                    <MoreHorizontal size={16} />
                  </span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium ${currentPage === page ? 'bg-tadegg-burgundy text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-tadegg-burgundy hover:bg-tadegg-cream'}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="hidden sm:block w-24"></div> {/* Spacer for alignment */}
        </div>
      )}
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
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default BlogList;