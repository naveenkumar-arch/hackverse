import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Lock,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
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

  const [winnersForm, setWinnersForm] = useState({
    firstPlace: '',
    secondPlace: '',
    thirdPlace: '',
  });

  const refreshEvents = () => {
    const list = eventManagementStorage.getEvents();
    setEvents([...list]);
  };

  useEffect(() => {
    refreshEvents();
    const handleStorageUpdate = () => refreshEvents();
    window.addEventListener('ko_managed_events_updated', handleStorageUpdate);
    return () => window.removeEventListener('ko_managed_events_updated', handleStorageUpdate);
  }, []);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3500);
  };

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

    refreshEvents();
    showNotice(`🎉 Event "${eventForm.title}" created successfully and published!`);
    setActiveSection('SECTION_2_MANAGEMENT');
  };

  const handleStartEvent = (eventId: string, title: string) => {
    eventManagementStorage.startEvent(eventId);
    refreshEvents();
    showNotice(`🚀 "${title}" is now LIVE! Countdown timer & LIVE badge active.`);
  };

  const handleToggleRegistration = (eventId: string, currentStatus: boolean) => {
    const isEnabled = currentStatus !== false;
    eventManagementStorage.toggleRegistrationLink(eventId, !isEnabled);
    refreshEvents();
    showNotice(`Registration Form button is now ${!isEnabled ? 'ENABLED' : 'DISABLED'}.`);
  };

  const handleToggleSubmission = (eventId: string, currentStatus: boolean) => {
    eventManagementStorage.toggleSubmissionLink(eventId, !currentStatus);
    refreshEvents();
    showNotice(`Project Submission button is now ${!currentStatus ? 'ENABLED' : 'DISABLED'}.`);
  };

  const handleSaveWinners = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWinnerEvent) return;

    if (!winnersForm.firstPlace) {
      alert('Please enter at least the First Prize winner details.');
      return;
    }

    eventManagementStorage.completeEventAndDeclareWinners(selectedWinnerEvent.id, winnersForm);
    refreshEvents();
    setSelectedWinnerEvent(null);
    setWinnersForm({ firstPlace: '', secondPlace: '', thirdPlace: '' });
    showNotice(`🏆 Winners declared! Event moved to Completed Showcase.`);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete event "${title}"?`)) {
      eventManagementStorage.deleteEvent(id);
      refreshEvents();
      showNotice(`Deleted event "${title}"`);
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full border-2 border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] space-y-6 text-center"
        >
          <div className="w-16 h-16 rounded-3xl bg-[#F7D046] border-2 border-[#1E1B4B] p-0.5 mx-auto shadow-[4px_4px_0px_0px_#1E1B4B] flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#1E1B4B]" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl font-black text-[#1E1B4B]">Admin Portal Gate</h2>
              <Badge variant="pink" className="font-extrabold uppercase">RESTRICTED ACCESS</Badge>
            </div>
            <p className="text-xs font-bold text-slate-600">
              Please enter your Admin Passcode to access the Event Management Dashboard.
            </p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4 text-left">
            <div>
              <label className="block mb-1 text-xs font-extrabold text-[#1E1B4B]">Admin Passcode *</label>
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
                  className="w-full px-4 py-3.5 pr-11 bg-[#FAF7EE] text-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] font-mono text-sm font-bold focus:outline-none focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 p-1"
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
              className="w-full py-4 rounded-2xl bg-[#FF334B] text-white font-black text-sm border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] hover:shadow-[6px_6px_0px_0px_#1E1B4B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" /> Unlock Admin Portal
            </button>
          </form>

          <div className="pt-4 border-t-2 border-[#1E1B4B]/10 text-[11px] font-bold text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E1B4B]" /> Default Passcode: <code className="bg-[#F7D046] text-[#1E1B4B] px-2 py-0.5 rounded-lg border border-[#1E1B4B] font-mono">admin123</code>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-6 w-full">
      {/* Admin Portal Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F7D046] border-2 border-[#1E1B4B] shadow-[3px_3px_0px_0px_#1E1B4B] flex items-center justify-center">
            <Crown className="w-6 h-6 text-[#1E1B4B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#1E1B4B]">Dedicated Admin Portal</h1>
              <Badge variant="pink" className="font-extrabold uppercase">AUTHENTICATED ADMIN</Badge>
            </div>
            <p className="text-xs text-slate-600 font-bold">Isolated Administrative Dashboard — 2 Dedicated Management Sections</p>
          </div>
        </div>

        {/* Section Navigation Tabs & Lock Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2 bg-[#FAF7EE] p-1.5 rounded-2xl border-2 border-[#1E1B4B] text-xs font-black">
            <button
              type="button"
              onClick={() => setActiveSection('SECTION_1_CREATION')}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeSection === 'SECTION_1_CREATION'
                  ? 'bg-[#FF334B] text-white border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B]'
                  : 'text-[#1E1B4B] hover:bg-slate-200/60'
              }`}
            >
              <Plus className="w-4 h-4" /> Section 1: Event Creation
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('SECTION_2_MANAGEMENT')}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeSection === 'SECTION_2_MANAGEMENT'
                  ? 'bg-[#FF334B] text-white border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B]'
                  : 'text-[#1E1B4B] hover:bg-slate-200/60'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Section 2: Event Management (Live)
            </button>
          </div>

          <button
            type="button"
            onClick={handleLockAdminPortal}
            className="px-3.5 py-2.5 rounded-2xl bg-rose-100 hover:bg-rose-200 text-rose-700 border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B] text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer"
            title="Lock Admin Portal"
          >
            <LogOut className="w-4 h-4" /> Lock Portal
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-[#5CE1E6] text-[#1E1B4B] border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] font-black text-xs text-center animate-pulse">
          {notice}
        </div>
      )}

      {/* SECTION 1: EVENT CREATION PAGE */}
      {activeSection === 'SECTION_1_CREATION' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] space-y-6">
          <div className="border-b-2 border-[#1E1B4B]/10 pb-4">
            <h2 className="text-2xl font-black text-[#1E1B4B]">Section 1 — Event Creation</h2>
            <p className="text-xs text-slate-600 font-bold mt-1">
              Create a new hackathon event. Published events automatically appear on the Customer Portal with a working Google Form registration button.
            </p>
          </div>

          <form onSubmit={handleCreateEvent} className="space-y-5 text-xs font-bold text-[#1E1B4B]">
            <div>
              <label className="block mb-1 font-extrabold text-[#1E1B4B]">1. Event Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Buildathon 2026"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                className="w-full px-4 py-3 bg-[#FAF7EE] text-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] font-bold focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block mb-1 font-extrabold text-[#1E1B4B]">2. Event Poster / Image URL *</label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={eventForm.imageLink}
                onChange={(e) => setEventForm({ ...eventForm, imageLink: e.target.value })}
                className="w-full px-4 py-3 bg-[#FAF7EE] text-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] font-bold focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block mb-1 font-extrabold text-[#1E1B4B]">3. Event Description (Overview, Rules & Guidelines) *</label>
              <textarea
                required
                rows={4}
                placeholder="Detail the event overview, hackathon rules, submission requirements, and judging criteria..."
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                className="w-full p-4 bg-[#FAF7EE] text-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] font-bold focus:outline-none focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 font-extrabold text-[#1E1B4B]">4a. Event Date *</label>
                <input
                  type="date"
                  required
                  value={eventForm.eventDate}
                  onChange={(e) => setEventForm({ ...eventForm, eventDate: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF7EE] text-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] font-bold"
                />
              </div>

              <div>
                <label className="block mb-1 font-extrabold text-[#1E1B4B]">4b. Start Time & End Time *</label>
                <div className="flex gap-2">
                  <input
                    type="time"
                    required
                    value={eventForm.startTime}
                    onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                    className="w-1/2 px-3 py-3 bg-[#FAF7EE] text-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] font-bold"
                  />
                  <input
                    type="time"
                    required
                    value={eventForm.endTime}
                    onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                    className="w-1/2 px-3 py-3 bg-[#FAF7EE] text-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-extrabold text-[#1E1B4B]">4c. Duration (Hours) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={168}
                  value={eventForm.durationHours}
                  onChange={(e) => setEventForm({ ...eventForm, durationHours: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-[#FAF7EE] text-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-extrabold text-[#1E1B4B]">5. Registration Google Form URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://forms.google.com/your-registration-form"
                  value={eventForm.registrationLink}
                  onChange={(e) => setEventForm({ ...eventForm, registrationLink: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF7EE] text-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] font-mono text-xs font-bold"
                />
              </div>

              <div>
                <label className="block mb-1 font-extrabold text-[#1E1B4B]">6. Project Submission Google Form URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://forms.google.com/your-submission-form"
                  value={eventForm.submissionLink}
                  onChange={(e) => setEventForm({ ...eventForm, submissionLink: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF7EE] text-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] font-mono text-xs font-bold"
                />
                <p className="text-[11px] text-slate-500 font-bold mt-1">
                  💡 Tip: You can ENABLE or DISABLE this submission link anytime in Section 2 during the event.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#FF334B] text-white font-black text-sm border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] hover:shadow-[6px_6px_0px_0px_#1E1B4B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Add Event & Publish to Customer Portal
            </button>
          </form>
        </motion.div>
      )}

      {/* SECTION 2: EVENT MANAGEMENT PAGE (LIVE HACKATHON CONTROL) */}
      {activeSection === 'SECTION_2_MANAGEMENT' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] space-y-6">
          <div className="border-b-2 border-[#1E1B4B]/10 pb-4">
            <h2 className="text-2xl font-black text-[#1E1B4B]">Section 2 — Event Management (Live Hackathon Control)</h2>
            <p className="text-xs text-slate-600 font-bold mt-1">
              Start events to trigger live countdown timers (e.g. 24 Hours), toggle Project Submission Google Form links, and declare 1st, 2nd, 3rd place winners when the timer ends.
            </p>
          </div>

          <div className="space-y-4">
            {events.length > 0 ? (
              events.map((evt) => (
                <div key={evt.id} className="p-6 rounded-3xl bg-[#FAF7EE] border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <img src={evt.imageLink} alt={evt.title} className="w-20 h-20 rounded-2xl object-cover border-2 border-[#1E1B4B]" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black text-[#1E1B4B]">{evt.title}</h3>
                          <Badge variant={evt.status === 'LIVE' ? 'pink' : evt.status === 'COMPLETED' ? 'green' : 'yellow'}>
                            {evt.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600 font-bold line-clamp-1">{evt.description}</p>
                        <p className="text-xs font-extrabold text-[#1E1B4B]">
                          Date: {evt.eventDate} ({evt.startTime} - {evt.endTime}) &bull; Duration: {evt.durationHours} Hours
                        </p>
                      </div>
                    </div>

                    {/* Live Action Controls */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                      {evt.status === 'UPCOMING' && (
                        <button
                          type="button"
                          onClick={() => handleStartEvent(evt.id, evt.title)}
                          className="px-4 py-2.5 rounded-2xl bg-[#5CE1E6] text-[#1E1B4B] font-black text-xs border-2 border-[#1E1B4B] shadow-[3px_3px_0px_0px_#1E1B4B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-current" /> Start Event (Go LIVE & Start Countdown)
                        </button>
                      )}

                      {evt.status === 'LIVE' && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedWinnerEvent(evt);
                            setWinnersForm({
                              firstPlace: evt.winners?.firstPlace || '',
                              secondPlace: evt.winners?.secondPlace || '',
                              thirdPlace: evt.winners?.thirdPlace || '',
                            });
                          }}
                          className="px-4 py-2.5 rounded-2xl bg-[#F7D046] text-[#1E1B4B] font-black text-xs border-2 border-[#1E1B4B] shadow-[3px_3px_0px_0px_#1E1B4B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Trophy className="w-4 h-4" /> End Event & Declare 1st, 2nd, 3rd Place Winners
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteEvent(evt.id, evt.title)}
                        className="p-2.5 rounded-2xl bg-rose-100 hover:bg-rose-200 text-rose-700 border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B] transition-colors cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Toggle Controls & Form Links Bar */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-[#1E1B4B] space-y-3 text-xs">
                    {/* Row 1: Registration Form (Field 5) */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                      <div className="flex flex-wrap items-center gap-2 font-bold text-[#1E1B4B]">
                        <span className="text-xs font-black uppercase text-[#FF334B]">5. Reg Google Form:</span>
                        <a href={evt.registrationLink} target="_blank" rel="noreferrer" className="underline font-mono text-[#1E1B4B] truncate max-w-xs sm:max-w-md">
                          {evt.registrationLink} <ExternalLink className="w-3 h-3 inline" />
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleRegistration(evt.id, evt.isRegistrationEnabled !== false)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B] ${
                          evt.isRegistrationEnabled !== false
                            ? 'bg-[#5CE1E6] text-[#1E1B4B]'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {evt.isRegistrationEnabled !== false ? <ToggleRight className="w-4 h-4 text-[#1E1B4B]" /> : <ToggleLeft className="w-4 h-4 text-slate-500" />}
                        Registration Toggle: {evt.isRegistrationEnabled !== false ? 'ENABLED' : 'DISABLED'}
                      </button>
                    </div>

                    {/* Row 2: Submission Form (Field 6) */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 border-t-2 border-[#1E1B4B]/10">
                      <div className="flex flex-wrap items-center gap-2 font-bold text-[#1E1B4B]">
                        <span className="text-xs font-black uppercase text-[#78E29A]">6. Submission Google Form:</span>
                        <a href={evt.submissionLink} target="_blank" rel="noreferrer" className="underline font-mono text-[#1E1B4B] truncate max-w-xs sm:max-w-md">
                          {evt.submissionLink} <ExternalLink className="w-3 h-3 inline" />
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleSubmission(evt.id, evt.isSubmissionEnabled)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B] ${
                          evt.isSubmissionEnabled
                            ? 'bg-[#78E29A] text-[#1E1B4B]'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {evt.isSubmissionEnabled ? <ToggleRight className="w-4 h-4 text-[#1E1B4B]" /> : <ToggleLeft className="w-4 h-4 text-slate-500" />}
                        Project Submission Toggle: {evt.isSubmissionEnabled ? 'ENABLED' : 'DISABLED'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-500 font-bold space-y-2">
                <Sparkles className="w-10 h-10 mx-auto text-[#1E1B4B]" />
                <p>No events found. Click "Section 1: Event Creation" to add your first event.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* WINNER DECLARATION MODAL */}
      {selectedWinnerEvent && (
        <div className="fixed inset-0 z-50 bg-[#1E1B4B]/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] space-y-4">
            <div className="flex justify-between items-center border-b-2 border-[#1E1B4B]/10 pb-3">
              <h3 className="text-xl font-black text-[#1E1B4B]">Declare Winners — {selectedWinnerEvent.title}</h3>
              <button type="button" onClick={() => setSelectedWinnerEvent(null)} className="text-[#1E1B4B] font-black text-lg p-1">✕</button>
            </div>

            <form onSubmit={handleSaveWinners} className="space-y-4 text-xs font-bold text-[#1E1B4B]">
              <div>
                <label className="block mb-1 text-[#1E1B4B] font-black">🥇 First Prize Team Details *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Team NeuralCrafters (IIT Madras)"
                  value={winnersForm.firstPlace}
                  onChange={(e) => setWinnersForm({ ...winnersForm, firstPlace: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-[#1E1B4B] bg-[#F7D046] text-[#1E1B4B] text-xs font-bold"
                />
              </div>

              <div>
                <label className="block mb-1 text-[#1E1B4B] font-black">🥈 Second Prize Team Details</label>
                <input
                  type="text"
                  placeholder="e.g. Team CyberKnights (Stanford)"
                  value={winnersForm.secondPlace}
                  onChange={(e) => setWinnersForm({ ...winnersForm, secondPlace: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-[#1E1B4B] bg-[#5CE1E6] text-[#1E1B4B] text-xs font-bold"
                />
              </div>

              <div>
                <label className="block mb-1 text-[#1E1B4B] font-black">🥉 Third Prize Team Details</label>
                <input
                  type="text"
                  placeholder="e.g. Team CodeMatrix (MIT)"
                  value={winnersForm.thirdPlace}
                  onChange={(e) => setWinnersForm({ ...winnersForm, thirdPlace: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-[#1E1B4B] bg-[#FF334B] text-white text-xs font-bold"
                />
              </div>

              <button type="submit" className="w-full py-4 rounded-2xl bg-[#F7D046] text-[#1E1B4B] font-black text-xs border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer">
                Save & Move Event to Completed Showcase
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
