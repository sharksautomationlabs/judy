import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, addBlogPost } from '../../lib/blogData';

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

    const newPost = await addBlogPost({
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
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
