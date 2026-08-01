import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { CreateTeamModal } from '../../components/teams/CreateTeamModal';
import { JoinTeamModal } from '../../components/teams/JoinTeamModal';
import { MOCK_EVENTS } from '../../data/mockData';
import {
  Users,
  UserPlus,
  ShieldCheck,
  Lock,
  Unlock,
  Trash2,
  CheckCircle2,
  XCircle,
  UserMinus,
  Crown,
  Key,
  Hash,
  Copy,
  Check,
  Sparkles,
  Trophy,
} from 'lucide-react';

export const MyTeamTab: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState('');

  // Initial Team State Demo
  const [team, setTeam] = useState<any>({
    id: 'tm-demo-1',
    name: 'NeuralCrafters',
    teamIdCode: 'TM-94820',
    teamPassword: 'SEC-8391',
    maxMembers: 4,
    isLocked: false,
    registrationStatus: 'UNREGISTERED',
    eventName: MOCK_EVENTS[0].title,
    leaderId: 'usr-demo-123',
    members: [
      {
        id: 'mem-1',
        userId: 'usr-demo-123',
        fullName: 'Alex Rivera (You)',
        email: 'alex.rivera@stanford.edu',
        college: 'Stanford University',
        role: 'LEADER',
        status: 'ACCEPTED',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      },
      {
        id: 'mem-2',
        userId: 'usr-2',
        fullName: 'Samantha Zhao',
        email: 'samantha@mit.edu',
        college: 'MIT',
        role: 'MEMBER',
        status: 'ACCEPTED',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      },
      {
        id: 'mem-3',
        userId: 'usr-3',
        fullName: 'Marcus Vance',
        email: 'marcus@berkeley.edu',
        college: 'UC Berkeley',
        role: 'MEMBER',
        status: 'PENDING',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      },
    ],
  });

  const isLeader = team && team.leaderId === 'usr-demo-123';

  const acceptedMembers = team ? team.members.filter((m: any) => m.status === 'ACCEPTED') : [];
  const pendingRequests = team ? team.members.filter((m: any) => m.status === 'PENDING') : [];

  const copyToClipboard = (text: string, type: 'id' | 'pass') => {
    navigator.clipboard.writeText(text);
    if (type === 'id') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  const showNotice = (msg: string) => {
    setNoticeMessage(msg);
    setTimeout(() => setNoticeMessage(''), 3500);
  };

  // Leader Action Handlers
  const handleAcceptMember = (memberId: string) => {
    setTeam((prev: any) => ({
      ...prev,
      members: prev.members.map((m: any) => (m.id === memberId ? { ...m, status: 'ACCEPTED' } : m)),
    }));
    showNotice('Member accepted into team!');
  };

  const handleRejectMember = (memberId: string) => {
    setTeam((prev: any) => ({
      ...prev,
      members: prev.members.filter((m: any) => m.id !== memberId),
    }));
    showNotice('Join request rejected.');
  };

  const handleRemoveMember = (memberId: string) => {
    setTeam((prev: any) => ({
      ...prev,
      members: prev.members.filter((m: any) => m.id !== memberId),
    }));
    showNotice('Member removed from team.');
  };

  const handleTransferLeadership = (targetUserId: string) => {
    setTeam((prev: any) => ({
      ...prev,
      leaderId: targetUserId,
      members: prev.members.map((m: any) => ({
        ...m,
        role: m.userId === targetUserId ? 'LEADER' : 'MEMBER',
      })),
    }));
    showNotice('Leadership transferred successfully!');
  };

  const handleToggleLock = () => {
    setTeam((prev: any) => ({
      ...prev,
      isLocked: !prev.isLocked,
    }));
    showNotice(team.isLocked ? 'Team unlocked for join requests.' : 'Team locked successfully.');
  };

  const handleDeleteTeam = () => {
    if (window.confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      setTeam(null);
      showNotice('Team deleted.');
    }
  };

  const handleRegisterEvent = () => {
    setTeam((prev: any) => ({
      ...prev,
      registrationStatus: 'REGISTERED',
    }));
    showNotice('🎉 Team registered for event! Registration Status: REGISTERED');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      {noticeMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="p-4 rounded-2xl bg-purple-600 text-white font-extrabold text-xs text-center shadow-lg"
        >
          {noticeMessage}
        </motion.div>
      )}

      {/* When user has no team */}
      {!team ? (
        <div className="glass-card rounded-3xl p-10 text-center border border-white/90 shadow-xl space-y-6 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto">
            <Users className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900">No Active Team</h3>
            <p className="text-xs text-slate-500 font-medium">
              Create a team as Leader or join an existing team using Team ID & Password.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="primary" className="w-full gap-2" onClick={() => setIsCreateOpen(true)}>
              <Sparkles className="w-4 h-4" /> Create Team
            </Button>
            <Button variant="secondary" className="w-full gap-2" onClick={() => setIsJoinOpen(true)}>
              <UserPlus className="w-4 h-4" /> Join Team
            </Button>
          </div>
        </div>
      ) : (
        /* When user has an active team */
        <div className="space-y-6">
          {/* Team Header Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/90 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{team.name}</h2>
                  {team.isLocked ? (
                    <Badge variant="pink" className="gap-1">
                      <Lock className="w-3 h-3" /> Locked
                    </Badge>
                  ) : (
                    <Badge variant="green" className="gap-1">
                      <Unlock className="w-3 h-3" /> Open
                    </Badge>
                  )}
                  <Badge variant={team.registrationStatus === 'REGISTERED' ? 'purple' : 'yellow'}>
                    {team.registrationStatus}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 font-bold mt-1">Event: {team.eventName}</p>
              </div>

              {/* Action Buttons for non-leaders / leaders */}
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="secondary" size="sm" onClick={() => setIsJoinOpen(true)} className="gap-1.5 text-xs">
                  <UserPlus className="w-3.5 h-3.5" /> Join Another
                </Button>
                <Button variant="primary" size="sm" onClick={() => setIsCreateOpen(true)} className="gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5" /> Create New
                </Button>
              </div>
            </div>

            {/* Team Credentials Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Auto Team ID */}
              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">AUTO TEAM ID</span>
                  <span className="text-base font-mono font-black text-purple-700">{team.teamIdCode}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(team.teamIdCode, 'id')}
                  className="p-2 rounded-xl bg-white text-purple-600 shadow-sm hover:bg-purple-100 transition-colors"
                >
                  {copiedId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Auto Team Password */}
              <div className="p-4 rounded-2xl bg-pink-50/80 border border-pink-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">AUTO TEAM PASSWORD</span>
                  <span className="text-base font-mono font-black text-pink-700">{team.teamPassword}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(team.teamPassword, 'pass')}
                  className="p-2 rounded-xl bg-white text-pink-600 shadow-sm hover:bg-pink-100 transition-colors"
                >
                  {copiedPass ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Max Capacity */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">MEMBERS CAPACITY</span>
                  <span className="text-base font-black text-amber-800">
                    {acceptedMembers.length} / {team.maxMembers} Members
                  </span>
                </div>
                <Users className="w-5 h-5 text-amber-600" />
              </div>
            </div>

            {/* Leader Control Action Bar */}
            {isLeader && (
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={team.registrationStatus === 'REGISTERED' ? 'secondary' : 'yellow'}
                    size="sm"
                    onClick={handleRegisterEvent}
                    className="gap-1.5"
                    disabled={team.registrationStatus === 'REGISTERED'}
                  >
                    <Trophy className="w-4 h-4 text-amber-600" />
                    {team.registrationStatus === 'REGISTERED' ? 'Already Registered' : 'Register Team for Event'}
                  </Button>

                  <Button variant="outline" size="sm" onClick={handleToggleLock} className="gap-1.5">
                    {team.isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    {team.isLocked ? 'Unlock Team' : 'Lock Team'}
                  </Button>
                </div>

                <Button variant="outline" size="sm" onClick={handleDeleteTeam} className="gap-1.5 border-rose-200 text-rose-600 hover:bg-rose-50">
                  <Trash2 className="w-4 h-4" /> Delete Team
                </Button>
              </div>
            )}
          </div>

          {/* Pending Requests Section (Leader View) */}
          {isLeader && pendingRequests.length > 0 && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/90 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-slate-900">Pending Join Requests</h3>
                <Badge variant="yellow">{pendingRequests.length} Pending</Badge>
              </div>

              <div className="space-y-3">
                {pendingRequests.map((req: any) => (
                  <div key={req.id} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <img src={req.avatar} alt={req.fullName} className="w-10 h-10 rounded-full object-cover border border-amber-300" />
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">{req.fullName}</h4>
                        <p className="text-xs text-slate-500">{req.email} &bull; {req.college}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="primary" size="sm" onClick={() => handleAcceptMember(req.id)} className="gap-1 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Accept
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleRejectMember(req.id)} className="gap-1 text-xs text-rose-600 border-rose-200 hover:bg-rose-50">
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accepted Members List */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/90 shadow-xl space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900">Accepted Team Members ({acceptedMembers.length})</h3>

            <div className="space-y-3">
              {acceptedMembers.map((member: any) => (
                <div key={member.id} className="p-4 rounded-2xl bg-white/80 border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <img src={member.avatar} alt={member.fullName} className="w-11 h-11 rounded-full object-cover border border-purple-200" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-slate-900">{member.fullName}</h4>
                        {member.role === 'LEADER' && (
                          <Badge variant="purple" className="gap-1 py-0.5 text-[10px]">
                            <Crown className="w-3 h-3 text-amber-400" /> LEADER
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{member.email} &bull; {member.college}</p>
                    </div>
                  </div>

                  {/* Leader actions for members */}
                  {isLeader && member.userId !== team.leaderId && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleTransferLeadership(member.userId)} className="text-[11px] py-1.5 gap-1">
                        <Crown className="w-3 h-3 text-amber-500" /> Transfer Leader
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleRemoveMember(member.id)} className="text-[11px] py-1.5 text-rose-600 border-rose-200 hover:bg-rose-50 gap-1">
                        <UserMinus className="w-3 h-3" /> Remove
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateTeamModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={(newTeam) => {
          setTeam({
            ...newTeam,
            eventName: MOCK_EVENTS[0].title,
            leaderId: 'usr-demo-123',
            members: [
              {
                id: 'mem-1',
                userId: 'usr-demo-123',
                fullName: 'Alex Rivera (You)',
                email: 'alex.rivera@stanford.edu',
                college: 'Stanford University',
                role: 'LEADER',
                status: 'ACCEPTED',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
              },
            ],
          });
          showNotice('Team created successfully!');
        }}
      />

      <JoinTeamModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        onSuccess={(joinedTeamId) => {
          showNotice(`Join request submitted to Team ${joinedTeamId}! Pending leader approval.`);
        }}
      />
    </div>
  );
};
