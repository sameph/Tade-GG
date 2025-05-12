type Achievement = {
  id: number;
  title: string;
  description: string;
  image: string;
  year: string;
  metric?: string;
};
export const achievements: Achievement[] = [
  {
    id: 1,
    title: "International Coffee Excellence Award",
    description: "Recognized for our exceptional coffee quality and sustainable farming practices by the International Coffee Association.",
    image: "https://images.unsplash.com/photo-1581091007718-0c50d599bdf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    year: "2023",
    metric: "Top 3% of coffee producers worldwide"
  },
  {
    id: 2,
    title: "Ethiopian Heritage Preservation",
    description: "Commended for our efforts in preserving traditional Ethiopian coffee cultivation methods while supporting local communities.",
    image: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    year: "2022",
    metric: "15,000+ farmers supported"
  },
  {
    id: 3,
    title: "Sustainability Leadership Award",
    description: "Honored for implementing eco-friendly practices throughout our entire production chain, from farming to packaging.",
    image: "https://images.unsplash.com/photo-1504567961542-e24d9439a724?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    year: "2021",
    metric: "40% reduction in carbon footprint"
  },
  {
    id: 4,
    title: "Farm-to-Cup Transparency",
    description: "Recognized for our commitment to complete transparency in our supply chain, ensuring fair compensation for all involved.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    year: "2020",
    metric: "100% traceable coffee beans"
  },
  {
    id: 5,
    title: "Coffee Innovation Excellence",
    description: "Awarded for our pioneering processing techniques that enhance the natural flavors of Ethiopian coffee varieties.",
    image: "https://images.unsplash.com/photo-1599639668519-bfe581fae88b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    year: "2019",
    metric: "5 proprietary processing methods"
  },
];
