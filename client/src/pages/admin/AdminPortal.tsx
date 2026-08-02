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

const ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'nv01110612@gmail.com';

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
  const [submissionInputs, setSubmissionInputs] = useState<{ [key: string]: string }>({});

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
      prizePool: (eventForm as any).prizePool || '',
      teamSize: (eventForm as any).teamSize || '',
      registrationLink: eventForm.registrationLink,
      submissionLink: '',
    } as any);

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
    } as any);

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
      const remaining = eventManagementStorage.deleteEvent(id);
      setEvents(remaining);
      showNotice(`Deleted event "${title}"`);
    }
  };

  const glassCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.09)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)',
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    color: '#E2E8F0',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '0.875rem',
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ ...glassCard, borderRadius: '1.75rem' }}
          className="p-8 sm:p-10 max-w-md w-full space-y-6 text-center"
        >
          <div
            style={{
              background: 'rgba(251,191,36,0.15)',
              border: '1px solid rgba(251,191,36,0.30)',
            }}
            className="w-16 h-16 rounded-3xl p-0.5 mx-auto flex items-center justify-center"
          >
            <Lock className="w-8 h-8 text-amber-400" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Admin Portal Gate</h2>
              <Badge variant="pink">RESTRICTED ACCESS</Badge>
            </div>
            <p className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.75)' }}>
              Please enter your Admin Passcode to access the Event Management Dashboard.
            </p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4 text-left">
            <div>
              <label className="block mb-1.5 text-xs font-semibold" style={{ color: 'rgba(226,232,240,0.85)' }}>Admin Passcode *</label>
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
                  style={inputStyle}
                  className="w-full px-4 py-3.5 pr-11 font-mono text-sm font-semibold focus:outline-none focus:border-violet-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passcodeError && (
                <p className="text-xs font-semibold text-rose-400 mt-1.5 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 inline" /> {passcodeError}
                </p>
              )}
            </div>

            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                border: '1px solid rgba(139,92,246,0.50)',
                boxShadow: '0 4px 20px rgba(139,92,246,0.35)',
                borderRadius: '0.875rem',
              }}
              className="w-full py-4 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 transition-all"
            >
              <KeyRound className="w-4 h-4" /> Unlock Admin Portal
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-[11px] font-medium flex items-center justify-center gap-1.5" style={{ color: 'rgba(148,163,184,0.6)' }}>
            <ShieldCheck className="w-3.5 h-3.5 text-violet-400" /> Protected Administrative Access Portal
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-6 w-full">
      {/* Admin Portal Header */}
      <div style={{ ...glassCard, borderRadius: '1.75rem' }} className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div
            style={{
              background: 'rgba(251,191,36,0.15)',
              border: '1px solid rgba(251,191,36,0.30)',
            }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
          >
            <Crown className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Dedicated Admin Portal</h1>
              <Badge variant="pink">AUTHENTICATED ADMIN</Badge>
            </div>
            <p className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.75)' }}>Isolated Administrative Dashboard — 2 Dedicated Management Sections</p>
          </div>
        </div>

        {/* Section Navigation Tabs & Lock Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }} className="flex gap-2 p-1.5 rounded-2xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveSection('SECTION_1_CREATION')}
              style={activeSection === 'SECTION_1_CREATION' ? {
                background: 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(96,165,250,0.25))',
                border: '1px solid rgba(139,92,246,0.50)',
                color: '#DDD6FE',
              } : {}}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeSection === 'SECTION_1_CREATION' ? '' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Plus className="w-4 h-4" /> Section 1: Event Creation
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('SECTION_2_MANAGEMENT')}
              style={activeSection === 'SECTION_2_MANAGEMENT' ? {
                background: 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(96,165,250,0.25))',
                border: '1px solid rgba(139,92,246,0.50)',
                color: '#DDD6FE',
              } : {}}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeSection === 'SECTION_2_MANAGEMENT' ? '' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Section 2: Event Management (Live)
            </button>
          </div>

          <button
            type="button"
            onClick={handleLockAdminPortal}
            style={{
              background: 'rgba(244,63,94,0.15)',
              border: '1px solid rgba(244,63,94,0.30)',
              color: '#FDA4AF',
            }}
            className="px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer hover:bg-rose-500/25"
            title="Lock Admin Portal"
          >
            <LogOut className="w-4 h-4" /> Lock Portal
          </button>
        </div>
      </div>

      {notice && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(34,211,238,0.20), rgba(34,211,238,0.10))',
            border: '1px solid rgba(34,211,238,0.35)',
            color: '#67E8F9',
          }}
          className="p-4 rounded-2xl text-xs font-bold text-center animate-pulse"
        >
          {notice}
        </div>
      )}

      {/* SECTION 1: EVENT CREATION PAGE */}
      {activeSection === 'SECTION_1_CREATION' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ ...glassCard, borderRadius: '1.75rem' }} className="p-6 sm:p-8 space-y-6">
          <div className="pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Section 1 — Event Creation</h2>
            <p className="text-xs font-medium mt-1" style={{ color: 'rgba(148,163,184,0.75)' }}>
              Create a new hackathon event. Published events automatically appear on the Customer Portal with a working Google Form registration button.
            </p>
          </div>

          <form onSubmit={handleCreateEvent} className="space-y-5 text-xs font-medium">
            <div>
              <label className="block mb-1.5 font-semibold text-white">1. Event Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Buildathon 2026"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                style={inputStyle}
                className="w-full px-4 py-3 text-xs font-medium focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-white">2. Event Poster / Image URL *</label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={eventForm.imageLink}
                onChange={(e) => setEventForm({ ...eventForm, imageLink: e.target.value })}
                style={inputStyle}
                className="w-full px-4 py-3 text-xs font-medium focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-white">3. Event Description (Overview, Rules & Guidelines) *</label>
              <textarea
                required
                rows={4}
                placeholder="Detail the event overview, hackathon rules, submission requirements, and judging criteria..."
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                style={inputStyle}
                className="w-full p-4 text-xs font-medium focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1.5 font-semibold text-white">4a. Event Date *</label>
                <input
                  type="date"
                  required
                  value={eventForm.eventDate}
                  onChange={(e) => setEventForm({ ...eventForm, eventDate: e.target.value })}
                  style={inputStyle}
                  className="w-full px-4 py-3 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block mb-1.5 font-semibold text-white">4b. Start Time & End Time *</label>
                <div className="flex gap-2">
                  <input
                    type="time"
                    required
                    value={eventForm.startTime}
                    onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                    style={inputStyle}
                    className="w-1/2 px-3 py-3 text-xs font-medium"
                  />
                  <input
                    type="time"
                    required
                    value={eventForm.endTime}
                    onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                    style={inputStyle}
                    className="w-1/2 px-3 py-3 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-semibold text-white">4c. Duration (Hours) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={168}
                  value={eventForm.durationHours}
                  onChange={(e) => setEventForm({ ...eventForm, durationHours: Number(e.target.value) })}
                  style={inputStyle}
                  className="w-full px-4 py-3 text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 font-semibold text-white">5. Prize Pool</label>
                <input
                  type="text"
                  placeholder="e.g. ₹1,50,000 pool"
                  value={(eventForm as any).prizePool || ''}
                  onChange={(e) => setEventForm({ ...eventForm, prizePool: e.target.value } as any)}
                  style={inputStyle}
                  className="w-full px-4 py-3 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-semibold text-white">6. Team Size</label>
                <input
                  type="text"
                  placeholder="e.g. 2 – 4 members"
                  value={(eventForm as any).teamSize || ''}
                  onChange={(e) => setEventForm({ ...eventForm, teamSize: e.target.value } as any)}
                  style={inputStyle}
                  className="w-full px-4 py-3 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 font-semibold text-white">7. Registration Google Form URL *</label>
              <input
                type="url"
                required
                placeholder="https://forms.google.com/your-registration-form"
                value={eventForm.registrationLink}
                onChange={(e) => setEventForm({ ...eventForm, registrationLink: e.target.value })}
                style={inputStyle}
                className="w-full px-4 py-3 font-mono text-xs font-medium"
              />
              <p className="text-[11px] font-medium mt-1" style={{ color: 'rgba(148,163,184,0.65)' }}>
                💡 Project Submission link will be provided in Section 2 after the event starts.
              </p>
            </div>

            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                border: '1px solid rgba(139,92,246,0.50)',
                boxShadow: '0 4px 20px rgba(139,92,246,0.35)',
                borderRadius: '0.875rem',
              }}
              className="w-full py-4 text-white font-bold text-sm cursor-pointer hover:-translate-y-0.5 transition-all"
            >
              Add Event & Publish to Customer Portal
            </button>
          </form>
        </motion.div>
      )}

      {/* SECTION 2: EVENT MANAGEMENT PAGE */}
      {activeSection === 'SECTION_2_MANAGEMENT' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ ...glassCard, borderRadius: '1.75rem' }} className="p-6 sm:p-8 space-y-6">
          <div className="pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Section 2 — Event Management (Live Hackathon Control)</h2>
            <p className="text-xs font-medium mt-1" style={{ color: 'rgba(148,163,184,0.75)' }}>
              Start events to trigger live countdown timers (e.g. 24 Hours), toggle Project Submission Google Form links, and declare 1st, 2nd, 3rd place winners when the timer ends.
            </p>
          </div>

          <div className="space-y-4">
            {events.length > 0 ? (
              events.map((evt) => (
                <div
                  key={evt.id}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '1.25rem',
                  }}
                  className="p-6 space-y-4"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <img src={evt.imageLink} alt={evt.title} className="w-20 h-20 rounded-2xl object-cover border border-white/10" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{evt.title}</h3>
                          <Badge variant={evt.status === 'LIVE' ? 'pink' : evt.status === 'COMPLETED' ? 'green' : 'yellow'}>
                            {evt.status}
                          </Badge>
                        </div>
                        <p className="text-xs font-medium line-clamp-1" style={{ color: 'rgba(148,163,184,0.75)' }}>{evt.description}</p>
                        <p className="text-xs font-semibold text-slate-300">
                          Date: {evt.eventDate} ({evt.startTime} - {evt.endTime}) &bull; Duration: {evt.durationHours} Hours
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                      {evt.status === 'UPCOMING' && (
                        <button
                          type="button"
                          onClick={() => handleStartEvent(evt.id, evt.title)}
                          style={{
                            background: 'linear-gradient(135deg, rgba(34,211,238,0.20), rgba(34,211,238,0.10))',
                            border: '1px solid rgba(34,211,238,0.35)',
                            color: '#67E8F9',
                            borderRadius: '0.875rem',
                          }}
                          className="px-4 py-2.5 font-bold text-xs flex items-center gap-2 cursor-pointer hover:-translate-y-0.5 transition-all"
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
                          style={{
                            background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                            border: '1px solid rgba(251,191,36,0.40)',
                            color: '#0a0a0f',
                            borderRadius: '0.875rem',
                          }}
                          className="px-4 py-2.5 font-bold text-xs flex items-center gap-2 cursor-pointer hover:-translate-y-0.5 transition-all"
                        >
                          <Trophy className="w-4 h-4" /> End Event & Declare 1st, 2nd, 3rd Place Winners
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteEvent(evt.id, evt.title)}
                        style={{
                          background: 'rgba(244,63,94,0.15)',
                          border: '1px solid rgba(244,63,94,0.30)',
                          color: '#FDA4AF',
                          borderRadius: '0.875rem',
                        }}
                        className="p-2.5 hover:bg-rose-500/25 transition-colors cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Toggle Controls & Form Links Bar */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1rem' }} className="p-4 space-y-3 text-xs">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                      <div className="flex flex-wrap items-center gap-2 font-medium text-slate-300">
                        <span className="text-xs font-bold uppercase text-violet-400">5. Reg Google Form:</span>
                        <a href={evt.registrationLink} target="_blank" rel="noreferrer" className="underline font-mono text-violet-300 truncate max-w-xs sm:max-w-md">
                          {evt.registrationLink} <ExternalLink className="w-3 h-3 inline" />
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleRegistration(evt.id, evt.isRegistrationEnabled !== false)}
                        style={evt.isRegistrationEnabled !== false ? {
                          background: 'rgba(34,211,238,0.18)',
                          border: '1px solid rgba(34,211,238,0.35)',
                          color: '#67E8F9',
                        } : {
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.10)',
                          color: 'rgba(148,163,184,0.7)',
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        {evt.isRegistrationEnabled !== false ? <ToggleRight className="w-4 h-4 text-cyan-400" /> : <ToggleLeft className="w-4 h-4 text-slate-500" />}
                        Registration Toggle: {evt.isRegistrationEnabled !== false ? 'ENABLED' : 'DISABLED'}
                      </button>
                    </div>

                    <div className="pt-2 space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase text-emerald-400">6. Project Submission Google Form URL</span>
                        {evt.submissionLink && (
                          <a href={evt.submissionLink} target="_blank" rel="noreferrer" className="underline font-mono text-[11px] text-emerald-300 flex items-center gap-1 font-semibold">
                            Open Link <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        <input
                          type="url"
                          placeholder="Paste Project Submission Google Form URL after event starts..."
                          value={submissionInputs[evt.id] !== undefined ? submissionInputs[evt.id] : evt.submissionLink || ''}
                          onChange={(e) => setSubmissionInputs({ ...submissionInputs, [evt.id]: e.target.value })}
                          style={inputStyle}
                          className="w-full sm:flex-1 px-3 py-2 font-mono text-xs font-medium"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            const url = submissionInputs[evt.id] !== undefined ? submissionInputs[evt.id] : evt.submissionLink || '';
                            const newStatus = !evt.isSubmissionEnabled;
                            if (newStatus && !url) {
                              alert('Please paste a valid Project Submission Google Form URL before enabling.');
                              return;
                            }
                            const updated = eventManagementStorage.updateEvent(evt.id, { submissionLink: url, isSubmissionEnabled: newStatus });
                            setEvents(updated);
                            showNotice(`Project Submission Form ${newStatus ? 'ENABLED' : 'DISABLED'}!`);
                          }}
                          style={evt.isSubmissionEnabled ? {
                            background: 'rgba(16,253,165,0.18)',
                            border: '1px solid rgba(16,253,165,0.35)',
                            color: '#34D399',
                          } : {
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.10)',
                            color: 'rgba(148,163,184,0.7)',
                          }}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                        >
                          {evt.isSubmissionEnabled ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4 text-slate-500" />}
                          Project Submission Toggle: {evt.isSubmissionEnabled ? 'ENABLED' : 'DISABLED'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center space-y-2" style={{ color: 'rgba(148,163,184,0.65)' }}>
                <Sparkles className="w-10 h-10 mx-auto text-violet-400" />
                <p className="text-xs font-medium">No events found. Click "Section 1: Event Creation" to add your first event.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* WINNER DECLARATION MODAL */}
      {selectedWinnerEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ ...glassCard, borderRadius: '1.75rem' }} className="p-6 sm:p-8 max-w-md w-full space-y-4">
            <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Declare Winners — {selectedWinnerEvent.title}</h3>
              <button type="button" onClick={() => setSelectedWinnerEvent(null)} className="text-slate-400 hover:text-white font-bold text-lg p-1">✕</button>
            </div>

            <form onSubmit={handleSaveWinners} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block mb-1.5 font-semibold text-amber-400">🥇 First Prize Team Details *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Team NeuralCrafters (IIT Madras)"
                  value={winnersForm.firstPlace}
                  onChange={(e) => setWinnersForm({ ...winnersForm, firstPlace: e.target.value })}
                  style={inputStyle}
                  className="w-full px-4 py-3 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block mb-1.5 font-semibold text-cyan-400">🥈 Second Prize Team Details</label>
                <input
                  type="text"
                  placeholder="e.g. Team CyberKnights (Stanford)"
                  value={winnersForm.secondPlace}
                  onChange={(e) => setWinnersForm({ ...winnersForm, secondPlace: e.target.value })}
                  style={inputStyle}
                  className="w-full px-4 py-3 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block mb-1.5 font-semibold text-emerald-400">🥉 Third Prize Team Details</label>
                <input
                  type="text"
                  placeholder="e.g. Team CodeMatrix (MIT)"
                  value={winnersForm.thirdPlace}
                  onChange={(e) => setWinnersForm({ ...winnersForm, thirdPlace: e.target.value })}
                  style={inputStyle}
                  className="w-full px-4 py-3 text-xs font-medium"
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                  border: '1px solid rgba(251,191,36,0.40)',
                  color: '#0a0a0f',
                  borderRadius: '0.875rem',
                }}
                className="w-full py-4 font-bold text-xs cursor-pointer hover:-translate-y-0.5 transition-all"
              >
                Save & Move Event to Completed Showcase
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
