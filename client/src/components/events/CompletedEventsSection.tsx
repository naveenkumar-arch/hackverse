import React from 'react';
import { motion } from 'framer-motion';
import { ManagedEvent } from '../../utils/eventManagementStorage';
import { Trophy, Award, Calendar, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

interface CompletedEventsSectionProps {
  events: ManagedEvent[];
}

export const CompletedEventsSection: React.FC<CompletedEventsSectionProps> = ({ events }) => {
  const completedList = events.filter((e) => e.status === 'COMPLETED');

  const glassCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.09)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)',
  };

  if (completedList.length === 0) {
    return (
      <div style={{ ...glassCard, borderRadius: '1.5rem' }} className="p-12 text-center space-y-3">
        <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
        <h4 className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>No Completed Events Yet</h4>
        <p className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.70)' }}>
          Events will appear in this showcase once concluded by the organizers.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div
          style={{
            background: 'rgba(251,191,36,0.15)',
            border: '1px solid rgba(251,191,36,0.30)',
          }}
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
        >
          <Trophy className="w-5 h-5 text-amber-400" />
        </div>
        <h3 className="text-2xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Completed Events Showcase & Hall of Fame</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {completedList.map((evt) => (
          <motion.div
            key={evt.id}
            whileHover={{ y: -4 }}
            style={{ ...glassCard, borderRadius: '1.5rem' }}
            className="overflow-hidden space-y-4"
          >
            {/* Banner image */}
            <div className="relative h-48 w-full">
              <img src={evt.imageLink} alt={evt.title} className="w-full h-full object-cover" />
              <div
                style={{ background: 'linear-gradient(to top, rgba(5,7,20,0.95) 0%, rgba(5,7,20,0.40) 50%, transparent 100%)' }}
                className="absolute inset-0"
              />
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <Badge variant="green">
                  <Sparkles className="w-3 h-3 mr-1" /> EVENT CONCLUDED
                </Badge>
                <h4 className="text-2xl font-black pt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{evt.title}</h4>
              </div>
            </div>

            {/* Winners Section */}
            <div className="p-6 space-y-4">
              <p className="text-xs font-medium leading-relaxed" style={{ color: 'rgba(148,163,184,0.75)' }}>{evt.description}</p>

              {evt.winners && (
                <div
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '1rem',
                  }}
                  className="p-4 space-y-3"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" /> OFFICIAL WINNERS HALL OF FAME
                  </span>

                  <div className="space-y-2 text-xs font-semibold">
                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
                      <span className="font-extrabold">🥇 1st Place:</span>
                      <span className="font-black text-white text-sm">{evt.winners.firstPlace}</span>
                    </div>

                    {evt.winners.secondPlace && (
                      <div className="flex justify-between items-center p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                        <span className="font-extrabold">🥈 2nd Place:</span>
                        <span className="font-black text-white text-sm">{evt.winners.secondPlace}</span>
                      </div>
                    )}

                    {evt.winners.thirdPlace && (
                      <div className="flex justify-between items-center p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                        <span className="font-extrabold">🥉 3rd Place:</span>
                        <span className="font-black text-white text-sm">{evt.winners.thirdPlace}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
