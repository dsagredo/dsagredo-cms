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
    tags: TagsT[];
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

export interface TagsT {
    id: string;
    name: string;
    slug: string;
}

export interface PostFilters {
    search?: string;
    category?: string;
    tag?: string;
    published?: boolean;
    featured?: boolean;
}
