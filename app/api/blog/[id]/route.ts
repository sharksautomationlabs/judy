import { NextRequest, NextResponse } from 'next/server';
import { getBlogPost, updateBlogPost, deleteBlogPost } from '../../../lib/blogData';

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
  
  // Match img tags with src attribute (handles both single and double quotes, and base64)
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

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const post = await getBlogPost(id);
    
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error('API: Error fetching blog post:', error);
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check admin password
    if (!verifyAdminPassword(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, content, excerpt, author, featuredImage, tags } = body;

    // Basic validation
    if (!title || !author || !content) {
      return NextResponse.json({ error: 'Title, author, and content are required' }, { status: 400 });
    }

    const plainTextContent = stripHTML(content);
    // If no featured image is provided, extractFirstImage will be called in updateBlogPost
    // Only extract if there's no existing featured image
    
    const updatedPost = await updateBlogPost(id, {
      title,
      content,
      excerpt: excerpt || plainTextContent.substring(0, 150) + (plainTextContent.length > 150 ? '...' : ''),
      author,
      featuredImage: featuredImage || undefined,
      tags: tags || []
    });

    if (!updatedPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check admin password
    if (!verifyAdminPassword(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const success = await deleteBlogPost(id);
    if (!success) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
