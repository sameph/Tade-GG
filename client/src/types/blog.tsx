export interface BlogPost {
  _id: string; // Changed String to lowercase string for primitive type
  slug: string; // Added based on your backend response
  title: string;
  excerpt: string;
  content: string;
  status: 'published' | 'draft';
  author: string;
  category: string;
  tags: string[];
  mainImage: {
    url: string; // Changed to object structure to match your backend
    alt?: string; // Optional alt text for accessibility
  };
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  // Optional fields that might be useful
  metaTitle?: string;
  metaDescription?: string;
  featured?: boolean;
}