import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'yellow' | 'green' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    color: '#ffffff',
    border: '1px solid rgba(139,92,246,0.50)',
    boxShadow: '0 4px 20px rgba(139,92,246,0.35), inset 0 1px 0 rgba(255,255,255,0.18)',
  },
  secondary: {
    background: 'linear-gradient(135deg, rgba(34,211,238,0.14), rgba(34,211,238,0.07))',
    color: '#22D3EE',
    border: '1px solid rgba(34,211,238,0.38)',
    boxShadow: '0 4px 16px rgba(34,211,238,0.12)',
    backdropFilter: 'blur(10px)',
  },
  yellow: {
    background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
    color: '#0a0a0f',
    border: '1px solid rgba(251,191,36,0.40)',
    boxShadow: '0 4px 20px rgba(251,191,36,0.30), inset 0 1px 0 rgba(255,255,255,0.22)',
  },
  green: {
    background: 'linear-gradient(135deg, #10FDA5 0%, #059669 100%)',
    color: '#0a0a0f',
    border: '1px solid rgba(16,253,165,0.40)',
    boxShadow: '0 4px 20px rgba(16,253,165,0.30), inset 0 1px 0 rgba(255,255,255,0.20)',
  },
  outline: {
    background: 'rgba(255,255,255,0.05)',
    color: '#C4B5FD',
    border: '1px solid rgba(139,92,246,0.35)',
    boxShadow: '0 2px 12px rgba(139,92,246,0.10)',
    backdropFilter: 'blur(10px)',
  },
  ghost: {
    background: 'transparent',
    color: 'rgba(148,163,184,0.8)',
    border: '1px solid transparent',
    boxShadow: 'none',
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  style,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold tracking-wide rounded-full transition-all duration-200 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer select-none hover:-translate-y-0.5 active:translate-y-px';

  const sizes = {
    sm:  'text-xs px-4 py-2 gap-1.5',
    md:  'text-sm px-6 py-3 gap-2',
    lg:  'text-base px-8 py-4 gap-2.5',
  };

  return (
    <button
      className={`${baseClasses} ${sizes[size]} ${className}`}
      style={{ ...variantStyles[variant], ...style }}
      {...props}
    >
      {children}
    </button>
  );
};
