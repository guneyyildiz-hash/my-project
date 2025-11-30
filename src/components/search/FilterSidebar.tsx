'use client';

import FilterChip from './FilterChip';

interface FilterSidebarProps {
  publications: string[];
  selectedPublications: string[];
  onPublicationChange: (publication: string) => void;
  tags: string[];
  selectedTags: string[];
  onTagChange: (tag: string) => void;
  years: number[];
  selectedYears: number[];
  onYearChange: (year: number) => void;
  onClearAll: () => void;
}

export default function FilterSidebar({
  publications,
  selectedPublications,
  onPublicationChange,
  tags,
  selectedTags,
  onTagChange,
  years,
  selectedYears,
  onYearChange,
  onClearAll,
}: FilterSidebarProps) {
  const hasFilters = selectedPublications.length > 0 || selectedTags.length > 0 || selectedYears.length > 0;

  return (
    <aside className="w-full lg:w-64 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-charcoal">Filters</h3>
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="text-sm text-teal hover:underline font-ui"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Publications */}
      <div>
        <h4 className="text-sm font-ui font-medium text-gray-700 mb-3">Publication</h4>
        <div className="flex flex-wrap gap-2">
          {publications.map((pub) => (
            <FilterChip
              key={pub}
              label={pub}
              isActive={selectedPublications.includes(pub)}
              onClick={() => onPublicationChange(pub)}
            />
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h4 className="text-sm font-ui font-medium text-gray-700 mb-3">Topics</h4>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 10).map((tag) => (
            <FilterChip
              key={tag}
              label={tag}
              isActive={selectedTags.includes(tag)}
              onClick={() => onTagChange(tag)}
            />
          ))}
        </div>
      </div>

      {/* Years */}
      <div>
        <h4 className="text-sm font-ui font-medium text-gray-700 mb-3">Year</h4>
        <div className="flex flex-wrap gap-2">
          {years.map((year) => (
            <FilterChip
              key={year}
              label={year.toString()}
              isActive={selectedYears.includes(year)}
              onClick={() => onYearChange(year)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
