// lib/types.ts

export type PublicationType = 'Forbes' | 'BBC' | 'SWP Berlin' | 'ECFR' | 'MEI' | 'Other';
export type ArticleStatus = 'draft' | 'published' | 'archived';
export type VideoCategory = 'interview' | 'panel' | 'analysis' | 'conference';
export type VideoStatus = 'draft' | 'published';

export interface Article {
  id: string;
  slug: string;
  title: string;
  publication: PublicationType;
  publicationDate: string;
  originalUrl: string;
  excerpt: string;
  content?: string;
  summaryBullets: string[];
  tags: string[];
  featuredImage: string;
  screenshots?: string[];
  audioUrl?: string;
  audioLength?: number;
  readingTime: number;
  status: ArticleStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId?: string;
  youtubeUrl?: string;
  thumbnailUrl: string;
  eventName: string;
  eventDate: string;
  videoLength: number;
  category: VideoCategory;
  tags: string[];
  status: VideoStatus;
  createdAt: string;
  publishedAt?: string;
}

export interface ExtractedContent {
  title: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  thumbnailUrl?: string;
  publicationDate?: string;
  author?: string;
  source: string;
  originalUrl: string;
  summaryBullets?: string[];
  tags: string[];
  audioUrl?: string;
  audioLength?: number;
  readingTime?: number;
  videoLength?: number;
  screenshots?: string[];
  youtubeId?: string;
}

export interface ContentSource {
  type: 'article' | 'video';
  source: PublicationType | 'YouTube' | 'Vimeo' | 'LinkedIn';
  handler: string;
}

export interface FilterOptions {
  publications?: string[];
  tags?: string[];
  years?: number[];
  searchQuery?: string;
  sortBy?: 'latest' | 'oldest' | 'relevant';
}

export interface IngestionLog {
  id: string;
  url: string;
  sourceType: 'article' | 'video';
  source: string;
  status: 'success' | 'failed' | 'partial';
  errorMessage?: string;
  extractedData?: ExtractedContent;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  message: string;
  type: 'media' | 'speaking' | 'consultation';
}

export interface NewsletterSignupData {
  email: string;
  firstName?: string;
  lastName?: string;
}
