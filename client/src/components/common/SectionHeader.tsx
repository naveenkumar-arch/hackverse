import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { cn } from '../../lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={cn('space-y-3 mb-12', centered && 'text-center max-w-3xl mx-auto', className)}
    >
      {eyebrow && (
        <Badge variant="purple" className="px-4 py-1.5 text-xs uppercase tracking-wider font-extrabold">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ color: '#F1F5F9' }}>
        {title.split(' ').map((word, index) => {
          if (index % 3 === 1) {
            return (
              <span
                key={index}
                style={{
                  background: 'linear-gradient(135deg, #A78BFA, #60A5FA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {word}{' '}
              </span>
            );
          }
          return word + ' ';
        })}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg font-medium leading-relaxed" style={{ color: 'rgba(148,163,184,0.80)' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
