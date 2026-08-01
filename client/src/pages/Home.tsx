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
  const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, min: 0, sec: 0 });

  const featuredEvent = events.find((e) => e.status === 'LIVE' || e.status === 'UPCOMING') || events[0];

  // Compute real countdown from featuredEvent's date+time
  const computeTimeLeft = (evt: ManagedEvent | undefined) => {
    if (!evt) return { days: 0, hrs: 0, min: 0, sec: 0 };
    const targetDate = evt.status === 'LIVE' && evt.liveStartTime
      ? new Date(evt.liveStartTime + evt.durationHours * 3600 * 1000) // time until event ends
      : new Date(`${evt.eventDate}T${evt.startTime || '00:00'}:00`);   // time until event starts
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hrs: 0, min: 0, sec: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const sec = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hrs, min, sec };
  };

  useEffect(() => {
    const loadAndUpdate = () => {
      const loaded = eventManagementStorage.getEvents();
      setEvents(loaded);
    };
    loadAndUpdate();
    const handleUpdate = () => loadAndUpdate();
    window.addEventListener('ko_managed_events_updated', handleUpdate);

    const timer = setInterval(() => {
      setEvents((prev) => {
        const featured = prev.find((e) => e.status === 'LIVE' || e.status === 'UPCOMING') || prev[0];
        setTimeLeft(computeTimeLeft(featured));
        return prev;
      });
    }, 1000);

    return () => {
      window.removeEventListener('ko_managed_events_updated', handleUpdate);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="space-y-12 pb-16 relative overflow-hidden text-[#1E1B4B]">
      {/* Glow blobs */}
      <div className="glow-blob-cream-top" />
      <div className="glow-blob-cyan-right" />

      {/* HERO SECTION */}
      <section className="pt-4 sm:pt-8 pb-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Box */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Red Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF334B] text-white border-2 border-[#1E1B4B] shadow-[3px_3px_0px_0px_#1E1B4B] text-xs font-black tracking-wider uppercase"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              REGISTRATIONS OPEN
            </motion.div>

            {/* Giant Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-[#1E1B4B]"
            >
              <span className="text-gradient-hackverse">Kernel Overriders</span>
              <br />
              Build. Break.
              <br />
              Belong.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-lg text-slate-700 font-bold max-w-xl leading-relaxed"
            >
              A student-run tech community running online hackathons, coding competitions, workshops and cybersecurity events.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link to="/events">
                <Button variant="primary" size="lg" className="text-sm font-black py-4 px-8">
                  Explore events
                </Button>
              </Link>

              <Link to="/about">
                <Button variant="secondary" size="lg" className="text-sm font-black py-4 px-8">
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
            {featuredEvent ? (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] space-y-6 relative">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                      {featuredEvent.status === 'COMPLETED' ? 'PAST EVENT' : featuredEvent.status === 'LIVE' ? 'LIVE NOW' : 'NEXT UP'}
                    </span>
                    <Badge variant={featuredEvent.status === 'LIVE' ? 'pink' : featuredEvent.status === 'COMPLETED' ? 'green' : 'yellow'}>
                      {featuredEvent.status === 'COMPLETED' ? 'CONCLUDED' : featuredEvent.status === 'LIVE' ? 'LIVE' : 'UPCOMING'}
                    </Badge>
                  </div>
                  <h3 className="text-3xl font-black text-[#1E1B4B]">{featuredEvent.title}</h3>
                  <p className="text-sm font-semibold text-slate-600 line-clamp-2">{featuredEvent.description}</p>
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
                {(featuredEvent.prizePool || featuredEvent.teamSize) && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {featuredEvent.prizePool && (
                      <span className="px-3 py-1.5 rounded-full bg-[#F7D046] border-2 border-[#1E1B4B] text-xs font-black shadow-[2px_2px_0px_0px_#1E1B4B]">
                        {featuredEvent.prizePool}
                      </span>
                    )}
                    {featuredEvent.teamSize && (
                      <span className="px-3 py-1.5 rounded-full bg-[#5CE1E6] border-2 border-[#1E1B4B] text-xs font-black shadow-[2px_2px_0px_0px_#1E1B4B]">
                        {featuredEvent.teamSize}
                      </span>
                    )}
                  </div>
                )}

                {/* Spotlight CTA Button based on status */}
                {featuredEvent.status === 'COMPLETED' ? (
                  <Link to="/results" className="block w-full">
                    <Button variant="yellow" className="w-full py-4 text-sm font-black">
                      🏆 Event Completed — View Winners & Leaderboard
                    </Button>
                  </Link>
                ) : featuredEvent.status === 'LIVE' && featuredEvent.isSubmissionEnabled && featuredEvent.submissionLink ? (
                  <a href={featuredEvent.submissionLink} target="_blank" rel="noreferrer" className="block w-full">
                    <Button variant="green" className="w-full py-4 text-sm font-black animate-pulse">
                      🚀 Submit Project (Google Form)
                    </Button>
                  </a>
                ) : featuredEvent.isRegistrationEnabled !== false && featuredEvent.registrationLink ? (
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
            ) : (
              /* Empty State Spotlight Card when no events exist */
              <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] text-center space-y-5">
                <Badge variant="purple">SPOTLIGHT PORTAL</Badge>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1E1B4B]">No Active Events Created Yet</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-bold leading-relaxed">
                    Access the Admin Portal to create, launch, and manage real hackathons with Google Forms registration.
                  </p>
                </div>
                <Link to="/admin-portal" className="block w-full">
                  <Button variant="primary" className="w-full py-4 text-xs font-black cursor-pointer">
                    Go to Admin Portal
                  </Button>
                </Link>
              </div>
            )}
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

