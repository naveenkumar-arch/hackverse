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

  const featuredEvent = events[0];

  return (
    <div className="space-y-12 pb-16 relative overflow-hidden text-[#1E1B4B]">
      {/* Glow blobs */}
      <div className="glow-blob-cream-top" />
      <div className="glow-blob-cyan-right" />

      {/* HERO SECTION */}
      <section className="pt-4 sm:pt-8 pb-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#78E29A] border-2 border-[#1E1B4B] text-[#1E1B4B] text-xs font-black shadow-[2px_2px_0px_0px_#1E1B4B]"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              REGISTRATIONS OPEN
            </motion.div>

            {/* Giant Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-[#1E1B4B]"
            >
              <span className="text-gradient-hackverse">HackVerse</span>
              <br />
              Build. Break.
              <br />
              Belong.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-xl text-[#1E1B4B]/80 font-bold max-w-xl leading-relaxed"
            >
              A student-run tech community running online hackathons, coding competitions, workshops and cybersecurity events.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link to="/events">
                <Button variant="primary" size="lg" className="gap-2">
                  Explore events <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="lg">
                  Our story
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Spotlight Card (NEXT UP) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] space-y-6 relative">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500">NEXT UP</span>
                <h3 className="text-3xl font-black text-[#1E1B4B]">
                  {featuredEvent ? featuredEvent.title : 'CodeStorm 2026'}
                </h3>
                <p className="text-sm font-semibold text-slate-600 line-clamp-2">
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
                  <div key={idx} className="p-2.5 rounded-2xl border-2 border-[#1E1B4B] bg-slate-50 shadow-[2px_2px_0px_0px_#1E1B4B]">
                    <div className="text-xl sm:text-2xl font-black text-[#1E1B4B]">{item.val}</div>
                    <div className="text-[10px] font-black text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Tags Row */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1.5 rounded-full bg-[#F7D046] border-2 border-[#1E1B4B] text-xs font-black shadow-[2px_2px_0px_0px_#1E1B4B]">
                  ₹1,50,000 pool
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#5CE1E6] border-2 border-[#1E1B4B] text-xs font-black shadow-[2px_2px_0px_0px_#1E1B4B]">
                  2 – 4 members
                </span>
              </div>

              {featuredEvent?.registrationLink ? (
                <a href={featuredEvent.registrationLink} target="_blank" rel="noreferrer" className="block w-full">
                  <Button variant="primary" className="w-full py-4 text-sm font-black">
                    Register Now (Google Form)
                  </Button>
                </a>
              ) : (
                <Link to="/events" className="block w-full">
                  <Button variant="primary" className="w-full py-4 text-sm font-black">
                    View details
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE TICKER BAR */}
      <section className="bg-[#F7D046] border-2 border-[#1E1B4B] rounded-2xl py-3.5 shadow-[4px_4px_0px_0px_#1E1B4B] overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-8 text-sm font-black uppercase tracking-wider text-[#1E1B4B] animate-marquee">
          <span>★ Hackathons</span>
          <span>★ CTFs</span>
          <span>★ Workshops</span>
          <span>★ Coding contests</span>
          <span>★ Open source</span>
          <span>★ Mentorship</span>
          <span>★ Hackathons</span>
          <span>★ CTFs</span>
          <span>★ Workshops</span>
          <span>★ Coding contests</span>
          <span>★ Open source</span>
          <span>★ Mentorship</span>
        </div>
      </section>

      {/* STATS CARDS GRID */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Community members', val: '12k+' },
          { label: 'Events hosted', val: '48' },
          { label: 'Projects shipped', val: '310' },
          { label: 'Prizes awarded', val: '₹9L+' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-gradient-hackverse">{stat.val}</div>
            <div className="text-xs font-bold text-slate-600">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* MISSION & VISION CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mission Card (Yellow) */}
        <div className="bg-[#F7D046] p-8 rounded-3xl border-2 border-[#1E1B4B] shadow-[6px_6px_0px_0px_#1E1B4B] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#1E1B4B] flex items-center justify-center shadow-[2px_2px_0px_0px_#1E1B4B]">
            <Code2 className="w-6 h-6 text-[#1E1B4B]" />
          </div>
          <h3 className="text-3xl font-black text-[#1E1B4B]">Our mission</h3>
          <p className="text-sm font-bold text-[#1E1B4B]/90 leading-relaxed">
            Give every student a place to build in public — free events, honest feedback, and peers who care about craft.
          </p>
        </div>

        {/* Vision Card (Aqua) */}
        <div className="bg-[#5CE1E6] p-8 rounded-3xl border-2 border-[#1E1B4B] shadow-[6px_6px_0px_0px_#1E1B4B] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#1E1B4B] flex items-center justify-center shadow-[2px_2px_0px_0px_#1E1B4B]">
            <Rocket className="w-6 h-6 text-[#1E1B4B]" />
          </div>
          <h3 className="text-3xl font-black text-[#1E1B4B]">Our vision</h3>
          <p className="text-sm font-bold text-[#1E1B4B]/90 leading-relaxed">
            The most trusted independent student tech community in the country, running events that campuses copy.
          </p>
        </div>
      </section>
    </div>
  );
};

