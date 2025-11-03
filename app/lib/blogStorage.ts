import { createClient } from 'redis';
import { BlogPost } from './blogData';

const BLOG_POSTS_KEY = 'blog:posts';

// Lazy load and cache Redis client
let redisClient: Awaited<ReturnType<typeof createClient>> | null = null;
let redisClientPromise: Promise<Awaited<ReturnType<typeof createClient>>> | null = null;

async function getRedisClient() {
  // If client is already connected, return it
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  // If we're already creating a client, return that promise
  if (redisClientPromise) {
    return redisClientPromise;
  }

  // Create new client connection
  redisClientPromise = (async () => {
    try {
      const REDIS_URL = process.env.REDIS_URL;
      if (!REDIS_URL) {
        throw new Error('REDIS_URL not configured');
      }

      const client = createClient({ url: REDIS_URL });
      
      // Handle connection errors
      client.on('error', (err) => {
        console.error('Redis Client Error:', err);
        redisClient = null;
        redisClientPromise = null;
      });

      await client.connect();
      redisClient = client;
      return client;
    } catch (error) {
      redisClientPromise = null;
      throw error;
    }
  })();

  return redisClientPromise;
}

// Load blog posts from Redis storage
export async function loadBlogPosts(): Promise<BlogPost[]> {
  try {
    // Try to load from Redis if available
    const redis = await getRedisClient();
    const postsJson = await redis.get(BLOG_POSTS_KEY);
    
    if (postsJson) {
      const posts = JSON.parse(postsJson);
      if (Array.isArray(posts)) {
        return posts;
      }
    }
    // Return default posts if Redis is empty
    return getDefaultBlogPosts();
  } catch (error) {
    // If Redis is not configured (local dev or not set up), use file system as fallback
    console.log('Redis not available, trying file system fallback...');
    try {
      const { promises: fs } = await import('fs');
      const path = await import('path');
      const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (fileError) {
      console.log('File system fallback also failed, using default data');
    }
    return getDefaultBlogPosts();
  }
}

// Save blog posts to Redis storage
export async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  try {
    // Try to save to Redis if available
    const redis = await getRedisClient();
    await redis.set(BLOG_POSTS_KEY, JSON.stringify(posts));
    console.log('Blog posts saved to Redis storage');
    return;
  } catch (error) {
    // If Redis is not configured, try file system as fallback
    console.log('Redis not available, trying file system fallback...');
    try {
      const { promises: fs } = await import('fs');
      const path = await import('path');
      const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');
      const dataDir = path.dirname(DATA_FILE);
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));
      console.log('Blog posts saved to file system');
    } catch (fileError) {
      // In serverless environments, file system might be read-only
      // Log warning but don't throw - posts will remain in memory
      console.warn('Failed to save blog posts (this is expected in serverless environments without Redis):', fileError);
      // Don't throw error - allow posts to remain in memory
    }
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
