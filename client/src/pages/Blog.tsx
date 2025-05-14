import Navbar from '@/components/Navbar';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogList from '@/components/blog/BlogList';
import BlogSubscribe from '@/components/blog/BlogSubscribe';
import Footer from '@/components/Footer';

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <BlogHeader />
      <BlogList />
      <BlogSubscribe />
      <Footer />
    </div>
  );
};

export default Blog;