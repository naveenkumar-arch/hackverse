import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialItem } from '../../types';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      }}
      className="rounded-3xl p-6 sm:p-8 relative flex flex-col justify-between"
    >
      <Quote className="w-10 h-10 text-violet-400/20 absolute top-6 right-6" />

      <div className="space-y-4 relative z-10">
        <div className="flex gap-1 text-amber-400">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <p className="text-sm sm:text-base italic leading-relaxed font-medium" style={{ color: 'rgba(226,232,240,0.85)' }}>
          "{testimonial.quote}"
        </p>
      </div>

      <div
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        className="pt-6 mt-6 flex items-center gap-3"
      >
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-violet-400/30 shadow-md"
        />
        <div>
          <h4 className="text-sm font-bold text-white">{testimonial.name}</h4>
          <p className="text-xs font-semibold text-violet-400">{testimonial.role}</p>
          <p className="text-[11px] font-medium" style={{ color: 'rgba(148,163,184,0.6)' }}>{testimonial.university}</p>
        </div>
      </div>
    </motion.div>
  );
};
