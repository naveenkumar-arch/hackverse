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
        subtitle="Celebrate outstanding student projects, champion teams, and prize winners across all Kernel Overriders events."
      />

      {completedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {completedEvents.map((evt) => (
            <div key={evt.id} className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#F7D046] text-[#1E1B4B] border-2 border-[#1E1B4B] shadow-[3px_3px_0px_0px_#1E1B4B] flex items-center justify-center font-bold">
                  <Trophy className="w-7 h-7 text-[#1E1B4B]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#1E1B4B]">{evt.title}</h3>
                  <p className="text-xs text-slate-600 font-bold">Event Date: {evt.eventDate}</p>
                </div>
              </div>

              {evt.winners && (
                <div className="p-4 rounded-2xl bg-[#FAF7EE] border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] space-y-3 text-xs font-bold text-[#1E1B4B]">
                  <div className="flex justify-between items-center bg-[#F7D046] p-3 rounded-xl border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B]">
                    <span className="text-[#1E1B4B] font-black uppercase flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#1E1B4B]" /> 🥇 First Place:
                    </span>
                    <span className="font-black text-[#1E1B4B] text-sm">{evt.winners.firstPlace}</span>
                  </div>
                  {evt.winners.secondPlace && (
                    <div className="flex justify-between items-center bg-[#5CE1E6] p-3 rounded-xl border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B]">
                      <span className="text-[#1E1B4B] font-black uppercase">🥈 Second Place:</span>
                      <span className="font-black text-[#1E1B4B] text-sm">{evt.winners.secondPlace}</span>
                    </div>
                  )}
                  {evt.winners.thirdPlace && (
                    <div className="flex justify-between items-center bg-[#78E29A] p-3 rounded-xl border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B]">
                      <span className="text-[#1E1B4B] font-black uppercase">🥉 Third Place:</span>
                      <span className="font-black text-[#1E1B4B] text-sm">{evt.winners.thirdPlace}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] max-w-md mx-auto space-y-3">
          <Trophy className="w-12 h-12 text-[#1E1B4B] mx-auto" />
          <h3 className="text-xl font-black text-[#1E1B4B]">No Results Available</h3>
          <p className="text-xs text-slate-600 font-bold">
            Competition leaderboards and winner announcements will appear here once hackathons conclude.
          </p>
        </div>
      )}
    </div>
  );
};
