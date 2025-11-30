import { Badge } from '@/components/ui';
import type { Article } from '@/lib/types';

interface ArticleHeaderProps {
  article: Article;
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  const formattedDate = new Date(article.publicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="mb-8">
      {/* Publication & Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Badge variant="teal">{article.publication}</Badge>
        <span className="text-gray-400 text-sm font-ui">{formattedDate}</span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-400 text-sm font-ui">{article.readingTime} min read</span>
        {article.audioUrl && (
          <>
            <span className="text-gray-300">·</span>
            <span className="text-teal text-sm font-ui flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              Audio available
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-charcoal mb-4 leading-tight">
        {article.title}
      </h1>

      {/* Excerpt */}
      {article.excerpt && (
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {article.excerpt}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Badge key={tag} variant="gray">{tag}</Badge>
        ))}
      </div>
    </header>
  );
}
