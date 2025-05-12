
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Coffee } from "lucide-react";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to a server
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll be in touch soon.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <h2 className="section-title">Get In Touch</h2>
              <p className="section-subtitle">
                Interested in our premium Ethiopian coffee offerings? Contact us today to discuss how Tadegg can meet your coffee sourcing needs.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-tadegg-burgundy/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-tadegg-burgundy" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-tadegg-green mb-1">Email Us</h3>
                  <p className="text-tadegg-brown/80">info@tadegg.com</p>
                  <p className="text-tadegg-brown/80">sales@tadegg.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-tadegg-burgundy/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-tadegg-burgundy" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-tadegg-green mb-1">Call Us</h3>
                  <p className="text-tadegg-brown/80">+251 111 234 567</p>
                  <p className="text-tadegg-brown/80">+251 911 123 456 (Mobile)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-tadegg-burgundy/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-tadegg-burgundy" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-tadegg-green mb-1">Visit Us</h3>
                  <p className="text-tadegg-brown/80">Bole Road, Addis Ababa</p>
                  <p className="text-tadegg-brown/80">Ethiopia, East Africa</p>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center gap-4">
                  <Coffee className="text-tadegg-burgundy" />
                  <p className="text-tadegg-brown/90 italic">
                    "Ethiopia: Where every coffee journey begins."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-tadegg-cream/30 p-6 md:p-8 rounded-lg">
              <h3 className="text-2xl font-serif text-tadegg-green mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-tadegg-brown mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                    className="bg-white border-tadegg-brown/20 focus-visible:ring-tadegg-green"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-tadegg-brown mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-white border-tadegg-brown/20 focus-visible:ring-tadegg-green"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-tadegg-brown mb-1">
                    Company
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="bg-white border-tadegg-brown/20 focus-visible:ring-tadegg-green"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-tadegg-brown mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your coffee needs..."
                    required
                    className="bg-white border-tadegg-brown/20 focus-visible:ring-tadegg-green min-h-[120px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-tadegg-burgundy hover:bg-tadegg-burgundy/90 text-white"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
