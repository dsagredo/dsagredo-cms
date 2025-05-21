export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string | null;
  updatedAt: string;
  published: boolean;
  featured: boolean;
  author: Author;
  categories: Category[];
  tags: Tag[];
  demoLink?: string;
  githubLink?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Media {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
}

export interface Stats {
  posts: number;
  views: number;
  comments: number;
  subscribers: number;
}

export type SortOrder = 'asc' | 'desc';

export type PostSortField = 'title' | 'publishedAt' | 'updatedAt';

export interface PostFilters {
  search?: string;
  category?: string;
  tag?: string;
  published?: boolean;
  featured?: boolean;
}