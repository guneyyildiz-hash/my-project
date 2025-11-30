import type { ExtractedContent } from '../../types';

/**
 * YouTube video handler
 * Uses YouTube Data API to extract video metadata
 */
export async function youtubeHandler(url: string): Promise<Partial<ExtractedContent>> {
  const videoId = extractYouTubeId(url);

  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  
  if (!apiKey) {
    // Return basic info without API
    return {
      youtubeId: videoId,
      originalUrl: url,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      source: 'YouTube',
    };
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }

    const data = await response.json();
    const video = data.items?.[0];

    if (!video) {
      throw new Error('Video not found');
    }

    const duration = parseDuration(video.contentDetails.duration);

    return {
      title: video.snippet.title,
      excerpt: video.snippet.description,
      thumbnailUrl: video.snippet.thumbnails.maxres?.url || 
                   video.snippet.thumbnails.high?.url ||
                   video.snippet.thumbnails.default?.url,
      publicationDate: video.snippet.publishedAt,
      youtubeId: videoId,
      videoLength: duration,
      tags: video.snippet.tags || [],
      source: 'YouTube',
      originalUrl: url,
    };
  } catch (error) {
    console.error('YouTube API error:', error);
    // Fallback to basic info
    return {
      youtubeId: videoId,
      originalUrl: url,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      source: 'YouTube',
    };
  }
}

/**
 * Extract YouTube video ID from various URL formats
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

/**
 * Parse ISO 8601 duration to seconds
 * e.g., PT15M33S -> 933 seconds
 */
function parseDuration(isoDuration: string): number {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  
  if (!match) return 0;

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  return hours * 3600 + minutes * 60 + seconds;
}
