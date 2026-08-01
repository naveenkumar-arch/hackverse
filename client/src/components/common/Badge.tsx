import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'purple' | 'pink' | 'yellow' | 'blue' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  className = '',
}) => {
  const variants = {
    green: 'bg-[#78E29A] text-[#1E1B4B] border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_0px_#1E1B4B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all',
    purple: 'bg-[#C084FC] text-[#1E1B4B] border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_0px_#1E1B4B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all',
    pink: 'bg-[#FF70A6] text-[#1E1B4B] border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_0px_#1E1B4B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all',
    yellow: 'bg-[#F7D046] text-[#1E1B4B] border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_0px_#1E1B4B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all',
    blue: 'bg-[#5CE1E6] text-[#1E1B4B] border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_0px_#1E1B4B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all',
    outline: 'bg-white text-[#1E1B4B] border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_0px_#1E1B4B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black tracking-tight transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
