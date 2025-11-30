import type { ExtractedContent } from '../../types';

/**
 * Generic article handler
 * Uses basic HTML parsing and meta tags for content extraction
 */
export async function genericHandler(url: string): Promise<Partial<ExtractedContent>> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ContentBot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();

    // Extract metadata
    const title = extractMeta(html, 'og:title') || 
                 extractMeta(html, 'twitter:title') || 
                 extractTitle(html);
    const description = extractMeta(html, 'og:description') || 
                       extractMeta(html, 'twitter:description') ||
                       extractMeta(html, 'description');
    const image = extractMeta(html, 'og:image') || 
                 extractMeta(html, 'twitter:image');
    const publishedTime = extractMeta(html, 'article:published_time') ||
                         extractMeta(html, 'datePublished');
    const author = extractMeta(html, 'article:author') ||
                  extractMeta(html, 'author');
    const siteName = extractMeta(html, 'og:site_name');

    // Detect source from site name or URL
    const source = detectSource(url, siteName);

    // Extract content
    const content = extractArticleContent(html);

    return {
      title: title?.trim(),
      excerpt: description,
      content: cleanContent(content),
      featuredImage: image,
      publicationDate: publishedTime,
      author,
      source,
      originalUrl: url,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    console.error('Generic extraction error:', error);
    return {
      originalUrl: url,
      source: 'Other',
    };
  }
}

/**
 * Detect source from URL or site name
 */
function detectSource(url: string, siteName?: string): string {
  if (siteName) {
    if (siteName.toLowerCase().includes('swp')) return 'SWP Berlin';
    if (siteName.toLowerCase().includes('ecfr')) return 'ECFR';
    if (siteName.toLowerCase().includes('mei')) return 'MEI';
    return siteName;
  }

  const urlLower = url.toLowerCase();
  if (urlLower.includes('swp-berlin')) return 'SWP Berlin';
  if (urlLower.includes('ecfr.eu')) return 'ECFR';
  if (urlLower.includes('mei.edu')) return 'MEI';

  return 'Other';
}

/**
 * Extract meta tag content
 */
function extractMeta(html: string, property: string): string | undefined {
  // Try property attribute
  const propRegex = new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i');
  const propMatch = html.match(propRegex);
  if (propMatch) return propMatch[1];

  // Try name attribute
  const nameRegex = new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i');
  const nameMatch = html.match(nameRegex);
  if (nameMatch) return nameMatch[1];

  // Try reverse order
  const revRegex = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(property|name)=["']${property}["']`, 'i');
  const revMatch = html.match(revRegex);
  return revMatch?.[1];
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
  // Try common article selectors
  const patterns = [
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<div[^>]*class="[^"]*article[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<main[^>]*>([\s\S]*?)<\/main>/i,
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
