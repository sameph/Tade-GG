
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Coffee, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-gradient-to-br from-tadegg-green via-tadegg-green to-[#2e1105]">
      {/* Interactive coffee bean illustrations */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className={cn(
          "absolute top-20 -right-10 opacity-20 transition-all duration-1000 transform",
          isLoaded ? "translate-x-0 opacity-20" : "translate-x-20 opacity-0"
        )}>
          <svg width="400" height="600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,10 Q60,20 50,30 Q40,40 50,50 Q60,60 50,70 Q40,80 50,90" stroke="white" strokeWidth="0.5">
              <animate attributeName="d" dur="20s" repeatCount="indefinite"
                values="
                  M50,10 Q60,20 50,30 Q40,40 50,50 Q60,60 50,70 Q40,80 50,90;
                  M50,10 Q65,22 50,30 Q38,42 50,50 Q62,58 50,70 Q38,82 50,90;
                  M50,10 Q60,20 50,30 Q40,40 50,50 Q60,60 50,70 Q40,80 50,90"
              />
            </path>
            <path d="M50,10 Q40,20 50,30 Q60,40 50,50 Q40,60 50,70 Q60,80 50,90" stroke="white" strokeWidth="0.5">
              <animate attributeName="d" dur="15s" repeatCount="indefinite"
                values="
                  M50,10 Q40,20 50,30 Q60,40 50,50 Q40,60 50,70 Q60,80 50,90;
                  M50,10 Q35,18 50,30 Q62,38 50,50 Q38,62 50,70 Q62,78 50,90;
                  M50,10 Q40,20 50,30 Q60,40 50,50 Q40,60 50,70 Q60,80 50,90"
              />
            </path>
            <path d="M30,40 Q50,30 70,40" stroke="white" strokeWidth="0.5">
              <animate attributeName="d" dur="12s" repeatCount="indefinite"
                values="
                  M30,40 Q50,30 70,40;
                  M28,38 Q50,26 72,38;
                  M30,40 Q50,30 70,40"
              />
            </path>
          </svg>
        </div>
        
        <div className={cn(
          "absolute bottom-10 -left-10 opacity-20 rotate-45 transition-all duration-1000 transform",
          isLoaded ? "translate-x-0 opacity-20" : "-translate-x-20 opacity-0"
        )}>
          <svg width="300" height="400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,10 Q60,20 50,30 Q40,40 50,50 Q60,60 50,70 Q40,80 50,90" stroke="white" strokeWidth="0.5">
              <animate attributeName="d" dur="18s" repeatCount="indefinite"
                values="
                  M50,10 Q60,20 50,30 Q40,40 50,50 Q60,60 50,70 Q40,80 50,90;
                  M50,10 Q64,24 50,30 Q36,44 50,50 Q64,56 50,70 Q36,84 50,90;
                  M50,10 Q60,20 50,30 Q40,40 50,50 Q60,60 50,70 Q40,80 50,90"
              />
            </path>
            <path d="M50,10 Q40,20 50,30 Q60,40 50,50 Q40,60 50,70 Q60,80 50,90" stroke="white" strokeWidth="0.5">
              <animate attributeName="d" dur="20s" repeatCount="indefinite"
                values="
                  M50,10 Q40,20 50,30 Q60,40 50,50 Q40,60 50,70 Q60,80 50,90;
                  M50,10 Q35,16 50,30 Q65,36 50,50 Q35,64 50,70 Q65,76 50,90;
                  M50,10 Q40,20 50,30 Q60,40 50,50 Q40,60 50,70 Q60,80 50,90"
              />
            </path>
          </svg>
        </div>
      </div>

      {/* Hero content container */}
      <div className="container mx-auto px-4 md:px-8 relative z-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-16">
        {/* Text content */}
        <div className={cn(
          "text-white transition-all duration-1000 transform",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif leading-tight">
              <span className="block overflow-hidden">
                <span className={cn(
                  "inline-block transition-transform duration-1000 delay-200",
                  isLoaded ? "translate-y-0" : "translate-y-full"
                )}>From Ethiopia's</span>
              </span>
              <span className="block overflow-hidden">
                <span className={cn(
                  "inline-block transition-transform duration-1000 delay-400 text-gradient",
                  isLoaded ? "translate-y-0" : "translate-y-full"
                )}>Highlands</span>
              </span>
              <span className="block overflow-hidden">
                <span className={cn(
                  "inline-block transition-transform duration-1000 delay-600",
                  isLoaded ? "translate-y-0" : "translate-y-full"
                )}>To The World</span>
              </span>
            </h1>
            <p className={cn(
              "text-xl md:text-2xl font-light max-w-2xl transition-all delay-800",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              Premium Ethiopian coffee beans, ethically sourced and expertly exported to bring the authentic taste of Ethiopian heritage to global markets.
            </p>
            <div className={cn(
              "flex flex-col sm:flex-row gap-4 pt-4 transition-all delay-1000",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <Button size="lg" className="bg-tadegg-burgundy hover:bg-tadegg-burgundy/90 text-white font-semibold text-lg group shine">
                <span>Explore Our Coffees</span>
                <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
              </Button>
              <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-tadegg-green transition-all font-semibold text-lg group">
                Our Story
                <span className="ml-2 opacity-0 transform transition-all group-hover:opacity-100 group-hover:translate-x-1">→</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Coffee beans image section */}
        <div className={cn(
          "relative block transition-all duration-1000 delay-300 transform",
          isLoaded ? "translate-x-0 opacity-100 scale-100" : "translate-x-20 opacity-0 scale-95"
        )}>
          <div className="mx-auto max-w-md md:ml-auto">
            <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-xl overflow-hidden group">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&q=80" 
                  alt="Ethiopian Coffee Beans" 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tadegg-brown/50 to-transparent"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-6 -right-6 w-16 md:w-24 h-16 md:h-24 bg-tadegg-burgundy/80 backdrop-blur-sm rounded-full flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <div className="animate-spin-slow">
                  <Coffee size={30} className="text-white" />
                </div>
              </div>
              <div className="absolute -top-6 -left-6 w-12 md:w-16 h-12 md:h-16 bg-tadegg-cream/30 backdrop-blur-sm rounded-full animate-float"></div>
              
              {/* Small floating beans */}
              <div className="absolute top-1/2 right-0 w-8 h-8 bg-white/10 rounded-full transform translate-x-1/2 animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/3 left-0 w-6 h-6 bg-tadegg-burgundy/20 rounded-full transform -translate-x-1/2 animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Coffee bean shapes */}
      <div className={cn(
        "absolute bottom-40 left-1/4 w-6 h-10 bg-tadegg-cream/20 rounded-full transform rotate-45 animate-float transition-all duration-1000",
        isLoaded ? "opacity-100" : "opacity-0"
      )}></div>
      <div className={cn(
        "absolute top-40 right-1/3 w-4 h-8 bg-tadegg-cream/20 rounded-full transform -rotate-12 animate-float transition-all duration-1000",
        isLoaded ? "opacity-100" : "opacity-0"
      )} style={{ animationDelay: '2s' }}></div>
      
      {/* Scroll indicator */}
      <div className={cn(
        "absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 delay-1200",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <a href="#our-process" className="block">
          <div className="w-10 h-16 border-2 border-white/30 rounded-full flex flex-col items-center justify-start p-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce-subtle"></div>
          </div>
          <p className="text-white/70 text-sm mt-2 text-center font-serif">Scroll</p>
        </a>
      </div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-tadegg-brown/30 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
