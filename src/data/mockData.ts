import { Post, Tag, Media } from '../types';
import { format } from 'date-fns';

const tags: Tag[] = [
    { id: '1', name: 'React', slug: 'react' },
    { id: '2', name: 'JavaScript', slug: 'javascript' },
    { id: '3', name: 'CSS', slug: 'css' },
    { id: '4', name: 'TypeScript', slug: 'typescript' },
    { id: '5', name: 'UI/UX', slug: 'ui-ux' },
    { id: '6', name: 'Productivity', slug: 'productivity' },
];

const generatePost = (
    id: string,
    title: string,
    description: string = '',
    coverImage: string = '',
    published = true,
    daysAgo = 0
): Post => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    return {
        id,
        title,
        content:
            description ||
            `# ${title}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        excerpt:
            description?.slice(0, 150) ||
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        coverImage:
            coverImage ||
            `https://images.pexels.com/photos/${1000000 + parseInt(id)}/${
                1000000 + parseInt(id)
            }.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
        publishedAt: published ? format(date, "yyyy-MM-dd'T'HH:mm:ss") : null,
        updatedAt: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
        published,
        tags: [
            tags[parseInt(id) % tags.length],
            tags[(parseInt(id) + 1) % tags.length],
        ],
    };
};

export let posts: Post[] = [
    generatePost(
        '1',
        'Building Modern UIs with React1',
        undefined,
        '',
        true,
        2
    ),
    generatePost('2', 'TypeScript Best Practices', undefined, '', true, 5),
    generatePost('3', 'CSS Grid Layout Guide', undefined, '', true, false, 8),
    generatePost('4', 'JavaScript Fundamentals', undefined, '', true, 12),
    generatePost('5', 'Responsive Design Strategies', undefined, '', true, 15),
    generatePost(
        '6',
        'Getting Started with TailwindCSS',
        undefined,
        '',
        true,
        20
    ),
    generatePost('7', 'Advanced React Hooks', undefined, '', false, false, 0),
    generatePost('8', 'Web Performance Optimization', undefined, '', false, 0),
];

export const updatePost = (id: string, updates: Partial<Post>): Post => {
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
        throw new Error('Post not found');
    }

    const updatedPost = {
        ...posts[postIndex],
        ...updates,
        updatedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    };

    posts = [
        ...posts.slice(0, postIndex),
        updatedPost,
        ...posts.slice(postIndex + 1),
    ];

    return updatedPost;
};

export const uploadMedia = (file: File): Promise<Media> => {
    return new Promise((resolve) => {
        const newMedia: Media = {
            url: URL.createObjectURL(file),
            name: file.name,
            type: file.type,
            size: file.size,
            createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
        };
        resolve(newMedia);
    });
};

export const getAllTags = (): Tag[] => tags;
export const getAllPosts = (): Post[] => posts;
export const getPublishedPosts = (): Post[] =>
    posts.filter((post) => post.published);
