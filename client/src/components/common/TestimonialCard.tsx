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
      className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xl shadow-purple-500/5 relative flex flex-col justify-between"
    >
      <Quote className="w-10 h-10 text-purple-200 absolute top-6 right-6" />

      <div className="space-y-4 relative z-10">
        <div className="flex gap-1 text-amber-400">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400" />
          ))}
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium italic leading-relaxed">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-purple-200 shadow-md"
        />
        <div>
          <h4 className="text-sm font-extrabold text-slate-900">{testimonial.name}</h4>
          <p className="text-xs text-purple-600 font-semibold">{testimonial.role}</p>
          <p className="text-[11px] text-slate-400">{testimonial.university}</p>
        </div>
      </div>
    </motion.div>
  );
};
