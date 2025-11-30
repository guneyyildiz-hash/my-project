import { NextRequest, NextResponse } from 'next/server';

// Video type for storage
interface StoredVideo {
  id: string;
  createdAt: string;
  publishedAt: string | null;
  [key: string]: unknown;
}

// In-memory storage for demo (would use Supabase in production)
const videos: StoredVideo[] = [];

export async function GET() {
  return NextResponse.json({ videos });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const video: StoredVideo = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      publishedAt: data.status === 'published' ? new Date().toISOString() : null,
    };

    videos.push(video);

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: 'Failed to create video' },
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

    const index = videos.findIndex((v) => v.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    videos.splice(index, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    );
  }
}
