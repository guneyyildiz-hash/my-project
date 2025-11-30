import { Container } from '@/components/layout';
import { ArticleGrid } from '@/components/article';
import type { Article } from '@/lib/types';

// Sample data - will be replaced with database queries
const sampleArticles: Article[] = [
  {
    id: '1',
    slug: 'turkey-energy-crisis-2024',
    title: "Turkey's Energy Crisis: Navigating Regional Dynamics",
    publication: 'Forbes',
    publicationDate: '2024-01-15',
    originalUrl: 'https://forbes.com/...',
    excerpt: 'An analysis of Turkey\'s evolving energy strategy amid shifting regional alliances and global market pressures.',
    summaryBullets: [],
    tags: ['Turkey', 'Energy', 'Geopolitics'],
    featuredImage: '',
    readingTime: 8,
    status: 'published',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
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
  {
    id: '3',
    slug: 'syria-reconstruction-challenges',
    title: 'Syria Reconstruction: Challenges and Opportunities',
    publication: 'SWP Berlin',
    publicationDate: '2024-01-05',
    originalUrl: 'https://swp-berlin.org/...',
    excerpt: 'Examining the complex landscape of Syria\'s potential reconstruction and the role of regional powers.',
    summaryBullets: [],
    tags: ['Syria', 'Turkey', 'Middle East'],
    featuredImage: '',
    readingTime: 10,
    status: 'published',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
  {
    id: '4',
    slug: 'kurdish-politics-new-chapter',
    title: 'Kurdish Politics: A New Chapter',
    publication: 'ECFR',
    publicationDate: '2023-12-20',
    originalUrl: 'https://ecfr.eu/...',
    excerpt: 'Analysis of evolving Kurdish political dynamics in Turkey, Syria, and Iraq.',
    summaryBullets: [],
    tags: ['Kurdish Politics', 'Turkey', 'Syria', 'Iraq'],
    featuredImage: '',
    readingTime: 12,
    status: 'published',
    createdAt: '2023-12-20',
    updatedAt: '2023-12-20',
  },
  {
    id: '5',
    slug: 'iran-regional-influence',
    title: 'Iran\'s Regional Influence: Assessment and Outlook',
    publication: 'MEI',
    publicationDate: '2023-12-15',
    originalUrl: 'https://mei.edu/...',
    excerpt: 'A comprehensive look at Iran\'s strategic positioning across the Middle East.',
    summaryBullets: [],
    tags: ['Iran', 'Middle East', 'Geopolitics'],
    featuredImage: '',
    readingTime: 9,
    status: 'published',
    createdAt: '2023-12-15',
    updatedAt: '2023-12-15',
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
  title: 'Articles | Guney Yildiz',
  description: 'Articles and analysis on Turkey, Middle East, and Gulf politics by Guney Yildiz.',
};

export default function ArticlesPage() {
  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-charcoal mb-4">
            Articles
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Analysis and commentary on Turkey, the Middle East, Gulf politics, and international relations.
          </p>
        </div>

        {/* Articles Grid */}
        <ArticleGrid articles={sampleArticles} />
      </Container>
    </div>
  );
}
