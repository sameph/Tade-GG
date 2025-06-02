import { Coffee } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden">
              <img
                src="/coffee_image.png"
                alt="Ethiopian coffee beans"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            {/* Smaller 'Our Heritage' section */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-tadegg-green p-3 sm:p-4 rounded-lg shadow-md w-auto max-w-xs">
              <div className="flex items-center gap-2 text-white">
                <Coffee size={16} className="sm:size-20" />
                <h3 className="font-serif text-sm sm:text-base">Our Heritage</h3>
              </div>
              <p className="text-white/80 text-xs sm:text-sm">
                Ethiopia is the birthplace of coffee, and we continue this rich tradition with exceptional quality.
              </p>
            </div>
          </div>

          {/* Text Content Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 bg-tadegg-cream text-tadegg-burgundy rounded-full text-sm font-medium">
              Est. 1997
            </div>

            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">
              The Heart of Ethiopian Coffee Excellence
            </h2>

            <p className="text-base sm:text-lg text-tadegg-brown/80">
            Our coffee grows in the fertile, elevated forests of Guji — a region renowned for its rich biodiversity, heirloom varieties, and optimal climate for specialty coffee. Here, altitude, soil, and time-honored cultivation practices harmonize to produce beans of exceptional character.
            </p>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-tadegg-cream/50 p-4 rounded-lg">
                <h4 className="font-serif text-lg text-tadegg-green font-semibold mb-1">Our Mission</h4>
                <p className="text-tadegg-brown/80 text-sm sm:text-base">
                  Deliver exceptional Ethiopian coffee while supporting sustainable farming practices.
                </p>
              </div>
              <div className="bg-tadegg-cream/50 p-4 rounded-lg">
                <h4 className="font-serif text-lg text-tadegg-green font-semibold mb-1">Our Vision</h4>
                <p className="text-tadegg-brown/80 text-sm sm:text-base">
                  To be recognized globally for Ethiopian coffee excellence and ethical practices.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex items-start gap-2">
                <span className="text-3xl font-serif font-bold text-tadegg-burgundy">25+</span>
                <span className="text-sm text-tadegg-brown/70">Years of Experience</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-3xl font-serif font-bold text-tadegg-burgundy">40+</span>
                <span className="text-sm text-tadegg-brown/70">Countries Served</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-3xl font-serif font-bold text-tadegg-burgundy">5000+</span>
                <span className="text-sm text-tadegg-brown/70">Partner Farmers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
