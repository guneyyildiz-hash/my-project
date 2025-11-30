import type { ExtractedContent } from '../../types';

/**
 * Forbes article handler
 * Extracts content from Forbes articles
 */
export async function forbesHandler(url: string): Promise<Partial<ExtractedContent>> {
  try {
    // Fetch the page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ContentBot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Forbes article: ${response.status}`);
    }

    const html = await response.text();

    // Extract Open Graph metadata
    const title = extractMeta(html, 'og:title') || extractTitle(html);
    const description = extractMeta(html, 'og:description');
    const image = extractMeta(html, 'og:image');
    const publishedTime = extractMeta(html, 'article:published_time');
    const author = extractMeta(html, 'article:author');

    // Extract article content
    const content = extractArticleContent(html);

    return {
      title: title?.trim(),
      excerpt: description,
      content: cleanContent(content),
      featuredImage: image,
      publicationDate: publishedTime,
      author,
      source: 'Forbes',
      originalUrl: url,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    console.error('Forbes extraction error:', error);
    // Return minimal data on error
    return {
      originalUrl: url,
      source: 'Forbes',
    };
  }
}

/**
 * Extract meta tag content
 */
function extractMeta(html: string, property: string): string | undefined {
  const regex = new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i');
  const match = html.match(regex);
  
  if (match) return match[1];

  // Try alternative format
  const altRegex = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i');
  const altMatch = html.match(altRegex);
  
  return altMatch?.[1];
}

/**
 * Extract page title
 */
function extractTitle(html: string): string | undefined {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match?.[1];
}

/**
 * Extract article body content
 */
function extractArticleContent(html: string): string {
  // Try to find article body with common selectors
  const patterns = [
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<div[^>]*class="[^"]*article-body[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class="[^"]*body-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      return stripHtml(match[1]);
    }
  }

  return '';
}

/**
 * Strip HTML tags from content
 */
function stripHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Clean and normalize content
 */
function cleanContent(text: string): string {
  return text
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Calculate reading time based on word count
 */
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
