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
import { motion, AnimatePresence } from 'framer-motion';

const AUTO_SCROLL_INTERVAL = 7000; // Slightly longer interval for better UX
const TRANSITION_DURATION = 1000; // For smooth animations

const AchievementsSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "center",
    duration: TRANSITION_DURATION / 1000 // Convert to seconds
  });
  const [progress, setProgress] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const progressRef = useRef<number>(0);

  // Memoized scroll handlers
  const scrollNext = useCallback(() => {
    setDirection('next');
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    setDirection('prev');
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  // Handle auto-scrolling with smooth progress animation
  useEffect(() => {
    if (!emblaApi || isPaused) return;

    let animationFrameId: number;
    let startTime: number;

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      progressRef.current = Math.min(100, (elapsed / AUTO_SCROLL_INTERVAL) * 100);
      setProgress(progressRef.current);

      if (!isPaused && elapsed < AUTO_SCROLL_INTERVAL) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    const handleAutoScroll = () => {
      scrollNext();
      startTime = 0;
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    // Clear existing interval and animation frame
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    // Initialize
    intervalRef.current = setInterval(handleAutoScroll, AUTO_SCROLL_INTERVAL);
    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [emblaApi, isPaused, scrollNext]);

  // Handle slide selection
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const newIndex = emblaApi.selectedScrollSnap();
      setActiveIndex(newIndex);
      setProgress(0);
      progressRef.current = 0;
    };

    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  const handleSlideClick = useCallback((index: number) => {
    if (!emblaApi) return;
    
    setDirection(index > activeIndex ? 'next' : 'prev');
    emblaApi.scrollTo(index);
  }, [emblaApi, activeIndex]);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
    setProgress(progressRef.current); // Keep current progress value
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Animation variants for entrance effects
  const slideVariants = {
    enter: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <motion.section
      id="achievements"
      className="relative overflow-hidden bg-gradient-to-br from-tadegg-cream/95 to-white/95 py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced decorative elements with animation */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"
        animate={{ opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-40"
        animate={{ opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 2 }}
      />
      <motion.div 
        className="absolute -left-32 top-1/3 w-96 h-96 rounded-full bg-tadegg-gold opacity-5"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute -right-20 bottom-1/4 w-96 h-96 rounded-full bg-tadegg-burgundy opacity-5"
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.05, 0.09, 0.05]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 3
        }}
      />
      <motion.div 
        className="absolute left-1/4 bottom-0 w-48 h-48 rounded-full bg-tadegg-green opacity-5"
        animate={{
          y: [0, -20, 0],
          opacity: [0.05, 0.07, 0.05]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <motion.div 
              className="h-[1px] w-12 bg-tadegg-gold"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.h4 
              className="text-tadegg-green font-serif italic tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Recognition & Excellence
            </motion.h4>
            <motion.div 
              className="h-[1px] w-12 bg-tadegg-gold"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </div>
          <motion.h2 
            className="section-title bg-clip-text text-transparent bg-gradient-to-r from-tadegg-burgundy to-tadegg-gold"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our Achievements
          </motion.h2>
          <motion.p 
            className="section-subtitle max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Celebrating our journey of excellence and recognition in the world of Ethiopian coffee.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Achievement Counter */}
          <TooltipProvider>
            <motion.div 
              className="hidden lg:flex absolute -left-4 top-1/2 transform -translate-y-1/2 flex-col items-center space-y-6 z-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {achievements.map((_, idx) => (
                <Tooltip key={idx}>
                  <TooltipTrigger asChild>
                    <motion.button
                      aria-label={`View achievement ${idx + 1}`}
                      onClick={() => handleSlideClick(idx)}
                      className={cn(
                        "w-4 h-4 rounded-full transition-all duration-300 relative",
                        activeIndex === idx 
                          ? "bg-tadegg-burgundy scale-125 shadow-lg shadow-tadegg-burgundy/20" 
                          : "bg-gray-300 hover:bg-tadegg-gold"
                      )}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {activeIndex === idx && (
                        <motion.span
                          className="absolute inset-0 rounded-full border-2 border-tadegg-gold"
                          initial={{ scale: 1.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    className="bg-white/90 backdrop-blur-sm border-tadegg-gold shadow-lg"
                  >
                    <p className="font-serif text-tadegg-burgundy">{achievements[idx].title}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </motion.div>
          </TooltipProvider>
          
          {/* Auto-scroll progress bar with animation */}
          <motion.div 
            className="max-w-md mx-auto mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Progress 
              value={progress} 
              className="h-1.5 bg-gray-200/80" 
              indicatorClassName="bg-gradient-to-r from-tadegg-burgundy to-tadegg-gold transition-all duration-300"
            />
          </motion.div>
          
          {/* Main Carousel */}
          <motion.div 
            className="w-full max-w-5xl mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                <AnimatePresence custom={direction} initial={false}>
                  {achievements.map((achievement, index) => (
                    <motion.div 
                      key={achievement.id} 
                      className="min-w-0 flex-[0_0_75%] md:flex-[0_0_80%] pl-4"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: TRANSITION_DURATION / 1000 }}
                    >
                      <div className="group relative p-1">
                        <motion.div 
                          className="overflow-hidden rounded-xl shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] bg-white"
                          whileHover={{ 
                            scale: 1.01,
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                          }}
                        >
                          {/* Image with always visible overlay text */}
                          <div className="relative overflow-hidden">
                            <AspectRatio ratio={16/9} className="bg-muted">
                              <img
                                src={achievement.image}
                                alt={achievement.title}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                loading="lazy"
                              />
                              
                              {/* Enhanced Text Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-8">
                                <motion.div 
                                  className="transform transition-transform duration-500 group-hover:translate-y-0"
                                  initial={{ y: 20 }}
                                  whileInView={{ y: 0 }}
                                  viewport={{ once: true, margin: "-50px" }}
                                  transition={{ duration: 0.6, delay: index * 0.1 + 1 }}
                                >
                                  <motion.span 
                                    className="inline-block bg-tadegg-gold/90 text-white px-4 py-1 rounded-full text-sm font-serif mb-3 shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    {achievement.year}
                                  </motion.span>
                                  <motion.h3 
                                    className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white mb-3 opacity-90 group-hover:opacity-100 drop-shadow-lg"
                                    whileHover={{ x: 5 }}
                                  >
                                    {achievement.title}
                                  </motion.h3>
                                  <motion.p 
                                    className="text-white/80 mb-4 max-w-lg text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                    whileHover={{ x: 5 }}
                                  >
                                    {achievement.description}
                                  </motion.p>
                                  
                                  {achievement.metric && (
                                    <HoverCard openDelay={0} closeDelay={200}>
                                      <HoverCardTrigger asChild>
                                        <motion.div 
                                          className="flex items-center mt-2 group/metric cursor-pointer w-fit relative z-20"
                                          whileHover={{ x: 5 }}
                                        >
                                          <span className="text-tadegg-gold font-medium text-sm md:text-base">
                                            {achievement.metric}
                                          </span>
                                          <ArrowRight className="h-4 w-4 text-tadegg-gold ml-2 transition-transform duration-300 group-hover/metric:translate-x-1" />
                                        </motion.div>
                                      </HoverCardTrigger>
                                      <HoverCardContent className="w-80 bg-white/95 backdrop-blur-sm border-tadegg-gold shadow-xl relative z-30">
                                        <div className="space-y-2">
                                          <h4 className="text-sm font-semibold text-tadegg-burgundy">About this achievement</h4>
                                          <p className="text-sm text-gray-700">
                                            This recognition highlights our commitment to excellence in the coffee industry, 
                                            setting new standards and preserving Ethiopian coffee heritage.
                                          </p>
                                        </div>
                                      </HoverCardContent>
                                    </HoverCard>
                                  )}
                                </motion.div>
                              </div>
                            </AspectRatio>
                          </div>
                        </motion.div>
                        
                        {/* Enhanced decorative elements with animation */}
                        <motion.div 
                          className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-tadegg-gold/30 backdrop-blur-sm"
                          initial={{ rotate: 45, scale: 1 }}
                          whileHover={{ rotate: 0, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div 
                          className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-tadegg-burgundy/20 backdrop-blur-sm"
                          initial={{ rotate: 45, scale: 1 }}
                          whileHover={{ rotate: 0, scale: 1.2 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        />
                        <motion.div 
                          className="absolute top-1/2 left-0 w-2 h-20 bg-gradient-to-b from-tadegg-gold/0 via-tadegg-gold/20 to-tadegg-gold/0"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div 
                          className="absolute top-1/2 right-0 w-2 h-20 bg-gradient-to-b from-tadegg-burgundy/0 via-tadegg-burgundy/20 to-tadegg-burgundy/0"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Navigation controls */}
            <motion.div 
              className="mt-8 flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <motion.button 
                onClick={scrollPrev}
                className="h-12 w-12 rounded-full bg-white shadow-md border border-tadegg-gold text-tadegg-burgundy flex items-center justify-center hover:bg-tadegg-cream transition-all duration-300"
                whileHover={{ scale: 1.1, backgroundColor: '#f8f4e6' }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous achievement"
              >
                <ArrowLeft className="h-6 w-6" />
              </motion.button>
              
              {/* Achievement Indicator */}
              <motion.div 
                className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-lg rounded-full border border-tadegg-gold/20 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-tadegg-burgundy font-serif">Achievement</span>
                <motion.span 
                  className="mx-2 text-tadegg-gold font-serif text-2xl font-bold"
                  key={activeIndex}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeIndex + 1}
                </motion.span>
                <span className="text-gray-500 font-serif">of {achievements.length}</span>
              </motion.div>
              
              <motion.button 
                onClick={scrollNext}
                className="h-12 w-12 rounded-full bg-white shadow-md border border-tadegg-gold text-tadegg-burgundy flex items-center justify-center hover:bg-tadegg-cream transition-all duration-300"
                whileHover={{ scale: 1.1, backgroundColor: '#f8f4e6' }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next achievement"
              >
                <ArrowRight className="h-6 w-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AchievementsSection;