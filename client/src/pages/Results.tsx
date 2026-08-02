import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { eventManagementStorage, ManagedEvent } from '../utils/eventManagementStorage';
import { Trophy, Award, Sparkles } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const Results: React.FC = () => {
  const [completedEvents, setCompletedEvents] = useState<ManagedEvent[]>([]);

  useEffect(() => {
    const events = eventManagementStorage.getEvents();
    setCompletedEvents(events.filter((e) => e.status === 'COMPLETED'));
  }, []);

  const glassCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.09)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)',
  };

  return (
    <div className="space-y-12 py-8">
      <SectionHeader
        eyebrow="OFFICIAL LEADERBOARDS"
        title="Competition Results & Winners"
        subtitle="Celebrate outstanding student projects, champion teams, and prize winners across all Kernel Overriders events."
      />

      {completedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {completedEvents.map((evt) => (
            <motion.div
              key={evt.id}
              whileHover={{ y: -4 }}
              style={{ ...glassCard, borderRadius: '1.5rem' }}
              className="p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-center gap-4">
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(251,191,36,0.20), rgba(251,191,36,0.10))',
                    border: '1px solid rgba(251,191,36,0.35)',
                    boxShadow: '0 0 20px rgba(251,191,36,0.15)',
                  }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold"
                >
                  <Trophy className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{evt.title}</h3>
                  <p className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.65)' }}>Event Date: {evt.eventDate}</p>
                </div>
              </div>

              {evt.winners && (
                <div
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '1rem',
                  }}
                  className="p-4 space-y-3 text-xs font-semibold"
                >
                  <div className="flex justify-between items-center p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
                    <span className="font-extrabold uppercase flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" /> 🥇 First Place:
                    </span>
                    <span className="font-black text-white text-sm">{evt.winners.firstPlace}</span>
                  </div>
                  {evt.winners.secondPlace && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                      <span className="font-extrabold uppercase">🥈 Second Place:</span>
                      <span className="font-black text-white text-sm">{evt.winners.secondPlace}</span>
                    </div>
                  )}
                  {evt.winners.thirdPlace && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                      <span className="font-extrabold uppercase">🥉 Third Place:</span>
                      <span className="font-black text-white text-sm">{evt.winners.thirdPlace}</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div
          style={{ ...glassCard, borderRadius: '1.5rem', maxWidth: '28rem', margin: '0 auto' }}
          className="p-12 text-center space-y-3"
        >
          <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>No Results Available</h3>
          <p className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.70)' }}>
            Competition leaderboards and winner announcements will appear here once hackathons conclude.
          </p>
        </div>
      )}
    </div>
  );
};
