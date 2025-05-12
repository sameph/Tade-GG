
import { useQuery } from '@tanstack/react-query';
import { getBlogPosts, getBlogPostBySlug, getCategories } from '@/lib/sanity';
import type { BlogPost } from '@/models/blog';

export interface Category {
  _id: string;
  title: string;
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts,
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => getBlogPostBySlug(slug),
    enabled: !!slug,
  });
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}

// This function formats the date to a more readable format
export function formatBlogDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
