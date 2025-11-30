import { Container } from '@/components/layout';
import { ArticleHeader, SummaryBullets, ShareButtons, RelatedArticles } from '@/components/article';
import { AudioPlayer } from '@/components/audio';
import { Button } from '@/components/ui';
import Link from 'next/link';
import type { Article } from '@/lib/types';

// Sample data - will be replaced with database queries
const sampleArticle: Article = {
  id: '1',
  slug: 'turkey-energy-crisis-2024',
  title: "Turkey's Energy Crisis: Navigating Regional Dynamics",
  publication: 'Forbes',
  publicationDate: '2024-01-15',
  originalUrl: 'https://forbes.com/example',
  excerpt: 'An analysis of Turkey\'s evolving energy strategy amid shifting regional alliances and global market pressures.',
  content: `
Turkey faces a pivotal moment in its energy policy. As regional dynamics shift and global energy markets experience unprecedented volatility, Ankara must navigate complex relationships with traditional suppliers while seeking to diversify its energy sources.

## The Current Landscape

Turkey's energy dependency has long been a strategic vulnerability. With limited domestic oil and gas reserves, the country relies heavily on imports from Russia, Iran, and Azerbaijan. Recent geopolitical tensions have underscored the risks of this dependency.

## New Partnerships

In response, Turkey has been pursuing new energy partnerships. The TurkStream pipeline, while deepening ties with Russia, also positions Turkey as a key transit hub for European energy supplies. Meanwhile, exploration in the Eastern Mediterranean has opened new possibilities—and new conflicts.

## Looking Ahead

The coming years will be decisive. Turkey's energy choices will shape not only its economy but also its foreign policy orientation and regional relationships. Success will require balancing competing interests while building a more resilient and sustainable energy infrastructure.
  `,
  summaryBullets: [
    'Turkey faces growing pressure to diversify energy sources amid regional instability and market volatility',
    'The TurkStream pipeline strengthens Russia ties while positioning Turkey as a European energy hub',
    'Eastern Mediterranean gas exploration creates both opportunities and tensions with regional neighbors',
    'Energy decisions will significantly impact Turkey\'s economy and foreign policy direction in coming years'
  ],
  tags: ['Turkey', 'Energy', 'Geopolitics', 'Russia', 'Middle East'],
  featuredImage: '',
  audioUrl: '',
  audioLength: 420,
  readingTime: 8,
  status: 'published',
  createdAt: '2024-01-15',
  updatedAt: '2024-01-15',
  publishedAt: '2024-01-15',
};

const relatedArticles: Article[] = [
  {
    id: '2',
    slug: 'gulf-states-diplomacy-shift',
    title: 'Gulf States Embrace New Diplomatic Era',
    publication: 'BBC',
    publicationDate: '2024-01-10',
    originalUrl: 'https://bbc.com/...',
    excerpt: 'How Saudi Arabia and UAE are reshaping their foreign policy.',
    summaryBullets: [],
    tags: ['Gulf States'],
    featuredImage: '',
    readingTime: 6,
    status: 'published',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: '3',
    slug: 'syria-reconstruction',
    title: 'Syria Reconstruction: Challenges Ahead',
    publication: 'SWP Berlin',
    publicationDate: '2024-01-05',
    originalUrl: 'https://swp-berlin.org/...',
    excerpt: 'Examining Syria\'s reconstruction landscape.',
    summaryBullets: [],
    tags: ['Syria'],
    featuredImage: '',
    readingTime: 10,
    status: 'published',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
  {
    id: '4',
    slug: 'kurdish-politics',
    title: 'Kurdish Politics: A New Chapter',
    publication: 'ECFR',
    publicationDate: '2023-12-20',
    originalUrl: 'https://ecfr.eu/...',
    excerpt: 'Analysis of Kurdish political dynamics.',
    summaryBullets: [],
    tags: ['Kurdish Politics'],
    featuredImage: '',
    readingTime: 12,
    status: 'published',
    createdAt: '2023-12-20',
    updatedAt: '2023-12-20',
  },
];

export function generateMetadata() {
  return {
    title: `${sampleArticle.title} | Guney Yildiz`,
    description: sampleArticle.excerpt,
  };
}

export default function ArticlePage() {
  const article = sampleArticle;

  return (
    <div className="py-12">
      <Container size="narrow">
        {/* Back link */}
        <Link 
          href="/work/articles"
          className="inline-flex items-center text-gray-500 hover:text-teal mb-8 font-ui text-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Articles
        </Link>

        {/* Article Header */}
        <ArticleHeader article={article} />

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="aspect-video rounded-xl overflow-hidden mb-8">
            <img 
              src={article.featuredImage} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Audio Player */}
        {article.audioUrl && (
          <AudioPlayer 
            src={article.audioUrl} 
            title={article.title}
            duration={article.audioLength}
          />
        )}

        {/* Summary Bullets */}
        <SummaryBullets bullets={article.summaryBullets} />

        {/* Article Content */}
        {article.content ? (
          <article className="prose prose-lg max-w-none mb-8">
            <div className="whitespace-pre-line">
              {article.content}
            </div>
          </article>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center mb-8">
            <p className="text-gray-600 mb-4">
              This article is hosted on {article.publication}.
            </p>
            <a href={article.originalUrl} target="_blank" rel="noopener noreferrer">
              <Button>
                Read on {article.publication}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Button>
            </a>
          </div>
        )}

        {/* Share Buttons */}
        <div className="flex items-center justify-between py-6 border-t border-b border-gray-100 mb-8">
          <ShareButtons 
            title={article.title} 
            url={`https://guneyyildiz.co/work/articles/${article.slug}`}
          />
          <a 
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:underline font-ui text-sm"
          >
            View Original →
          </a>
        </div>

        {/* Related Articles */}
        <RelatedArticles articles={relatedArticles} />
      </Container>
    </div>
  );
}
