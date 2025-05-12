// Mock data for blog posts
import { BlogPost } from '@/models/blog';
import { Category } from '@/hooks/useBlog';

const blogPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'The Journey of Ethiopian Coffee: From Bean to Cup',
    excerpt: 'Follow the fascinating journey of Ethiopian coffee from its origins in the highlands to your morning cup.',
    slug: 'ethiopian-coffee-journey',
    category: 'Coffee Production',
    publishedAt: '2025-03-15T08:00:00Z',
    author: 'Abebe Bekele',
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-1',
        _type: 'reference'
      },
      alt: 'Coffee beans being harvested in Ethiopia'
    },
    body: [],
    tags: ['Coffee Production', 'Ethiopian Coffee', 'Coffee History']
  },
  {
    _id: '2',
    title: 'Sustainability Practices in Ethiopian Coffee Farming',
    excerpt: 'Learn how Ethiopian coffee farmers are implementing sustainable practices to protect the environment and improve quality.',
    slug: 'sustainability-ethiopian-coffee',
    category: 'Sustainability',
    publishedAt: '2025-04-02T10:30:00Z',
    author: 'Makeda Haile',
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-2',
        _type: 'reference'
      },
      alt: 'Sustainable coffee farming in Ethiopia'
    },
    body: [],
    tags: ['Sustainability', 'Ethiopian Coffee', 'Organic Farming']
  },
  {
    _id: '3',
    title: 'The Distinctive Flavor Profiles of Different Ethiopian Coffee Regions',
    excerpt: 'Explore the unique flavor profiles from Ethiopia\'s diverse coffee-growing regions, from Yirgacheffe to Sidamo.',
    slug: 'ethiopian-coffee-flavors',
    category: 'Coffee Tasting',
    publishedAt: '2025-04-18T14:15:00Z',
    author: 'Daniel Tessema',
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-3',
        _type: 'reference'
      },
      alt: 'Coffee tasting session with Ethiopian varieties'
    },
    body: [],
    tags: ['Coffee Tasting', 'Flavor Profiles', 'Regional Varieties']
  },
  {
    _id: '4',
    title: 'The Economic Impact of Coffee Exports on Ethiopian Communities',
    excerpt: 'Discover how coffee exports have shaped Ethiopian communities and contributed to local economic development.',
    slug: 'coffee-economic-impact',
    category: 'Economy',
    publishedAt: '2025-05-01T09:45:00Z',
    author: 'Sara Negash',
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-4',
        _type: 'reference'
      },
      alt: 'Ethiopian coffee farmers at a local cooperative'
    },
    body: [],
    tags: ['Economy', 'Coffee Trade', 'Community Development']
  }
];

const categories: Category[] = [
  { _id: '1', title: 'Coffee Production' },
  { _id: '2', title: 'Sustainability' },
  { _id: '3', title: 'Coffee Tasting' },
  { _id: '4', title: 'Economy' },
  { _id: '5', title: 'Culture' }
];

// Helper function to generate placeholder image URLs
// Updated to handle width and height parameters through method chaining
export const urlFor = (source: any) => {
  // Create deterministic but different placeholder images based on the reference
  const imageId = source?.asset?._ref || 'default';
  
  // Return an object with methods to mimic Sanity's urlBuilder API
  return {
    width: (w: number) => ({
      height: (h: number) => ({
        url: () => `https://picsum.photos/seed/${imageId}/${w}/${h}`
      }),
      url: () => `https://picsum.photos/seed/${imageId}/${w}/600`
    }),
    url: () => `https://picsum.photos/seed/${imageId}/800/600`
  };
};

// Helper function to fetch blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  // Simulate network request
  return new Promise<BlogPost[]>((resolve) => {
    setTimeout(() => {
      resolve(blogPosts);
    }, 500);
  });
}

// Helper function to fetch a single blog post
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  // Simulate network request
  return new Promise<BlogPost | undefined>((resolve) => {
    setTimeout(() => {
      const post = blogPosts.find(p => p.slug === slug);
      resolve(post);
    }, 300);
  });
}

// Helper function to fetch categories
export async function getCategories(): Promise<Category[]> {
  // Simulate network request
  return new Promise<Category[]>((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 300);
  });
}
