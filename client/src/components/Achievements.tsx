import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from "@/components/ui/hover-card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight, ArrowLeft } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { achievements } from './data';

const AUTO_SCROLL_INTERVAL = 5000;

const AchievementsSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "center",
    breakpoints: {
      '(max-width: 768px)': { slidesToScroll: 1 }
    }
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(isPaused);

  // Check for mobile viewport
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const animateProgress = useCallback(() => {
    const startTime = Date.now();

    const step = () => {
      if (isPausedRef.current) return;

      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / AUTO_SCROLL_INTERVAL) * 100);
      setProgress(newProgress);

      if (elapsed < AUTO_SCROLL_INTERVAL) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (!emblaApi || isPaused) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTO_SCROLL_INTERVAL);

    animateProgress();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [emblaApi, activeIndex, isPaused, animateProgress]);

  useEffect(() => {
    if (!emblaApi) return;
  
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
      setProgress(0);
    };
  
    emblaApi.on('select', onSelect);
    onSelect(); // Initialize
  
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const handleSlideClick = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    setIsPaused(false);
    setProgress(0);
  };

  return (
    <section 
      id="achievements" 
      className="relative overflow-hidden bg-gradient-to-br from-tadegg-cream to-white py-12 md:py-20"
    >
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-white to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-white to-transparent opacity-50"></div>

      {/* Background circles - adjusted for mobile */}
      <div className="absolute left-[-30vw] md:left-[-20vw] top-[30%] w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] rounded-full bg-tadegg-gold/10 animate-pulse"></div>
      <div className="absolute right-[-25vw] md:right-[-15vw] bottom-[25%] w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] rounded-full bg-tadegg-burgundy/10 animate-pulse"></div>
      <div className="absolute left-[15%] md:left-[25%] bottom-0 w-[40vw] md:w-[30vw] h-[40vw] md:h-[30vw] rounded-full bg-tadegg-green/10 animate-pulse"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-[1px] w-8 md:w-12 bg-tadegg-gold"></div>
            <h4 className="text-tadegg-green font-serif italic tracking-wider text-sm md:text-base">
              Recognition & Excellence
            </h4>
            <div className="h-[1px] w-8 md:w-12 bg-tadegg-gold"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-tadegg-burgundy to-tadegg-gold mb-4">
            Our Achievements
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            Celebrating our journey of excellence in Ethiopian coffee.
          </p>
        </div>

        <div className="relative">
          {/* Desktop-only navigation dots */}
          {!isMobile && (
            <TooltipProvider>
              <div className="hidden lg:flex absolute -left-4 top-1/2 transform -translate-y-1/2 flex-col items-center space-y-6 z-10">
                {achievements.map((achievement, idx) => (
                  <Tooltip key={achievement.id}>
                    <TooltipTrigger asChild>
                      <button
                        aria-label={`View achievement ${idx + 1}`}
                        onClick={() => handleSlideClick(idx)}
                        className={cn(
                          "w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300",
                          activeIndex === idx
                            ? "bg-tadegg-burgundy scale-125 shadow-lg shadow-tadegg-burgundy/30"
                            : "bg-gray-300 hover:bg-tadegg-gold"
                        )}
                      />
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-white/90 backdrop-blur-md border border-tadegg-gold"
                    >
                      <p className="font-serif text-sm text-tadegg-burgundy font-medium">
                        {achievement.title}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          )}

          {/* Progress bar - hidden on mobile for cleaner UI */}
          {!isMobile && (
            <div className="max-w-md mx-auto mb-6 md:mb-8">
              <Progress 
                value={progress} 
                className="h-1 bg-gray-200"
                indicatorClassName="bg-gradient-to-r from-tadegg-burgundy to-tadegg-gold"
              />
            </div>
          )}

          <div 
            className="w-full max-w-4xl lg:max-w-5xl mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_75%] md:flex-[0_0_80%] pl-4">
                    <div className="group relative p-1">
                      <div className="overflow-hidden rounded-lg md:rounded-xl shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:scale-[1.01] bg-white">
                        <div className="relative overflow-hidden">
                          <AspectRatio ratio={16 / 9} className="bg-muted">
                            <img
                              src={achievement.image}
                              alt={achievement.title}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 md:from-black/85 via-black/40 md:via-black/50 to-transparent flex flex-col justify-end p-4 md:p-6 lg:p-8">
                              <div className="transform transition-transform duration-300 group-hover:translate-y-0">
                                <span className="inline-block bg-tadegg-gold/90 text-white px-3 py-1 rounded-full text-xs md:text-sm font-serif mb-2 md:mb-3 shadow">
                                  {achievement.year}
                                </span>
                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white mb-2 md:mb-3 drop-shadow">
                                  {achievement.title}
                                </h3>
                                <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-lg line-clamp-2 md:line-clamp-3">
                                  {achievement.description}
                                </p>
                                {achievement.metric && (
                                  <HoverCard openDelay={0} closeDelay={200}>
                                    <HoverCardTrigger asChild>
                                      <div className="flex items-center mt-1 md:mt-2 group/metric cursor-pointer w-fit">
                                        <span className="text-tadegg-gold font-medium text-xs md:text-sm">
                                          {achievement.metric}
                                        </span>
                                        <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-tadegg-gold ml-1 md:ml-2 transition-transform duration-300 group-hover/metric:translate-x-1" />
                                      </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-64 md:w-80 bg-white/95 backdrop-blur-sm border-tadegg-gold shadow-xl">
                                      <h4 className="text-xs md:text-sm font-semibold text-tadegg-burgundy mb-1">
                                        About this achievement
                                      </h4>
                                      <p className="text-xs md:text-sm">
                                        This recognition highlights our commitment to excellence in the coffee industry.
                                      </p>
                                    </HoverCardContent>
                                  </HoverCard>
                                )}
                              </div>
                            </div>
                          </AspectRatio>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 md:mt-8 flex items-center justify-center gap-3 md:gap-4">
              <button 
                onClick={() => emblaApi?.scrollPrev()}
                aria-label="Previous Achievement"
                className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white shadow-sm md:shadow-md border border-tadegg-gold text-tadegg-burgundy flex items-center justify-center hover:bg-tadegg-cream transition-all duration-300 hover:scale-110"
              >
                <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
              </button>

              <div className="inline-flex items-center px-4 py-1.5 md:px-6 md:py-2.5 bg-white/80 backdrop-blur-lg rounded-full border border-tadegg-gold/20 shadow-md md:shadow-lg">
                <span className="text-tadegg-burgundy font-serif text-xs md:text-sm">Achievement</span>
                <span className="mx-1 md:mx-2 text-tadegg-gold font-serif text-lg md:text-xl font-bold">{activeIndex + 1}</span>
                <span className="text-gray-500 font-serif text-xs md:text-sm">of {achievements.length}</span>
              </div>

              <button 
                onClick={() => emblaApi?.scrollNext()}
                aria-label="Next Achievement"
                className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white shadow-sm md:shadow-md border border-tadegg-gold text-tadegg-burgundy flex items-center justify-center hover:bg-tadegg-cream transition-all duration-300 hover:scale-110"
              >
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;