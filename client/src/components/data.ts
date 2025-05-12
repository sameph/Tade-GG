import { Award, Medal, Star, Trophy } from "lucide-react";

export const achievements = [
  {
    id: 1,
    title: "Specialty Coffee Association Award",
    description: "Recognized for excellence in Ethiopian coffee production and export quality standards.",
    year: "2023",
    image: "https://images.unsplash.com/photo-1587895021706-3c868a9b51f9?auto=format&fit=crop&q=80&w=2080",
    icon: Award,
    color: "bg-amber-500",
    detail: "This prestigious award recognizes our commitment to maintaining the highest standards in coffee production across all our farms in Ethiopia."
  },
  {
    id: 2,
    title: "Sustainable Farming Certification",
    description: "For implementing environmentally responsible farming practices and supporting local communities.",
    year: "2022",
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&q=80",
    icon: Star,
    color: "bg-emerald-500",
    detail: "Our sustainable farming practices ensure ecological balance while supporting over 500 local families with fair wages and educational opportunities."
  },
  {
    id: 3,
    title: "Global Export Excellence",
    description: "Recognized by the Ethiopian Coffee Exporters Association for outstanding international export performance.",
    year: "2021",
    image: "https://images.unsplash.com/photo-1580933073521-dc51f22e6b8f?auto=format&fit=crop&q=80&w=2069",
    icon: Trophy,
    color: "bg-blue-500",
    detail: "Tadegg exports premium coffee to over 30 countries worldwide, consistently meeting the highest quality standards and delivery timelines."
  },
  {
    id: 4,
    title: "Coffee Quality Champion",
    description: "First place in the national cupping competition for our Yirgacheffe coffee variety.",
    year: "2020",
    image: "https://images.unsplash.com/photo-1542834291-c514e77b215f?auto=format&fit=crop&q=80&w=1974",
    icon: Medal,
    color: "bg-rose-500",
    detail: "Our signature Yirgacheffe blend scored an exceptional 92 points out of 100 in blind taste tests conducted by international coffee experts."
  },
];
