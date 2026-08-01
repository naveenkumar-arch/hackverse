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
    green: 'bg-[#00E676] text-[#120E38] border-2 border-[#120E38] shadow-[2px_2px_0px_0px_#120E38]',
    purple: 'bg-[#A855F7] text-white border-2 border-[#120E38] shadow-[2px_2px_0px_0px_#120E38]',
    pink: 'bg-[#FF2D55] text-white border-2 border-[#120E38] shadow-[2px_2px_0px_0px_#120E38]',
    yellow: 'bg-[#FFE600] text-[#120E38] border-2 border-[#120E38] shadow-[2px_2px_0px_0px_#120E38]',
    blue: 'bg-[#00F0FF] text-[#120E38] border-2 border-[#120E38] shadow-[2px_2px_0px_0px_#120E38]',
    outline: 'bg-white text-[#120E38] border-2 border-[#120E38] shadow-[2px_2px_0px_0px_#120E38]',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black tracking-tight transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
