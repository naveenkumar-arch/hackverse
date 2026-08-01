import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { eventManagementStorage, ManagedEvent } from '../utils/eventManagementStorage';
import { Trophy, Award, Sparkles } from 'lucide-react';

export const Results: React.FC = () => {
  const [completedEvents, setCompletedEvents] = useState<ManagedEvent[]>([]);

  useEffect(() => {
    const events = eventManagementStorage.getEvents();
    setCompletedEvents(events.filter((e) => e.status === 'COMPLETED'));
  }, []);

  return (
    <div className="space-y-12 py-8">
      <SectionHeader
        eyebrow="OFFICIAL LEADERBOARDS"
        title="Competition Results & Winners"
        subtitle="Celebrate outstanding student projects, champion teams, and prize winners across all HackVerse events."
      />

      {completedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {completedEvents.map((evt) => (
            <div key={evt.id} className="glass-card bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{evt.title}</h3>
                  <p className="text-xs text-slate-500 font-bold">Event Date: {evt.eventDate}</p>
                </div>
              </div>

              {evt.winners && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-purple-50 to-pink-50 border border-amber-200 space-y-2 text-xs font-bold text-slate-800">
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-amber-200 shadow-sm">
                    <span className="text-amber-600 font-black">🥇 First Place:</span>
                    <span className="font-extrabold text-slate-900">{evt.winners.firstPlace}</span>
                  </div>
                  {evt.winners.secondPlace && (
                    <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                      <span className="text-slate-500 font-black">🥈 Second Place:</span>
                      <span className="font-bold text-slate-800">{evt.winners.secondPlace}</span>
                    </div>
                  )}
                  {evt.winners.thirdPlace && (
                    <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-amber-100 shadow-sm">
                      <span className="text-amber-800 font-black">🥉 Third Place:</span>
                      <span className="font-bold text-slate-800">{evt.winners.thirdPlace}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card bg-white rounded-3xl p-12 text-center border border-purple-100 shadow-xl max-w-md mx-auto space-y-3">
          <Trophy className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-xl font-black text-slate-900">No Results Available</h3>
          <p className="text-xs text-slate-500 font-medium">
            Competition leaderboards and winner announcements will appear here once hackathons conclude.
          </p>
        </div>
      )}
    </div>
  );
};
