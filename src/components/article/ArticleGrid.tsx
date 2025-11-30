import ArticleCard from './ArticleCard';
import type { Article } from '@/lib/types';

interface ArticleGridProps {
  articles: Article[];
  columns?: 2 | 3;
}

export default function ArticleGrid({ articles, columns = 3 }: ArticleGridProps) {
  const gridCols = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3';

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-ui">No articles found.</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-8 ${gridCols}`}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
