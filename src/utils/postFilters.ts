import { Post, PostFilters } from '../types';

export const filterPosts = (posts: Post[], filters: PostFilters): Post[] => {
    return posts.filter((post) => {
        if (
            filters.search &&
            !post.title.toLowerCase().includes(filters.search.toLowerCase())
        ) {
            return false;
        }

        if (
            filters.published !== undefined &&
            post.published !== filters.published
        ) {
            return false;
        }

        if (
            filters.featured !== undefined &&
            post.featured !== filters.featured
        ) {
            return false;
        }

        return true;
    });
};
