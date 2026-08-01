import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <SectionHeader
        eyebrow="LEGAL DRAFT"
        title="Privacy Policy"
        subtitle="Last Updated: August 1, 2026. How Kernel Overriders collects, uses, and protects student data."
      />

      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/90 shadow-xl space-y-6 text-slate-700 font-medium text-sm leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-xl font-extrabold text-slate-900">1. Information We Collect</h3>
          <p>
            When you register for an event on Kernel Overriders, we collect basic profile details including your name, student email address, university affiliation, GitHub profile, and project submission links.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-xl font-extrabold text-slate-900">2. How We Use Your Data</h3>
          <p>
            Your data is primarily used to manage event registrations, facilitate team formation, calculate leaderboard standings, issue verified digital certificates, and distribute sponsor prizes.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-xl font-extrabold text-slate-900">3. Data Sharing & Sponsors</h3>
          <p>
            We do not sell your personal data. With your explicit consent during event registration, your resume or public GitHub profile may be shared with official event sponsors for recruitment purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-xl font-extrabold text-slate-900">4. Security</h3>
          <p>
            We implement industry-standard encryption, rate-limiting, and access controls to keep your data secure at all times.
          </p>
        </section>
      </div>
    </div>
  );
};
