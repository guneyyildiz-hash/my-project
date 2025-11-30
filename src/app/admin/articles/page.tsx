'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Badge, Card, Input } from '@/components/ui';
import type { Article } from '@/lib/types';

// Sample data
const sampleArticles: Article[] = [
  {
    id: '1',
    slug: 'turkey-energy-crisis-2024',
    title: "Turkey's Energy Crisis: Navigating Regional Dynamics",
    publication: 'Forbes',
    publicationDate: '2024-01-15',
    originalUrl: 'https://forbes.com/...',
    excerpt: 'An analysis of Turkey\'s evolving energy strategy.',
    summaryBullets: [],
    tags: ['Turkey', 'Energy'],
    featuredImage: '',
    readingTime: 8,
    status: 'published',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    slug: 'gulf-states-diplomacy',
    title: 'Gulf States Embrace New Diplomatic Era',
    publication: 'BBC',
    publicationDate: '2024-01-10',
    originalUrl: 'https://bbc.com/...',
    excerpt: 'How Saudi Arabia and UAE are reshaping foreign policy.',
    summaryBullets: [],
    tags: ['Gulf States', 'Saudi Arabia'],
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
    status: 'draft',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
];

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState(sampleArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [filterPublication, setFilterPublication] = useState<string>('all');

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus;
    const matchesPublication = filterPublication === 'all' || article.publication === filterPublication;
    return matchesSearch && matchesStatus && matchesPublication;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const publications = Array.from(new Set(articles.map(a => a.publication)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-charcoal">Articles</h1>
          <p className="text-gray-600 font-ui">Manage your published and draft articles.</p>
        </div>
        <Link href="/admin/add-content">
          <Button>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Article
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
                className="px-4 py-2 border border-gray-200 rounded-lg font-ui text-sm focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <select
                value={filterPublication}
                onChange={(e) => setFilterPublication(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg font-ui text-sm focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <option value="all">All Publications</option>
                {publications.map(pub => (
                  <option key={pub} value={pub}>{pub}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Articles Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-ui font-semibold text-gray-500 uppercase tracking-wider">
                  Article
                </th>
                <th className="text-left px-6 py-3 text-xs font-ui font-semibold text-gray-500 uppercase tracking-wider">
                  Publication
                </th>
                <th className="text-left px-6 py-3 text-xs font-ui font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-ui font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-right px-6 py-3 text-xs font-ui font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-ui font-medium text-charcoal line-clamp-1">
                        {article.title}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {article.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="gray" size="sm">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="teal">{article.publication}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant={article.status === 'published' ? 'olive' : 'gray'}
                    >
                      {article.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-ui">
                    {new Date(article.publicationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/work/articles/${article.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-teal"
                        title="View"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <button 
                        className="p-2 text-gray-400 hover:text-teal"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-gray-400 hover:text-red-500"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-ui">No articles found.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
