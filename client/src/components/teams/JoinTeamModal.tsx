import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { UserPlus, X, Hash, Key } from 'lucide-react';

interface JoinTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (teamIdCode: string) => void;
}

export const JoinTeamModal: React.FC<JoinTeamModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [teamIdCode, setTeamIdCode] = useState('');
  const [teamPassword, setTeamPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamIdCode || !teamPassword) {
      setError('Both Team ID and Team Password are required');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onSuccess(teamIdCode.trim().toUpperCase());
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
          <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-2">
            <UserPlus className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Join Existing Team</h3>
          <p className="text-xs text-slate-500 font-medium">
            Enter the Team ID and Team Password provided by your Team Leader.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Team ID *</label>
            <div className="relative">
              <Hash className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. TM-94820"
                value={teamIdCode}
                onChange={(e) => setTeamIdCode(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white font-mono text-sm uppercase rounded-2xl border border-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Team Password *</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="e.g. SEC-8391"
                value={teamPassword}
                onChange={(e) => setTeamPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white text-sm rounded-2xl border border-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <Button variant="primary" type="submit" className="w-full py-3.5 mt-2" disabled={loading}>
            {loading ? 'Submitting Request...' : 'Submit Join Request'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
