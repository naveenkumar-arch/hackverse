import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQItem } from '../../types';
import { ChevronDown } from 'lucide-react';

interface FAQAccordionProps {
  faq?: FAQItem;
  items?: FAQItem[];
}

export const FAQAccordionItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!item) return null;

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '1rem',
      }}
      className="overflow-hidden transition-all"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
      >
        <span className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ background: 'rgba(139,92,246,0.20)', color: '#C4B5FD' }}
          className="p-2 rounded-full flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(148,163,184,0.85)' }}
              className="p-5 pt-4 text-sm font-medium leading-relaxed"
            >
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faq, items }) => {
  const list = items || (faq ? [faq] : []);

  return (
    <div className="space-y-4">
      {list.map((item, idx) => (
        <FAQAccordionItem key={item?.id || idx} item={item} />
      ))}
    </div>
  );
};
