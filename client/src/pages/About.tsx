import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Sparkles, Trophy, Users, Globe, Award, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const stats = [
    { label: 'Registered Hackers', value: '12,000+', icon: Users },
    { label: 'Global Hackathons', value: '48', icon: Trophy },
    { label: 'Prizes Awarded', value: '₹9L+', icon: Award },
    { label: 'Projects Shipped', value: '310+', icon: Globe },
  ];

  const milestoneTimeline = [
    { year: '2024', title: 'HackVerse Founded', desc: 'Started as an independent student developer community.' },
    { year: '2025', title: 'Global Expansion', desc: 'Hosted 25+ hackathons, CTFs, and live workshops.' },
    { year: '2026', title: 'HackVerse Platform Launch', desc: 'Automated live hackathon countdown timers & Google Form integrations.' },
  ];

  return (
    <div className="space-y-12 py-6 text-[#1E1B4B]">
      <SectionHeader
        eyebrow="ABOUT HACKVERSE"
        title="Empowering Student Developers Worldwide"
        subtitle="HackVerse is a student-run tech community running online hackathons, coding competitions, workshops and cybersecurity events."
      />

      {/* Hero Story Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#1E1B4B] shadow-[6px_6px_0px_0px_#1E1B4B] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <Badge variant="yellow">OUR MISSION</Badge>
          <h3 className="text-3xl font-black text-[#1E1B4B] leading-snug">
            Building the Next Generation of Software Engineers & Innovators
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed font-bold">
            HackVerse began when a group of student developers realized how difficult it was to find high-quality hackathons with transparent judging, real mentorship, and verified credentials.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed font-bold">
            Today, HackVerse connects student developers, designers, prompt engineers, and ethical hackers to global competitions.
          </p>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#FAF7EE] border-2 border-[#1E1B4B] text-center space-y-2 shadow-[2px_2px_0px_0px_#1E1B4B]">
              <stat.icon className="w-6 h-6 text-[#1E1B4B] mx-auto" />
              <p className="text-2xl font-black text-[#1E1B4B]">{stat.value}</p>
              <p className="text-xs text-slate-600 font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        <h3 className="text-3xl font-black text-[#1E1B4B] text-center">Our Journey & Milestones</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestoneTimeline.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] space-y-2">
              <span className="text-xs font-black text-[#1E1B4B] bg-[#F7D046] px-3 py-1 rounded-full border-2 border-[#1E1B4B]">
                {item.year}
              </span>
              <h4 className="text-xl font-black text-[#1E1B4B] pt-2">{item.title}</h4>
              <p className="text-xs text-slate-600 font-bold leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
