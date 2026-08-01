import React from 'react';
import { ManagedEvent } from '../../utils/eventManagementStorage';
import { Trophy, Award, Calendar, Sparkles } from 'lucide-react';

interface CompletedEventsSectionProps {
  events: ManagedEvent[];
}

export const CompletedEventsSection: React.FC<CompletedEventsSectionProps> = ({ events }) => {
  const completedList = events.filter((e) => e.status === 'COMPLETED');

  if (completedList.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] space-y-3">
        <Trophy className="w-12 h-12 text-[#1E1B4B] mx-auto" />
        <h4 className="text-xl font-black text-[#1E1B4B]">No Completed Events Yet</h4>
        <p className="text-xs text-slate-600 font-bold">
          Events will appear in this showcase once concluded by the organizers.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b-2 border-[#1E1B4B]/10 pb-3">
        <div className="w-10 h-10 rounded-2xl bg-[#F7D046] border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B] flex items-center justify-center">
          <Trophy className="w-5 h-5 text-[#1E1B4B]" />
        </div>
        <h3 className="text-2xl font-black text-[#1E1B4B]">Completed Events Showcase & Hall of Fame</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {completedList.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-3xl overflow-hidden border-2 border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] space-y-4 hover:-translate-y-1 transition-all"
          >
            {/* Banner image */}
            <div className="relative h-48 w-full">
              <img src={evt.imageLink} alt={evt.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B] via-[#1E1B4B]/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#78E29A] text-[#1E1B4B] px-3 py-1 rounded-full border-2 border-[#1E1B4B] inline-flex items-center gap-1 shadow-[2px_2px_0px_0px_#1E1B4B]">
                  <Sparkles className="w-3 h-3" /> EVENT CONCLUDED
                </span>
                <h4 className="text-2xl font-black">{evt.title}</h4>
              </div>
            </div>

            {/* Winners Section */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-700 font-bold line-clamp-2">{evt.description}</p>

              {evt.winners && (
                <div className="p-4 rounded-2xl bg-[#FAF7EE] border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#1E1B4B] flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-[#1E1B4B]" /> OFFICIAL WINNERS HALL OF FAME
                  </span>

                  <div className="space-y-2 text-xs font-bold text-[#1E1B4B]">
                    <div className="flex justify-between items-center bg-[#F7D046] p-2.5 rounded-xl border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B]">
                      <span className="text-[#1E1B4B] font-black">🥇 1st Place:</span>
                      <span className="font-black text-[#1E1B4B] text-sm">{evt.winners.firstPlace}</span>
                    </div>

                    {evt.winners.secondPlace && (
                      <div className="flex justify-between items-center bg-[#5CE1E6] p-2.5 rounded-xl border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B]">
                        <span className="text-[#1E1B4B] font-black">🥈 2nd Place:</span>
                        <span className="font-black text-[#1E1B4B] text-sm">{evt.winners.secondPlace}</span>
                      </div>
                    )}

                    {evt.winners.thirdPlace && (
                      <div className="flex justify-between items-center bg-[#78E29A] p-2.5 rounded-xl border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B]">
                        <span className="text-[#1E1B4B] font-black">🥉 3rd Place:</span>
                        <span className="font-black text-[#1E1B4B] text-sm">{evt.winners.thirdPlace}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
