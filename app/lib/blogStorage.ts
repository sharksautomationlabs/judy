import { promises as fs } from 'fs';
import path from 'path';
import { BlogPost } from './blogData';

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Load blog posts from file
export async function loadBlogPosts(): Promise<BlogPost[]> {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('No existing blog data found, using default data');
    return getDefaultBlogPosts();
  }
}

// Save blog posts to file
export async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  try {
    await ensureDataDirectory();
    await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error('Failed to save blog posts:', error);
    throw error;
  }
}

// Default blog posts
function getDefaultBlogPosts(): BlogPost[] {
  return [
    {
      id: '1',
      title: 'Welcome to My Blog',
      content: 'This is my first blog post. I\'m excited to share my thoughts and experiences with you through this platform.',
      excerpt: 'This is my first blog post. I\'m excited to share my thoughts and experiences with you through this platform.',
      author: 'Judith Hobson',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      featuredImage: '/images/hero-book.jpg',
      tags: ['welcome', 'introduction']
    }
  ];
}
