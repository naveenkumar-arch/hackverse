import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'purple' | 'pink' | 'yellow' | 'blue' | 'outline';
  className?: string;
}

const variantStyles: Record<string, React.CSSProperties> = {
  green: {
    background: 'linear-gradient(135deg, rgba(16,253,165,0.20), rgba(16,253,165,0.10))',
    color: '#34D399',
    border: '1px solid rgba(16,253,165,0.40)',
    boxShadow: '0 2px 12px rgba(16,253,165,0.15)',
  },
  purple: {
    background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(139,92,246,0.12))',
    color: '#C4B5FD',
    border: '1px solid rgba(139,92,246,0.45)',
    boxShadow: '0 2px 12px rgba(139,92,246,0.18)',
  },
  pink: {
    background: 'linear-gradient(135deg, rgba(244,114,182,0.25), rgba(244,114,182,0.12))',
    color: '#F9A8D4',
    border: '1px solid rgba(244,114,182,0.45)',
    boxShadow: '0 2px 12px rgba(244,114,182,0.18)',
  },
  yellow: {
    background: 'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(251,191,36,0.12))',
    color: '#FDE68A',
    border: '1px solid rgba(251,191,36,0.45)',
    boxShadow: '0 2px 12px rgba(251,191,36,0.15)',
  },
  blue: {
    background: 'linear-gradient(135deg, rgba(34,211,238,0.20), rgba(34,211,238,0.10))',
    color: '#67E8F9',
    border: '1px solid rgba(34,211,238,0.40)',
    boxShadow: '0 2px 12px rgba(34,211,238,0.15)',
  },
  outline: {
    background: 'rgba(255,255,255,0.05)',
    color: 'rgba(226,232,240,0.80)',
    border: '1px solid rgba(255,255,255,0.18)',
    boxShadow: 'none',
  },
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  className = '',
}) => {
  return (
    <span
      style={{
        ...variantStyles[variant],
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'all 0.2s ease',
      }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide hover:-translate-y-0.5 transition-all cursor-default ${className}`}
    >
      {children}
    </span>
  );
};
