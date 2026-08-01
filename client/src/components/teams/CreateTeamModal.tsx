import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { MOCK_EVENTS } from '../../data/mockData';
import { Users, X, Sparkles, Key, Hash } from 'lucide-react';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (teamData: any) => void;
}

export const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [eventId, setEventId] = useState(MOCK_EVENTS[0].id);
  const [maxMembers, setMaxMembers] = useState(4);
  const [loading, setLoading] = useState(false);

  // Auto-generate preview IDs
  const previewTeamId = `TM-${Math.floor(10000 + Math.random() * 90000)}`;
  const previewPassword = `SEC-${Math.floor(1000 + Math.random() * 9000)}`;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      onSuccess({
        id: `team-${Date.now()}`,
        name,
        eventId,
        teamIdCode: previewTeamId,
        teamPassword: previewPassword,
        maxMembers,
        isLocked: false,
        registrationStatus: 'UNREGISTERED',
      });
      setLoading(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card bg-white p-8 rounded-3xl max-w-lg w-full shadow-2xl relative space-y-6 border border-purple-200"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Create New Team</h3>
          <p className="text-xs text-slate-500 font-medium">
            You will become the Team Leader. Share your auto-generated Team ID & Password with members.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Team Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Neural Crafters"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Select Event *</label>
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
            >
              {MOCK_EVENTS.map((evt) => (
                <option key={evt.id} value={evt.id}>
                  {evt.title} ({evt.prizePool})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Maximum Team Members</label>
            <select
              value={maxMembers}
              onChange={(e) => setMaxMembers(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
            >
              <option value={2}>2 Members</option>
              <option value={3}>3 Members</option>
              <option value={4}>4 Members (Standard)</option>
              <option value={5}>5 Members</option>
              <option value={6}>6 Members</option>
            </select>
          </div>

          {/* Auto-generated previews */}
          <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-100 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-600 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-purple-600" /> Auto Team ID:
              </span>
              <span className="font-mono font-black text-purple-700">{previewTeamId}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-600 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-pink-600" /> Auto Team Password:
              </span>
              <span className="font-mono font-black text-pink-700">{previewPassword}</span>
            </div>
          </div>

          <Button variant="primary" type="submit" className="w-full py-3.5 mt-2" disabled={loading}>
            {loading ? 'Generating Team...' : 'Create Team & Generate Credentials'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
