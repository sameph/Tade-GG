import { useState, useEffect, useRef } from 'react';
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [progress, setProgress] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!emblaApi || isPaused) return;

    const handleAutoScroll = () => {
      emblaApi.scrollNext();
    };

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(handleAutoScroll, AUTO_SCROLL_INTERVAL);

    let startTime = Date.now();
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / AUTO_SCROLL_INTERVAL) * 100);
      setProgress(newProgress);

      if (!isPaused && elapsed < AUTO_SCROLL_INTERVAL) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [emblaApi, activeIndex, isPaused]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
      setProgress(0);
    };

    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  const handleSlideClick = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    setIsPaused(false);
    setProgress(0);
  };

  return (
    <section 
      id="achievements" 
      className="relative overflow-hidden bg-gradient-to-br from-tadegg-cream to-white py-20"
    >
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-50"></div>

      {/* Background circles with responsive sizing */}
      <div className="absolute left-[-20vw] top-[30%] w-[60vw] h-[60vw] rounded-full bg-tadegg-gold/10 animate-pulse hidden sm:block"></div>
      <div className="absolute right-[-15vw] bottom-[25%] w-[50vw] h-[50vw] rounded-full bg-tadegg-burgundy/10 animate-pulse hidden sm:block"></div>
      <div className="absolute left-[25%] bottom-0 w-[30vw] h-[30vw] rounded-full bg-tadegg-green/10 animate-pulse hidden sm:block"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-[1px] w-12 bg-tadegg-gold"></div>
            <h4 className="text-tadegg-green font-serif italic tracking-wider">Recognition & Excellence</h4>
            <div className="h-[1px] w-12 bg-tadegg-gold"></div>
          </div>
          <h2 className="section-title bg-clip-text text-transparent bg-gradient-to-r from-tadegg-burgundy to-tadegg-gold">Our Achievements</h2>
          <p className="section-subtitle max-w-xl mx-auto text-gray-600">
            Celebrating our journey of excellence and recognition in the world of Ethiopian coffee.
          </p>
        </div>

        <div className="relative">
          <TooltipProvider>
            <div className="hidden lg:flex absolute -left-4 top-1/2 transform -translate-y-1/2 flex-col items-center space-y-6 z-10">
              {achievements.map((_, idx) => (
                <Tooltip key={idx}>
                  <TooltipTrigger asChild>
                    <button
                      aria-label={`View achievement ${idx + 1}`}
                      onClick={() => handleSlideClick(idx)}
                      className={cn(
                        "w-4 h-4 rounded-full transition-all duration-300",
                        activeIndex === idx 
                          ? "bg-tadegg-burgundy scale-125 shadow-lg shadow-tadegg-burgundy/30" 
                          : "bg-gray-300 hover:bg-tadegg-gold"
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-white/90 backdrop-blur-md border border-tadegg-gold">
                    <p className="font-serif text-sm text-tadegg-burgundy font-medium">{achievements[idx].title}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>

          <div className="max-w-md mx-auto mb-8">
            <Progress value={progress} className="h-1 bg-gray-200" 
              indicatorClassName="bg-gradient-to-r from-tadegg-burgundy to-tadegg-gold" />
          </div>

          <div 
            className="w-full max-w-5xl mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {achievements.map((achievement, index) => (
                  <div key={achievement.id} className="min-w-0 flex-[0_0_75%] md:flex-[0_0_80%] pl-4">
                    <div className="group relative p-1">
                      <div className="overflow-hidden rounded-xl shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] bg-white">
                        <div className="relative overflow-hidden">
                          <AspectRatio ratio={16/9} className="bg-muted">
                            <img
                              src={achievement.image}
                              alt={achievement.title}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-8 transition-all duration-500 group-hover:opacity-100">
                              <div className="transform transition-transform duration-500 group-hover:translate-y-0">
                                <span className="inline-block bg-tadegg-gold/90 text-white px-4 py-1 rounded-full text-sm font-serif mb-3 shadow-lg">
                                  {achievement.year}
                                </span>
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white mb-3 drop-shadow-lg">
                                  {achievement.title}
                                </h3>
                                <p className="text-white/80 text-sm md:text-base max-w-lg">
                                  {achievement.description}
                                </p>
                                {achievement.metric && (
                                  <HoverCard openDelay={0} closeDelay={200}>
                                    <HoverCardTrigger asChild>
                                      <div className="flex items-center mt-2 group/metric cursor-pointer w-fit">
                                        <span className="text-tadegg-gold font-medium text-sm md:text-base">{achievement.metric}</span>
                                        <ArrowRight className="h-4 w-4 text-tadegg-gold ml-2 transition-transform duration-300 group-hover/metric:translate-x-1" />
                                      </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-80 bg-white/95 backdrop-blur-sm border-tadegg-gold shadow-xl">
                                      <h4 className="text-sm font-semibold text-tadegg-burgundy mb-1">About this achievement</h4>
                                      <p className="text-sm">
                                        This recognition highlights our commitment to excellence in the coffee industry, preserving Ethiopian coffee heritage.
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

            <div className="mt-8 flex items-center justify-center gap-4">
              <button 
                onClick={() => emblaApi?.scrollPrev()} 
                className="h-10 w-10 rounded-full bg-white shadow-md border border-tadegg-gold text-tadegg-burgundy flex items-center justify-center hover:bg-tadegg-cream transition-all duration-300 hover:scale-110"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Previous slide</span>
              </button>
              <div className="inline-flex items-center px-6 py-2.5 bg-white/80 backdrop-blur-lg rounded-full border border-tadegg-gold/20 shadow-lg">
                <span className="text-tadegg-burgundy font-serif">Achievement</span>
                <span className="mx-2 text-tadegg-gold font-serif text-xl font-bold">{activeIndex + 1}</span>
                <span className="text-gray-500 font-serif">of {achievements.length}</span>
              </div>
              <button 
                onClick={() => emblaApi?.scrollNext()} 
                className="h-10 w-10 rounded-full bg-white shadow-md border border-tadegg-gold text-tadegg-burgundy flex items-center justify-center hover:bg-tadegg-cream transition-all duration-300 hover:scale-110"
              >
                <ArrowRight className="h-5 w-5" />
                <span className="sr-only">Next slide</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
