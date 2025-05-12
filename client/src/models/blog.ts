
export interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

export interface SanityImage {
  _type: 'image';
  asset: SanityImageAsset;
  alt?: string;
}

export interface Author {
  name: string;
  avatar?: string;
}

export interface BlogPost {
  _id: string;
  id?: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  publishedAt: string;
  date?: string;
  author: Author | string;
  mainImage: SanityImage;
  coverImage?: string;
  body: any[]; // For Portable Text format
  content?: string;
  tags: string[];
}
