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
    <div className="glass-card bg-white rounded-2xl overflow-hidden border border-purple-100/80 shadow-md transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-purple-50/50 transition-colors focus:outline-none"
      >
        <span className="text-base sm:text-lg font-black text-slate-900">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="p-2 rounded-full bg-amber-100 text-amber-800 flex-shrink-0"
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
            <div className="p-5 pt-0 text-sm text-slate-600 font-medium border-t border-slate-100 leading-relaxed">
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
