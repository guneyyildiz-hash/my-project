import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Detect content type based on URL
    const contentType = detectContentType(url);

    // For demo purposes, return mock extracted content
    // In production, this would use the actual scraping/extraction logic
    const extractedContent = await mockExtractContent(url, contentType);

    return NextResponse.json(extractedContent);
  } catch (error) {
    console.error('Ingestion error:', error);
    return NextResponse.json(
      { error: 'Failed to ingest content' },
      { status: 500 }
    );
  }
}

function detectContentType(url: string): { type: string; source: string } {
  const urlLower = url.toLowerCase();

  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
    return { type: 'video', source: 'YouTube' };
  }
  if (urlLower.includes('forbes.com')) {
    return { type: 'article', source: 'Forbes' };
  }
  if (urlLower.includes('bbc.com') || urlLower.includes('bbc.co.uk')) {
    return { type: 'article', source: 'BBC' };
  }
  if (urlLower.includes('swp-berlin.org')) {
    return { type: 'article', source: 'SWP Berlin' };
  }
  if (urlLower.includes('ecfr.eu')) {
    return { type: 'article', source: 'ECFR' };
  }
  if (urlLower.includes('mei.edu')) {
    return { type: 'article', source: 'MEI' };
  }

  return { type: 'article', source: 'Other' };
}

async function mockExtractContent(url: string, contentType: { type: string; source: string }) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (contentType.type === 'video') {
    return {
      title: 'Turkey-Syria Relations: A New Chapter',
      description: 'An in-depth discussion on the evolving relationship between Turkey and Syria.',
      thumbnailUrl: '',
      publicationDate: new Date().toISOString(),
      source: contentType.source,
      originalUrl: url,
      videoLength: 2400,
      tags: ['Turkey', 'Syria', 'Middle East', 'Foreign Policy'],
      youtubeId: extractYouTubeId(url),
    };
  }

  // Article content
  return {
    title: `Analysis: Regional Dynamics in the Middle East`,
    excerpt: 'A comprehensive examination of shifting alliances and emerging trends in regional politics.',
    content: `The Middle East continues to experience significant geopolitical shifts. This analysis examines the key factors driving change in the region.

## Key Developments

Several important developments have shaped the current landscape:

1. **Shifting Alliances**: Traditional partnerships are being reevaluated as countries seek to diversify their relationships.

2. **Energy Politics**: Oil and gas continue to play a crucial role in regional dynamics.

3. **Economic Reforms**: Many countries are pursuing ambitious economic transformation programs.

## Looking Ahead

The coming months will be critical in determining the trajectory of regional politics.`,
    featuredImage: '',
    publicationDate: new Date().toISOString(),
    source: contentType.source,
    originalUrl: url,
    summaryBullets: [
      'Regional alliances are shifting as countries seek to diversify partnerships and reduce dependencies',
      'Energy politics remain central to understanding Middle Eastern geopolitics and economic relationships',
      'Economic reform programs across the region are driving significant domestic policy changes',
      'The next few months will be crucial for determining the direction of regional politics',
    ],
    tags: ['Middle East', 'Geopolitics', 'Foreign Policy', 'Analysis'],
    readingTime: 8,
    audioUrl: '',
    audioLength: 480,
  };
}

function extractYouTubeId(url: string): string | undefined {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return undefined;
}
