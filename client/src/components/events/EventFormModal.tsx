import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { X, Calendar, Image as ImageIcon, Link as LinkIcon, Clock, Sparkles } from 'lucide-react';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (eventData: any) => void;
  initialData?: any;
}

export const EventFormModal: React.FC<EventFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    bannerUrl: initialData?.bannerUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    durationHours: initialData?.durationHours || '48 Hours',
    startDate: initialData?.startDate || '2026-09-15T09:00',
    endDate: initialData?.endDate || '2026-09-17T18:00',
    registrationFormLink: initialData?.registrationFormLink || '',
    eventType: initialData?.eventType || 'HACKATHON',
    mode: initialData?.mode || 'ONLINE',
    prizePool: initialData?.prizePool || '₹1,50,000',
    maxTeamSize: initialData?.maxTeamSize || 4,
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const formLink = formData.registrationFormLink || `http://localhost:5173/events/${slug}`;

      const created = {
        id: initialData?.id || `evt-${Date.now()}`,
        slug,
        ...formData,
        registrationFormLink: formLink,
        status: 'UPCOMING',
        isRegistrationOpen: true,
        isSubmissionOpen: true,
        participantsCount: 0,
        tags: ['AI', 'React', 'Agentic'],
      };

      onSuccess(created);
      setLoading(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card bg-slate-900/90 rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-purple-500/30 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-slate-100"
      >
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">
                {initialData ? 'Edit Event Details' : 'Create New Event'}
              </h3>
              <p className="text-xs text-slate-400 font-medium">Configure event banner, dates, duration, and form link.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Event Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Kernel Overriders AI Zenith 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Category *</label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
              >
                <option value="HACKATHON">Hackathon</option>
                <option value="CYBERSECURITY">CTF Cybersecurity</option>
                <option value="CODING_COMPETITION">Coding Battle</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Event Duration / Hours *</label>
              <input
                type="text"
                required
                placeholder="e.g. 48 Hours"
                value={formData.durationHours}
                onChange={(e) => setFormData({ ...formData, durationHours: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Registration Form URL (Google Form) *</label>
            <input
              type="url"
              required
              placeholder="https://forms.google.com/..."
              value={formData.registrationFormLink}
              onChange={(e) => setFormData({ ...formData, registrationFormLink: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-mono font-semibold focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Banner Image URL</label>
            <input
              type="text"
              value={formData.bannerUrl}
              onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-semibold focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Detailed Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-semibold focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-2 pt-4 border-t border-slate-800">
            <Button variant="secondary" type="button" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Saving...' : initialData ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
