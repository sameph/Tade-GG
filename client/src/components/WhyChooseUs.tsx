import { Check } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Trusted Since 2004",
      description: "With over two decades in the coffee export industry, Tade GG has built strong relationships with global partners across Europe, North America, Asia, and the Middle East.",
    },
    {
      title: "Certified Excellence",
      description: "Our coffee has received numerous awards and certifications, highlighting our dedication to consistent quality, traceability, and integrity at every level.",
    },
    {
      title: "Eco-Friendly & Ethical",
      description: "We champion sustainability and fair labor practices, from shade-grown farms to eco-conscious processing. Every cup supports ethical sourcing and environmental care.",
    },
    {
      title: "Farm-to-Bag Traceability",
      description: "Every bean can be traced back to its origin. From altitude and region to the farmer’s story, we provide full transparency to build trust with every customer.",
    },
    {
      title: "Customizable Offerings",
      description: "Whether you are a specialty roaster or a global retailer, we tailor our offerings—bean type, roast profile, and packaging—to suit your market needs.",
    },
    {
      title: "High Elevation Grown",
      description: "Grown at altitudes above 1,800 meters, our beans develop complex flavors and vibrant acidity, showcasing the rich diversity of Ethiopia’s coffee-growing regions.",
    },
  ];

  return (
    <section id="why-choose-us" className="section-padding bg-tadegg-cream/30 relative overflow-hidden">
      {/* Decorative coffee plant background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="coffee-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M50,10 Q60,20 50,30 Q40,40 50,50 Q60,60 50,70 Q40,80 50,90" stroke="#3D550C" strokeWidth="1" fill="none" />
            <path d="M50,10 Q40,20 50,30 Q60,40 50,50 Q40,60 50,70 Q60,80 50,90" stroke="#3D550C" strokeWidth="1" fill="none" />
            <path d="M30,40 Q50,30 70,40" stroke="#3D550C" strokeWidth="1" fill="none" />
            <path d="M25,50 Q50,40 75,50" stroke="#3D550C" strokeWidth="1" fill="none" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#coffee-pattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">Why Choose Tade GG</h2>
          <p className="section-subtitle">
            Exporting Since 2004 — Partnering with the world through quality, sustainability, and traceability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 rounded-full bg-tadegg-burgundy/10 flex items-center justify-center mb-4 group-hover:bg-tadegg-burgundy/20 transition-colors">
                <Check className="w-6 h-6 text-tadegg-burgundy" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2 text-tadegg-green">
                {reason.title}
              </h3>
              <p className="text-tadegg-brown/80">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-tadegg-green/10 p-6 md:p-8 rounded-lg border border-tadegg-green/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="rounded-full overflow-hidden w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80" 
                alt="Coffee plantation"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-serif text-tadegg-green mb-3">
                Transparency You Can Taste
              </h3>
              <p className="text-tadegg-brown/80 mb-4">
                From the highlands of Ethiopia to your roastery or café, every bag tells a story. Our detailed traceability system ensures you're informed about the origin, altitude, harvest date, processing method, and farmer cooperative behind every batch.
              </p>
              <div className="flex items-center gap-2">
                <span className="block w-12 h-1 bg-tadegg-burgundy"></span>
                <p className="text-sm font-medium text-tadegg-burgundy">Verified • Certified • Trusted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
