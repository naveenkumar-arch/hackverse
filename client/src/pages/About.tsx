import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Sparkles, Trophy, Users, Globe, Award, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const stats = [
    { label: 'Registered Hackers', value: '10,000+', icon: Users },
    { label: 'Global Hackathons', value: '50+', icon: Trophy },
    { label: 'Prizes Awarded', value: '$250,000+', icon: Award },
    { label: 'Countries Represented', value: '35+', icon: Globe },
  ];

  const milestoneTimeline = [
    { year: '2024', title: 'Kernel Overriders Founded', desc: 'Started as a student developer community.' },
    { year: '2025', title: 'Global Sprint Expansion', desc: 'Hosted 25+ hackathons with top sponsors.' },
    { year: '2026', title: 'Kernel Overriders Platform Launch', desc: 'Automated live hackathon countdown timers & Google Form integrations.' },
  ];

  return (
    <div className="space-y-16 py-8">
      <SectionHeader
        eyebrow="ABOUT KERNEL OVERRIDERS"
        title="Empowering Student Developers Worldwide"
        subtitle="Kernel Overriders is the premier tech community platform connecting student hackers to global competitions and live hackathons."
      />

      {/* Hero Story Banner */}
      <div className="glass-card bg-white rounded-3xl p-8 sm:p-12 border border-purple-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <Badge variant="purple">OUR MISSION</Badge>
          <h3 className="text-3xl font-black text-slate-900 leading-snug">
            Building the Next Generation of Software Engineers & Innovators
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            Kernel Overriders began when a group of student developers realized how difficult it was to find high-quality hackathons with transparent judging, real mentorship, and verified credentials.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            Today, Kernel Overriders connects student developers, designers, prompt engineers, and ethical hackers to global competitions.
          </p>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-purple-50/70 border border-purple-100 text-center space-y-2">
              <stat.icon className="w-6 h-6 text-purple-600 mx-auto" />
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        <h3 className="text-2xl font-black text-slate-900 text-center">Our Journey & Milestones</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestoneTimeline.map((item, idx) => (
            <div key={idx} className="glass-card bg-white p-6 rounded-3xl border border-purple-100 shadow-md space-y-2">
              <span className="text-xs font-black text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                {item.year}
              </span>
              <h4 className="text-lg font-black text-slate-900 pt-2">{item.title}</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
