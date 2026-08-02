import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { TeamRegistrationRecord } from '../../utils/registrationStorage';
import { X, Edit, MapPin, Building, ShieldCheck, User } from 'lucide-react';

interface EditRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: TeamRegistrationRecord | null;
  onSave: (id: string, updatedFields: Partial<TeamRegistrationRecord>) => void;
}

export const EditRegistrationModal: React.FC<EditRegistrationModalProps> = ({
  isOpen,
  onClose,
  record,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<TeamRegistrationRecord>>({});

  useEffect(() => {
    if (record) {
      setFormData({ ...record });
    }
  }, [record]);

  if (!isOpen || !record) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(record.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card bg-slate-900/90 rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-purple-500/30 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto text-slate-100"
      >
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
              <Edit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Edit Registration & Team Details</h3>
              <p className="text-xs text-slate-400 font-medium">Modify incorrect team or participant information.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Team Name *</label>
              <input
                type="text"
                required
                value={formData.teamName || ''}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Team ID (TM-Code) *</label>
              <input
                type="text"
                required
                value={formData.teamIdCode || ''}
                onChange={(e) => setFormData({ ...formData, teamIdCode: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-mono font-bold focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Leader Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName || ''}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Phone *</label>
              <input
                type="text"
                required
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">City *</label>
              <input
                type="text"
                required
                value={formData.city || ''}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">State *</label>
              <input
                type="text"
                required
                value={formData.state || ''}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">College Name *</label>
            <input
              type="text"
              required
              value={formData.college || ''}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-2 pt-4 border-t border-slate-800">
            <Button variant="secondary" type="button" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="flex-1">
              Save Record
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
