import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import axios from "axios";

// Standardized category format (all lowercase for consistency)
const categories = [
  { id: "all", name: "All" },
  { id: "farming", name: "Farming" },
  { id: "processing", name: "Processing" },
  { id: "landscape", name: "Landscape" },
  { id: "culture", name: "Culture" },
];

type GalleryImage = {
  _id: string;
  filename: string;
  url: string; 
  alt: string;
  category: string; // This should match the 'id' values from categories
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${BASE_URL}/api/gallery`, {
          params: { page: 1, limit: 30 },
        });
        if (res.data.success) {
          // Ensure categories from API match our format
          const formattedImages = res.data.images.map((img: GalleryImage) => ({
            ...img,
            category: img.category.toLowerCase() // Convert to lowercase to match our category ids
          }));
          setImages(formattedImages);
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="section-padding bg-tadegg-cream/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">
            Experience the beauty of Ethiopian coffee regions through our
            collection of images from farms, processing centers, and the
            landscapes that make our coffee special.
          </p>
        </div>

        {/* Category filter with horizontal scrolling on mobile */}
        <div className="mb-6 md:mb-8 w-full">
          <div className="relative">
            <div className="flex space-x-2 pb-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
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
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            {/* Image grid with responsive columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredImages.map((image) => (
                <Dialog key={image._id}>
                  <DialogTrigger asChild>
                    <div
                      className="relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer group"
                      onClick={() => setSelectedImage(image._id)}
                    >
                      <img
                        src={`/api/gallery/${image.filename}`}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
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
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>

            {/* Empty state */}
            {filteredImages.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-tadegg-brown">No images found in this category.</p>
              </div>
            )}
          </>
        )}

        <div className="mt-12 md:mt-16 text-center">
          <a href="#" className="btn-outline">
            View Full Gallery
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;