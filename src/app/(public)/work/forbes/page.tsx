import { Container } from '@/components/layout';
import { ArticleGrid } from '@/components/article';
import type { Article } from '@/lib/types';

// Sample Forbes articles
const forbesArticles: Article[] = [
  {
    id: '1',
    slug: 'turkey-energy-crisis-2024',
    title: "Turkey's Energy Crisis: Navigating Regional Dynamics",
    publication: 'Forbes',
    publicationDate: '2024-01-15',
    originalUrl: 'https://forbes.com/...',
    excerpt: 'An analysis of Turkey\'s evolving energy strategy amid shifting regional alliances.',
    summaryBullets: [],
    tags: ['Turkey', 'Energy', 'Geopolitics'],
    featuredImage: '',
    readingTime: 8,
    status: 'published',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '6',
    slug: 'qatar-world-cup-legacy',
    title: 'Qatar World Cup: Legacy and Regional Impact',
    publication: 'Forbes',
    publicationDate: '2023-12-10',
    originalUrl: 'https://forbes.com/...',
    excerpt: 'Examining the lasting effects of the 2022 World Cup on Qatar and the Gulf region.',
    summaryBullets: [],
    tags: ['Qatar', 'Gulf States', 'Sports Diplomacy'],
    featuredImage: '',
    readingTime: 7,
    status: 'published',
    createdAt: '2023-12-10',
    updatedAt: '2023-12-10',
  },
];

export const metadata = {
  title: 'Forbes Articles | Guney Yildiz',
  description: 'Forbes articles by Guney Yildiz on Turkey, Middle East, and international politics.',
};

export default function ForbesPage() {
  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-heading font-bold text-charcoal">
              Forbes
            </h1>
            <span className="px-3 py-1 bg-teal/10 text-teal text-sm font-ui rounded-full">
              {forbesArticles.length} articles
            </span>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Analysis and commentary published in Forbes covering Turkey, the Middle East, 
            energy politics, and international affairs.
          </p>
        </div>

        {/* Articles Grid */}
        <ArticleGrid articles={forbesArticles} columns={2} />
      </Container>
    </div>
  );
}
