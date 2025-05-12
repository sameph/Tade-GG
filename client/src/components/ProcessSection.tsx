
import { useRef, useState } from "react";
import { Coffee, Leaf, TruckIcon, Store } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const ProcessSection = () => {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      icon: <Leaf size={32} className="text-tadegg-cream" />,
      title: "Farming & Harvesting",
      description: "Our coffee is grown in the fertile highlands of Ethiopia, where ideal climate conditions allow the beans to develop their unique flavor profile. Beans are carefully hand-picked when perfectly ripe."
    },
    {
      icon: <Coffee size={32} className="text-tadegg-cream" />,
      title: "Processing & Sorting",
      description: "The harvested coffee cherries undergo meticulous wet or dry processing methods. After processing, our coffee beans are carefully sorted to ensure only the highest quality beans make it to the final product."
    },
    {
      icon: <TruckIcon size={32} className="text-tadegg-cream" />,
      title: "Shipping & Export",
      description: "We handle all the logistics of shipping coffee beans from Ethiopia to destinations worldwide. Our direct trade relationships ensure fair prices for farmers and premium quality for customers."
    },
    {
      icon: <Store size={32} className="text-tadegg-cream" />,
      title: "Roasting & Delivery",
      description: "Partners around the world roast our beans to perfection, highlighting the unique characteristics of Ethiopian coffee. Whether you're a cafe owner or coffee enthusiast, we ensure your beans arrive fresh."
    }
  ];

  return (
    <section id="our-process" className="bg-gradient-to-b from-[#1A1F2C] to-[#2A2F3C] py-16 md:py-24 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-72 h-72 opacity-5">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="white" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.8,-0.1C89.6,16,86.7,32.1,78.7,44.9C70.7,57.7,57.7,67.3,43.5,74.4C29.3,81.5,14.7,86.1,0,86.1C-14.7,86.1,-29.3,81.4,-43.4,74.2C-57.4,67,-70.8,57.3,-78.3,44.3C-85.7,31.3,-87.2,15.7,-86.6,0.3C-86,-15,-83.4,-30,-76.6,-43.3C-69.8,-56.6,-58.9,-68.2,-45.4,-75.7C-31.9,-83.3,-15.9,-86.8,-0.2,-86.4C15.6,-86.1,31.2,-82,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-5">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="white" d="M39.2,-65.2C52.9,-60.1,67.8,-53.8,76.1,-42.5C84.5,-31.1,86.2,-15.6,83.8,-1.4C81.4,12.8,74.9,25.5,66.4,35.8C57.9,46.1,47.4,54,35.8,61.9C24.2,69.8,12.1,77.6,-0.7,78.9C-13.6,80.2,-27.1,74.9,-39,67.5C-50.9,60.1,-61.1,50.4,-69.5,38.5C-77.9,26.5,-84.4,13.3,-84.4,0C-84.4,-13.2,-77.9,-26.5,-69.8,-38.1C-61.7,-49.8,-52.1,-59.9,-40.2,-65.8C-28.3,-71.6,-14.1,-73.2,-0.3,-72.7C13.6,-72.1,27.1,-69.6,39.2,-65.2Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      {/* Animated coffee bean particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-3 h-5 opacity-20 bg-tadegg-burgundy rounded-full animate-float" 
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${4 + Math.random() * 7}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-semibold text-white mb-4">Our Process</h2>
            <p className="text-xl md:text-2xl text-white/80 mb-6">
              From the Ethiopian highlands to your cup, we ensure quality at every step
            </p>
          </div>
        </ScrollReveal>

        <div 
          ref={stepsRef} 
          className="max-w-5xl mx-auto relative"
        >
          {/* Vertical central connector */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-tadegg-burgundy/70 via-tadegg-cream/60 to-tadegg-burgundy/70 rounded-full"></div>
          
          {steps.map((step, idx) => (
            <ScrollReveal 
              key={idx} 
              direction={idx % 2 === 0 ? "left" : "right"} 
              delay={idx * 200} 
              duration={800}
              className="mb-12"
            >
              <div 
                className={`flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Step content */}
                <div className={cn(
                  "w-[45%] transition-all duration-500",
                  hoveredStep === idx ? "scale-105" : ""
                )}>
                  <div className={cn(
                    "bg-[#2A2F3C]/80 backdrop-blur-sm border rounded-xl p-6 transition-all duration-500",
                    hoveredStep === idx 
                      ? "border-tadegg-burgundy shadow-[0_0_15px_rgba(152,4,45,0.3)]" 
                      : "border-white/10"
                  )}>
                    <h3 className="text-2xl font-serif font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-lg">
                      {step.description}
                    </p>
                    
                    {/* Decorative coffee bean */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 opacity-40 rotate-45 transition-transform duration-700 group-hover:rotate-90">
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50,10 Q60,20 50,30 Q40,40 50,50 Q60,60 50,70 Q40,80 50,90" stroke="white" strokeWidth="0.5" />
                        <path d="M50,10 Q40,20 50,30 Q60,40 50,50 Q40,60 50,70 Q60,80 50,90" stroke="white" strokeWidth="0.5" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Center circle with icon */}
                <div className={cn(
                  "relative z-10 flex-shrink-0 mx-auto w-20 h-20 transition-transform duration-500",
                  hoveredStep === idx ? "scale-110" : ""
                )}>
                  <div className="w-20 h-20 bg-tadegg-burgundy rounded-full flex items-center justify-center border-2 border-tadegg-cream/30 shadow-[0_0_15px_rgba(152,4,45,0.4)]">
                    {step.icon}
                    <span className="absolute -right-1 -top-1 w-8 h-8 bg-tadegg-burgundy rounded-full flex items-center justify-center text-sm font-bold text-white animate-pulse">
                      {idx + 1}
                    </span>
                  </div>
                  
                  {/* Decorative ripple effect */}
                  <div className={cn(
                    "absolute inset-0 rounded-full border border-tadegg-burgundy/30 scale-0 opacity-0 transition-all duration-1500",
                    hoveredStep === idx ? "scale-150 opacity-0" : ""
                  )}></div>
                </div>
                
                {/* Empty div to balance layout for alternating sides */}
                <div className="w-[45%]"></div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={800}>
          <div className="mt-16 text-center">
            <div className="inline-block rounded-full border border-tadegg-burgundy px-6 py-3 text-white hover:bg-tadegg-burgundy/20 transition-colors cursor-pointer animate-bounce-subtle shine">
              <span className="text-lg font-serif">Experience the difference</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProcessSection;
