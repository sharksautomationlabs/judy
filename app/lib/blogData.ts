// Simple blog data store with persistent storage
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage?: string;
  tags: string[];
}

// In-memory blog posts store (will be loaded from file)
export let blogPosts: BlogPost[] = [];

// Initialize blog posts from storage
import { loadBlogPosts, saveBlogPosts } from './blogStorage';

// Promise to track when blog posts are loaded
let blogPostsLoaded = false;
let blogPostsPromise: Promise<void> | null = null;

// Initialize blog posts
function initializeBlogPosts(): Promise<void> {
  if (blogPostsPromise) {
    return blogPostsPromise;
  }
  
  blogPostsPromise = loadBlogPosts().then(posts => {
    blogPosts = posts;
    blogPostsLoaded = true;
    console.log('Loaded blog posts:', blogPosts.length);
  }).catch(error => {
    console.error('Failed to load blog posts:', error);
    blogPosts = [];
    blogPostsLoaded = true;
  });
  
  return blogPostsPromise;
}

// Ensure blog posts are loaded before any operation
async function ensureBlogPostsLoaded(): Promise<void> {
  if (!blogPostsLoaded) {
    await initializeBlogPosts();
  }
}

// Helper functions for blog operations
export async function addBlogPost(post: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'>): Promise<BlogPost> {
  await ensureBlogPostsLoaded();
  
  const newPost: BlogPost = {
    id: Date.now().toString(),
    title: post.title,
    content: post.content,
    excerpt: post.excerpt || post.content.substring(0, 150) + '...',
    author: post.author,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featuredImage: post.featuredImage || undefined,
    tags: post.tags || []
  };
  
  blogPosts.unshift(newPost);
  await saveBlogPosts(blogPosts);
  return newPost;
}

export async function updateBlogPost(id: string, updates: Partial<Omit<BlogPost, 'id' | 'publishedAt'>>): Promise<BlogPost | null> {
  await ensureBlogPostsLoaded();
  
  const postIndex = blogPosts.findIndex(p => p.id === id);
  if (postIndex === -1) {
    return null;
  }

  const updatedPost: BlogPost = {
    ...blogPosts[postIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  blogPosts[postIndex] = updatedPost;
  await saveBlogPosts(blogPosts);
  return updatedPost;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  await ensureBlogPostsLoaded();
  
  const postIndex = blogPosts.findIndex(p => p.id === id);
  if (postIndex === -1) {
    return false;
  }

  blogPosts.splice(postIndex, 1);
  await saveBlogPosts(blogPosts);
  return true;
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  await ensureBlogPostsLoaded();
  return blogPosts.find(p => p.id === id) || null;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  await ensureBlogPostsLoaded();
  return blogPosts;
}
