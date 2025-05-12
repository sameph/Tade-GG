
import { useState, useEffect } from "react";
import { MapPin, Map as MapIcon } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const MapSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Simulate map loading with slight delay for animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-tadegg-cream/20 relative overflow-hidden">
      {/* Decorative coffee bean shapes */}
      <div className="absolute top-10 left-10 opacity-10 w-40 h-40">
        <div className="w-full h-full rounded-full border-8 border-tadegg-brown animate-spin-slow"></div>
      </div>
      <div className="absolute bottom-10 right-10 opacity-10 w-20 h-20">
        <div className="w-full h-full rounded-full border-4 border-tadegg-burgundy animate-spin-slow"></div>
      </div>
      
      <div className="container mx-auto">
        <ScrollReveal direction="bottom">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="section-title">Find Us</h2>
            <p className="section-subtitle">
              Visit our headquarters in Addis Ababa, Ethiopia, the heart of coffee's origin
            </p>
          </div>
        </ScrollReveal>

        <div 
          className="rounded-lg overflow-hidden shadow-lg relative animate-fade-in hover-3d transition-all duration-500"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            transform: isHovering ? 'perspective(1000px) rotateX(2deg)' : 'perspective(1000px) rotateX(0deg)'
          }}
        >
          <div 
            className={`absolute inset-0 bg-tadegg-brown/10 backdrop-blur-sm flex items-center justify-center z-10 transition-opacity duration-700 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <div className="animate-pulse flex flex-col items-center">
              <MapIcon className="w-12 h-12 text-tadegg-burgundy mb-3" />
              <p className="text-tadegg-brown font-medium">Loading map...</p>
            </div>
          </div>

          {/* Map overlay effect */}
          <div className={`absolute inset-0 bg-gradient-to-t from-tadegg-burgundy/20 to-transparent opacity-60 z-10 transition-opacity duration-300 pointer-events-none ${isHovering ? 'opacity-30' : 'opacity-60'}`}></div>
          
          {/* Interactive pin markers */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className={`w-8 h-8 bg-tadegg-burgundy rounded-full flex items-center justify-center shadow-glow transition-transform duration-500 ${isHovering ? 'scale-125' : 'scale-100'}`}>
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="w-24 h-24 border-2 border-tadegg-burgundy rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30 animate-pulse"></div>
          </div>
          
          {/* Coffee region markers */}
          <div className="absolute top-1/3 right-1/3 z-20 pointer-events-none">
            <div className="w-6 h-6 bg-tadegg-green rounded-full shadow-md flex items-center justify-center animate-bounce-subtle">
              <MapPin className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="absolute bottom-1/3 left-1/4 z-20 pointer-events-none">
            <div className="w-6 h-6 bg-tadegg-green rounded-full shadow-md flex items-center justify-center animate-bounce-subtle animation-delay-300">
              <MapPin className="w-3 h-3 text-white" />
            </div>
          </div>

          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126175.27956481823!2d38.70784092500489!3d9.009787929516405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1685963290347!5m2!1sen!2sus" 
            width="100%" 
            height="550" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className={`w-full transition-all duration-700 ${isLoaded ? 'scale-100' : 'scale-105 blur-sm'}`}
            onLoad={() => setIsLoaded(true)}
          ></iframe>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <ScrollReveal direction="left" delay={100}>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-tadegg-burgundy/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-tadegg-burgundy" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-tadegg-green mb-1">Main Office</h3>
                  <p className="text-tadegg-brown/80">Bole Road, Addis Ababa</p>
                  <p className="text-tadegg-brown/80">Ethiopia, East Africa</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="bottom" delay={300}>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-tadegg-burgundy/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-tadegg-burgundy" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-tadegg-green mb-1">Processing Facility</h3>
                  <p className="text-tadegg-brown/80">Yirgacheffe Region</p>
                  <p className="text-tadegg-brown/80">Sidamo, Ethiopia</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right" delay={500}>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-tadegg-burgundy/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-tadegg-burgundy" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-tadegg-green mb-1">Export Center</h3>
                  <p className="text-tadegg-brown/80">Near Bole International Airport</p>
                  <p className="text-tadegg-brown/80">Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
