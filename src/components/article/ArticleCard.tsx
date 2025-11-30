import Link from 'next/link';
import { Badge } from '@/components/ui';
import type { Article } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const formattedDate = new Date(article.publicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (variant === 'compact') {
    return (
      <article className="flex gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="teal" size="sm">{article.publication}</Badge>
            <span className="text-xs text-gray-400 font-ui">{article.readingTime} min</span>
          </div>
          <h3 className="font-heading font-semibold text-charcoal line-clamp-2 mb-1">
            <Link href={`/work/articles/${article.slug}`} className="hover:text-teal transition-colors">
              {article.title}
            </Link>
          </h3>
          <p className="text-xs text-gray-500 font-ui">{formattedDate}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Featured Image */}
      {article.featuredImage ? (
        <div className="aspect-video relative">
          <img 
            src={article.featuredImage} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 font-ui text-sm">Featured Image</span>
        </div>
      )}

      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="teal">{article.publication}</Badge>
          <span className="text-gray-400 text-sm font-ui">{article.readingTime} min read</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-heading font-semibold text-charcoal mb-3 line-clamp-2">
          <Link href={`/work/articles/${article.slug}`} className="hover:text-teal transition-colors">
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="gray" size="sm">{tag}</Badge>
          ))}
        </div>

        {/* Date */}
        <p className="text-sm text-gray-500 font-ui">{formattedDate}</p>
      </div>
    </article>
  );
}
