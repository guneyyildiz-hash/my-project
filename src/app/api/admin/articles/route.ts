import { NextRequest, NextResponse } from 'next/server';

// Article type for storage
interface StoredArticle {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  [key: string]: unknown;
}

// In-memory storage for demo (would use Supabase in production)
const articles: StoredArticle[] = [];

export async function GET() {
  return NextResponse.json({ articles });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const article: StoredArticle = {
      id: crypto.randomUUID(),
      slug,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: data.status === 'published' ? new Date().toISOString() : null,
    };

    articles.push(article);

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updates } = data;

    const index = articles.findIndex((a) => a.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    articles[index] = {
      ...articles[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(articles[index]);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const index = articles.findIndex((a) => a.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    articles.splice(index, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
