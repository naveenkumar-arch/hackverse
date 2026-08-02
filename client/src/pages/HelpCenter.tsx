import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { FAQItem } from '../types';
import { Search, HelpCircle, BookOpen, MessageSquare, Shield, FileText, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const REAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I register for a hackathon?',
    answer: 'Navigate to the Events page, select an active hackathon, and click the "Click here to register" button to submit your Google Form registration.',
    category: 'Registration',
  },
  {
    id: 'faq-2',
    question: 'How do team submissions work?',
    answer: 'When the admin enables project submissions, a "Click this link to submit your project" button will appear on the Events page pointing to the project submission form.',
    category: 'Submissions',
  },
  {
    id: 'faq-3',
    question: 'Where can I see winners of completed hackathons?',
    answer: 'Check the Completed Events Showcase tab on the Events page or the Results leaderboard to view official 1st, 2nd, and 3rd place winning teams.',
    category: 'Results',
  },
];

export const HelpCenter: React.FC = () => {
  const [search, setSearch] = useState('');

  const categories = [
    { title: 'Getting Started', desc: 'Account setup, student verification & team formation.', icon: BookOpen, color: 'text-violet-400' },
    { title: 'Hackathons & Rules', desc: 'Submission requirements, deadlines & judging criteria.', icon: HelpCircle, color: 'text-pink-400' },
    { title: 'Prizes & Payouts', desc: 'Cash prize claim process, taxes & bank wire details.', icon: Shield, color: 'text-amber-400' },
    { title: 'Certificates', desc: 'Downloading & verifying digital SVG & PDF certificates.', icon: FileText, color: 'text-cyan-400' },
  ];

  const filteredFaqs = REAL_FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  const glassCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.09)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)',
  };

  return (
    <div className="space-y-12 py-8">
      <SectionHeader
        eyebrow="KNOWLEDGE BASE"
        title="Kernel Overriders Help Center"
        subtitle="Search guides, tutorials, and answers to common questions about hackathons and team formation."
      />

      {/* Search Header Box */}
      <div style={{ ...glassCard, borderRadius: '1.5rem', maxWidth: '36rem', margin: '0 auto' }} className="p-6 text-center space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.6)' }} />
          <input
            type="text"
            placeholder="Search for help articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: '#E2E8F0',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '0.875rem',
            }}
            className="w-full text-xs font-semibold pl-12 pr-4 py-3 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((c, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            style={{ ...glassCard, borderRadius: '1.5rem' }}
            className="p-6 space-y-3"
          >
            <c.icon className={`w-8 h-8 ${c.color}`} />
            <h4 className="text-lg font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{c.title}</h4>
            <p className="text-xs font-medium leading-relaxed" style={{ color: 'rgba(148,163,184,0.75)' }}>{c.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h3 className="text-2xl font-black text-white text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Frequently Asked Questions</h3>
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <FAQAccordion key={faq.id} faq={faq} />
          ))}
        </div>
      </div>

      {/* Support Ticket Box */}
      <div style={{ ...glassCard, borderRadius: '1.5rem', maxWidth: '36rem', margin: '0 auto' }} className="p-8 text-center space-y-6">
        <MessageSquare className="w-8 h-8 text-violet-400 mx-auto" />
        <h4 className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Still Need Help?</h4>
        <p className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.75)' }}>
          Can't find what you're looking for? Reach out directly to our support team.
        </p>

        {/* Support Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div style={{ background: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '0.875rem' }} className="p-4 space-y-2">
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Support Contact 1</p>
            <a href="tel:+919361858183" className="flex items-center gap-2 text-slate-200 hover:text-violet-400 transition-colors">
              <Phone className="w-4 h-4 text-violet-400 shrink-0" />
              <span className="text-sm font-bold font-mono">+91 93618 58183</span>
            </a>
            <a href="mailto:madhan600700@gmail.com" className="flex items-center gap-2 text-slate-200 hover:text-violet-400 transition-colors">
              <Mail className="w-4 h-4 text-violet-400 shrink-0" />
              <span className="text-xs font-medium font-mono break-all">madhan600700@gmail.com</span>
            </a>
          </div>

          <div style={{ background: 'rgba(244,114,182,0.10)', border: '1px solid rgba(244,114,182,0.25)', borderRadius: '0.875rem' }} className="p-4 space-y-2">
            <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">Support Contact 2</p>
            <a href="tel:+919342443023" className="flex items-center gap-2 text-slate-200 hover:text-pink-400 transition-colors">
              <Phone className="w-4 h-4 text-pink-400 shrink-0" />
              <span className="text-sm font-bold font-mono">+91 93424 43023</span>
            </a>
            <a href="mailto:amuthasurabi970@gmail.com" className="flex items-center gap-2 text-slate-200 hover:text-pink-400 transition-colors">
              <Mail className="w-4 h-4 text-pink-400 shrink-0" />
              <span className="text-xs font-medium font-mono break-all">amuthasurabi970@gmail.com</span>
            </a>
          </div>
        </div>

        <Link to="/contact" className="inline-block pt-1">
          <span className="text-xs font-bold text-violet-400 hover:underline">
            Submit Support Ticket &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
};
