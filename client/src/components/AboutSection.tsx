
import { Coffee } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80"
                alt="Ethiopian coffee beans"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-tadegg-green p-6 rounded-lg shadow-lg md:max-w-xs">
              <div className="flex items-center gap-2 text-white mb-2">
                <Coffee size={24} />
                <h3 className="font-serif text-xl">Our Heritage</h3>
              </div>
              <p className="text-white/90 text-sm">
                Ethiopia is the birthplace of coffee, and our company continues this rich tradition with exceptional quality.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-tadegg-cream text-tadegg-burgundy rounded-full">
              <span className="text-sm font-medium">Est. 1997</span>
            </div>
            
            <h2 className="section-title">The Heart of Ethiopian Coffee Excellence</h2>
            
            <p className="text-lg text-tadegg-brown/80">
              Tadegg is a premier Ethiopian coffee exporter dedicated to bringing the world's finest arabica coffee beans to international markets. Our journey began in the misty highlands of Ethiopia, the birthplace of coffee.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-tadegg-cream/50 p-6 rounded-lg">
                <h4 className="font-serif text-lg text-tadegg-green font-semibold mb-2">Our Mission</h4>
                <p className="text-tadegg-brown/80">To deliver exceptional Ethiopian coffee while supporting sustainable farming practices and fair trade relationships.</p>
              </div>
              
              <div className="bg-tadegg-cream/50 p-6 rounded-lg">
                <h4 className="font-serif text-lg text-tadegg-green font-semibold mb-2">Our Vision</h4>
                <p className="text-tadegg-brown/80">To be recognized globally as the standard-bearer for Ethiopian coffee excellence and ethical business practices.</p>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-serif font-bold text-tadegg-burgundy">25+</span>
                  <span className="text-sm text-tadegg-brown/70">Years of<br/>Experience</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-serif font-bold text-tadegg-burgundy">40+</span>
                  <span className="text-sm text-tadegg-brown/70">Countries<br/>Served</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-serif font-bold text-tadegg-burgundy">5000+</span>
                  <span className="text-sm text-tadegg-brown/70">Partner<br/>Farmers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
