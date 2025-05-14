import { useRef, useState } from "react";
import { Coffee, Leaf, TruckIcon, Store } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const ProcessSection = () => {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      icon: <Leaf size={24} className="text-tadegg-cream" />,
      title: "Farming & Harvesting",
      description: "Our coffee is grown in the fertile highlands of Ethiopia, where ideal climate conditions allow the beans to develop their unique flavor profile. Beans are carefully hand-picked when perfectly ripe."
    },
    {
      icon: <Coffee size={24} className="text-tadegg-cream" />,
      title: "Processing & Sorting",
      description: "The harvested coffee cherries undergo meticulous wet or dry processing methods. After processing, our coffee beans are carefully sorted to ensure only the highest quality beans make it to the final product."
    },
    {
      icon: <TruckIcon size={24} className="text-tadegg-cream" />,
      title: "Shipping & Export",
      description: "We handle all the logistics of shipping coffee beans from Ethiopia to destinations worldwide. Our direct trade relationships ensure fair prices for farmers and premium quality for customers."
    },
    {
      icon: <Store size={24} className="text-tadegg-cream" />,
      title: "Roasting & Delivery",
      description: "Partners around the world roast our beans to perfection, highlighting the unique characteristics of Ethiopian coffee. Whether you're a cafe owner or coffee enthusiast, we ensure your beans arrive fresh."
    }
  ];

  return (
    <section id="our-process" className="bg-gradient-to-b from-[#1A1F2C] to-[#2A2F3C] py-12 md:py-24 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-72 h-72 opacity-5">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="white" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.8,-0.1C89.6,16,86.7,32.1,78.7,44.9C70.7,57.7,57.7,67.3,43.5,74.4C29.3,81.5,14.7,86.1,0,86.1C-14.7,86.1,-29.3,81.4,-43.4,74.2C-57.4,67,-70.8,57.3,-78.3,44.3C-85.7,31.3,-87.2,15.7,-86.6,0.3C-86,-15,-83.4,-30,-76.6,-43.3C-69.8,-56.6,-58.9,-68.2,-45.4,-75.7C-31.9,-83.3,-15.9,-86.8,-0.2,-86.4C15.6,-86.1,31.2,-82,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      {/* Animated coffee bean particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-3 opacity-20 bg-tadegg-burgundy rounded-full animate-float" 
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
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-semibold text-white mb-3">Our Process</h2>
            <p className="text-base md:text-xl text-white/80">
              From the Ethiopian highlands to your cup
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((step, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 150}>
              <div 
                className="relative pl-10"
                onClick={() => setActiveStep(activeStep === idx ? null : idx)}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-6 h-6 bg-tadegg-burgundy rounded-full flex items-center justify-center border-2 border-tadegg-cream/30 z-10">
                  <span className="text-xs font-bold text-white">{idx + 1}</span>
                </div>
                
                {/* Timeline line */}
                {idx !== steps.length - 1 && (
                  <div className="absolute left-3 top-7 bottom-0 w-0.5 bg-gradient-to-b from-tadegg-burgundy to-tadegg-cream/30"></div>
                )}
                
                {/* Step card */}
                <div className={cn(
                  "bg-[#2A2F3C]/80 backdrop-blur-sm border rounded-xl p-5 transition-all duration-300 overflow-hidden",
                  activeStep === idx 
                    ? "border-tadegg-burgundy shadow-[0_0_15px_rgba(152,4,45,0.3)]" 
                    : "border-white/10"
                )}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-tadegg-burgundy/30 p-2 rounded-lg">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  
                  <div className={cn(
                    "transition-all duration-300",
                    activeStep === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}>
                    <p className="text-white/70 text-sm pb-2">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Mobile toggle indicator */}
                  <div className="absolute right-4 top-4 text-white/50">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      className={cn(
                        "transition-transform duration-300",
                        activeStep === idx ? "rotate-180" : ""
                      )}
                    >
                      <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Desktop: Horizontal timeline */}
        <div 
          ref={stepsRef} 
          className="hidden md:block max-w-5xl mx-auto relative"
        >
          {/* Horizontal connector */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-tadegg-burgundy/70 via-tadegg-cream/60 to-tadegg-burgundy/70 rounded-full"></div>
          
          <div className="flex justify-between relative z-10">
            {steps.map((step, idx) => (
              <ScrollReveal 
                key={idx} 
                direction={idx % 2 === 0 ? "up" : "down"} 
                delay={idx * 200}
                className="w-[22%]"
              >
                <div 
                  className="relative group"
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Center circle with icon */}
                  <div className={cn(
                    "mx-auto mb-6 w-16 h-16 transition-transform duration-300",
                    activeStep === idx ? "scale-110" : "group-hover:scale-105"
                  )}>
                    <div className="w-full h-full bg-tadegg-burgundy rounded-full flex items-center justify-center border-2 border-tadegg-cream/30 shadow-[0_0_15px_rgba(152,4,45,0.4)]">
                      {step.icon}
                    </div>
                    <span className="absolute -right-1 -top-1 w-6 h-6 bg-tadegg-burgundy rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                  </div>
                  
                  {/* Step content */}
                  <div className={cn(
                    "bg-[#2A2F3C]/80 backdrop-blur-sm border rounded-xl p-5 transition-all duration-300",
                    activeStep === idx 
                      ? "border-tadegg-burgundy shadow-[0_0_15px_rgba(152,4,45,0.3)] scale-105" 
                      : "border-white/10 group-hover:border-tadegg-burgundy/30"
                  )}>
                    <h3 className="text-xl font-serif font-semibold text-white mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-sm text-center">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        
        <ScrollReveal delay={800}>
          <div className="mt-12 md:mt-16 text-center">
            <button className="inline-flex items-center justify-center rounded-full border border-tadegg-burgundy px-5 py-2 text-white hover:bg-tadegg-burgundy/20 transition-colors text-sm md:text-base font-serif">
              Experience the difference
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className="ml-2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProcessSection;