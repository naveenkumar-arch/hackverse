import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'yellow' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-black tracking-tight rounded-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] hover:shadow-[6px_6px_0px_0px_#1E1B4B] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#1E1B4B]';

  const variants = {
    // Coral Red / Pink Primary Button
    primary:
      'bg-[#FF334B] text-white hover:bg-[#FF203B] border-2 border-[#1E1B4B]',
    // Aqua Secondary Button
    secondary:
      'bg-[#5CE1E6] text-[#1E1B4B] hover:bg-[#4BD5DA] border-2 border-[#1E1B4B]',
    // Vibrant Yellow Button
    yellow:
      'bg-[#F7D046] text-[#1E1B4B] hover:bg-[#F5C82A] border-2 border-[#1E1B4B]',
    // White Card Button
    outline:
      'bg-white text-[#1E1B4B] hover:bg-slate-50 border-2 border-[#1E1B4B]',
    // Ghost Button
    ghost:
      'bg-transparent text-[#1E1B4B] border-transparent shadow-none hover:shadow-none hover:bg-black/5 hover:translate-x-0 hover:translate-y-0',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-base px-8 py-4 gap-2.5',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

