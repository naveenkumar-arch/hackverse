import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EventFormModal } from '../../components/events/EventFormModal';
import { eventManagementStorage, ManagedEvent } from '../../utils/eventManagementStorage';
import { registrationStorage, TeamRegistrationRecord } from '../../utils/registrationStorage';
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
import { exportToCsv } from '../../utils/csvExporter';

export const EventsAdmin: React.FC = () => {
  const [events, setEvents] = useState<ManagedEvent[]>([]);
  const [registrations, setRegistrations] = useState<TeamRegistrationRecord[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<ManagedEvent | null>(null);

  // Event-specific Isolated Ledger Modal State
  const [selectedLedgerEvent, setSelectedLedgerEvent] = useState<ManagedEvent | null>(null);

  const loadData = () => {
    setEvents(eventManagementStorage.getEvents());
    setRegistrations(registrationStorage.getRegistrations());
  };

  useEffect(() => {
    loadData();

    const handleEventsUpdate = () => loadData();
    const handleRegsUpdate = () => loadData();

    window.addEventListener('ko_managed_events_updated', handleEventsUpdate);
    window.addEventListener('ko_registrations_updated', handleRegsUpdate);

    return () => {
      window.removeEventListener('ko_managed_events_updated', handleEventsUpdate);
      window.removeEventListener('ko_registrations_updated', handleRegsUpdate);
    };
  }, []);

  const handleToggleRegistration = (eventId: string, currentStatus: boolean) => {
    eventManagementStorage.toggleRegistrationLink(eventId, !currentStatus);
  };

  const handleToggleSubmission = (eventId: string, currentStatus: boolean) => {
    eventManagementStorage.toggleSubmissionLink(eventId, !currentStatus);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event and its persistent data?')) {
      eventManagementStorage.deleteEvent(eventId);
      if (selectedLedgerEvent?.id === eventId) {
        setSelectedLedgerEvent(null);
      }
    }
  };

  const handleClearEventLedger = (eventId: string) => {
    if (window.confirm('Manually clear all registration data for this event? (Data will be permanently removed)')) {
      const eventRegs = registrations.filter((r) => r.eventId === eventId);
      eventRegs.forEach((r) => registrationStorage.deleteRegistration(r.id));
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
                const eventRegs = registrations.filter((r) => r.eventId === evt.id);
                return (
                  <tr key={evt.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={evt.imageLink}
                          alt={evt.title}
                          className="w-14 h-10 rounded-xl object-cover border border-purple-200"
                        />
                        <div>
                          <p className="font-extrabold text-slate-900 text-sm">{evt.title}</p>
                          <Badge variant="purple" className="text-[9px] mt-0.5">
                            {evt.status}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-black text-slate-800">{evt.durationHours ? `${evt.durationHours} Hours` : '24 Hours'}</td>
                    <td className="p-4">
                      <a
                        href={evt.registrationLink}
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
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleToggleRegistration(evt.id, evt.isRegistrationEnabled)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black ${
                            evt.isRegistrationEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          Reg: {evt.isRegistrationEnabled ? 'Open' : 'Closed'}
                        </button>
                        <button
                          onClick={() => handleToggleSubmission(evt.id, evt.isSubmissionEnabled)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black ${
                            evt.isSubmissionEnabled ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          Sub: {evt.isSubmissionEnabled ? 'Open' : 'Closed'}
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
        initialData={
          eventToEdit
            ? {
                id: eventToEdit.id,
                title: eventToEdit.title,
                bannerUrl: eventToEdit.imageLink,
                description: eventToEdit.description,
                durationHours: `${eventToEdit.durationHours} Hours`,
                startDate: `${eventToEdit.eventDate}T${eventToEdit.startTime}`,
                endDate: `${eventToEdit.eventDate}T${eventToEdit.endTime}`,
                registrationFormLink: eventToEdit.registrationLink,
              }
            : undefined
        }
        onSuccess={(eventData) => {
          if (eventToEdit) {
            eventManagementStorage.updateEvent(eventToEdit.id, {
              title: eventData.title,
              imageLink: eventData.bannerUrl || eventToEdit.imageLink,
              description: eventData.description,
              registrationLink: eventData.registrationFormLink || eventToEdit.registrationLink,
              submissionLink: eventData.registrationFormLink || eventToEdit.submissionLink,
            });
          } else {
            eventManagementStorage.addEvent({
              title: eventData.title,
              imageLink: eventData.bannerUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
              description: eventData.description || 'Global Student Hackathon Competition',
              eventDate: eventData.startDate ? eventData.startDate.split('T')[0] : '2026-09-15',
              startTime: eventData.startDate ? eventData.startDate.split('T')[1] || '09:00' : '09:00',
              endTime: eventData.endDate ? eventData.endDate.split('T')[1] || '18:00' : '18:00',
              durationHours: parseInt(eventData.durationHours) || 24,
              registrationLink: eventData.registrationFormLink || 'https://forms.google.com/your-form',
              submissionLink: eventData.registrationFormLink || 'https://forms.google.com/your-form',
            });
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
                onClick={() =>
                  exportToCsv(
                    `${selectedLedgerEvent.id}_registrations`,
                    registrations.filter((r) => r.eventId === selectedLedgerEvent.id)
                  )
                }
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
                  {registrations.filter((r) => r.eventId === selectedLedgerEvent.id).length > 0 ? (
                    registrations
                      .filter((r) => r.eventId === selectedLedgerEvent.id)
                      .map((reg) => (
                        <tr key={reg.id}>
                          <td className="p-3">
                            <p className="font-extrabold text-slate-900">{reg.teamName}</p>
                            <p className="font-mono text-[10px] text-purple-600 font-bold">{reg.teamIdCode}</p>
                          </td>
                          <td className="p-3 font-mono font-bold text-slate-800">{reg.teamPassword || 'SEC-8391'}</td>
                          <td className="p-3">
                            <p className="font-bold text-slate-900">{reg.fullName}</p>
                            <p className="text-[10px] text-slate-400">{reg.email}</p>
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
