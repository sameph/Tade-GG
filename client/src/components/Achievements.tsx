import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Trophy, Award, Star, Medal, ExternalLink } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { achievements } from "./data"; // Your data import

const AchievementsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<
    (typeof achievements)[0] | null
  >(null);
  const carouselApi = useRef<any>(null);
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, playOnInit: true })
  );

  const onApiChange = useCallback((api: any) => {
    carouselApi.current = api;
    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
    autoplay.current.stop();
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
    autoplay.current.play();
  }, []);

  const handleIndicatorClick = useCallback((index: number) => {
    carouselApi.current?.scrollTo(index);
  }, []);

  const openDetailModal = useCallback(
    (achievement: (typeof achievements)[0]) => {
      setSelectedAchievement(achievement);
    },
    []
  );

  const closeDetailModal = useCallback(() => {
    setSelectedAchievement(null);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 lg:py-32 bg-gradient-to-br from-tadegg-cream/95 via-tadegg-cream/90 to-white overflow-hidden relative isolate"
      id="achievements"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Floating circles */}
        <div
          className={cn(
            "absolute top-20 -left-20 w-40 h-40 rounded-full border-[12px] border-tadegg-green/5 transition-all duration-1000",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            "animate-float"
          )}
        />
        <div
          className={cn(
            "absolute bottom-40 -right-10 w-32 h-32 rounded-full border-[8px] border-tadegg-burgundy/5 transition-all duration-1000 delay-300",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            "animate-float animation-delay-300"
          )}
        />

        {/* Coffee bean shapes */}
        <div
          className={cn(
            "absolute top-1/4 right-1/4 w-40 h-72 rounded-b-full rounded-t-full rotate-45 border-2 border-tadegg-green/10 transition-all duration-1000 delay-500",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            "animate-float animation-delay-600"
          )}
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10" />
      </div>

      <div
        className={cn(
          "container mx-auto px-4 relative z-10",
          inView ? "animate-fade-in" : ""
        )}
      >
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-tadegg-brown relative inline-block">
            <span
              className={cn(
                "relative inline-block",
                inView
                  ? "animate-text-reveal [animation-fill-mode:backwards]"
                  : "opacity-0"
              )}
            >
              Our Achievements
              <span
                className={cn(
                  "absolute -bottom-2 left-0 h-1.5 bg-tadegg-burgundy rounded-full transition-all duration-1000",
                  inView ? "w-full" : "w-0"
                )}
              />
            </span>
          </h2>
          <p
            className={cn(
              "text-lg sm:text-xl text-tadegg-brown/80 mt-4 max-w-2xl mx-auto transition-all duration-700 delay-300",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Recognized excellence in Ethiopian coffee production and export
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
              duration: 50,
            }}
            plugins={[autoplay.current]}
            className="w-full"
            setApi={onApiChange}
          >
            <CarouselContent>
              {achievements.map((achievement, index) => (
                <CarouselItem
                  key={achievement.id}
                  className="md:basis-1/2 lg:basis-1/3 pl-4 md:pl-6"
                >
                  <div
                    className="h-full group"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Card
                      className={cn(
                        "overflow-hidden border-none transition-all duration-500 h-full relative",
                        "bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-tadegg-burgundy/20",
                        "hover:scale-[1.02] transform-gpu will-change-transform",
                        "ring-1 ring-gray-200/50 hover:ring-tadegg-burgundy/30",
                        hoveredIndex === index ? "z-10" : ""
                      )}
                    >
                      {/* Image with gradient overlay */}
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                        <img
                          src={achievement.image}
                          srcSet={`${achievement.image}?w=400 400w, ${achievement.image}?w=800 800w`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          alt={achievement.title}
                          className="absolute h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                          loading="lazy"
                          decoding="async"
                        />

                        {/* Award icon */}
                        <div className="absolute top-4 right-4 z-20">
                          <div
                            className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-500",
                              achievement.color,
                              "shadow-lg group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl",
                              "group-hover:[box-shadow:0_10px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]"
                            )}
                          >
                            <achievement.icon
                              size={24}
                              className="group-hover:animate-pulse group-hover:[animation-duration:2s]"
                            />
                          </div>
                        </div>

                        {/* Year badge */}
                        <div className="absolute bottom-4 left-4 z-20">
                          <p className="text-white text-sm font-medium bg-tadegg-burgundy px-3 py-1.5 rounded-full shadow-md transition-all duration-500 group-hover:shadow-lg group-hover:translate-y-[-2px]">
                            {achievement.year}
                          </p>
                        </div>
                      </div>

                      {/* Card content */}
                      <CardHeader className="p-5 pb-0 transition-all duration-300 group-hover:pt-6">
                        <CardTitle className="text-xl font-serif font-bold tracking-tight transition-all duration-300 text-tadegg-brown group-hover:text-tadegg-burgundy">
                          {achievement.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="p-5 pt-3">
                        <CardDescription className="text-tadegg-brown/80 transition-all duration-300 group-hover:text-tadegg-brown/90 text-[15px] leading-relaxed">
                          {achievement.description}
                        </CardDescription>
                      </CardContent>

                      <CardFooter className="p-5 pt-0">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <button
                              className="flex items-center gap-1.5 text-sm font-medium transition-all duration-300 relative group text-tadegg-green hover:text-tadegg-burgundy"
                              onClick={() => openDetailModal(achievement)}
                            >
                              Learn more
                              <ExternalLink
                                size={16}
                                className="transition-all duration-300 group-hover:translate-x-1 group-hover:rotate-12"
                              />
                              <span className="absolute -bottom-0.5 left-0 h-[2px] bg-current transition-all duration-300 w-0 group-hover:w-full" />
                            </button>
                          </HoverCardTrigger>
                          <HoverCardContent
                            className="w-80 shadow-xl bg-white/95 backdrop-blur-sm border-tadegg-burgundy/20 rounded-xl overflow-hidden"
                            side="top"
                            align="start"
                          >
                            <div className="space-y-3">
                              <h4 className="text-sm font-semibold text-tadegg-brown">
                                {achievement.title}
                              </h4>
                              <p className="text-sm text-tadegg-brown/80">
                                {achievement.detail}
                              </p>
                              <div className="flex items-center pt-2 text-xs text-tadegg-burgundy/80">
                                <achievement.icon className="mr-2 h-4 w-4 opacity-70" />
                                <span>Awarded in {achievement.year}</span>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation buttons */}
            <div className="hidden sm:block">
              <CarouselPrevious className="left-0 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl -translate-x-1/2 border-none text-tadegg-burgundy hover:text-tadegg-burgundy/90 h-10 w-10" />
              <CarouselNext className="right-0 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl translate-x-1/2 border-none text-tadegg-burgundy hover:text-tadegg-burgundy/90 h-10 w-10" />
            </div>

            {/* Autoplay indicator */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium shadow-md transition-opacity duration-300 z-30 flex items-center gap-2"
              style={{ opacity: isPaused ? 1 : 0 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-tadegg-burgundy opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tadegg-burgundy" />
              </span>
              <span>Paused</span>
            </div>
          </Carousel>
        </div>

        {/* Slide indicators */}
        <div
          className={cn(
            "flex justify-center mt-12 transition-all duration-700 delay-500",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <div className="flex gap-2.5">
            {achievements.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  "relative w-3 h-3 rounded-full transition-all duration-300",
                  activeIndex === index
                    ? "bg-tadegg-burgundy scale-125"
                    : "bg-tadegg-brown/30 hover:bg-tadegg-burgundy/50",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-tadegg-burgundy/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                )}
                onClick={() => handleIndicatorClick(index)}
              >
                {activeIndex === index && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-tadegg-burgundy/40 animate-ping duration-1000" />
                    <span className="absolute -inset-2 rounded-full border border-tadegg-burgundy/30 animate-pulse duration-2000" />
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeDetailModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-auto animate-scale-in overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 md:h-56 w-full overflow-hidden">
              // For better performance, consider using optimized images:
              <img
                src={selectedAchievement.image}
                srcSet={`${selectedAchievement.image}?w=400 400w, ${selectedAchievement.image}?w=800 800w`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                alt={selectedAchievement.title}
                className="object-cover"
                loading="lazy"
                decoding="async"
              />
              {/* <Image
                src={selectedAchievement.image}
                alt={selectedAchievement.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              /> */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
              <div className="absolute bottom-4 left-4 z-20">
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl",
                    selectedAchievement.color
                  )}
                >
                  <selectedAchievement.icon size={28} />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 z-20">
                <p className="text-white text-sm font-medium bg-tadegg-burgundy px-4 py-2 rounded-full shadow-lg">
                  {selectedAchievement.year}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8 flex-1 overflow-y-auto">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-tadegg-burgundy mb-4">
                {selectedAchievement.title}
              </h3>
              <div className="space-y-4 text-tadegg-brown/90">
                <p className="text-lg leading-relaxed">
                  {selectedAchievement.description}
                </p>
                <p className="text-base leading-relaxed">
                  {selectedAchievement.detail}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex justify-end border-t border-gray-100">
              <button
                className="px-5 py-2.5 rounded-lg bg-tadegg-green text-white hover:bg-tadegg-burgundy transition-colors duration-300 flex items-center gap-2"
                onClick={closeDetailModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AchievementsSection;
