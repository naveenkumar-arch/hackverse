import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { eventManagementStorage, ManagedEvent } from '../utils/eventManagementStorage';
import {
  Sparkles,
  ArrowRight,
  Award,
  Users,
  Trophy,
  CheckCircle2,
  Calendar,
  Code2,
  Rocket,
  ShieldAlert,
  Flame,
  Globe,
  Clock,
} from 'lucide-react';

export const Home: React.FC = () => {
  const [events, setEvents] = useState<ManagedEvent[]>([]);
  const [timeLeft, setTimeLeft] = useState({ days: 41, hrs: 13, min: 31, sec: 25 });

  useEffect(() => {
    setEvents(eventManagementStorage.getEvents());
    const handleUpdate = () => setEvents(eventManagementStorage.getEvents());
    window.addEventListener('ko_managed_events_updated', handleUpdate);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.sec > 0) return { ...prev, sec: prev.sec - 1 };
        return { ...prev, sec: 59, min: prev.min > 0 ? prev.min - 1 : 59 };
      });
    }, 1000);

    return () => {
      window.removeEventListener('ko_managed_events_updated', handleUpdate);
      clearInterval(timer);
    };
  }, []);

  const featuredEvent = events.find((e) => e.status === 'LIVE' || e.status === 'UPCOMING') || events[0];

  return (
    <div className="space-y-12 pb-16 relative overflow-hidden text-[#F1F5F9]">
      {/* Ambient Monarch Portal Glow Blobs */}
      <div className="glow-blob-monarch-left" />
      <div className="glow-blob-monarch-right" />

      {/* HERO SECTION */}
      <section className="pt-4 sm:pt-8 pb-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Box */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* System HUD Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#131525] text-[#00F0FF] border border-[#00F0FF]/50 shadow-[0_0_15px_rgba(0,240,255,0.4)] text-xs font-mono font-bold tracking-widest uppercase"
            >
              <Sparkles className="w-4 h-4 fill-[#00F0FF]" />
              [ SYSTEM NOTIFICATION: QUEST PORTAL ACTIVE ]
            </motion.div>

            {/* Monarch Display Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-wider leading-[0.95] text-white drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]"
            >
              <span className="text-gradient-monarch">KERNEL OVERRIDERS</span>
              <br />
              BUILD. BREAK.
              <br />
              BELONG.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-xl text-slate-300 font-medium max-w-xl leading-relaxed font-sans"
            >
              A student-run tech community running online hackathons, coding competitions, workshops and cybersecurity events.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link to="/events">
                <button className="system-button-cyan px-8 py-4 text-xs cursor-pointer">
                  Explore events
                </button>
              </Link>

              <Link to="/about">
                <button className="px-8 py-4 rounded-full bg-[#131525] text-white border border-slate-700 font-display font-bold text-xs uppercase tracking-wider hover:border-[#00F0FF] transition-all cursor-pointer">
                  Our story
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Spotlight Card (NEXT UP MONARCH GATE) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="system-hud-card p-6 sm:p-8 space-y-6 relative border-2 border-[#00F0FF]/40">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#00F0FF] uppercase">
                    {featuredEvent?.status === 'COMPLETED' ? 'PAST EVENT' : featuredEvent?.status === 'LIVE' ? 'LIVE NOW' : 'NEXT UP'}
                  </span>
                  {featuredEvent && (
                    <Badge variant={featuredEvent.status === 'LIVE' ? 'pink' : featuredEvent.status === 'COMPLETED' ? 'green' : 'yellow'}>
                      {featuredEvent.status === 'COMPLETED' ? 'CONCLUDED' : featuredEvent.status === 'LIVE' ? 'LIVE' : 'UPCOMING'}
                    </Badge>
                  )}
                </div>
                <h3 className="text-3xl font-display font-black text-white text-gradient-cyan">
                  {featuredEvent ? featuredEvent.title : 'CodeStorm 2026'}
                </h3>
                <p className="text-sm text-slate-300 font-sans line-clamp-2">
                  {featuredEvent ? featuredEvent.description : '48 hours. One idea. Ship something people actually want to use.'}
                </p>
              </div>

              {/* Countdown Timer Row */}
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { label: 'DAYS', val: timeLeft.days },
                  { label: 'HRS', val: timeLeft.hrs },
                  { label: 'MIN', val: timeLeft.min },
                  { label: 'SEC', val: timeLeft.sec },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-[#00F0FF]/30 bg-[#090A0F]/80 shadow-[0_0_10px_rgba(0,240,255,0.15)]">
                    <div className="text-xl sm:text-2xl font-display font-black text-[#00F0FF]">{item.val}</div>
                    <div className="text-[10px] font-mono font-bold text-slate-400">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Tags Row */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1.5 rounded-full bg-[#131525] border border-[#FFD600]/50 text-[#FFD600] text-xs font-mono font-bold shadow-[0_0_10px_rgba(255,214,0,0.2)]">
                  ₹1,50,000 POOL
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#131525] border border-[#00F0FF]/50 text-[#00F0FF] text-xs font-mono font-bold shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                  2 – 4 MEMBERS
                </span>
              </div>

              {/* Spotlight CTA Button based on status */}
              {featuredEvent?.status === 'COMPLETED' ? (
                <Link to="/results" className="block w-full">
                  <button className="system-button-cyan w-full py-4 text-xs cursor-pointer">
                    🏆 Event Completed — View Winners & Leaderboard
                  </button>
                </Link>
              ) : featuredEvent?.status === 'LIVE' && featuredEvent.isSubmissionEnabled && featuredEvent.submissionLink ? (
                <a href={featuredEvent.submissionLink} target="_blank" rel="noreferrer" className="block w-full">
                  <button className="system-button-cyan w-full py-4 text-xs animate-pulse cursor-pointer">
                    🚀 Submit Project (Google Form)
                  </button>
                </a>
              ) : featuredEvent?.isRegistrationEnabled !== false && featuredEvent?.registrationLink ? (
                <a href={featuredEvent.registrationLink} target="_blank" rel="noreferrer" className="block w-full">
                  <button className="system-button-cyan w-full py-4 text-xs cursor-pointer">
                    Register Now (Google Form)
                  </button>
                </a>
              ) : (
                <Link to="/events" className="block w-full">
                  <button className="system-button-cyan w-full py-4 text-xs cursor-pointer">
                    View details
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE TICKER BAR */}
      <section className="bg-[#131525] border border-[#00F0FF]/30 rounded-2xl py-4 shadow-[0_0_20px_rgba(0,240,255,0.2)] overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-8 text-sm sm:text-base font-mono font-bold uppercase tracking-widest text-[#00F0FF] animate-marquee">
          <span>★ MONARCH HACKATHONS</span>
          <span>★ CTF MATRIX</span>
          <span>★ QUEST WORKSHOPS</span>
          <span>★ CODING CONTESTS</span>
          <span>★ OPEN SOURCE</span>
          <span>★ MENTORSHIP</span>
          <span>★ MONARCH HACKATHONS</span>
          <span>★ CTF MATRIX</span>
          <span>★ QUEST WORKSHOPS</span>
          <span>★ CODING CONTESTS</span>
          <span>★ OPEN SOURCE</span>
          <span>★ MENTORSHIP</span>
        </div>
      </section>

      {/* STATS CARDS GRID */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Community members', val: '12k+' },
          { label: 'Events hosted', val: '48' },
          { label: 'Projects shipped', val: '310' },
          { label: 'Prizes awarded', val: '₹9L+' },
        ].map((stat, i) => (
          <div key={i} className="system-hud-card p-6 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-display font-black text-gradient-monarch">{stat.val}</div>
            <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* MISSION & VISION CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mission Card (Cyan) */}
        <div className="system-hud-card p-8 sm:p-10 space-y-4 border-2 border-[#00F0FF]/40">
          <div className="w-14 h-14 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <Code2 className="w-7 h-7 text-[#00F0FF]" />
          </div>
          <h3 className="text-3xl font-display font-black text-white">Our mission</h3>
          <p className="text-sm font-sans text-slate-300 leading-relaxed">
            Give every student a place to build in public — free events, honest feedback, and peers who care about craft.
          </p>
        </div>

        {/* Vision Card (Purple) */}
        <div className="system-hud-card-purple p-8 sm:p-10 space-y-4 border-2 border-[#9D4EDD]/40">
          <div className="w-14 h-14 rounded-2xl bg-[#9D4EDD]/10 border border-[#9D4EDD] flex items-center justify-center shadow-[0_0_15px_rgba(157,78,221,0.4)]">
            <Rocket className="w-7 h-7 text-[#9D4EDD]" />
          </div>
          <h3 className="text-3xl font-display font-black text-white">Our vision</h3>
          <p className="text-sm font-sans text-slate-300 leading-relaxed">
            The most trusted independent student tech community in the country, running events that campuses copy.
          </p>
        </div>
      </section>
    </div>
  );
};

