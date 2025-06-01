import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Coffee, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-tadegg-green via-tadegg-green to-[#2e1105] pt-24 pb-12 md:py-0 scroll-mt-24">
      {/* Interactive coffee bean illustrations */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {/* ... (keep existing SVG animations) ... */}
      </div>

      {/* Hero content container */}
      <div className="container mx-auto px-4 sm:px-6 relative z-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
        {/* Text content - now always first in DOM order */}
        <div
          className={cn(
            "text-white transition-all duration-1000 transform",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <div className="space-y-4 md:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-serif leading-tight">
              <span className="block overflow-hidden">
                <span
                  className={cn(
                    "inline-block transition-transform duration-1000 delay-200",
                    isLoaded ? "translate-y-0" : "translate-y-full"
                  )}
                >
                  Taste Speciality
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className={cn(
                    "inline-block transition-transform duration-1000 delay-400 text-gradient",
                    isLoaded ? "translate-y-0" : "translate-y-full"
                  )}
                >
                  Coffee,
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className={cn(
                    "inline-block transition-transform duration-1000 delay-600",
                    isLoaded ? "translate-y-0" : "translate-y-full"
                  )}
                >
                  Across Continents
                </span>
              </span>
            </h1>
            <p
              className={cn(
                "text-lg sm:text-xl md:text-2xl font-light max-w-2xl transition-all delay-800",
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              Founded in 2004, we began as a humble farm in the lush highlands of Guji, Ethiopia. Today, we are a globally trusted green coffee exporter known for our unwavering commitment to quality, sustainability, and transparency.
            </p>
            <div
              className={cn(
                "flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 transition-all delay-1000",
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              <Link to="/blog">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-tadegg-green hover:bg-white hover:text-tadegg-burgundy transition-all font-serif font-semibold text-base sm:text-lg px-6 py-3 rounded-full group"
              >
                <span className="flex items-center gap-2">
                  Our Story
                  <span className="opacity-100 transform transition-transform group-hover:translate-x-1 text-tadegg-green group-hover:text-tadegg-burgundy">
                    →
                  </span>
                </span>
              </Button>
              </Link>
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                className="bg-tadegg-burgundy hover:bg-tadegg-burgundy/90 text-white font-semibold text-base sm:text-lg group shine"
              >
                <span>Contact Us</span>
                <span className="ml-2 transform transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Coffee beans image section - now appears below text on mobile */}
        <div
          className={cn(
            "relative block transition-all duration-1000 delay-300 transform md:mt-0 mt-6",
            isLoaded
              ? "translate-x-0 opacity-100 scale-100"
              : "translate-x-20 opacity-0 scale-95"
          )}
        >
          <div className="w-full md:max-w-xl md:ml-auto px-0 sm:px-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl overflow-hidden group">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img
                  src="/tade.png"
                  alt="Ethiopian Coffee Beans"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tadegg-brown/50 to-transparent"></div>
              </div>

              {/* Floating elements (smaller on mobile) */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-tadegg-burgundy/80 backdrop-blur-sm rounded-full flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <div className="animate-spin-slow">
                  <Coffee size={24} className="text-white sm:w-6 sm:h-6" />
                </div>
              </div>
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-tadegg-cream/30 backdrop-blur-sm rounded-full animate-float"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Coffee bean shapes (smaller on mobile) */}
      <div
        className={cn(
          "absolute bottom-40 left-1/4 w-4 h-6 sm:w-6 sm:h-10 bg-tadegg-cream/20 rounded-full transform rotate-45 animate-float transition-all duration-1000",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      ></div>
      <div
        className={cn(
          "absolute top-40 right-1/3 w-3 h-5 sm:w-4 sm:h-8 bg-tadegg-cream/20 rounded-full transform -rotate-12 animate-float transition-all duration-1000",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Scroll indicator */}
      <div
        className={cn(
          "absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 delay-1200 hidden md:block",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <a href="#our-process" className="block">
          <div className="w-8 h-12 sm:w-10 sm:h-16 border-2 border-white/30 rounded-full flex flex-col items-center justify-start p-1 sm:p-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-bounce-subtle"></div>
          </div>
          <p className="text-white/70 text-xs sm:text-sm mt-1 sm:mt-2 text-center font-serif">
            Scroll
          </p>
        </a>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-tadegg-brown/30 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
