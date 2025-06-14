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


