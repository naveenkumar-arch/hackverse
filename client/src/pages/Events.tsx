import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { eventManagementStorage, ManagedEvent } from '../utils/eventManagementStorage';
import { handleImageError } from '../utils/imageUtils';
import { LiveEventTimer } from '../components/events/LiveEventTimer';
import { CompletedEventsSection } from '../components/events/CompletedEventsSection';
import { Search, ExternalLink, Sparkles, Trophy, Calendar, CheckCircle2, Play } from 'lucide-react';

export const Events: React.FC = () => {
  const [managedEvents, setManagedEvents] = useState<ManagedEvent[]>([]);
  const [activeTab, setActiveTab] = useState<'UPCOMING_LIVE' | 'COMPLETED'>('UPCOMING_LIVE');
  const [search, setSearch] = useState('');

  const loadManagedEvents = () => {
    setManagedEvents(eventManagementStorage.getEvents());
  };

  useEffect(() => {
    loadManagedEvents();
    const handleUpdate = () => loadManagedEvents();
    window.addEventListener('ko_managed_events_updated', handleUpdate);
    return () => window.removeEventListener('ko_managed_events_updated', handleUpdate);
  }, []);

  const activeEvents = managedEvents.filter(
    (e) => (e.status === 'UPCOMING' || e.status === 'LIVE') && e.title.toLowerCase().includes(search.toLowerCase())
  );

  const glassCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.09)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)',
  };

  return (
    <div className="space-y-16 py-6">
      <SectionHeader
        eyebrow="GLOBAL COMPETITIONS"
        title="Explore Live Hackathons & Global Contests"
        subtitle="Register via Google Forms, track live hackathons with real-time countdown timers, and view past winners."
      />

      {/* SECTION 1: Active & Live Events Feed */}
      <div className="space-y-8">
        <div
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          className="flex items-center gap-2 pb-3"
        >
          <Sparkles className="w-6 h-6 text-violet-400" style={{ filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.6))' }} />
          <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Active & Live Events Feed</h2>
        </div>

        {/* Search Bar */}
        <div
          style={{
            ...glassCard,
            borderRadius: '1.5rem',
            maxWidth: '36rem',
            margin: '0 auto',
          }}
          className="p-4"
        >
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.55)' }} />
            <input
              type="text"
              placeholder="Search active hackathons by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: '#E2E8F0',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: '0.875rem',
                backdropFilter: 'blur(10px)',
              }}
              className="w-full pl-11 pr-4 py-2.5 text-xs font-medium focus:outline-none placeholder-slate-500"
            />
          </div>
        </div>

        {/* Active & Live Events Cards Grid */}
        {activeEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeEvents.map((evt) => (
              <div
                key={evt.id}
                style={{
                  ...glassCard,
                  borderRadius: '1.5rem',
                  border: '1px solid rgba(255,255,255,0.09)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                className="overflow-hidden space-y-0 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_16px_60px_rgba(0,0,0,0.55),0_0_24px_rgba(139,92,246,0.12)]"
              >
                <div>
                  {/* Poster image */}
                  <div className="relative h-56 w-full">
                    <img
                      src={evt.imageLink}
                      alt={evt.title}
                      onError={(e) => handleImageError(e, evt.imageLink)}
                      className="w-full h-full object-cover"
                    />
                    <div
                      style={{ background: 'linear-gradient(to top, rgba(5,7,20,0.95) 0%, rgba(5,7,20,0.50) 50%, transparent 100%)' }}
                      className="absolute inset-0"
                    />

                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                      <Badge variant={evt.status === 'LIVE' ? 'pink' : 'yellow'}>
                        {evt.status === 'LIVE' ? 'EVENT STARTED' : 'REGISTRATION OPEN'}
                      </Badge>
                      {evt.status === 'LIVE' && evt.liveStartTime && (
                        <LiveEventTimer liveStartTime={evt.liveStartTime} durationHours={evt.durationHours} />
                      )}
                    </div>

                    <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                      <h4 className="text-2xl font-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{evt.title}</h4>
                      <p className="text-xs font-medium flex items-center gap-2" style={{ color: 'rgba(226,232,240,0.70)' }}>
                        <Calendar className="w-3.5 h-3.5 text-amber-400" /> Date: {evt.eventDate} ({evt.startTime} - {evt.endTime}) &bull; {evt.durationHours} Hours
                      </p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs font-medium leading-relaxed" style={{ color: 'rgba(148,163,184,0.75)' }}>{evt.description}</p>
                    {(evt.prizePool || evt.teamSize) && (
                      <div className="flex flex-wrap gap-2">
                        {evt.prizePool && <Badge variant="yellow">{evt.prizePool}</Badge>}
                        {evt.teamSize && <Badge variant="blue">{evt.teamSize}</Badge>}
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div
                  style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                  className="p-6 space-y-3"
                >
                  {evt.isRegistrationEnabled !== false && evt.registrationLink && (
                    <a href={evt.registrationLink} target="_blank" rel="noreferrer" className="block w-full">
                      <button
                        style={{
                          background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                          border: '1px solid rgba(139,92,246,0.45)',
                          boxShadow: '0 4px 20px rgba(139,92,246,0.30)',
                          borderRadius: '0.875rem',
                          color: '#ffffff',
                          fontWeight: 700,
                          transition: 'all 0.2s ease',
                        }}
                        className="w-full py-3.5 text-xs flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(139,92,246,0.45)]"
                      >
                        <ExternalLink className="w-4 h-4" /> Click here to register (Google Form)
                      </button>
                    </a>
                  )}

                  {evt.isSubmissionEnabled && evt.submissionLink && (
                    <a href={evt.submissionLink} target="_blank" rel="noreferrer" className="block w-full">
                      <button
                        style={{
                          background: 'linear-gradient(135deg, #10FDA5 0%, #059669 100%)',
                          border: '1px solid rgba(16,253,165,0.40)',
                          boxShadow: '0 4px 20px rgba(16,253,165,0.25)',
                          borderRadius: '0.875rem',
                          color: '#0a0a0f',
                          fontWeight: 700,
                          transition: 'all 0.2s ease',
                        }}
                        className="w-full py-3.5 text-xs flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(16,253,165,0.35)] animate-pulse"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Click this link to submit your project (Google Form)
                      </button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              ...glassCard,
              borderRadius: '1.5rem',
            }}
            className="p-8 text-center space-y-2"
          >
            <p className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.65)' }}>No active events found matching your search.</p>
          </div>
        )}
      </div>

      {/* SECTION 2: Completed Events Showcase */}
      <div className="pt-6">
        <CompletedEventsSection events={managedEvents} />
      </div>
    </div>
  );
};
