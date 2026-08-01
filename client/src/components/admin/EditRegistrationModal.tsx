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
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-purple-100 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
              <Edit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Edit Registration & Team Details</h3>
              <p className="text-xs text-slate-500 font-medium">Modify incorrect team or participant information.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Team Name *</label>
              <input
                type="text"
                required
                value={formData.teamName || ''}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Team ID (TM-Code) *</label>
              <input
                type="text"
                required
                value={formData.teamIdCode || ''}
                onChange={(e) => setFormData({ ...formData, teamIdCode: e.target.value })}
                className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Leader Name *</label>
              <input
                type="text"
                required
                value={formData.fullName || ''}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Leader Email *</label>
              <input
                type="email"
                required
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">College *</label>
              <input
                type="text"
                required
                value={formData.college || ''}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">City *</label>
              <input
                type="text"
                required
                value={formData.city || ''}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">State *</label>
              <input
                type="text"
                required
                value={formData.state || ''}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Verification Status</label>
              <select
                value={formData.status || 'VERIFIED'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-bold"
              >
                <option value="VERIFIED">VERIFIED</option>
                <option value="REGISTERED">REGISTERED (PENDING)</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Payment Status</label>
              <select
                value={formData.paymentStatus || 'PAID'}
                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-bold"
              >
                <option value="PAID">PAID</option>
                <option value="PENDING">PENDING</option>
                <option value="MANUAL_VERIFICATION">MANUAL VERIFICATION</option>
              </select>
            </div>
          </div>

          <Button variant="primary" type="submit" className="w-full py-3.5 text-xs font-black shadow-xl mt-2">
            Save Record Changes & Verify
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
