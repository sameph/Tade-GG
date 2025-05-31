import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import axios from "axios";

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
  url: string; // e.g., "/gallery/img-123.jpg"
  alt: string;
  category: string;
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("/api/gallery", {
          params: { page: 1, limit: 30 },
        });
        if (res.data.success) {
          setImages(res.data.images);
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);
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
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">
            Experience the beauty of Ethiopian coffee regions through our
            collection of images from farms, processing centers, and the
            landscapes that make our coffee special.
          </p>
        </div>

        <div className="flex justify-center mb-8 overflow-x-auto pb-4">
          <div className="flex space-x-2">
            {categories.map((category) => (
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
          {filteredImages.map((image) => (
            <Dialog key={image._id}>
              <DialogTrigger asChild>
                <div
                  className="relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer group"
                  onClick={() => setSelectedImage(image._id)}
                >
                  <img
                    src={`${image.url}`}
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
                  src={`${image.url}`}
                  alt={image.alt}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#" className="btn-outline">
            View Full Gallery
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
