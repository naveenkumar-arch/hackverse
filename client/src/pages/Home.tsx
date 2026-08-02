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

  const computeTimeLeft = (evt: ManagedEvent | undefined) => {
    if (!evt) return { days: 0, hrs: 0, min: 0, sec: 0 };
    const targetDate = evt.status === 'LIVE' && evt.liveStartTime
      ? new Date(evt.liveStartTime + evt.durationHours * 3600 * 1000)
      : new Date(`${evt.eventDate}T${evt.startTime || '00:00'}:00`);
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

  const glassCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.09)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)',
  };

  const statCards = [
    { label: 'Community members', val: '12k+', gradient: 'linear-gradient(135deg, #8B5CF6, #60A5FA)' },
    { label: 'Events hosted', val: '48', gradient: 'linear-gradient(135deg, #22D3EE, #34D399)' },
    { label: 'Projects shipped', val: '310', gradient: 'linear-gradient(135deg, #F472B6, #FB923C)' },
    { label: 'Prizes awarded', val: '₹9L+', gradient: 'linear-gradient(135deg, #FBBF24, #FDE68A)' },
  ];

  return (
    <div className="space-y-12 pb-16 relative overflow-hidden">
      {/* Glow blobs */}
      <div className="glow-blob-cream-top" />
      <div className="glow-blob-cyan-right" />

      {/* HERO SECTION */}
      <section className="pt-4 sm:pt-8 pb-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Box */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(96,165,250,0.15))',
                border: '1px solid rgba(139,92,246,0.45)',
                boxShadow: '0 4px 20px rgba(139,92,246,0.20)',
                backdropFilter: 'blur(12px)',
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-violet-300 text-xs font-semibold tracking-widest uppercase"
            >
              <Sparkles className="w-4 h-4 text-violet-400" style={{ filter: 'drop-shadow(0 0 6px rgba(139,92,246,0.7))' }} />
              REGISTRATIONS OPEN
            </motion.div>

            {/* Giant Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
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
              className="text-base sm:text-lg max-w-xl leading-relaxed font-medium"
              style={{ color: 'rgba(148,163,184,0.85)' }}
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
                <Button variant="primary" size="lg" className="text-sm font-bold py-4 px-8">
                  Explore events
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="lg" className="text-sm font-bold py-4 px-8">
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
              <div
                style={{
                  ...glassCard,
                  borderRadius: '1.75rem',
                  border: '1px solid rgba(139,92,246,0.22)',
                }}
                className="p-6 sm:p-8 space-y-6 relative"
              >
                {/* Purple glow top-right */}
                <div style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(139,92,246,0.20), transparent 70%)',
                  filter: 'blur(30px)',
                  pointerEvents: 'none',
                }} />

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(148,163,184,0.6)' }}>
                      {featuredEvent.status === 'COMPLETED' ? 'PAST EVENT' : featuredEvent.status === 'LIVE' ? 'LIVE NOW' : 'NEXT UP'}
                    </span>
                    <Badge variant={featuredEvent.status === 'LIVE' ? 'pink' : featuredEvent.status === 'COMPLETED' ? 'green' : 'yellow'}>
                      {featuredEvent.status === 'COMPLETED' ? 'CONCLUDED' : featuredEvent.status === 'LIVE' ? 'LIVE' : 'UPCOMING'}
                    </Badge>
                  </div>
                  <h3 className="text-3xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{featuredEvent.title}</h3>
                  <p className="text-sm font-medium line-clamp-2" style={{ color: 'rgba(148,163,184,0.75)' }}>{featuredEvent.description}</p>
                </div>

                {/* Countdown Timer Row */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { label: 'DAYS', val: timeLeft.days },
                    { label: 'HRS', val: timeLeft.hrs },
                    { label: 'MIN', val: timeLeft.min },
                    { label: 'SEC', val: timeLeft.sec },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(139,92,246,0.10)',
                        border: '1px solid rgba(139,92,246,0.25)',
                        borderRadius: '0.875rem',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
                      }}
                      className="p-2.5"
                    >
                      <div
                        className="text-xl sm:text-2xl font-black"
                        style={{
                          background: 'linear-gradient(135deg, #A78BFA, #60A5FA)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >{item.val}</div>
                      <div className="text-[10px] font-semibold tracking-widest" style={{ color: 'rgba(148,163,184,0.55)' }}>{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags Row */}
                {(featuredEvent.prizePool || featuredEvent.teamSize) && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {featuredEvent.prizePool && (
                      <Badge variant="yellow">{featuredEvent.prizePool}</Badge>
                    )}
                    {featuredEvent.teamSize && (
                      <Badge variant="blue">{featuredEvent.teamSize}</Badge>
                    )}
                  </div>
                )}

                {/* CTA Button */}
                {featuredEvent.status === 'COMPLETED' ? (
                  <Link to="/results" className="block w-full">
                    <Button variant="yellow" className="w-full py-4 text-sm font-bold">
                      🏆 Event Completed — View Winners & Leaderboard
                    </Button>
                  </Link>
                ) : featuredEvent.status === 'LIVE' && featuredEvent.isSubmissionEnabled && featuredEvent.submissionLink ? (
                  <a href={featuredEvent.submissionLink} target="_blank" rel="noreferrer" className="block w-full">
                    <Button variant="green" className="w-full py-4 text-sm font-bold animate-pulse">
                      🚀 Submit Project (Google Form)
                    </Button>
                  </a>
                ) : featuredEvent.isRegistrationEnabled !== false && featuredEvent.registrationLink ? (
                  <a href={featuredEvent.registrationLink} target="_blank" rel="noreferrer" className="block w-full">
                    <Button variant="primary" className="w-full py-4 text-sm font-bold">
                      Register Now (Google Form)
                    </Button>
                  </a>
                ) : (
                  <Link to="/events" className="block w-full">
                    <Button variant="primary" className="w-full py-4 text-sm font-bold">
                      View details
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              /* Empty State */
              <div
                style={{ ...glassCard, borderRadius: '1.75rem', border: '1px solid rgba(139,92,246,0.20)' }}
                className="p-8 sm:p-10 text-center space-y-5"
              >
                <Badge variant="purple">SPOTLIGHT PORTAL</Badge>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>No Active Events Created Yet</h3>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed" style={{ color: 'rgba(148,163,184,0.70)' }}>
                    Access the Admin Portal to create, launch, and manage real hackathons with Google Forms registration.
                  </p>
                </div>
                <Link to="/admin-portal" className="block w-full">
                  <Button variant="primary" className="w-full py-4 text-xs font-bold cursor-pointer">
                    Go to Admin Portal
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* MARQUEE TICKER BAR */}
      <section
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(34,211,238,0.10))',
          border: '1px solid rgba(139,92,246,0.25)',
          borderRadius: '1rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
        }}
        className="py-3.5 overflow-hidden whitespace-nowrap"
      >
        <div
          className="inline-flex gap-8 text-sm font-semibold uppercase tracking-widest animate-marquee"
          style={{
            background: 'linear-gradient(90deg, #A78BFA, #60A5FA, #34D399, #22D3EE, #A78BFA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '200%',
          }}
        >
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
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            style={{
              ...glassCard,
              borderRadius: '1.25rem',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            className="p-6 text-center space-y-1 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
          >
            <div
              className="text-3xl sm:text-4xl font-black"
              style={{
                background: stat.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.25))',
              }}
            >{stat.val}</div>
            <div className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.65)' }}>{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* MISSION & VISION CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, rgba(251,191,36,0.10), rgba(251,191,36,0.05))',
            border: '1px solid rgba(251,191,36,0.25)',
            borderRadius: '1.5rem',
            boxShadow: '0 8px 40px rgba(0,0,0,0.35), 0 0 30px rgba(251,191,36,0.06)',
            backdropFilter: 'blur(16px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          className="p-8 space-y-4 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(0,0,0,0.45),0_0_40px_rgba(251,191,36,0.10)]"
        >
          <div
            style={{
              background: 'rgba(251,191,36,0.12)',
              border: '1px solid rgba(251,191,36,0.30)',
              boxShadow: '0 0 20px rgba(251,191,36,0.12)',
            }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
          >
            <Code2 className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="text-3xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our mission</h3>
          <p className="text-sm font-medium leading-relaxed" style={{ color: 'rgba(148,163,184,0.80)' }}>
            Give every student a place to build in public — free events, honest feedback, and peers who care about craft.
          </p>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            background: 'linear-gradient(135deg, rgba(34,211,238,0.10), rgba(34,211,238,0.05))',
            border: '1px solid rgba(34,211,238,0.22)',
            borderRadius: '1.5rem',
            boxShadow: '0 8px 40px rgba(0,0,0,0.35), 0 0 30px rgba(34,211,238,0.06)',
            backdropFilter: 'blur(16px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          className="p-8 space-y-4 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(0,0,0,0.45),0_0_40px_rgba(34,211,238,0.12)]"
        >
          <div
            style={{
              background: 'rgba(34,211,238,0.12)',
              border: '1px solid rgba(34,211,238,0.30)',
              boxShadow: '0 0 20px rgba(34,211,238,0.10)',
            }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
          >
            <Rocket className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-3xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our vision</h3>
          <p className="text-sm font-medium leading-relaxed" style={{ color: 'rgba(148,163,184,0.80)' }}>
            The most trusted independent student tech community in the country, running events that campuses copy.
          </p>
        </motion.div>
      </section>
    </div>
  );
};
