
import { useEffect, useState, useRef } from "react";
import { Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
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
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      if (inView && parallaxRef.current) {
        setScrollY(window.scrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView]);
  
  return (
    <section 
      id="testimonials" 
      className="py-16 md:py-24 bg-tadegg-cream relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Parallax decorative coffee beans */}
      <div 
        ref={parallaxRef} 
        className="absolute inset-0 pointer-events-none"
      >
        <div 
          className="absolute top-10 left-10 opacity-10 w-40 h-40"
          style={{ transform: `translateY(${inView ? scrollY * 0.05 : 0}px)` }}
        >
          <div className="w-full h-full rounded-full border-8 border-tadegg-brown animate-spin-slow"></div>
        </div>
        <div 
          className="absolute bottom-10 right-10 opacity-10 w-20 h-20"
          style={{ transform: `translateY(${inView ? scrollY * -0.03 : 0}px)` }}
        >
          <div className="w-full h-full rounded-full border-4 border-tadegg-burgundy animate-spin-slow"></div>
        </div>
        
        {/* Additional decorative elements with parallax */}
        <div 
          className="absolute top-1/4 right-1/4 w-16 h-16 opacity-5"
          style={{ transform: `translateY(${inView ? scrollY * 0.07 : 0}px)` }}
        >
          <div className="w-full h-full rounded-full border-2 border-tadegg-green"></div>
        </div>
        <div 
          className="absolute bottom-1/3 left-1/3 w-24 h-24 opacity-5"
          style={{ transform: `translateY(${inView ? scrollY * -0.04 : 0}px)` }}
        >
          <div className="w-full h-full rounded-full border-2 border-tadegg-burgundy"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-tadegg-burgundy mb-6">
              What Our Partners Say
            </h2>
            <p className="text-lg text-tadegg-brown/80">
              We value the relationships we build with coffee shops, importers, and roasters around the world.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="relative max-w-4xl mx-auto">
          <ScrollReveal direction="fade" delay={300}>
            <Carousel 
              className="w-full"
              opts={{
                align: "center",
                loop: true
              }}
            >
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="md:basis-4/5">
                    <div className="bg-white rounded-xl shadow-md p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center transform transition-all duration-300 hover:shadow-xl">
                      <div className="md:w-1/3 flex justify-center">
                        <div className="relative">
                          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-tadegg-cream shadow-lg hover-3d">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <Quote 
                            className="absolute -top-4 -left-4 text-tadegg-burgundy opacity-70" 
                            size={32}
                          />
                          {/* Coffee beans decoration */}
                          <div className="absolute -bottom-2 -right-2 w-8 h-12 rounded-full border-2 border-tadegg-brown/30 rotate-45"></div>
                        </div>
                      </div>
                      
                      <div className="md:w-2/3">
                        <p className="text-lg md:text-xl italic text-tadegg-brown mb-6 relative">
                          <span className="absolute -left-2 -top-2 text-6xl text-tadegg-burgundy/10">❞</span>
                          {testimonial.quote}
                          <span className="absolute -right-2 bottom-0 text-6xl text-tadegg-burgundy/10">❝</span>
                        </p>
                        <div>
                          <h4 className="font-serif font-semibold text-xl text-tadegg-green">
                            {testimonial.name}
                          </h4>
                          <p className="text-tadegg-brown/70">
                            {testimonial.role}, <span className="font-medium">{testimonial.company}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 z-10">
                <CarouselPrevious className="h-12 w-12 rounded-full bg-white shadow-xl hover:bg-tadegg-cream hover:shadow-2xl transition-all" />
              </div>
              <div className="absolute -right-12 top-1/2 -translate-y-1/2 z-10">
                <CarouselNext className="h-12 w-12 rounded-full bg-white shadow-xl hover:bg-tadegg-cream hover:shadow-2xl transition-all" />
              </div>
            </Carousel>
            
            {/* Indicator dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === idx 
                      ? 'bg-tadegg-burgundy w-6' 
                      : 'bg-tadegg-brown/30 hover:bg-tadegg-brown/50'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
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
