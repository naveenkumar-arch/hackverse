import React, { useState } from 'react';
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
    { title: 'Getting Started', desc: 'Account setup, student verification & team formation.', icon: BookOpen, color: 'text-purple-600' },
    { title: 'Hackathons & Rules', desc: 'Submission requirements, deadlines & judging criteria.', icon: HelpCircle, color: 'text-pink-600' },
    { title: 'Prizes & Payouts', desc: 'Cash prize claim process, taxes & bank wire details.', icon: Shield, color: 'text-amber-500' },
    { title: 'Certificates', desc: 'Downloading & verifying digital SVG & PDF certificates.', icon: FileText, color: 'text-blue-600' },
  ];

  const filteredFaqs = REAL_FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 py-8">
      <SectionHeader
        eyebrow="KNOWLEDGE BASE"
        title="Kernel Overriders Help Center"
        subtitle="Search guides, tutorials, and answers to common questions about hackathons and team formation."
      />

      {/* Search Header Box */}
      <div className="glass-card bg-white rounded-3xl p-8 text-center border border-purple-100 shadow-xl max-w-2xl mx-auto space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search for help articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs font-bold pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-purple-500 shadow-sm"
          />
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((c, idx) => (
          <div key={idx} className="glass-card bg-white p-6 rounded-3xl border border-purple-100 space-y-3 shadow-md hover:shadow-xl transition-all">
            <c.icon className={`w-8 h-8 ${c.color}`} />
            <h4 className="text-lg font-black text-slate-900">{c.title}</h4>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h3 className="text-2xl font-black text-slate-900 text-center">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <FAQAccordion key={faq.id} faq={faq} />
          ))}
        </div>
      </div>

      {/* Support Ticket Box */}
      <div className="glass-card bg-white rounded-3xl p-8 text-center border border-purple-100 shadow-xl max-w-2xl mx-auto space-y-6">
        <MessageSquare className="w-8 h-8 text-purple-600 mx-auto" />
        <h4 className="text-xl font-black text-slate-900">Still Need Help?</h4>
        <p className="text-xs text-slate-600 font-medium">
          Can't find what you're looking for? Reach out directly to our support team.
        </p>

        {/* Support Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {/* Contact 1 */}
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 space-y-2">
            <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Support Contact 1</p>
            <a
              href="tel:+919361858183"
              className="flex items-center gap-2 text-slate-800 hover:text-purple-600 transition-colors"
            >
              <Phone className="w-4 h-4 text-purple-500 shrink-0" />
              <span className="text-sm font-black font-mono">+91 93618 58183</span>
            </a>
            <a
              href="mailto:madhan600700@gmail.com"
              className="flex items-center gap-2 text-slate-800 hover:text-purple-600 transition-colors"
            >
              <Mail className="w-4 h-4 text-purple-500 shrink-0" />
              <span className="text-xs font-bold font-mono break-all">madhan600700@gmail.com</span>
            </a>
          </div>

          {/* Contact 2 */}
          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4 space-y-2">
            <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Support Contact 2</p>
            <a
              href="tel:+919342443023"
              className="flex items-center gap-2 text-slate-800 hover:text-pink-600 transition-colors"
            >
              <Phone className="w-4 h-4 text-pink-500 shrink-0" />
              <span className="text-sm font-black font-mono">+91 93424 43023</span>
            </a>
            <a
              href="mailto:amuthasurabi970@gmail.com"
              className="flex items-center gap-2 text-slate-800 hover:text-pink-600 transition-colors"
            >
              <Mail className="w-4 h-4 text-pink-500 shrink-0" />
              <span className="text-xs font-bold font-mono break-all">amuthasurabi970@gmail.com</span>
            </a>
          </div>
        </div>

        <Link to="/contact" className="inline-block pt-1">
          <span className="text-xs font-black text-purple-600 hover:underline">
            Submit Support Ticket &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
};
