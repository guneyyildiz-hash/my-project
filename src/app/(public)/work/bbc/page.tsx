import { Container } from '@/components/layout';
import { ArticleGrid } from '@/components/article';
import type { Article } from '@/lib/types';

// Sample BBC articles
const bbcArticles: Article[] = [
  {
    id: '2',
    slug: 'gulf-states-diplomacy-shift',
    title: 'Gulf States Embrace New Diplomatic Era',
    publication: 'BBC',
    publicationDate: '2024-01-10',
    originalUrl: 'https://bbc.com/...',
    excerpt: 'How Saudi Arabia and UAE are reshaping their foreign policy approach in the post-pandemic world.',
    summaryBullets: [],
    tags: ['Gulf States', 'Saudi Arabia', 'UAE'],
    featuredImage: '',
    readingTime: 6,
    status: 'published',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
];

export const metadata = {
  title: 'BBC Articles | Guney Yildiz',
  description: 'BBC articles and appearances by Guney Yildiz on Middle East affairs.',
};

export default function BBCPage() {
  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-heading font-bold text-charcoal">
              BBC
            </h1>
            <span className="px-3 py-1 bg-terracotta/10 text-terracotta text-sm font-ui rounded-full">
              {bbcArticles.length} articles
            </span>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Articles and expert commentary featured on BBC covering Turkey, 
            the Middle East, and international affairs.
          </p>
        </div>

        {/* Articles Grid */}
        <ArticleGrid articles={bbcArticles} columns={2} />
      </Container>
    </div>
  );
}
