import { useEffect, useState, useRef } from "react";
import { Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      if (inView && sectionRef.current) {
        setScrollY(window.scrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView, sectionRef]);

  return (
    <section 
      id="testimonials" 
      className="py-12 md:py-20 bg-tadegg-cream relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Simplified decorative elements */}
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
      </div>
      
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-tadegg-burgundy mb-4">
              What Our Partners Say
            </h2>
            <p className="text-base md:text-lg text-tadegg-brown/80">
              We value relationships with coffee shops, importers, and roasters worldwide.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="relative max-w-4xl mx-auto">
          <ScrollReveal direction="fade" delay={300}>
            <Carousel 
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
                  <CarouselItem key={testimonial.id} className="basis-full sm:basis-2/3 md:basis-1/2 lg:basis-1/2">
                    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 flex flex-col gap-6 transform transition-all duration-300 hover:shadow-md h-full">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-tadegg-cream shadow-md">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <Quote 
                            className="absolute -top-2 -left-2 text-tadegg-burgundy opacity-70" 
                            size={24}
                          />
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
                      
                      <p className="text-base md:text-lg text-tadegg-brown relative flex-grow">
                        <span className="absolute -left-1 -top-3 text-4xl text-tadegg-burgundy/10">❞</span>
                        {testimonial.quote}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            {/* Mobile indicator dots */}
            <div className="flex justify-center gap-2 mt-6 md:hidden">
              {testimonials.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === 0 
                      ? 'bg-tadegg-burgundy w-4' 
                      : 'bg-tadegg-brown/30'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;