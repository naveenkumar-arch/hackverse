import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../../components/common/Badge';
import { eventManagementStorage, ManagedEvent } from '../../utils/eventManagementStorage';
import {
  Crown,
  Sparkles,
  Plus,
  Play,
  Trophy,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  Trash2,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
  Eye,
  EyeOff,
  LogOut,
} from 'lucide-react';

const ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'admin123';

export const AdminPortal: React.FC = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(
    () => sessionStorage.getItem('ko_admin_authenticated') === 'true'
  );
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [activeSection, setActiveSection] = useState<'SECTION_1_CREATION' | 'SECTION_2_MANAGEMENT'>('SECTION_1_CREATION');
  const [events, setEvents] = useState<ManagedEvent[]>([]);
  const [selectedWinnerEvent, setSelectedWinnerEvent] = useState<ManagedEvent | null>(null);
  const [notice, setNotice] = useState('');

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_PASSCODE) {
      sessionStorage.setItem('ko_admin_authenticated', 'true');
      setIsAdminAuthenticated(true);
      setPasscodeError('');
      setPasscode('');
      showNotice('🔓 Admin Portal Unlocked successfully!');
    } else {
      setPasscodeError('Invalid Admin Passcode. Please check and try again.');
    }
  };

  const handleLockAdminPortal = () => {
    sessionStorage.removeItem('ko_admin_authenticated');
    setIsAdminAuthenticated(false);
  };

  // Section 1: Event Creation Form State
  const [eventForm, setEventForm] = useState({
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

  // Section 1: Add Event Form Handler
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.registrationLink) {
      alert('Please enter Event Title and Registration Google Form URL.');
      return;
    }

    eventManagementStorage.addEvent({
      title: eventForm.title,
      imageLink: eventForm.imageLink || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
      description: eventForm.description,
      eventDate: eventForm.eventDate,
      startTime: eventForm.startTime,
      endTime: eventForm.endTime,
      durationHours: Number(eventForm.durationHours) || 24,
      registrationLink: eventForm.registrationLink,
      submissionLink: eventForm.submissionLink || eventForm.registrationLink,
    });

    setEventForm({
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

    showNotice(`🎉 Event "${eventForm.title}" created successfully and published to Customer Portal!`);
    setActiveSection('SECTION_2_MANAGEMENT');
  };

  // Section 2: Live Controls
  const handleStartEvent = (eventId: string, title: string) => {
    eventManagementStorage.startEvent(eventId);
    showNotice(`🚀 "${title}" is now LIVE! Countdown timer & LIVE badge published on Customer Portal.`);
  };

  const handleToggleSubmission = (eventId: string, currentStatus: boolean) => {
    eventManagementStorage.toggleSubmissionLink(eventId, !currentStatus);
    showNotice(`Project Submission button is now ${!currentStatus ? 'ENABLED' : 'DISABLED'} on Customer Portal.`);
  };

  const handleSaveWinners = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWinnerEvent) return;

    if (!winnersForm.firstPlace) {
      alert('Please enter at least the First Prize winner details.');
      return;
    }

    eventManagementStorage.completeEventAndDeclareWinners(selectedWinnerEvent.id, winnersForm);
    setSelectedWinnerEvent(null);
    setWinnersForm({ firstPlace: '', secondPlace: '', thirdPlace: '' });
    showNotice(`🏆 Winners declared! Event moved to Completed Events Showcase on Customer Portal.`);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete event "${title}"?`)) {
      eventManagementStorage.deleteEvent(id);
      showNotice(`Deleted event "${title}"`);
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full border border-purple-200 shadow-2xl space-y-6 text-center"
        >
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#FACC15] via-[#FF2E4D] to-[#7C3AED] p-0.5 mx-auto shadow-xl">
            <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center">
              <Lock className="w-8 h-8 text-[#FF2E4D]" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl font-black text-slate-900">Admin Portal Gate</h2>
              <Badge variant="pink" className="font-extrabold uppercase">RESTRICTED ACCESS</Badge>
            </div>
            <p className="text-xs font-semibold text-slate-500">
              Please enter your Admin Passcode to access the Event Management Dashboard.
            </p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4 text-left">
            <div>
              <label className="block mb-1 text-xs font-extrabold text-slate-900">Admin Passcode *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter admin passcode..."
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPasscodeError('');
                  }}
                  className="w-full px-4 py-3.5 pr-11 bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 font-mono text-sm font-bold focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passcodeError && (
                <p className="text-xs font-bold text-rose-600 mt-1.5 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 inline" /> {passcodeError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-[#FF2E4D] text-white font-black text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" /> Unlock Admin Portal
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Default Passcode: <code className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-lg border border-purple-200 font-mono">admin123</code>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-6 w-full">
      {/* Admin Portal Header */}
      <div className="glass-card bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FACC15] via-[#FF2E4D] to-[#7C3AED] p-0.5 shadow-lg">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Crown className="w-6 h-6 text-[#FF2E4D]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">Dedicated Admin Portal</h1>
              <Badge variant="pink" className="font-extrabold uppercase">AUTHENTICATED ADMIN</Badge>
            </div>
            <p className="text-xs text-slate-500 font-bold">Isolated Administrative Dashboard — 2 Dedicated Management Sections</p>
          </div>
        </div>

        {/* Section Navigation Tabs & Lock Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-black">
            <button
              onClick={() => setActiveSection('SECTION_1_CREATION')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeSection === 'SECTION_1_CREATION' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plus className="w-4 h-4" /> Section 1: Event Creation
            </button>
            <button
              onClick={() => setActiveSection('SECTION_2_MANAGEMENT')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeSection === 'SECTION_2_MANAGEMENT' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Section 2: Event Management (Live)
            </button>
          </div>

          <button
            onClick={handleLockAdminPortal}
            className="px-3.5 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-black transition-all flex items-center gap-1.5 shadow-sm"
            title="Lock Admin Portal"
          >
            <LogOut className="w-4 h-4" /> Lock Portal
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-xs text-center shadow-lg animate-pulse">
          {notice}
        </div>
      )}

      {/* SECTION 1: EVENT CREATION PAGE */}
      {activeSection === 'SECTION_1_CREATION' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-black text-slate-900">Section 1 — Event Creation</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Create a new hackathon event. Published events automatically appear on the Customer Portal with a working Google Form registration button.
            </p>
          </div>

          <form onSubmit={handleCreateEvent} className="space-y-5 text-xs font-semibold text-slate-700">
            <div>
              <label className="block mb-1 font-extrabold text-slate-900">1. Event Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Buildathon 2026"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                className="w-full px-4 py-3 bg-white text-slate-900 rounded-2xl border border-slate-200 font-bold focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-extrabold text-slate-900">2. Event Poster / Image URL *</label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={eventForm.imageLink}
                onChange={(e) => setEventForm({ ...eventForm, imageLink: e.target.value })}
                className="w-full px-4 py-3 bg-white text-slate-900 rounded-2xl border border-slate-200 font-medium focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-extrabold text-slate-900">3. Event Description (Overview, Rules & Guidelines) *</label>
              <textarea
                required
                rows={4}
                placeholder="Detail the event overview, hackathon rules, submission requirements, and judging criteria..."
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                className="w-full p-4 bg-white text-slate-900 rounded-2xl border border-slate-200 font-medium focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 font-extrabold text-slate-900">4a. Event Date *</label>
                <input
                  type="date"
                  required
                  value={eventForm.eventDate}
                  onChange={(e) => setEventForm({ ...eventForm, eventDate: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-slate-900 rounded-2xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block mb-1 font-extrabold text-slate-900">4b. Start Time *</label>
                <input
                  type="time"
                  required
                  value={eventForm.startTime}
                  onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-slate-900 rounded-2xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block mb-1 font-extrabold text-slate-900">4c. End Time *</label>
                <input
                  type="time"
                  required
                  value={eventForm.endTime}
                  onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-slate-900 rounded-2xl border border-slate-200 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-extrabold text-slate-900">4d. Hackathon Duration (Hours e.g. 24 or 48) *</label>
              <input
                type="number"
                required
                min={1}
                value={eventForm.durationHours}
                onChange={(e) => setEventForm({ ...eventForm, durationHours: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-white text-slate-900 rounded-2xl border border-slate-200 font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-extrabold text-slate-900">5. Registration Google Form URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://forms.google.com/your-registration-form"
                  value={eventForm.registrationLink}
                  onChange={(e) => setEventForm({ ...eventForm, registrationLink: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-slate-900 rounded-2xl border border-slate-200 font-mono text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1 font-extrabold text-slate-900">6. Project Submission Google Form URL</label>
                <input
                  type="url"
                  placeholder="https://forms.google.com/your-submission-form"
                  value={eventForm.submissionLink}
                  onChange={(e) => setEventForm({ ...eventForm, submissionLink: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-slate-900 rounded-2xl border border-slate-200 font-mono text-xs font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF2E4D] to-[#FF4767] text-white font-black text-sm shadow-xl hover:shadow-2xl transition-all"
            >
              Add Event & Publish to Customer Portal
            </button>
          </form>
        </motion.div>
      )}

      {/* SECTION 2: EVENT MANAGEMENT PAGE (LIVE HACKATHON CONTROL) */}
      {activeSection === 'SECTION_2_MANAGEMENT' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-black text-slate-900">Section 2 — Event Management (Live Hackathon Control)</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Start events to trigger live countdown timers, toggle project submission buttons, and declare 1st/2nd/3rd place winners.
            </p>
          </div>

          <div className="space-y-4">
            {events.length > 0 ? (
              events.map((evt) => (
                <div key={evt.id} className="p-6 rounded-3xl bg-white border border-purple-100 shadow-md space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <img src={evt.imageLink} alt={evt.title} className="w-20 h-20 rounded-2xl object-cover border border-purple-200 shadow-sm" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black text-slate-900">{evt.title}</h3>
                          <Badge variant={evt.status === 'LIVE' ? 'pink' : evt.status === 'COMPLETED' ? 'green' : 'purple'}>
                            {evt.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 font-medium line-clamp-1">{evt.description}</p>
                        <p className="text-xs font-bold text-slate-400">
                          Date: {evt.eventDate} ({evt.startTime} - {evt.endTime}) &bull; Duration: {evt.durationHours} Hours
                        </p>
                      </div>
                    </div>

                    {/* Live Action Controls */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                      {evt.status === 'UPCOMING' && (
                        <button
                          onClick={() => handleStartEvent(evt.id, evt.title)}
                          className="px-4 py-2.5 rounded-2xl bg-purple-600 text-white font-black text-xs hover:bg-purple-700 shadow-lg flex items-center gap-2"
                        >
                          <Play className="w-4 h-4 fill-current" /> Start Event (Go LIVE)
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
                          className="px-4 py-2.5 rounded-2xl bg-amber-500 text-white font-black text-xs hover:bg-amber-600 shadow-lg flex items-center gap-2"
                        >
                          <Trophy className="w-4 h-4" /> End Event & Declare Winners
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteEvent(evt.id, evt.title)}
                        className="p-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Toggle Controls & Form Links Bar */}
                  <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
                    <div className="flex flex-wrap gap-4 font-bold text-slate-700">
                      <span>
                        <strong className="text-purple-600">Reg Google Form:</strong>{' '}
                        <a href={evt.registrationLink} target="_blank" rel="noreferrer" className="underline font-mono text-purple-800">
                          {evt.registrationLink} <ExternalLink className="w-3 h-3 inline" />
                        </a>
                      </span>
                    </div>

                    {/* Submission Link Toggle Control */}
                    <button
                      onClick={() => handleToggleSubmission(evt.id, evt.isSubmissionEnabled)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                        evt.isSubmissionEnabled
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {evt.isSubmissionEnabled ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                      Project Submission Toggle: {evt.isSubmissionEnabled ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400 font-bold space-y-2">
                <Sparkles className="w-10 h-10 mx-auto text-purple-300" />
                <p>No events found. Click "Section 1: Event Creation" to add your first event.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* WINNER DECLARATION MODAL */}
      {selectedWinnerEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-purple-100 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-xl font-black text-slate-900">Declare Winners — {selectedWinnerEvent.title}</h3>
              <button onClick={() => setSelectedWinnerEvent(null)} className="text-slate-400 hover:text-slate-600 font-black">✕</button>
            </div>

            <form onSubmit={handleSaveWinners} className="space-y-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1 text-amber-600 font-black">🥇 First Prize Team Details *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Team NeuralCrafters (IIT Madras)"
                  value={winnersForm.firstPlace}
                  onChange={(e) => setWinnersForm({ ...winnersForm, firstPlace: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-amber-300 bg-amber-50/30 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-500 font-black">🥈 Second Prize Team Details</label>
                <input
                  type="text"
                  placeholder="e.g. Team CyberKnights (Stanford)"
                  value={winnersForm.secondPlace}
                  onChange={(e) => setWinnersForm({ ...winnersForm, secondPlace: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50/30 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block mb-1 text-amber-700 font-black">🥉 Third Prize Team Details</label>
                <input
                  type="text"
                  placeholder="e.g. Team CodeMatrix (MIT)"
                  value={winnersForm.thirdPlace}
                  onChange={(e) => setWinnersForm({ ...winnersForm, thirdPlace: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-amber-200 bg-amber-50/20 text-xs font-bold"
                />
              </div>

              <button type="submit" className="w-full py-4 rounded-2xl bg-amber-500 text-white font-black text-xs shadow-xl hover:bg-amber-600 transition-all">
                Save & Move Event to Completed Showcase
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
