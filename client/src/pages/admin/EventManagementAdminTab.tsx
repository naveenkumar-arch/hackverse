import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/common/Badge';
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
    <div className="glass-card bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl space-y-6">
      {notice && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-xs text-center shadow-lg animate-pulse">
          {notice}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-slate-900">Event Creation & Live Control Panel</h3>
            <Badge variant="purple">{events.length} Total Events</Badge>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Create events with Google Form links, trigger real-time live timers, toggle submission links, and declare winners.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF2E4D] to-[#FF4767] text-white font-extrabold text-xs shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {/* Event Control Cards */}
      <div className="space-y-4">
        {events.map((evt) => (
          <div key={evt.id} className="p-5 rounded-2xl bg-white border border-purple-100 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <img src={evt.imageLink} alt={evt.title} className="w-16 h-16 rounded-2xl object-cover border border-purple-200 shadow-sm" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-black text-slate-900">{evt.title}</h4>
                    <Badge variant={evt.status === 'LIVE' ? 'pink' : evt.status === 'COMPLETED' ? 'green' : 'purple'}>
                      {evt.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">{evt.description}</p>
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
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                  title="Delete Event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sub-controls Bar */}
            <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
              <div className="flex items-center gap-4 font-semibold text-slate-700">
                <span>
                  <strong className="text-purple-600">Reg Form Link:</strong>{' '}
                  <a href={evt.registrationLink} target="_blank" rel="noreferrer" className="underline font-mono text-[11px] text-purple-700">
                    Google Form Link <ExternalLink className="w-3 h-3 inline" />
                  </a>
                </span>

                {evt.submissionLink && (
                  <span>
                    <strong className="text-pink-600">Sub Form Link:</strong>{' '}
                    <a href={evt.submissionLink} target="_blank" rel="noreferrer" className="underline font-mono text-[11px] text-pink-700">
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
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {evt.isSubmissionEnabled ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                Project Submission Link: {evt.isSubmissionEnabled ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 1: ADD EVENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-purple-100 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-xl font-black text-slate-900">Add New Event (Google Form Integration)</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-black">✕</button>
            </div>

            <form onSubmit={handleAddEventSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1 font-extrabold text-slate-900">Event Title *</label>
                <input type="text" required placeholder="e.g. Buildathon 2026" value={addForm.title} onChange={(e) => setAddForm({ ...addForm, title: e.target.value })} className="w-full px-4 py-2.5 rounded-2xl border border-slate-200" />
              </div>

              <div>
                <label className="block mb-1 font-extrabold text-slate-900">Poster / Image URL *</label>
                <input type="url" required placeholder="https://images.unsplash.com/..." value={addForm.imageLink} onChange={(e) => setAddForm({ ...addForm, imageLink: e.target.value })} className="w-full px-4 py-2.5 rounded-2xl border border-slate-200" />
              </div>

              <div>
                <label className="block mb-1 font-extrabold text-slate-900">Description (Overview & Rules) *</label>
                <textarea required rows={3} placeholder="Event overview, rules, guidelines, and expectations..." value={addForm.description} onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} className="w-full p-3 rounded-2xl border border-slate-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1 font-extrabold text-slate-900">Event Date *</label>
                  <input type="date" required value={addForm.eventDate} onChange={(e) => setAddForm({ ...addForm, eventDate: e.target.value })} className="w-full px-3 py-2 rounded-2xl border border-slate-200" />
                </div>
                <div>
                  <label className="block mb-1 font-extrabold text-slate-900">Start Time *</label>
                  <input type="time" required value={addForm.startTime} onChange={(e) => setAddForm({ ...addForm, startTime: e.target.value })} className="w-full px-3 py-2 rounded-2xl border border-slate-200" />
                </div>
                <div>
                  <label className="block mb-1 font-extrabold text-slate-900">End Time *</label>
                  <input type="time" required value={addForm.endTime} onChange={(e) => setAddForm({ ...addForm, endTime: e.target.value })} className="w-full px-3 py-2 rounded-2xl border border-slate-200" />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-extrabold text-slate-900">Duration Hours (e.g. 24 or 48) *</label>
                <input type="number" required min={1} value={addForm.durationHours} onChange={(e) => setAddForm({ ...addForm, durationHours: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-2xl border border-slate-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-extrabold text-slate-900">Registration Google Form URL *</label>
                  <input type="url" required placeholder="https://forms.google.com/..." value={addForm.registrationLink} onChange={(e) => setAddForm({ ...addForm, registrationLink: e.target.value })} className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 font-mono" />
                </div>
                <div>
                  <label className="block mb-1 font-extrabold text-slate-900">Submission Google Form URL</label>
                  <input type="url" placeholder="https://forms.google.com/..." value={addForm.submissionLink} onChange={(e) => setAddForm({ ...addForm, submissionLink: e.target.value })} className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 font-mono" />
                </div>
              </div>

              <button type="submit" className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF2E4D] to-[#FF4767] text-white font-black shadow-xl">
                Create Event & Publish Form Links
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* SECTION 2: WINNER DECLARATION MODAL */}
      {selectedWinnerEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-purple-100 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-xl font-black text-slate-900">Declare Winners for {selectedWinnerEvent.title}</h3>
              <button onClick={() => setSelectedWinnerEvent(null)} className="text-slate-400 hover:text-slate-600 font-black">✕</button>
            </div>

            <form onSubmit={handleSaveWinners} className="space-y-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1 text-amber-600 font-black">🥇 First Place Team *</label>
                <input type="text" required placeholder="e.g. Team NeuralCrafters (IIT Madras)" value={winnersForm.firstPlace} onChange={(e) => setWinnersForm({ ...winnersForm, firstPlace: e.target.value })} className="w-full px-4 py-2.5 rounded-2xl border border-amber-300 bg-amber-50/30" />
              </div>
              <div>
                <label className="block mb-1 text-slate-500 font-black">🥈 Second Place Team</label>
                <input type="text" placeholder="e.g. Team CyberKnights (Stanford)" value={winnersForm.secondPlace} onChange={(e) => setWinnersForm({ ...winnersForm, secondPlace: e.target.value })} className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/30" />
              </div>
              <div>
                <label className="block mb-1 text-amber-700 font-black">🥉 Third Place Team</label>
                <input type="text" placeholder="e.g. Team CodeMatrix (MIT)" value={winnersForm.thirdPlace} onChange={(e) => setWinnersForm({ ...winnersForm, thirdPlace: e.target.value })} className="w-full px-4 py-2.5 rounded-2xl border border-amber-200 bg-amber-50/20" />
              </div>

              <button type="submit" className="w-full py-3.5 rounded-2xl bg-amber-500 text-white font-black shadow-xl hover:bg-amber-600">
                Save & Move Event to Completed Showcase
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
