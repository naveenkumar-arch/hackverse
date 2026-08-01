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
    green: 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_0px_#0F172A]',
    purple: 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_0px_#0F172A]',
    pink: 'bg-gradient-to-r from-[#FF2E55] to-[#EC4899] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_0px_#0F172A]',
    yellow: 'bg-gradient-to-r from-[#FFD600] to-[#FF9900] text-[#0F172A] border-2 border-[#0F172A] shadow-[2px_2px_0px_0px_#0F172A]',
    blue: 'bg-gradient-to-r from-[#00F0FF] to-[#0284C7] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_0px_#0F172A]',
    outline: 'bg-white text-[#0F172A] border-2 border-[#0F172A] shadow-[2px_2px_0px_0px_#0F172A]',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black tracking-tight transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
