
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    alt: "Coffee beans drying in the sun",
    category: "processing"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    alt: "Coffee plantation in the Ethiopian highlands",
    category: "farming"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
    alt: "Morning sun through coffee trees",
    category: "farming"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    alt: "Coffee cherries ripening on the branch",
    category: "farming"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    alt: "Ethiopian landscape with coffee farms",
    category: "landscape"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    alt: "Traditional coffee ceremony",
    category: "culture"
  }
];

const categories = [
  { id: "all", name: "All" },
  { id: "farming", name: "Farming" },
  { id: "processing", name: "Processing" },
  { id: "landscape", name: "Landscape" },
  { id: "culture", name: "Culture" }
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = activeCategory === "all" 
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="section-padding bg-tadegg-cream/30">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">
            Experience the beauty of Ethiopian coffee regions through our collection of images from farms, processing centers, and the landscapes that make our coffee special.
          </p>
        </div>

        <div className="flex justify-center mb-8 overflow-x-auto pb-4">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  activeCategory === category.id
                    ? "bg-tadegg-burgundy text-white"
                    : "bg-white text-tadegg-brown hover:bg-tadegg-green/10"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map(image => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <div 
                  className="relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer group"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <img
                    src={`${image.src}?auto=format&fit=crop&w=600&h=450&q=80`}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm">{image.alt}</p>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="p-0 max-w-3xl w-full bg-transparent border-none">
                <img
                  src={`${image.src}?auto=format&fit=crop&w=1200&q=90`}
                  alt={image.alt}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
