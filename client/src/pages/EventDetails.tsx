import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventManagementStorage, ManagedEvent } from '../utils/eventManagementStorage';
import { handleImageError } from '../utils/imageUtils';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { EventRegistrationModal } from '../components/events/EventRegistrationModal';
import { Calendar, Trophy, ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';

export const EventDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<ManagedEvent | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registrationNotice, setRegistrationNotice] = useState('');

  useEffect(() => {
    const events = eventManagementStorage.getEvents();
    const found = events.find((e) => e.id === slug || e.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug) || events[0] || null;
    setEvent(found);
  }, [slug]);

  if (!event) {
    return (
      <div className="py-16 text-center space-y-4">
        <Trophy className="w-12 h-12 text-slate-300 mx-auto" />
        <h3 className="text-2xl font-black text-slate-900">Event Not Found</h3>
        <p className="text-xs text-slate-500 font-medium">The requested event is not available or has been removed.</p>
        <Link to="/events">
          <Button variant="primary">Back to All Events</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 py-6">
      {/* Back button */}
      <Link to="/events" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-purple-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to All Events
      </Link>

      {/* Banner & Header */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-purple-100 shadow-2xl space-y-6">
        <div className="relative h-72 sm:h-96 w-full">
          <img
            src={event.imageLink}
            alt={event.title}
            onError={(e) => handleImageError(e, event.imageLink)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          <div className="absolute bottom-8 left-6 right-6 sm:left-10 sm:right-10 text-white space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant={event.status === 'LIVE' ? 'pink' : 'purple'}>{event.status}</Badge>
              <Badge variant="green">Registration Open</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-xs sm:text-sm font-semibold text-slate-300">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                {event.eventDate} ({event.startTime} - {event.endTime})
              </span>
              <span>Duration: {event.durationHours} Hours</span>
            </div>
          </div>
        </div>

        {/* Action bar below banner */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-slate-100">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">EVENT STATUS</p>
            <p className="text-sm font-black text-slate-900">{event.status}</p>
          </div>

          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <a href={event.registrationLink} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2 shadow-xl">
                <ExternalLink className="w-5 h-5" /> Click here to register (Google Form)
              </Button>
            </a>
          </div>
        </div>
      </div>

      {registrationNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
          {registrationNotice}
        </div>
      )}

      {/* Grid details */}
      <div className="glass-card bg-white rounded-3xl p-8 border border-purple-100 shadow-xl space-y-4">
        <h3 className="text-2xl font-extrabold text-slate-900">Event Overview & Description</h3>
        <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* Comprehensive Event Team Registration Modal */}
      <EventRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        eventName={event.title}
        eventId={event.id}
        onSuccess={(regData) => {
          setRegistrationNotice(`🎉 Team "${regData.teamName}" registered successfully!`);
        }}
      />
    </div>
  );
};
