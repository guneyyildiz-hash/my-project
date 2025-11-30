interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'teal' | 'terracotta' | 'olive' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'sm',
  className = '' 
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    teal: 'bg-teal/10 text-teal',
    terracotta: 'bg-terracotta/10 text-terracotta',
    olive: 'bg-olive/10 text-olive',
    gray: 'bg-gray-100 text-gray-600',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span 
      className={`
        inline-flex items-center rounded-full font-ui font-medium
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
