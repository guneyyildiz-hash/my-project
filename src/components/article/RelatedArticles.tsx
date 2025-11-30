import Link from 'next/link';
import { Badge } from '@/components/ui';
import type { Article } from '@/lib/types';

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-12 pt-12 border-t border-gray-100">
      <h2 className="text-2xl font-heading font-semibold text-charcoal mb-6">
        Related Articles
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <article 
            key={article.id}
            className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow"
          >
            <Badge variant="teal" size="sm" className="mb-2">
              {article.publication}
            </Badge>
            <h3 className="font-heading font-semibold text-charcoal line-clamp-2 mb-2">
              <Link 
                href={`/work/articles/${article.slug}`}
                className="hover:text-teal transition-colors"
              >
                {article.title}
              </Link>
            </h3>
            <p className="text-sm text-gray-500 font-ui">
              {article.readingTime} min read
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
