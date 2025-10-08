import { Post, Author, Category, Tag, Media, Stats } from '../types';
import { format } from 'date-fns';

const author: Author = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  bio: 'Full-stack developer and technical writer.'
};

const categories: Category[] = [
  { id: '1', name: 'Web Development', slug: 'web-development' },
  { id: '2', name: 'Design', slug: 'design' },
  { id: '3', name: 'Technology', slug: 'technology' },
  { id: '4', name: 'Career', slug: 'career' }
];

const tags: Tag[] = [
  { id: '1', name: 'React', slug: 'react' },
  { id: '2', name: 'JavaScript', slug: 'javascript' },
  { id: '3', name: 'CSS', slug: 'css' },
  { id: '4', name: 'TypeScript', slug: 'typescript' },
  { id: '5', name: 'UI/UX', slug: 'ui-ux' },
  { id: '6', name: 'Productivity', slug: 'productivity' }
];

const generatePost = (
  id: string,
  title: string,
  content: string = '',
  coverImage: string = '',
  published = true,
  featured = false,
  daysAgo = 0
): Post => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  
  return {
    id,
    title,
    slug: title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-'),
    content: content || `# ${title}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    excerpt: content?.slice(0, 150) || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    coverImage: coverImage || `https://images.pexels.com/photos/${1000000 + parseInt(id)}/${1000000 + parseInt(id)}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
    publishedAt: published ? format(date, 'yyyy-MM-dd\'T\'HH:mm:ss') : null,
    updatedAt: format(date, 'yyyy-MM-dd\'T\'HH:mm:ss'),
    published,
    featured,
    author,
    categories: [categories[parseInt(id) % categories.length]],
    tags: [
      tags[parseInt(id) % tags.length],
      tags[(parseInt(id) + 1) % tags.length]
    ]
  };
};

export let posts: Post[] = [
  generatePost('1', 'Building Modern UIs with React', undefined, 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', true, true, 2),
  generatePost('2', 'TypeScript Best Practices', undefined, 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', true, false, 5),
  generatePost('3', 'CSS Grid Layout Guide', undefined, 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', true, false, 8),
  generatePost('4', 'JavaScript Fundamentals', undefined, 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', true, false, 12),
  generatePost('5', 'Responsive Design Strategies', undefined, 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', true, true, 15),
  generatePost('6', 'Getting Started with TailwindCSS', undefined, 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', true, false, 20),
  generatePost('7', 'Advanced React Hooks', undefined, 'https://images.pexels.com/photos/2740956/pexels-photo-2740956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', false, false, 0),
  generatePost('8', 'Web Performance Optimization', undefined, 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', false, false, 0)
];

export let media: Media[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'computer-code.jpg',
    type: 'image/jpeg',
    size: 102400,
    createdAt: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss')
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'workspace.jpg',
    type: 'image/jpeg',
    size: 153600,
    createdAt: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss')
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'web-design.jpg',
    type: 'image/jpeg',
    size: 204800,
    createdAt: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss')
  }
];

export const stats: Stats = {
  posts: posts.length,
  views: 1205,
  comments: 48,
  subscribers: 92
};

export const createPost = (title: string, content: string, coverImage?: string): Post => {
  const newId = String(posts.length + 1);
  const newPost = generatePost(newId, title, content, coverImage, false, false, 0);
  posts = [...posts, newPost];
  return newPost;
};

export const updatePost = (id: string, updates: Partial<Post>): Post => {
  const postIndex = posts.findIndex(post => post.id === id);
  if (postIndex === -1) {
    throw new Error('Post not found');
  }

  const updatedPost = {
    ...posts[postIndex],
    ...updates,
    updatedAt: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss')
  };

  posts = [
    ...posts.slice(0, postIndex),
    updatedPost,
    ...posts.slice(postIndex + 1)
  ];

  return updatedPost;
};

export const deletePost = (id: string): void => {
  const postIndex = posts.findIndex(post => post.id === id);
  if (postIndex === -1) {
    throw new Error('Post not found');
  }

  posts = [
    ...posts.slice(0, postIndex),
    ...posts.slice(postIndex + 1)
  ];
};

export const uploadMedia = (file: File): Promise<Media> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const newMedia: Media = {
        id: String(media.length + 1),
        url: reader.result as string,
        name: file.name,
        type: file.type,
        size: file.size,
        createdAt: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss')
      };
      media = [...media, newMedia];
      resolve(newMedia);
    };
    reader.readAsDataURL(file);
  });
};

export const getAllCategories = (): Category[] => categories;
export const getAllTags = (): Tag[] => tags;
export const getAllPosts = (): Post[] => posts;
export const getPublishedPosts = (): Post[] => posts.filter(post => post.published);
export const getFeaturedPosts = (): Post[] => posts.filter(post => post.featured);
export const getPostById = (id: string): Post | undefined => posts.find(post => post.id === id);
export const getAllMedia = (): Media[] => media;
export const getSiteStats = (): Stats => stats;