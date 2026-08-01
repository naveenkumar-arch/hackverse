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
      <div className="glass-card bg-white rounded-3xl p-12 text-center border border-purple-100 shadow-xl space-y-3">
        <Trophy className="w-12 h-12 text-slate-300 mx-auto" />
        <h4 className="text-xl font-black text-slate-900">No Completed Events Yet</h4>
        <p className="text-xs text-slate-500 font-medium">
          Events will appear in this showcase once concluded by the organizers.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-amber-500" />
        <h3 className="text-2xl font-black text-slate-900">Completed Events Showcase & Hall of Fame</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {completedList.map((evt) => (
          <div
            key={evt.id}
            className="glass-card bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-xl space-y-4 hover:shadow-2xl transition-all"
          >
            {/* Banner image */}
            <div className="relative h-48 w-full">
              <img src={evt.imageLink} alt={evt.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-500/30 inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> EVENT CONCLUDED
                </span>
                <h4 className="text-xl font-black">{evt.title}</h4>
              </div>
            </div>

            {/* Winners Section */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 font-medium line-clamp-2">{evt.description}</p>

              {evt.winners && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/80 via-purple-50/80 to-pink-50/80 border border-amber-200/60 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" /> OFFICIAL WINNERS HALL OF FAME
                  </span>

                  <div className="space-y-1.5 text-xs font-bold text-slate-800">
                    <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-amber-200 shadow-sm">
                      <span className="text-amber-600 font-extrabold">🥇 1st Place:</span>
                      <span className="font-extrabold text-slate-900">{evt.winners.firstPlace}</span>
                    </div>

                    {evt.winners.secondPlace && (
                      <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-slate-500 font-extrabold">🥈 2nd Place:</span>
                        <span className="font-bold text-slate-800">{evt.winners.secondPlace}</span>
                      </div>
                    )}

                    {evt.winners.thirdPlace && (
                      <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-amber-100 shadow-sm">
                        <span className="text-amber-800 font-extrabold">🥉 3rd Place:</span>
                        <span className="font-bold text-slate-800">{evt.winners.thirdPlace}</span>
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
