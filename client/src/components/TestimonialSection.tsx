import { useEffect, useState, useRef } from "react";
import { Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { useInView } from "@/hooks/use-intersection-observer";

const testimonials = [
  {
    id: 1,
    name: "David Chen",
    role: "Coffee Shop Owner",
    company: "Brew & Bean",
    quote: "Tadegg's Ethiopian coffee beans have transformed our menu. The rich flavor profile and consistent quality keep our customers coming back for more. Their transparent trade practices align perfectly with our values.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 2,
    name: "Sophia Rodriguez",
    role: "Head Buyer",
    company: "Global Coffee Imports",
    quote: "Working with Tadegg has been a game-changer for our sourcing strategy. Their dedication to quality, sustainability, and fair trade practices is unmatched in the Ethiopian coffee export market.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 3,
    name: "Michael Johnson",
    role: "Specialty Roaster",
    company: "Artisan Coffee Works",
    quote: "The Yirgacheffe beans from Tadegg have consistently been our best sellers. The floral notes and bright acidity create an exceptional cup that our customers can't get enough of.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

const TestimonialSection = () => {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  const [api, setApi] = useState<CarouselApi>();
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const [scrollY, setScrollY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      if (inView && sectionRef.current) {
        setScrollY(window.scrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView, sectionRef]);

  // Handle carousel change
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  }, [api]);

  // Handle dot navigation
  const scrollToIndex = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <section 
      id="testimonials" 
      className="py-16 md:py-28 bg-gradient-to-b from-tadegg-cream/30 to-tadegg-cream relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-10 left-4 md:left-10 opacity-10 w-24 h-24 md:w-40 md:h-40"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          <div className="w-full h-full rounded-full border-4 md:border-8 border-tadegg-brown/30 animate-spin-slow"></div>
        </div>
        <div 
          className="absolute bottom-10 right-4 md:right-10 opacity-10 w-16 h-16 md:w-20 md:h-20"
          style={{ transform: `translateY(${scrollY * -0.03}px)` }}
        >
          <div className="w-full h-full rounded-full border-2 md:border-4 border-tadegg-burgundy/30 animate-spin-slow"></div>
        </div>
        <div className="absolute top-1/4 right-0 w-32 h-32 md:w-48 md:h-48 bg-tadegg-green/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-0 w-40 h-40 md:w-64 md:h-64 bg-tadegg-burgundy/5 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
            <span className="inline-block text-sm md:text-base font-medium text-tadegg-burgundy/80 mb-2 tracking-wider">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-tadegg-burgundy mb-4 leading-tight">
              Voices of <span className="text-tadegg-green">Trust</span> & Partnership
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-tadegg-green to-tadegg-burgundy mx-auto mb-6"></div>
            <p className="text-base md:text-lg text-tadegg-brown/80 max-w-lg mx-auto">
              We value relationships with coffee shops, importers, and roasters worldwide. Here's what they say about our partnership.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="relative max-w-6xl mx-auto">
          <ScrollReveal direction="fade" delay={300}>
            <Carousel 
              setApi={setApi}
              plugins={[plugin.current]}
              className="w-full"
              opts={{
                align: "center",
                loop: true,
                skipSnaps: false
              }}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="basis-full sm:basis-2/3 lg:basis-1/2 px-4">
                    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-6 transform transition-all duration-500 hover:shadow-lg h-full group hover:-translate-y-2">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-tadegg-green/30 to-tadegg-burgundy/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative bg-white rounded-xl h-full">
                          <div className="flex items-center gap-4 p-6">
                            <div className="relative flex-shrink-0">
                              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-tadegg-cream shadow-md relative z-10">
                                <img 
                                  src={testimonial.image} 
                                  alt={testimonial.name} 
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <Quote 
                                className="absolute -top-2 -left-2 text-tadegg-burgundy opacity-70 z-20" 
                                size={24}
                              />
                              <div className="absolute -inset-2 bg-tadegg-green/10 rounded-full z-0 animate-pulse"></div>
                            </div>
                            <div>
                              <h4 className="font-serif font-semibold text-lg md:text-xl text-tadegg-green">
                                {testimonial.name}
                              </h4>
                              <p className="text-sm md:text-base text-tadegg-brown/70">
                                {testimonial.role}, {testimonial.company}
                              </p>
                            </div>
                          </div>
                          
                          <div className="px-6 pb-6">
                            <p className="text-base md:text-lg text-tadegg-brown relative">
                              <span className="absolute -left-1 -top-3 text-4xl text-tadegg-burgundy/10">❞</span>
                              {testimonial.quote}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            {/* Enhanced indicator dots */}
            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                    idx === activeIndex 
                      ? 'bg-gradient-to-r from-tadegg-green to-tadegg-burgundy w-8' 
                      : 'bg-tadegg-brown/20 hover:bg-tadegg-brown/40'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Floating coffee beans decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              transform: `rotate(${Math.random() * 360}deg) translateY(${scrollY * (0.02 - Math.random() * 0.04)}px)`,
              animation: `float ${6 + Math.random() * 6}s infinite ease-in-out ${Math.random() * 2}s`
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path 
                d="M50 15C60 5 75 10 85 20S95 40 85 50 60 85 50 75 15 60 15 50 40 25 50 15Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="text-tadegg-brown/30"
              />
            </svg>
          </div>
        ))}
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;