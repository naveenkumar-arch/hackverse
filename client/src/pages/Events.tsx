import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { eventManagementStorage, ManagedEvent } from '../utils/eventManagementStorage';
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

  return (
    <div className="space-y-16 py-6">
      <SectionHeader
        eyebrow="GLOBAL COMPETITIONS"
        title="Explore Live Hackathons & Global Contests"
        subtitle="Register via Google Forms, track live hackathons with real-time countdown timers, and view past winners."
      />

      {/* SECTION 1: Active & Live Events Feed */}
      <div className="space-y-8">
        <div className="flex items-center gap-2 border-b-2 border-[#1E1B4B]/10 pb-3">
          <Sparkles className="w-6 h-6 text-[#FF334B]" />
          <h2 className="text-2xl font-black text-[#1E1B4B]">Active & Live Events Feed</h2>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-3xl p-4 border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search active hackathons by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#FAF7EE] text-[#1E1B4B] placeholder-slate-500 rounded-2xl border-2 border-[#1E1B4B] text-xs font-bold focus:outline-none"
            />
          </div>
        </div>

        {/* Active & Live Events Cards Grid */}
        {activeEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-3xl overflow-hidden border-2 border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] space-y-5 hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Poster image with Badges & Live Timer */}
                  <div className="relative h-56 w-full">
                    <img src={evt.imageLink} alt={evt.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B] via-[#1E1B4B]/40 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                      <Badge variant={evt.status === 'LIVE' ? 'pink' : 'yellow'}>
                        {evt.status === 'LIVE' ? 'EVENT STARTED' : 'REGISTRATION OPEN'}
                      </Badge>

                      {evt.status === 'LIVE' && evt.liveStartTime && (
                        <LiveEventTimer liveStartTime={evt.liveStartTime} durationHours={evt.durationHours} />
                      )}
                    </div>

                    <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                      <h4 className="text-2xl font-black">{evt.title}</h4>
                      <p className="text-xs font-bold text-slate-200 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#F7D046]" /> Date: {evt.eventDate} ({evt.startTime} - {evt.endTime}) &bull; {evt.durationHours} Hours
                      </p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-700 font-bold leading-relaxed">{evt.description}</p>
                    {(evt.prizePool || evt.teamSize) && (
                      <div className="flex flex-wrap gap-2">
                        {evt.prizePool && (
                          <span className="px-3 py-1.5 rounded-full bg-[#F7D046] border-2 border-[#1E1B4B] text-xs font-black shadow-[2px_2px_0px_0px_#1E1B4B]">
                            {evt.prizePool}
                          </span>
                        )}
                        {evt.teamSize && (
                          <span className="px-3 py-1.5 rounded-full bg-[#5CE1E6] border-2 border-[#1E1B4B] text-xs font-black shadow-[2px_2px_0px_0px_#1E1B4B]">
                            {evt.teamSize}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Call-to-action Action Buttons */}
                <div className="p-6 border-t-2 border-[#1E1B4B]/10 space-y-3">
                  {/* Registration Google Form Button (Field 5 Toggle) */}
                  {evt.isRegistrationEnabled !== false && evt.registrationLink && (
                    <a href={evt.registrationLink} target="_blank" rel="noreferrer" className="block w-full">
                      <button className="w-full py-3.5 rounded-2xl bg-[#FF334B] text-white font-black text-xs border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] hover:shadow-[6px_6px_0px_0px_#1E1B4B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer">
                        <ExternalLink className="w-4 h-4" /> Click here to register (Google Form)
                      </button>
                    </a>
                  )}

                  {/* Project Submission Link Toggle Button (Field 6 Toggle) */}
                  {evt.isSubmissionEnabled && evt.submissionLink && (
                    <a href={evt.submissionLink} target="_blank" rel="noreferrer" className="block w-full">
                      <button className="w-full py-3.5 rounded-2xl bg-[#78E29A] text-[#1E1B4B] font-black text-xs border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] hover:shadow-[6px_6px_0px_0px_#1E1B4B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse">
                        <CheckCircle2 className="w-4 h-4" /> Click this link to submit your project (Google Form)
                      </button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] space-y-2">
            <p className="text-xs font-bold text-slate-600">No active events found matching your search.</p>
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
