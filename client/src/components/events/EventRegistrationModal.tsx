import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { registrationStorage } from '../../utils/registrationStorage';
import {
  X,
  Users,
  UserPlus,
  Building,
  MapPin,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Copy,
  Plus,
  Trash2,
} from 'lucide-react';

interface MemberInfo {
  fullName: string;
  email: string;
  phone: string;
  department: string;
}

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventId: string;
  onSuccess: (registrationData: any) => void;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  isOpen,
  onClose,
  eventName,
  eventId,
  onSuccess,
}) => {
  const [teamName, setTeamName] = useState('');
  const [teamPassword, setTeamPassword] = useState('SEC-8391');

  // Location & College Info
  const [college, setCollege] = useState('IIT Madras');
  const [city, setCity] = useState('Chennai');
  const [state, setState] = useState('Tamil Nadu');

  // Team Members List (Supports up to 6 members total including Leader)
  const [members, setMembers] = useState<MemberInfo[]>([
    { fullName: 'Alex Rivera (Leader)', email: 'alex.rivera@stanford.edu', phone: '+91 98765 43210', department: 'Computer Science' },
    { fullName: 'Samantha Zhao', email: 'samantha.z@stanford.edu', phone: '+91 98765 43211', department: 'AI & Data Science' },
  ]);

  const [loading, setLoading] = useState(false);
  const [completedData, setCompletedData] = useState<any | null>(null);

  if (!isOpen) return null;

  const generatedTeamId = `TM-${Math.floor(10000 + Math.random() * 90000)}`;

  const handleAddMemberSlot = () => {
    if (members.length >= 6) {
      alert('Maximum team size is 6 members including the Team Leader.');
      return;
    }
    setMembers([
      ...members,
      { fullName: '', email: '', phone: '', department: '' },
    ]);
  };

  const handleRemoveMemberSlot = (index: number) => {
    if (index === 0) {
      alert('Member 1 (Team Leader) cannot be removed.');
      return;
    }
    setMembers(members.filter((_, idx) => idx !== index));
  };

  const handleMemberChange = (index: number, field: keyof MemberInfo, value: string) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const leader = members[0];
      const regRecord = {
        id: `reg-${Date.now()}`,
        eventId,
        eventName,
        teamName: teamName || 'Kernel Overriders Team',
        teamIdCode: generatedTeamId,
        teamPassword,
        role: 'LEADER' as const,
        fullName: leader.fullName,
        email: leader.email,
        phone: leader.phone,
        college,
        city,
        state,
        department: leader.department,
        year: '3rd Year',
        teamMembers: members,
        registeredAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        paymentStatus: 'PAID' as const,
        status: 'VERIFIED' as const,
      };

      registrationStorage.addRegistration(regRecord);

      setCompletedData(regRecord);
      onSuccess(regRecord);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-purple-100 shadow-2xl space-y-6 relative overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="purple">OFFICIAL REGISTRATION</Badge>
              <Badge variant="pink">{members.length} / 6 TEAM MEMBERS</Badge>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{eventName}</h3>
            <p className="text-xs text-slate-500 font-medium">Register team roster supporting up to 6 members.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 font-bold">
            ✕
          </button>
        </div>

        {/* Completed State Display */}
        {completedData ? (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-slate-900">Registration Successful!</h4>
              <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">
                Team <span className="font-extrabold text-purple-600">{completedData.teamName}</span> ({members.length} Members) is officially registered for {eventName}.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border border-purple-200 text-left space-y-3 shadow-inner">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-600">TEAM ID</span>
                <span className="font-mono font-black text-slate-900 text-sm bg-white px-3 py-1 rounded-xl border border-purple-200 shadow-sm">
                  {completedData.teamIdCode}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-pink-600">TEAM PASSWORD</span>
                <span className="font-mono font-black text-slate-900 text-sm bg-white px-3 py-1 rounded-xl border border-pink-200 shadow-sm">
                  {completedData.teamPassword}
                </span>
              </div>
            </div>

            <Button variant="primary" className="w-full py-3.5 font-black text-xs" onClick={onClose}>
              Done & Return to Events
            </Button>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold text-slate-700">
            {/* Team Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-extrabold text-slate-900">Team Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kernel Overriders Squad"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block mb-1 font-extrabold text-slate-900">Team Password *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SEC-8391"
                  value={teamPassword}
                  onChange={(e) => setTeamPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-bold"
                />
              </div>
            </div>

            {/* Institution Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block mb-1 font-extrabold text-slate-900">College Name *</label>
                <input type="text" required value={college} onChange={(e) => setCollege(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label className="block mb-1 font-extrabold text-slate-900">City *</label>
                <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label className="block mb-1 font-extrabold text-slate-900">State *</label>
                <input type="text" required value={state} onChange={(e) => setState(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
            </div>

            {/* Dynamic Team Members Section (Up to 6 Members) */}
            <div className="space-y-4 border-t border-slate-100 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase text-purple-600">
                  Team Members Roster ({members.length} / 6)
                </span>

                {members.length < 6 && (
                  <button
                    type="button"
                    onClick={handleAddMemberSlot}
                    className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-[11px] flex items-center gap-1 border border-purple-200"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Member ({members.length + 1})
                  </button>
                )}
              </div>

              {members.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-slate-900 text-xs">
                      {idx === 0 ? 'Member 1 (Team Leader) *' : `Member ${idx + 1}`}
                    </span>
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMemberSlot(idx)}
                        className="text-rose-600 hover:text-rose-800 text-[11px] font-bold"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={m.fullName}
                      onChange={(e) => handleMemberChange(idx, 'fullName', e.target.value)}
                      className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={m.email}
                      onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                      className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number *"
                      value={m.phone}
                      onChange={(e) => handleMemberChange(idx, 'phone', e.target.value)}
                      className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Department (e.g. CS) *"
                      value={m.department}
                      onChange={(e) => handleMemberChange(idx, 'department', e.target.value)}
                      className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button variant="primary" type="submit" size="lg" className="w-full py-3.5 text-xs font-black shadow-xl" disabled={loading}>
              {loading ? 'Registering Team...' : `Confirm Team Roster (${members.length} Members)`}
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
