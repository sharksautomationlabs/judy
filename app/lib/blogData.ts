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

// Utility function to strip HTML tags and get plain text
function stripHTML(html: string): string {
  if (!html) return '';
  // Replace HTML entities
  let text = html
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, '');
  // Replace multiple spaces with single space
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

// Utility function to extract first image from HTML content
function extractFirstImage(html: string): string | undefined {
  if (!html) return undefined;
  
  // Match img tags with src attribute
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const match = html.match(imgRegex);
  
  if (match && match[1]) {
    return match[1];
  }
  
  return undefined;
}

// Utility function to remove first image from HTML content if it matches a given URL
function removeFirstImageIfMatches(html: string, imageUrl: string): string {
  if (!html || !imageUrl) return html;
  
  // Match the first img tag and check if src matches
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const match = html.match(imgRegex);
  
  if (match && match[0] && match[1] === imageUrl) {
    // Remove the first image tag
    return html.replace(match[0], '').trim();
  }
  
  return html;
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
  
  // Validate required fields
  if (!post.title || !post.title.trim()) {
    throw new Error('Title is required');
  }
  if (!post.author || !post.author.trim()) {
    throw new Error('Author is required');
  }
  if (!post.content || !post.content.trim()) {
    throw new Error('Content is required');
  }
  
  // Check if content is just empty HTML tags
  const trimmedContent = post.content.trim();
  if (trimmedContent === '<p></p>' || trimmedContent === '<p><br></p>' || trimmedContent === '<br>' || trimmedContent === '') {
    throw new Error('Content is required. Please add some content to your blog post.');
  }
  
  const plainTextContent = stripHTML(post.content);
  // If no featured image is provided, extract first image from content
  const extractedImage = extractFirstImage(post.content);
  const featuredImage = post.featuredImage || extractedImage;
  
  // If featured image was automatically extracted from content (not manually set), remove it from content to avoid duplication
  let finalContent = post.content;
  if (featuredImage && !post.featuredImage && extractedImage === featuredImage) {
    finalContent = removeFirstImageIfMatches(post.content, featuredImage);
  }
  
  const newPost: BlogPost = {
    id: Date.now().toString(),
    title: post.title.trim(),
    content: finalContent,
    excerpt: post.excerpt || plainTextContent.substring(0, 150) + (plainTextContent.length > 150 ? '...' : ''),
    author: post.author.trim(),
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featuredImage: featuredImage || undefined,
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

  // If content is updated but excerpt is not provided, generate new excerpt
  if (updates.content && !updates.excerpt) {
    const plainTextContent = stripHTML(updates.content);
    updates.excerpt = plainTextContent.substring(0, 150) + (plainTextContent.length > 150 ? '...' : '');
  }

  // If no featured image is provided (either in updates or existing post) and content has an image, extract first image from content
  if (updates.content && !updates.featuredImage) {
    // Only extract if there's no existing featured image OR if content was updated
    if (!blogPosts[postIndex].featuredImage || updates.content !== blogPosts[postIndex].content) {
      const firstImage = extractFirstImage(updates.content);
      if (firstImage) {
        updates.featuredImage = firstImage;
        // Remove the first image from content if it's being used as featured image
        updates.content = removeFirstImageIfMatches(updates.content, firstImage);
      }
    }
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
