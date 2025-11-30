import type { ExtractedContent, ContentSource } from '../types';

/**
 * Main content ingestion pipeline
 * Detects source, extracts content, enhances with AI, and generates audio
 */
export async function ingestContent(url: string): Promise<ExtractedContent> {
  // 1. Detect source type
  const source = detectContentType(url);
  
  // 2. Extract metadata using Open Graph / meta tags
  const metadata = await extractMetadata(url);
  
  // 3. Extract content based on source
  const content = await extractContent(url, source);
  
  // 4. Enhance with AI (summaries, tags)
  const enhanced = await enhanceContent(content, metadata);
  
  // 5. Generate audio narration
  const audio = await generateAudio(enhanced.title || '', enhanced.content || '', enhanced.source || 'Other');
  
  return {
    ...metadata,
    ...content,
    ...enhanced,
    audioUrl: audio?.url,
    audioLength: audio?.duration,
  };
}

/**
 * Detect content source from URL
 */
export function detectContentType(url: string): ContentSource {
  const urlLower = url.toLowerCase();

  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
    return { type: 'video', source: 'YouTube', handler: 'youtube' };
  }
  if (urlLower.includes('vimeo.com')) {
    return { type: 'video', source: 'Vimeo', handler: 'vimeo' };
  }
  if (urlLower.includes('linkedin.com')) {
    return { type: 'video', source: 'LinkedIn', handler: 'linkedin' };
  }
  if (urlLower.includes('forbes.com')) {
    return { type: 'article', source: 'Forbes', handler: 'forbes' };
  }
  if (urlLower.includes('bbc.com') || urlLower.includes('bbc.co.uk')) {
    return { type: 'article', source: 'BBC', handler: 'bbc' };
  }
  if (urlLower.includes('swp-berlin.org')) {
    return { type: 'article', source: 'SWP Berlin', handler: 'generic' };
  }
  if (urlLower.includes('ecfr.eu')) {
    return { type: 'article', source: 'ECFR', handler: 'generic' };
  }
  if (urlLower.includes('mei.edu')) {
    return { type: 'article', source: 'MEI', handler: 'generic' };
  }

  return { type: 'article', source: 'Other', handler: 'generic' };
}

/**
 * Extract Open Graph and meta tag metadata
 */
export async function extractMetadata(url: string): Promise<Partial<ExtractedContent>> {
  // In production, this would use metascraper or similar
  // For now, return placeholder
  return {
    originalUrl: url,
    publicationDate: new Date().toISOString(),
  };
}

/**
 * Extract full content from URL
 */
export async function extractContent(url: string, source: ContentSource): Promise<Partial<ExtractedContent>> {
  // In production, this would route to the appropriate handler
  // e.g., forbes.ts, youtube.ts, generic.ts
  return {
    source: source.source,
    originalUrl: url,
  };
}

/**
 * Enhance content with AI-generated summaries and tags
 */
export async function enhanceContent(
  content: Partial<ExtractedContent>,
  metadata: Partial<ExtractedContent>
): Promise<Partial<ExtractedContent>> {
  // In production, this would use Claude API
  return {
    ...content,
    ...metadata,
    summaryBullets: [],
    tags: [],
  };
}

/**
 * Generate audio narration
 */
export async function generateAudio(
  title: string,
  content: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _source: string
): Promise<{ url: string; duration: number } | null> {
  // In production, this would use ElevenLabs API
  if (!title || !content) return null;
  
  return {
    url: '',
    duration: 0,
  };
}

/**
 * Calculate reading time based on word count
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate URL-safe slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
