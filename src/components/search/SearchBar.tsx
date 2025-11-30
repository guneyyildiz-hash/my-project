'use client';

import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  defaultValue?: string;
}

export default function SearchBar({ 
  placeholder = 'Search articles...', 
  onSearch,
  defaultValue = ''
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <svg 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-3 font-ui text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-teal text-white text-sm font-ui rounded-md hover:bg-teal/90 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
