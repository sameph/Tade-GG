import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Coffee, Bean } from 'lucide-react';

const BlogHeader = () => {
  return (
    <div className="bg-gradient-to-r from-tadegg-burgundy to-tadegg-green py-24 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10"></div>
        <div className="absolute top-1/4 right-1/4 w-60 h-60 rounded-full bg-white/5"></div>
        <div className="absolute bottom-0 right-10 w-40 h-40 rounded-full bg-white/10"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
          <ChevronLeft size={18} className="mr-1" />
          Back to Home
        </Link>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text content */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 text-white">
              The Tadegg Coffee Blog
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
              Insights, stories, and expertise from Ethiopia's coffee heritage.
            </p>
          </div>
          
          {/* Coffee beans image in a container */}
          <div className="flex-shrink-0 w-full md:w-1/3 relative">
            <div className="bg-white p-3 rounded-lg shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="overflow-hidden rounded-md relative aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Fresh coffee beans" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <Bean size={24} className="text-tadegg-cream bg-tadegg-burgundy/70 p-1 rounded-full" />
                  <Coffee size={24} className="text-tadegg-cream bg-tadegg-green/70 p-1 rounded-full" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-tadegg-gold/30 backdrop-blur-sm z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;