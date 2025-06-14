import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const specialties = [
  {
    id: "Walichoo",
    name: "Walichoo",
    localName: "Walichoo (Wolisho)",
    description:
      "Welicho coffee grows in Ethiopia's highlands with deep green leaves and large purple-red cherries. Highly disease-resistant, it can produce up to three seeds per cherry in good conditions.",
    tastes: ["Floral", "Citrus", "Bergamot"],
    altitude: "1,750 - 2,200m",
    process: "Washed & Natural",
    image: "/walichoo.jpg",
  },
  {
    id: "Kumuree",
    name: "Kumuree",
    localName: "Kurume",
    description:
      "An indigenous Ethiopian heirloom with exceptional adaptability. Known for its dense, small beans (typically two per cherry) and distinctive flavor profile.",
    tastes: ["Berries", "Wine", "Caramel"],
    altitude: "1,550 - 2,200m",
    process: "Washed",
    image: "/kumure.jpg",
  },
];

const Specialties = () => {
  const [activeSpecialty, setActiveSpecialty] = useState(specialties[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleTabChange = (id: string) => {
    setActiveSpecialty(id);
  };

  const currentSpecialty = specialties.find(
    (spec) => spec.id === activeSpecialty
  )!;

  return (
    <section id="specialties" className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-tadegg-green mb-3">
            Our Specialty Coffees
          </h2>
          <p className="text-tadegg-brown/80 text-sm md:text-base">
            Ethiopia's diverse geography produces distinct regional coffee
            varieties, each with unique characteristics.
          </p>
        </div>

        {/* Mobile: Scrollable cards with arrow buttons */}
        <div className="relative md:hidden mb-6">
          {/* Scroll buttons */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md"
            onClick={() => {
              scrollRef.current?.scrollBy({
                left: -window.innerWidth * 0.8,
                behavior: "smooth",
              });
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="#3D550C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md"
            onClick={() => {
              scrollRef.current?.scrollBy({
                left: window.innerWidth * 0.8,
                behavior: "smooth",
              });
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="#3D550C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Scrollable cards */}
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-4 scrollbar-hide px-6"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%)",
            }}
          >
            {specialties.map((specialty) => (
              <div
                key={specialty.id}
                className="snap-start flex-shrink-0 w-[85vw] rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer"
                onClick={() => handleTabChange(specialty.id)}
              >
                <div className="relative h-48">
                  <img
                    src={specialty.image}
                    alt={specialty.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-serif font-semibold text-lg">
                      {specialty.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {specialty.localName}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {specialty.tastes.slice(0, 2).map((taste) => (
                      <span
                        key={taste}
                        className="bg-tadegg-green/10 text-tadegg-green px-2 py-1 rounded-full text-xs"
                      >
                        {taste}
                      </span>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-tadegg-burgundy hover:bg-tadegg-burgundy/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTabChange(specialty.id);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Tab navigation */}
        <div className="hidden md:flex overflow-x-auto gap-2 mb-8 pb-4 scrollbar-hide">
          {specialties.map((specialty) => (
            <Button
              key={specialty.id}
              variant="ghost"
              size="lg"
              className={cn(
                "flex-shrink-0 font-serif text-lg border-b-2",
                activeSpecialty === specialty.id
                  ? "border-tadegg-burgundy text-tadegg-burgundy"
                  : "border-transparent text-tadegg-brown/70 hover:text-tadegg-brown"
              )}
              onClick={() => handleTabChange(specialty.id)}
            >
              {specialty.name}
            </Button>
          ))}
        </div>

        {/* Content Area */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={currentSpecialty.image}
                alt={`${currentSpecialty.name} coffee`}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg transition-all duration-500"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm">
              <div className="flex flex-wrap gap-2">
                {currentSpecialty.tastes.map((taste) => (
                  <span
                    key={taste}
                    className="bg-tadegg-green/10 text-tadegg-green px-3 py-1 rounded-full text-sm"
                  >
                    {taste}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-tadegg-green">
                {currentSpecialty.name}
              </h3>
              <p className="text-tadegg-brown/60 italic">
                {currentSpecialty.localName}
              </p>
            </div>

            <p className="text-tadegg-brown/80 text-base md:text-lg">
              {currentSpecialty.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-tadegg-cream/30 p-4 rounded-lg">
                <h4 className="text-sm text-tadegg-brown/60 mb-1">Altitude</h4>
                <p className="font-medium text-tadegg-brown">
                  {currentSpecialty.altitude}
                </p>
              </div>
              <div className="bg-tadegg-cream/30 p-4 rounded-lg">
                <h4 className="text-sm text-tadegg-brown/60 mb-1">Process</h4>
                <p className="font-medium text-tadegg-brown">
                  {currentSpecialty.process}
                </p>
              </div>
            </div>

            <Button className="bg-tadegg-burgundy hover:bg-tadegg-burgundy/90 text-white w-full md:w-auto">
              Request Samples
            </Button>
          </div>
        </div>

        {/* Mobile: Expanded view when selected */}
        {specialties.map((specialty) => (
          <div
            key={specialty.id}
            className={cn(
              "md:hidden bg-white rounded-xl shadow-lg overflow-hidden mt-4 transition-all duration-300",
              activeSpecialty === specialty.id ? "block" : "hidden"
            )}
          >
            <div className="relative h-56">
              <img
                src={specialty.image}
                alt={specialty.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-serif font-semibold text-xl">
                  {specialty.name}
                </h3>
                <p className="text-white/80">{specialty.localName}</p>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-tadegg-brown/80">{specialty.description}</p>

              <div className="flex gap-4">
                <div className="flex-1 bg-tadegg-cream/30 p-3 rounded-lg">
                  <h4 className="text-xs text-tadegg-brown/60 mb-1">
                    Altitude
                  </h4>
                  <p className="font-medium text-tadegg-brown text-sm">
                    {specialty.altitude}
                  </p>
                </div>
                <div className="flex-1 bg-tadegg-cream/30 p-3 rounded-lg">
                  <h4 className="text-xs text-tadegg-brown/60 mb-1">Process</h4>
                  <p className="font-medium text-tadegg-brown text-sm">
                    {specialty.process}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {specialty.tastes.map((taste) => (
                  <span
                    key={taste}
                    className="bg-tadegg-green/10 text-tadegg-green px-3 py-1 rounded-full text-xs"
                  >
                    {taste}
                  </span>
                ))}
              </div>

              <Button className="bg-tadegg-burgundy hover:bg-tadegg-burgundy/90 text-white w-full">
                Request Samples
              </Button>
            </div>
          </div>
        ))}

        {/* Features Grid */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 7L12 3L4 7M20 7V17L12 21M20 7L12 11M12 21L4 17V7M12 21V11M4 7L12 11"
                    stroke="#3D550C"
                    strokeWidth="2"
                  />
                </svg>
              ),
              title: "Bulk Export",
              description:
                "Flexible packaging from 60kg bags to full containers.",
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#3D550C"
                    strokeWidth="2"
                  />
                </svg>
              ),
              title: "Quality Control",
              description: "Rigorous physical, cupping, and final inspections.",
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 17H15M9 17C7.89543 17 7 16.1046 7 15V9C7 7.89543 7.89543 7 9 7H15C16.1046 7 17 7.89543 17 9V15C17 16.1046 16.1046 17 15 17M9 17L5 21M15 17L19 21M12 12H12.01M3 3L21 21"
                    stroke="#3D550C"
                    strokeWidth="2"
                  />
                </svg>
              ),
              title: "Custom Roasting",
              description: "Tailored profiles for select partners.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-tadegg-cream/30 p-5 rounded-lg flex flex-col sm:flex-row md:flex-col gap-4"
            >
              <div className="w-10 h-10 bg-tadegg-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold mb-1 text-tadegg-green">
                  {feature.title}
                </h3>
                <p className="text-tadegg-brown/80 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialties;
