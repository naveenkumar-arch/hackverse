import React, { useState } from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EventFormModal } from '../../components/events/EventFormModal';
import { MOCK_EVENTS } from '../../data/mockData';
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Search,
  Users,
  ExternalLink,
  ShieldAlert,
  Download,
  X,
  MapPin,
} from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { exportToCsv } from '../../utils/csvExporter';

export const EventsAdmin: React.FC = () => {
  const [events, setEvents] = useState<any[]>(
    MOCK_EVENTS.map((e) => ({
      ...e,
      durationHours: '48 Hours',
      registrationFormLink: `http://localhost:5173/events/${e.slug}`,
      isRegistrationOpen: true,
      isSubmissionOpen: true,
      submissionDeadline: new Date(Date.now() + 86400000 * 2).toISOString(),
    }))
  );

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<any | null>(null);

  // Event-specific Isolated Ledger Modal State
  const [selectedLedgerEvent, setSelectedLedgerEvent] = useState<any | null>(null);

  const [eventLedgers, setEventLedgers] = useState<Record<string, any[]>>({});

  const handleToggleRegistration = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, isRegistrationOpen: !e.isRegistrationOpen } : e))
    );
  };

  const handleToggleSubmission = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, isSubmissionOpen: !e.isSubmissionOpen } : e))
    );
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event and its isolated registration data?')) {
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
      setEventLedgers((prev) => {
        const next = { ...prev };
        delete next[eventId];
        return next;
      });
    }
  };

  const handleClearEventLedger = (eventId: string) => {
    if (window.confirm('Manually clear all registration data for this event? (Data will be permanently removed)')) {
      setEventLedgers((prev) => ({ ...prev, [eventId]: [] }));
    }
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 py-6">
      <SectionHeader
        eyebrow="ADMINISTRATION"
        title="Event & Registration Ledger Management"
        subtitle="Manage event posters, duration, form links, and access each event's isolated registration database."
      />

      {/* Top Action Bar */}
      <div className="glass-card bg-white rounded-3xl p-6 border border-purple-100 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs font-semibold pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-purple-500"
          />
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setEventToEdit(null);
            setIsModalOpen(true);
          }}
          className="gap-2 w-full sm:w-auto text-xs"
        >
          <Plus className="w-4 h-4" /> Create New Event
        </Button>
      </div>

      {/* Events Directory */}
      <div className="glass-card bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-purple-50 text-purple-900 font-black uppercase tracking-wider">
              <tr>
                <th className="p-4 rounded-l-2xl">Event & Poster</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Registration Form Link</th>
                <th className="p-4">Isolated Registrations</th>
                <th className="p-4">Access Controls</th>
                <th className="p-4 rounded-r-2xl">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {filteredEvents.map((evt) => {
                const eventRegs = eventLedgers[evt.id] || [];
                return (
                  <tr key={evt.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={evt.bannerUrl} alt={evt.title} className="w-14 h-10 rounded-xl object-cover border border-purple-200" />
                        <div>
                          <p className="font-extrabold text-slate-900 text-sm">{evt.title}</p>
                          <Badge variant="purple" className="text-[9px] mt-0.5">{evt.eventType}</Badge>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-black text-slate-800">{evt.durationHours || '48 Hours'}</td>
                    <td className="p-4">
                      <a
                        href={evt.registrationFormLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-purple-600 hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Form Link
                      </a>
                    </td>
                    <td className="p-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedLedgerEvent(evt)}
                        className="gap-1.5 text-[11px] py-1.5"
                      >
                        <Users className="w-3.5 h-3.5 text-purple-600" /> View Ledger ({eventRegs.length} Teams)
                      </Button>
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleRegistration(evt.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black ${
                            evt.isRegistrationOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          Reg: {evt.isRegistrationOpen ? 'Open' : 'Closed'}
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => {
                            setEventToEdit(evt);
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-600"
                          title="Edit Event"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(evt.id)}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Form Modal */}
      <EventFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={eventToEdit}
        onSuccess={(newEvent) => {
          if (eventToEdit) {
            setEvents((prev) => prev.map((e) => (e.id === newEvent.id ? newEvent : e)));
          } else {
            setEvents((prev) => [newEvent, ...prev]);
          }
        }}
      />

      {/* Isolated Event Registrations Ledger Modal */}
      {selectedLedgerEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full border border-purple-100 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <Badge variant="purple">ISOLATED EVENT STORAGE</Badge>
                <h3 className="text-xl font-black text-slate-900 mt-1">{selectedLedgerEvent.title}</h3>
                <p className="text-xs text-slate-500 font-medium">Dedicated Team Registrations Database Ledger</p>
              </div>
              <button onClick={() => setSelectedLedgerEvent(null)} className="p-2 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => exportToCsv(`${selectedLedgerEvent.slug}_registrations`, eventLedgers[selectedLedgerEvent.id] || [])}
                className="gap-2 text-xs"
              >
                <Download className="w-4 h-4" /> Export Event CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleClearEventLedger(selectedLedgerEvent.id)}
                className="gap-1.5 text-xs text-rose-600 border-rose-200 hover:bg-rose-50"
              >
                <ShieldAlert className="w-4 h-4" /> Manually Purge Event Ledger
              </Button>
            </div>

            {/* Event Ledger Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-purple-50 text-purple-900 font-black uppercase">
                  <tr>
                    <th className="p-3">Team Name & ID</th>
                    <th className="p-3">Team Password</th>
                    <th className="p-3">Leader Info</th>
                    <th className="p-3">College & Location</th>
                    <th className="p-3">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {(eventLedgers[selectedLedgerEvent.id] || []).length > 0 ? (
                    (eventLedgers[selectedLedgerEvent.id] || []).map((reg, idx) => (
                      <tr key={idx}>
                        <td className="p-3">
                          <p className="font-extrabold text-slate-900">{reg.teamName}</p>
                          <p className="font-mono text-[10px] text-purple-600 font-bold">{reg.teamIdCode}</p>
                        </td>
                        <td className="p-3 font-mono font-bold text-slate-800">{reg.teamPassword}</td>
                        <td className="p-3">
                          <p className="font-bold text-slate-900">{reg.leaderName}</p>
                          <p className="text-[10px] text-slate-400">{reg.leaderEmail}</p>
                        </td>
                        <td className="p-3">
                          <p className="font-bold text-slate-800">{reg.college}</p>
                          <p className="text-[10px] text-[#FF2E4D] font-bold flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {reg.city}, {reg.state}
                          </p>
                        </td>
                        <td className="p-3">
                          <Badge variant="green">{reg.paymentStatus}</Badge>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-400 font-bold">
                        No team registrations recorded for this event.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <Button variant="primary" className="w-full py-3 text-xs" onClick={() => setSelectedLedgerEvent(null)}>
              Close Ledger View
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
