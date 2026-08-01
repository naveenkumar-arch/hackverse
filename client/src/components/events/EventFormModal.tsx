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
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-purple-100 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                {initialData ? 'Edit Event Details' : 'Create New Event'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">Configure event banner, dates, duration, and form link.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Event Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Kernel Overriders AI Zenith 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-bold focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Category *</label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-bold focus:outline-none focus:border-purple-500"
              >
                <option value="HACKATHON">Hackathon</option>
                <option value="CYBERSECURITY">CTF Cybersecurity</option>
                <option value="CODING_COMPETITION">Coding Battle</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Event Duration / Hours *</label>
              <input
                type="text"
                required
                placeholder="e.g. 48 Hours"
                value={formData.durationHours}
                onChange={(e) => setFormData({ ...formData, durationHours: e.target.value })}
                className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Start Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">End Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Event Poster / Banner Image URL *</label>
            <div className="relative">
              <ImageIcon className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={formData.bannerUrl}
                onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                className="w-full pl-11 pr-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Registration Form Link (Auto-Generated if blank)</label>
            <div className="relative">
              <LinkIcon className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                placeholder="http://localhost:5173/events/kernel-overriders-ai-zenith-2026"
                value={formData.registrationFormLink}
                onChange={(e) => setFormData({ ...formData, registrationFormLink: e.target.value })}
                className="w-full pl-11 pr-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Short Summary Description *</label>
            <textarea
              required
              rows={2}
              placeholder="Build autonomous LLM agents & generative apps with top mentors."
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full p-3 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-semibold"
            />
          </div>

          <Button variant="primary" type="submit" className="w-full py-3.5 text-xs font-black shadow-xl" disabled={loading}>
            {loading ? 'Saving Event...' : initialData ? 'Update Event & Form Link' : 'Create Event & Generate Form Link'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
