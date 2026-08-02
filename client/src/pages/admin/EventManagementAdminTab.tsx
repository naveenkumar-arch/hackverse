import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../../components/common/Badge';
import { eventManagementStorage, ManagedEvent } from '../../utils/eventManagementStorage';
import {
  Plus,
  Play,
  CheckCircle2,
  Trophy,
  ToggleLeft,
  ToggleRight,
  Clock,
  ExternalLink,
  Trash2,
  X,
  Sparkles,
  Calendar,
  Image as ImageIcon,
  Link as LinkIcon,
  ShieldAlert,
} from 'lucide-react';

export const EventManagementAdminTab: React.FC = () => {
  const [events, setEvents] = useState<ManagedEvent[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedWinnerEvent, setSelectedWinnerEvent] = useState<ManagedEvent | null>(null);

  // Add Event Form State
  const [addForm, setAddForm] = useState({
    title: '',
    imageLink: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    description: '',
    eventDate: '2026-09-15',
    startTime: '09:00',
    endTime: '18:00',
    durationHours: 24,
    registrationLink: '',
    submissionLink: '',
  });

  // Winner Declaration Form State
  const [winnersForm, setWinnersForm] = useState({
    firstPlace: '',
    secondPlace: '',
    thirdPlace: '',
  });

  const [notice, setNotice] = useState('');

  const loadEvents = () => {
    setEvents(eventManagementStorage.getEvents());
  };

  useEffect(() => {
    loadEvents();
    const handleUpdate = () => loadEvents();
    window.addEventListener('ko_managed_events_updated', handleUpdate);
    return () => window.removeEventListener('ko_managed_events_updated', handleUpdate);
  }, []);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3500);
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.title || !addForm.registrationLink) {
      alert('Please fill in Event Title and Registration Link (Google Form URL).');
      return;
    }

    eventManagementStorage.addEvent({
      title: addForm.title,
      imageLink: addForm.imageLink || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
      description: addForm.description,
      eventDate: addForm.eventDate,
      startTime: addForm.startTime,
      endTime: addForm.endTime,
      durationHours: Number(addForm.durationHours) || 24,
      registrationLink: addForm.registrationLink,
      submissionLink: addForm.submissionLink || addForm.registrationLink,
    });

    setIsAddModalOpen(false);
    setAddForm({
      title: '',
      imageLink: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
      description: '',
      eventDate: '2026-09-15',
      startTime: '09:00',
      endTime: '18:00',
      durationHours: 24,
      registrationLink: '',
      submissionLink: '',
    });
    showNotice('New Event Created & Live Form Link Published!');
  };

  const handleStartEvent = (eventId: string, title: string) => {
    eventManagementStorage.startEvent(eventId);
    showNotice(`🚀 "${title}" is now LIVE with countdown timer active on Frontend!`);
  };

  const handleToggleSubmission = (eventId: string, currentStatus: boolean) => {
    eventManagementStorage.toggleSubmissionLink(eventId, !currentStatus);
    showNotice(`Project Submission link is now ${!currentStatus ? 'ENABLED' : 'DISABLED'} on Frontend.`);
  };

  const handleSaveWinners = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWinnerEvent) return;

    if (!winnersForm.firstPlace) {
      alert('Please enter at least the First Place Winner team details.');
      return;
    }

    eventManagementStorage.completeEventAndDeclareWinners(selectedWinnerEvent.id, winnersForm);
    setSelectedWinnerEvent(null);
    setWinnersForm({ firstPlace: '', secondPlace: '', thirdPlace: '' });
    showNotice(`🏆 Winners declared! Event moved to Completed Showcase on Frontend.`);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete event "${title}"?`)) {
      eventManagementStorage.deleteEvent(id);
      showNotice(`Deleted event "${title}"`);
    }
  };

  return (
    <div className="glass-card bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-purple-500/20 shadow-2xl space-y-6 text-slate-100">
      {notice && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-xs text-center shadow-lg animate-pulse">
          {notice}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-white">Event Creation & Live Control Panel</h3>
            <Badge variant="purple">{events.length} Total Events</Badge>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Create events with Google Form links, trigger real-time live timers, toggle submission links, and declare winners.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-extrabold text-xs shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {/* Event Control Cards */}
      <div className="space-y-4">
        {events.map((evt) => (
          <div key={evt.id} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <img src={evt.imageLink} alt={evt.title} className="w-16 h-16 rounded-2xl object-cover border border-purple-500/30 shadow-sm" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-black text-white">{evt.title}</h4>
                    <Badge variant={evt.status === 'LIVE' ? 'pink' : evt.status === 'COMPLETED' ? 'green' : 'purple'}>
                      {evt.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 font-medium line-clamp-1 mt-0.5">{evt.description}</p>
                  <div className="flex flex-wrap gap-4 text-[11px] font-bold text-slate-400 mt-1">
                    <span>📅 Date: {evt.eventDate} ({evt.startTime} - {evt.endTime})</span>
                    <span>⏳ Duration: {evt.durationHours} Hours</span>
                  </div>
                </div>
              </div>

              {/* Live Control Buttons */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                {evt.status === 'UPCOMING' && (
                  <button
                    onClick={() => handleStartEvent(evt.id, evt.title)}
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white font-black text-xs hover:bg-purple-700 shadow-md flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Start Event (Go Live)
                  </button>
                )}

                {evt.status === 'LIVE' && (
                  <button
                    onClick={() => {
                      setSelectedWinnerEvent(evt);
                      setWinnersForm({
                        firstPlace: evt.winners?.firstPlace || '',
                        secondPlace: evt.winners?.secondPlace || '',
                        thirdPlace: evt.winners?.thirdPlace || '',
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-white font-black text-xs hover:bg-amber-600 shadow-md flex items-center gap-1.5"
                  >
                    <Trophy className="w-3.5 h-3.5" /> Declare Winners & Complete
                  </button>
                )}

                <button
                  onClick={() => handleDeleteEvent(evt.id, evt.title)}
                  className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 transition-colors border border-rose-500/30"
                  title="Delete Event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sub-controls Bar */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
              <div className="flex items-center gap-4 font-semibold text-slate-300">
                <span>
                  <strong className="text-purple-400">Reg Form Link:</strong>{' '}
                  <a href={evt.registrationLink} target="_blank" rel="noreferrer" className="underline font-mono text-[11px] text-cyan-400">
                    Google Form Link <ExternalLink className="w-3 h-3 inline" />
                  </a>
                </span>

                {evt.submissionLink && (
                  <span>
                    <strong className="text-pink-400">Sub Form Link:</strong>{' '}
                    <a href={evt.submissionLink} target="_blank" rel="noreferrer" className="underline font-mono text-[11px] text-pink-400">
                      Google Form Link <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </span>
                )}
              </div>

              {/* Submission Toggle Control */}
              <button
                onClick={() => handleToggleSubmission(evt.id, evt.isSubmissionEnabled)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  evt.isSubmissionEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {evt.isSubmissionEnabled ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                Project Submission Link: {evt.isSubmissionEnabled ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-card bg-slate-900/90 rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-purple-500/30 shadow-2xl space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-black text-white">Create New Event</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEventSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kernel Overriders AI Hackathon 2026"
                  value={addForm.title}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Banner Image Link (URL)</label>
                <input
                  type="text"
                  value={addForm.imageLink}
                  onChange={(e) => setAddForm({ ...addForm, imageLink: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-semibold focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Event Description</label>
                <textarea
                  rows={3}
                  value={addForm.description}
                  onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-semibold focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Event Date</label>
                  <input
                    type="date"
                    value={addForm.eventDate}
                    onChange={(e) => setAddForm({ ...addForm, eventDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-semibold focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Duration (Hours)</label>
                  <input
                    type="number"
                    value={addForm.durationHours}
                    onChange={(e) => setAddForm({ ...addForm, durationHours: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-semibold focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Registration Google Form URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://forms.google.com/your-form"
                  value={addForm.registrationLink}
                  onChange={(e) => setAddForm({ ...addForm, registrationLink: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-mono font-semibold focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-xs hover:shadow-lg"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Winner Declaration Modal */}
      {selectedWinnerEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass-card bg-slate-900/90 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-amber-500/30 shadow-2xl space-y-6 text-slate-100">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="text-xl font-black text-white">Declare Winners</h3>
                  <p className="text-xs text-slate-400 font-medium">{selectedWinnerEvent.title}</p>
                </div>
              </div>
              <button onClick={() => setSelectedWinnerEvent(null)} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWinners} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-amber-300 block mb-1">🥇 1st Place Winner (Team & College)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Team NeuralCrafters - IIT Madras"
                  value={winnersForm.firstPlace}
                  onChange={(e) => setWinnersForm({ ...winnersForm, firstPlace: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-amber-500/40 text-xs font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">🥈 2nd Place Winner</label>
                <input
                  type="text"
                  placeholder="e.g. Team ByteOverlords - NIT Trichy"
                  value={winnersForm.secondPlace}
                  onChange={(e) => setWinnersForm({ ...winnersForm, secondPlace: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-amber-500 block mb-1">🥉 3rd Place Winner</label>
                <input
                  type="text"
                  placeholder="e.g. Team CyberVanguard - SRM University"
                  value={winnersForm.thirdPlace}
                  onChange={(e) => setWinnersForm({ ...winnersForm, thirdPlace: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedWinnerEvent(null)}
                  className="flex-1 py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-xs hover:shadow-lg"
                >
                  Publish Winners
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
