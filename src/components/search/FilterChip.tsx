'use client';

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}

export default function FilterChip({ label, isActive, onClick, count }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full font-ui text-sm transition-colors
        ${isActive 
          ? 'bg-teal text-white' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
      `}
    >
      {label}
      {count !== undefined && (
        <span className={`
          text-xs px-1.5 py-0.5 rounded-full
          ${isActive ? 'bg-white/20' : 'bg-gray-200'}
        `}>
          {count}
        </span>
      )}
    </button>
  );
}
