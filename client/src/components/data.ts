// Types
export type Achievement = {
  id: number;
  title: string;
  description: string;
  image: string;
  year: string;
  metric?: string;
};

export type GalleryItem = {
  id: number;
  src: string;
  category: string;
  alt: string;
};

// Achievements
export const achievements: Achievement[] = [
  {
    id: 1,
    title: "International Coffee Excellence Award",
    description: "Recognized for our exceptional coffee quality and sustainable farming practices by the International Coffee Association.",
    image: "/achievements/achievement_1.jpg",
    year: "2023",
    metric: "Top 3% of coffee producers worldwide",
  },
  {
    id: 2,
    title: "Ethiopian Heritage Preservation",
    description: "Commended for our efforts in preserving traditional Ethiopian coffee cultivation methods while supporting local communities.",
    image: "/achievements/achievement_2.jpg",
    year: "2022",
    metric: "15,000+ farmers supported",
  },
  {
    id: 3,
    title: "Sustainability Leadership Award",
    description: "Honored for implementing eco-friendly practices throughout our entire production chain, from farming to packaging.",
    image: "/achievements/achievement_3.jpg",
    year: "2021",
    metric: "40% reduction in carbon footprint",
  },
  {
    id: 4,
    title: "Farm-to-Cup Transparency",
    description: "Recognized for our commitment to complete transparency in our supply chain, ensuring fair compensation for all involved.",
    image: "/achievements/achievement_4.jpg",
    year: "2020",
    metric: "100% traceable coffee beans",
  },
  {
    id: 5,
    title: "Coffee Innovation Excellence",
    description: "Awarded for our pioneering processing techniques that enhance the natural flavors of Ethiopian coffee varieties.",
    image: "/achievements/achievement_5.jpg",
    year: "2019",
    metric: "5 proprietary processing methods",
  },
];

// Gallery
export const gallery: GalleryItem[] = [
  { id: 1, category: "farming", alt: "Contributions",   src: "/gallery/gallery-9.jpg" },
  { id: 2, category: "farming", alt: "Contributions",   src: "/gallery/gallery-10.jpg" },
  { id: 3, category: "landscape", alt: "contributions",   src: "/gallery/gallery-3.jpg" },
  { id: 4, category: "landscape", alt: "contributions",   src: "/gallery/gallery-4.jpg" },
  { id: 5, category: "farming", alt: "Tade gg with farmers",   src: "/gallery/gallery-5.jpg" },
  { id: 6, category: "landscape", alt: "Contributions",   src: "/gallery/gallery-6.jpg" },
  { id: 7, category: "landscape", alt: "Contributions",   src: "/gallery/gallery-7.jpg" },
  { id: 8, category: "landscape", alt: "Contributions",   src: "/gallery/gallery-8.jpg" },
  { id: 9, category: "culture", alt: "contributions",   src: "/gallery/gallery-2.jpg" },
  { id: 10, category: "landscape", alt: "Tade GG networking",   src: "/gallery/gallery-1.jpg" },
];
