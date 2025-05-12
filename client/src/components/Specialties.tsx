
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const specialties = [
  {
    id: "Walichoo in the local name",
    name: "Walichoo in the local name",
    description: "Welicho coffee is a coffee variety that grows in the highlands of Ethiopia. It is also known as Wolisho. This coffee Variety has deep green leaves and the cherry is with large seed and has purple to red colour. It is highly resistant to disease, when the weather is goof you can find up to three seeds in one cherry.",
    tastes: ["Floral", "Citrus", "Bergamot"],
    altitude: "1,750 - 2,200m",
    process: "Washed & Natural",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80"
  },
  {
    id: "Kumuree",
    name: "Kumuree",
    description: "The Kurume coffee variety is an indigenous Ethiopian heirloom, originating from Ethiopia, exceptional adaptability and unique flavor profile. This variety has very dense and small beans. Most of the time in one cherry we find two beans. It is small in size.",
    tastes: ["Berries", "Wine", "Caramel"],
    altitude: "1,550 - 2,200m",
    process: "Washed",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80"
  }
];

const Specialties = () => {
  const [activeSpecialty, setActiveSpecialty] = useState(specialties[0].id);

  const handleTabChange = (id: string) => {
    setActiveSpecialty(id);
  };

  const currentSpecialty = specialties.find(spec => spec.id === activeSpecialty)!;

  return (
    <section id="specialties" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">Our Specialty Coffees</h2>
          <p className="section-subtitle">
            Ethiopia's diverse geography produces distinct regional coffee varieties, each with unique characteristics. Explore our premium coffee offerings from the birthplace of arabica.
          </p>
        </div>

        <div className="flex overflow-x-auto gap-2 mb-8 pb-4 scrollbar-hide">
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

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <div className="rounded-lg overflow-hidden">
              <img
                src={currentSpecialty.image}
                alt={`${currentSpecialty.name} coffee`}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg transition-all duration-500"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {currentSpecialty.tastes.map((taste, index) => (
                  <span
                    key={index}
                    className="bg-tadegg-green/10 text-tadegg-green px-3 py-1 rounded-full text-sm"
                  >
                    {taste}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-serif font-semibold text-tadegg-green">
              {currentSpecialty.name}
            </h3>
            
            <p className="text-lg text-tadegg-brown/80">
              {currentSpecialty.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-tadegg-cream/30 p-4 rounded-lg">
                <h4 className="text-sm text-tadegg-brown/60 mb-1">Altitude</h4>
                <p className="font-medium text-tadegg-brown">{currentSpecialty.altitude}</p>
              </div>
              <div className="bg-tadegg-cream/30 p-4 rounded-lg">
                <h4 className="text-sm text-tadegg-brown/60 mb-1">Process</h4>
                <p className="font-medium text-tadegg-brown">{currentSpecialty.process}</p>
              </div>
            </div>
            
            <Button className="bg-tadegg-burgundy hover:bg-tadegg-burgundy/90 text-white">
              Request Samples
            </Button>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-tadegg-cream/30 p-6 rounded-lg">
            <div className="w-12 h-12 bg-tadegg-green/10 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7L12 3L4 7M20 7V17L12 21M20 7L12 11M12 21L4 17V7M12 21V11M4 7L12 11" stroke="#3D550C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2 text-tadegg-green">Bulk Export</h3>
            <p className="text-tadegg-brown/80">
              We specialize in bulk exports of green coffee beans, with flexible packaging options from 60kg bags to full containers.
            </p>
          </div>
          
          <div className="bg-tadegg-cream/30 p-6 rounded-lg">
            <div className="w-12 h-12 bg-tadegg-green/10 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#3D550C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2 text-tadegg-green">Quality Control</h3>
            <p className="text-tadegg-brown/80">
              Every batch undergoes rigorous quality control through physical examination, cupping evaluation, and final inspection.
            </p>
          </div>
          
          <div className="bg-tadegg-cream/30 p-6 rounded-lg">
            <div className="w-12 h-12 bg-tadegg-green/10 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17H15M9 17C7.89543 17 7 16.1046 7 15V9C7 7.89543 7.89543 7 9 7H15C16.1046 7 17 7.89543 17 9V15C17 16.1046 16.1046 17 15 17M9 17L5 21M15 17L19 21M12 12H12.01M3 3L21 21" stroke="#3D550C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2 text-tadegg-green">Customized Roasting</h3>
            <p className="text-tadegg-brown/80">
              For select partners, we offer customized roasting profiles to showcase our coffees at their best according to your specifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specialties;
