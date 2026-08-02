import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Sparkles, Trophy, Users, Globe, Award, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const stats = [
    { label: 'Registered Hackers', value: '12,000+', icon: Users, gradient: 'linear-gradient(135deg, #8B5CF6, #60A5FA)' },
    { label: 'Global Hackathons', value: '48', icon: Trophy, gradient: 'linear-gradient(135deg, #22D3EE, #34D399)' },
    { label: 'Prizes Awarded', value: '₹9L+', icon: Award, gradient: 'linear-gradient(135deg, #FBBF24, #FDE68A)' },
    { label: 'Projects Shipped', value: '310+', icon: Globe, gradient: 'linear-gradient(135deg, #F472B6, #FB923C)' },
  ];

  const milestoneTimeline = [
    { year: '2024', title: 'Kernel Overriders Founded', desc: 'Started as an independent student developer community.' },
    { year: '2025', title: 'Global Expansion', desc: 'Hosted 25+ hackathons, CTFs, and live workshops.' },
    { year: '2026', title: 'Kernel Overriders Platform Launch', desc: 'Automated live hackathon countdown timers & Google Form integrations.' },
  ];

  const glassCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.09)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)',
  };

  return (
    <div className="space-y-12 py-6">
      <SectionHeader
        eyebrow="ABOUT KERNEL OVERRIDERS"
        title="Empowering Student Developers Worldwide"
        subtitle="Kernel Overriders is a student-run tech community running online hackathons, coding competitions, workshops and cybersecurity events."
      />

      {/* Hero Story Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ ...glassCard, borderRadius: '1.75rem' }}
        className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        <div className="lg:col-span-7 space-y-4">
          <Badge variant="yellow">OUR MISSION</Badge>
          <h3 className="text-3xl font-black text-white leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Building the Next Generation of Software Engineers & Innovators
          </h3>
          <p className="text-sm leading-relaxed font-medium" style={{ color: 'rgba(148,163,184,0.85)' }}>
            Kernel Overriders began when a group of student developers realized how difficult it was to find high-quality hackathons with transparent judging, real mentorship, and verified credentials.
          </p>
          <p className="text-sm leading-relaxed font-medium" style={{ color: 'rgba(148,163,184,0.85)' }}>
            Today, Kernel Overriders connects student developers, designers, prompt engineers, and ethical hackers to global competitions.
          </p>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                borderRadius: '1rem',
              }}
              className="p-6 text-center space-y-2"
            >
              <stat.icon className="w-6 h-6 text-violet-400 mx-auto" />
              <p
                className="text-2xl font-black"
                style={{
                  background: stat.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </p>
              <p className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.65)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="space-y-8">
        <h3 className="text-3xl font-black text-white text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our Journey & Milestones</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestoneTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              style={{ ...glassCard, borderRadius: '1.5rem' }}
              className="p-6 space-y-3"
            >
              <Badge variant="yellow">{item.year}</Badge>
              <h4 className="text-xl font-black text-white pt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h4>
              <p className="text-xs font-medium leading-relaxed" style={{ color: 'rgba(148,163,184,0.75)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
