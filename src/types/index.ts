export interface Post {
    _id?: string;
    title: string;
    description: string;
    imagen: string;
    published: boolean;
    tags: Tag[];
    demoLink?: string;
    githubLink?: string;
    updatedAt: string;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
}

export interface Media {
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
