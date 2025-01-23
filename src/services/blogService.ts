import { DEFAULT_BLOG_IMAGE } from '../utils/blogUtils';

export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
  createdAt: string;
}

// Demo data
const demoBlogPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'Demo Blog Post 1',
    excerpt: 'This is a demo excerpt for blog post 1.',
    content: 'This is the demo content for blog post 1.',
    category: 'Demo Category',
    image: DEFAULT_BLOG_IMAGE,
    readTime: '5 min read',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Demo Blog Post 2',
    excerpt: 'This is a demo excerpt for blog post 2.',
    content: 'This is the demo content for blog post 2.',
    category: 'Demo Category',
    image: DEFAULT_BLOG_IMAGE,
    readTime: '5 min read',
    createdAt: new Date().toISOString(),
  },
];

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return demoBlogPosts;
};

export const createBlogPost = async (postData: Omit<BlogPost, '_id' | 'createdAt'>) => {
  const data = {
    ...postData,
    image: postData.image || DEFAULT_BLOG_IMAGE,
    readTime: postData.readTime || '5 min read',
    createdAt: new Date().toISOString(),
  };

  demoBlogPosts.push({ _id: (demoBlogPosts.length + 1).toString(), ...data });
  return data;
};
