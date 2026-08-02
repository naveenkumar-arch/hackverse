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
        teamPassword: teamPassword || 'SEC-8391',
        role: 'LEADER' as const,
        fullName: leader.fullName || 'Team Leader',
        email: leader.email || 'leader@kerneloverriders.com',
        phone: leader.phone || '+91 98765 43210',
        college: college || 'Tech Institute',
        city: city || 'Chennai',
        state: state || 'Tamil Nadu',
        department: leader.department || 'Computer Science',
        year: '3rd Year',
        registeredAt: new Date().toISOString(),
        paymentStatus: 'PAID' as const,
        status: 'REGISTERED' as const,
      };

      registrationStorage.addRegistration(regRecord);

      // Add other team members to storage if present
      members.slice(1).forEach((member, idx) => {
        if (member.fullName) {
          registrationStorage.addRegistration({
            id: `reg-${Date.now()}-${idx + 1}`,
            eventId,
            eventName,
            teamName: teamName || 'Kernel Overriders Team',
            teamIdCode: generatedTeamId,
            teamPassword: teamPassword || 'SEC-8391',
            role: 'MEMBER',
            fullName: member.fullName,
            email: member.email || `member${idx + 1}@kerneloverriders.com`,
            phone: member.phone || '+91 98765 00000',
            college,
            city,
            state,
            department: member.department || 'Engineering',
            year: '3rd Year',
            registeredAt: new Date().toISOString(),
            paymentStatus: 'PAID',
            status: 'REGISTERED',
          });
        }
      });

      setCompletedData(regRecord);
      setLoading(false);
      onSuccess(regRecord);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card bg-slate-900/90 rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-purple-500/30 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-slate-100"
      >
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <Badge variant="purple">OFFICIAL EVENT REGISTRATION</Badge>
            <h3 className="text-2xl font-black text-white mt-1">{eventName}</h3>
            <p className="text-xs text-slate-400 font-medium">Register team roster supporting up to 6 members.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white font-bold">
            ✕
          </button>
        </div>

        {/* Completed State Display */}
        {completedData ? (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-white">Registration Successful!</h4>
              <p className="text-xs text-slate-300 font-semibold max-w-md mx-auto">
                Team <span className="font-extrabold text-cyan-400">{completedData.teamName}</span> ({members.length} Members) is officially registered for {eventName}.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 text-left space-y-3 shadow-inner">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-400">TEAM ID</span>
                <span className="font-mono font-black text-cyan-400 text-sm bg-slate-900 px-3 py-1 rounded-xl border border-purple-500/30 shadow-sm">
                  {completedData.teamIdCode}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-pink-400">TEAM PASSWORD</span>
                <span className="font-mono font-black text-pink-300 text-sm bg-slate-900 px-3 py-1 rounded-xl border border-pink-500/30 shadow-sm">
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
          <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold text-slate-300">
            {/* Team Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-extrabold text-slate-200">Team Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kernel Overriders Squad"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/80 text-white placeholder-slate-500 rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-extrabold text-slate-200">Team Password *</label>
                <input
                  type="text"
                  required
                  value={teamPassword}
                  onChange={(e) => setTeamPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/80 text-white placeholder-slate-500 rounded-2xl border border-slate-700/80 text-xs font-mono font-bold focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Location & College */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block mb-1 font-extrabold text-slate-200">College Name *</label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-extrabold text-slate-200">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-extrabold text-slate-200">State *</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/80 text-white rounded-2xl border border-slate-700/80 text-xs font-bold focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Team Members List */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-purple-400 uppercase tracking-wider text-[11px]">
                  Team Members Roster ({members.length} / 6 Max)
                </span>
                {members.length < 6 && (
                  <button
                    type="button"
                    onClick={handleAddMemberSlot}
                    className="inline-flex items-center gap-1 text-[11px] font-extrabold text-cyan-400 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Member Slot
                  </button>
                )}
              </div>

              {members.map((member, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-xs">
                      {idx === 0 ? '👑 Member 1 (Team Leader)' : `Member ${idx + 1}`}
                    </span>
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMemberSlot(idx)}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={member.fullName}
                      onChange={(e) => handleMemberChange(idx, 'fullName', e.target.value)}
                      className="px-3.5 py-2 bg-slate-900 text-white rounded-xl border border-slate-800 text-xs font-bold"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={member.email}
                      onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                      className="px-3.5 py-2 bg-slate-900 text-white rounded-xl border border-slate-800 text-xs font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Phone Number *"
                      value={member.phone}
                      onChange={(e) => handleMemberChange(idx, 'phone', e.target.value)}
                      className="px-3.5 py-2 bg-slate-900 text-white rounded-xl border border-slate-800 text-xs font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Department (e.g. CSE)"
                      value={member.department}
                      onChange={(e) => handleMemberChange(idx, 'department', e.target.value)}
                      className="px-3.5 py-2 bg-slate-900 text-white rounded-xl border border-slate-800 text-xs font-bold"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 font-black text-xs mt-4"
            >
              {loading ? 'Processing Registration...' : 'Complete Team Registration'}
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
