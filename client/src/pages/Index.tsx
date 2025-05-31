import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Specialties from "@/components/Specialties";
import Gallery from "@/components/Gallery";
import ContactSection from "@/components/ContactSection";
import MapSection from "@/components/MapSection";
import ProcessSection from "@/components/ProcessSection";
import BlogPreview from "@/components/BlogPreview";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowUp } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import AchievementsSection from "@/components/Achievements";
import AOS from "aos";
import "aos/dist/aos.css";

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Create refs for parallax elements
  const parallaxLayersRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out-quad',
      mirror: true
    });

    const handleScroll = () => {
      // Update scroll position for parallax effects
      setScrollY(window.scrollY);
      
      // Show/hide scroll to top button
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    // Add class to body for page-wide animations
    document.body.classList.add('page-loaded');
    
    // Reveal animation after a short delay
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className={`min-h-screen transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <Hero />
      
      {/* Enhanced ScrollReveal with AOS */}
      <div data-aos="fade-up" data-aos-delay="100">
        <AboutSection />
      </div>
      
      <div data-aos="fade-left" data-aos-delay="150">
        <WhyChooseUs />
      </div>
      
      <div data-aos="fade-right" data-aos-delay="150">
        <Specialties />
      </div>
      
      <div data-aos="zoom-in" data-aos-delay="100">
        <ProcessSection />
      </div>
      
      {/* Enhanced Parallax Section */}
      <div 
        className="py-16 bg-gradient-to-r from-tadegg-cream to-white relative overflow-hidden"
        data-aos="fade-in"
        data-aos-delay="200"
      >
        {/* Parallax coffee bean shapes */}
        <div 
          className="absolute inset-0 pointer-events-none"
          ref={parallaxLayersRef}
          style={{ perspective: '1000px' }}
        >
          <div 
            className="float-bean absolute top-20 left-[10%] w-20 h-36 rounded-full border-4 border-tadegg-brown/10 rotate-45"
            style={{ transform: `translateY(${scrollY * 0.05}px) rotate(45deg)` }}
            data-aos="zoom-in"
            data-aos-delay="300"
          ></div>
          <div 
            className="float-bean absolute bottom-10 right-[15%] w-16 h-28 rounded-full border-4 border-tadegg-brown/10 rotate-12 animation-delay-300"
            style={{ transform: `translateY(${scrollY * -0.03}px) rotate(12deg)` }}
            data-aos="zoom-in"
            data-aos-delay="400"
          ></div>
          <div 
            className="float-bean absolute top-40 right-[20%] w-12 h-20 rounded-full border-2 border-tadegg-burgundy/10 -rotate-12 animation-delay-600"
            style={{ transform: `translateY(${scrollY * 0.07}px) rotate(-12deg)` }}
            data-aos="zoom-in"
            data-aos-delay="500"
          ></div>
          
          {/* Additional floating elements for enhanced parallax */}
          <div 
            className="absolute top-[30%] left-[30%] w-8 h-8 rounded-full bg-tadegg-burgundy/5"
            style={{ transform: `translateY(${scrollY * -0.04}px) translateX(${scrollY * 0.02}px)` }}
            data-aos="fade-in"
            data-aos-delay="600"
          ></div>
          <div 
            className="absolute bottom-[20%] left-[20%] w-10 h-10 rounded-full bg-tadegg-green/5"
            style={{ transform: `translateY(${scrollY * 0.06}px) translateX(${scrollY * -0.01}px)` }}
            data-aos="fade-in"
            data-aos-delay="700"
          ></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <h2 
            className="text-3xl md:text-4xl font-serif font-semibold mb-6 text-tadegg-burgundy animate-pulse"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            "The finest Ethiopian coffee, from our highlands to your cup"
          </h2>
          <p 
            className="text-tadegg-brown/80 text-lg max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Experience the unparalleled quality and rich heritage of Ethiopian coffee through Tadegg's premium exports.
          </p>
        </div>
      </div>
      
      <div data-aos="fade-in" data-aos-delay="100">
        <TestimonialSection />
      </div>
      
      <div data-aos="fade-in" data-aos-delay="150">
        <Gallery />
      </div>

      <div data-aos="zoom-in" data-aos-delay="100">
        <AchievementsSection />
      </div>
      
      <div data-aos="fade-in" data-aos-delay="150">
        <BlogPreview />
      </div>
      
      <div data-aos="fade-up" data-aos-delay="100">
        <ContactSection />
      </div>
      
      <div data-aos="fade-in" data-aos-delay="150">
        <MapSection />
      </div>
      
      <Footer />
      
      {/* Enhanced Scroll to top button with 3D effect */}
      <button 
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full bg-tadegg-burgundy text-white flex items-center justify-center shadow-lg transition-all z-50 hover:bg-tadegg-green hover:shadow-xl transform hover:scale-110 hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        data-aos="zoom-in"
        data-aos-delay="1000"
        data-aos-anchor-placement="top-center"
      >
        <ArrowUp className="animate-bounce-subtle" />
      </button>
      
      {/* Page transition overlay with gradient */}
      <div 
        className={`fixed inset-0 bg-gradient-to-b from-tadegg-burgundy to-tadegg-green z-[100] transition-transform duration-1000 ease-in-out ${
          isVisible ? 'translate-y-[-100%]' : 'translate-y-0'
        }`}
      ></div>
      
      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0px) rotate(var(--rotation)); }
          50% { transform: translateY(-15px) rotate(calc(var(--rotation) + 5deg)); }
          100% { transform: translateY(0px) rotate(var(--rotation)); }
        }
        
        .float-bean {
          animation: float 6s ease-in-out infinite;
          --rotation: 0deg;
        }
        
        .float-bean:nth-child(1) { --rotation: 45deg; }
        .float-bean:nth-child(2) { --rotation: 12deg; animation-delay: 1s; }
        .float-bean:nth-child(3) { --rotation: -12deg; animation-delay: 2s; }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        /* Enhanced 3D hover effect */
        [data-aos] {
          transition-property: transform, opacity;
        }
        
        .hover-3d {
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }
        
        .hover-3d:hover {
          transform: perspective(500px) rotateY(15deg) translateZ(20px);
          box-shadow: 0 20px 30px rgba(0,0,0,0.1);
        }
        
        /* Enhanced bounce animation */
        .animate-bounce-subtle {
          animation: bounce-subtle 1.5s infinite;
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        
        /* Custom AOS animations */
        [data-aos="custom-slide"] {
          opacity: 0;
          transform: translateX(-50px);
          transition-property: transform, opacity;
        }
        
        [data-aos="custom-slide"].aos-animate {
          opacity: 1;
          transform: translateX(0);
        }
        
        /* Pulse animation for featured elements */
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(138, 79, 45, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(138, 79, 45, 0); }
          100% { box-shadow: 0 0 0 0 rgba(138, 79, 45, 0); }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        `}
      </style>
    </div>
  );
};

export default Index;