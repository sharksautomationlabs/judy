import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, addBlogPost } from '../../lib/blogData';

// Utility function to strip HTML tags (for excerpt generation in API)
function stripHTML(html: string): string {
  if (!html) return '';
  let text = html
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  text = text.replace(/<[^>]*>/g, '');
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

const ADMIN_PASSWORD = 'judith2024';

function verifyAdminPassword(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${ADMIN_PASSWORD}`;
}

export async function GET() {
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check admin password
    if (!verifyAdminPassword(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, excerpt, author, featuredImage, tags } = body;

    // Basic validation
    if (!title || !author || !content) {
      return NextResponse.json({ error: 'Title, author, and content are required' }, { status: 400 });
    }

    const plainTextContent = stripHTML(content);
    // If no featured image is provided, extract first image from content
    // Note: addBlogPost will handle removing the duplicate from content
    const newPost = await addBlogPost({
      title,
      content,
      excerpt: excerpt || plainTextContent.substring(0, 150) + (plainTextContent.length > 150 ? '...' : ''),
      author,
      featuredImage: featuredImage || undefined,
      tags: tags || []
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
