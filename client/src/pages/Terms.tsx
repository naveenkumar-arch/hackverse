import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';

export const Terms: React.FC = () => {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <SectionHeader
        eyebrow="LEGAL DRAFT"
        title="Terms of Service"
        subtitle="Last Updated: August 1, 2026. Rules, code of conduct, and eligibility for HackVerse competitions."
      />

      <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#1E1B4B] shadow-[6px_6px_0px_0px_#1E1B4B] space-y-6 text-slate-700 font-bold text-sm leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-xl font-black text-[#1E1B4B]">1. Eligibility</h3>
          <p>
            HackVerse events are open to high school students, university undergraduates, graduate students, and recent graduates (within 1 year). Participants must abide by all local laws and event guidelines.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-xl font-black text-[#1E1B4B]">2. Code of Conduct & Intellectual Property</h3>
          <p>
            All code submitted to HackVerse competitions must be original work created within the official contest timeline. Plagiarism, pre-written code without disclosure, or harassment will result in immediate disqualification. You retain 100% ownership of all IP created.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-xl font-extrabold text-slate-900">3. Prize Distribution</h3>
          <p>
            Prizes are subject to verification of student status and code audit. Winning teams are responsible for splitting cash awards according to their internal team agreement.
          </p>
        </section>
      </div>
    </div>
  );
};
