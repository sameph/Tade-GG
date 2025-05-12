import React from 'react';
import { Mail } from 'lucide-react';

const BlogSubscribe = () => {
  return (
    <section className="bg-tadegg-burgundy text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Subscribe to Our Coffee Journal</h2>
          <p className="text-lg text-white/80 mb-8">
            Get the latest articles, coffee insights, and industry news delivered straight to your inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg sm:rounded-r-none focus:outline-none text-gray-800"
              required
            />
            <button 
              type="submit" 
              className="bg-tadegg-green text-white px-6 py-3 rounded-lg sm:rounded-l-none hover:bg-opacity-90 flex items-center justify-center transition-colors"
            >
              <Mail size={18} className="mr-2" />
              Subscribe
            </button>
          </form>
          
          <p className="mt-4 text-sm text-white/60">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogSubscribe;
