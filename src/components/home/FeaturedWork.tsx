import Link from 'next/link';
import Container from '@/components/layout/Container';
import { Badge, Button } from '@/components/ui';
import type { Article } from '@/lib/types';

// Sample featured articles (will be replaced with real data)
const featuredArticles: Partial<Article>[] = [
  {
    id: '1',
    slug: 'turkey-energy-crisis-2024',
    title: 'Turkey\'s Energy Crisis: Navigating Regional Dynamics',
    publication: 'Forbes',
    publicationDate: '2024-01-15',
    excerpt: 'An analysis of Turkey\'s evolving energy strategy amid shifting regional alliances and global market pressures.',
    tags: ['Turkey', 'Energy', 'Geopolitics'],
    readingTime: 8,
  },
  {
    id: '2',
    slug: 'gulf-states-diplomacy-shift',
    title: 'Gulf States Embrace New Diplomatic Era',
    publication: 'BBC',
    publicationDate: '2024-01-10',
    excerpt: 'How Saudi Arabia and UAE are reshaping their foreign policy approach in the post-pandemic world.',
    tags: ['Gulf States', 'Saudi Arabia', 'UAE'],
    readingTime: 6,
  },
  {
    id: '3',
    slug: 'syria-reconstruction-challenges',
    title: 'Syria Reconstruction: Challenges and Opportunities',
    publication: 'SWP Berlin',
    publicationDate: '2024-01-05',
    excerpt: 'Examining the complex landscape of Syria\'s potential reconstruction and the role of regional powers.',
    tags: ['Syria', 'Turkey', 'Middle East'],
    readingTime: 10,
  },
];

export default function FeaturedWork() {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-charcoal mb-4">
            Featured Work
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Recent articles and analysis on Turkey, the Middle East, and international politics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 font-ui text-sm">Featured Image</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="teal">{article.publication}</Badge>
                  <span className="text-gray-400 text-sm font-ui">
                    {article.readingTime} min read
                  </span>
                </div>
                
                <h3 className="text-xl font-heading font-semibold text-charcoal mb-3 line-clamp-2">
                  <Link href={`/work/articles/${article.slug}`} className="hover:text-teal transition-colors">
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {article.tags?.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="gray" size="sm">{tag}</Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/work/articles">
            <Button variant="outline">
              View All Articles
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
