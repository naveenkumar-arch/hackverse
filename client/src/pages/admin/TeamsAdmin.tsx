import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { registrationStorage, TeamRegistrationRecord } from '../../utils/registrationStorage';
import { Users, Search, Lock, Unlock, Crown, Trash2, Edit, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export interface ManagedTeamItem {
  id: string; // leader registration ID or team ID
  name: string;
  teamIdCode: string;
  teamPassword?: string;
  eventId: string;
  eventName: string;
  leaderName: string;
  leaderEmail: string;
  acceptedMembersCount: number;
  maxMembers: number;
  isLocked: boolean;
  registrationStatus: 'REGISTERED' | 'VERIFIED' | 'REJECTED';
}

export const TeamsAdmin: React.FC = () => {
  const [teams, setTeams] = useState<ManagedTeamItem[]>([]);
  const [search, setSearch] = useState('');
  const [editingTeam, setEditingTeam] = useState<ManagedTeamItem | null>(null);
  const [editForm, setEditForm] = useState({ name: '', teamIdCode: '' });

  const loadTeams = () => {
    const regs = registrationStorage.getRegistrations();
    // Group records by teamIdCode or teamName + eventId
    const teamMap: Record<string, ManagedTeamItem> = {};

    regs.forEach((r) => {
      const key = `${r.eventId}_${r.teamIdCode || r.teamName}`;
      if (!teamMap[key]) {
        teamMap[key] = {
          id: r.id,
          name: r.teamName,
          teamIdCode: r.teamIdCode || 'TM-REG',
          teamPassword: r.teamPassword || 'SEC-8391',
          eventId: r.eventId,
          eventName: r.eventName,
          leaderName: r.fullName,
          leaderEmail: r.email,
          acceptedMembersCount: 1,
          maxMembers: 6,
          isLocked: (r as any).isLocked || false,
          registrationStatus: r.status || 'REGISTERED',
        };
      } else {
        teamMap[key].acceptedMembersCount += 1;
        if (r.role === 'LEADER') {
          teamMap[key].leaderName = r.fullName;
          teamMap[key].leaderEmail = r.email;
        }
      }
    });

    setTeams(Object.values(teamMap));
  };

  useEffect(() => {
    loadTeams();
    const handleUpdate = () => loadTeams();
    window.addEventListener('ko_registrations_updated', handleUpdate);
    return () => window.removeEventListener('ko_registrations_updated', handleUpdate);
  }, []);

  const handleToggleLock = (team: ManagedTeamItem) => {
    const updatedStatus = !team.isLocked;
    const regs = registrationStorage.getRegistrations();
    regs.forEach((r) => {
      if (r.eventId === team.eventId && (r.teamIdCode === team.teamIdCode || r.teamName === team.name)) {
        registrationStorage.updateRegistration(r.id, { isLocked: updatedStatus } as any);
      }
    });
  };

  const handleToggleStatus = (team: ManagedTeamItem) => {
    const nextStatus: 'REGISTERED' | 'VERIFIED' | 'REJECTED' =
      team.registrationStatus === 'VERIFIED' ? 'REGISTERED' : 'VERIFIED';

    const regs = registrationStorage.getRegistrations();
    regs.forEach((r) => {
      if (r.eventId === team.eventId && (r.teamIdCode === team.teamIdCode || r.teamName === team.name)) {
        registrationStorage.updateRegistration(r.id, { status: nextStatus });
      }
    });
  };

  const handleDeleteTeam = (team: ManagedTeamItem) => {
    if (window.confirm(`Are you sure you want to delete team "${team.name}" and all member registrations?`)) {
      const regs = registrationStorage.getRegistrations();
      regs.forEach((r) => {
        if (r.eventId === team.eventId && (r.teamIdCode === team.teamIdCode || r.teamName === team.name)) {
          registrationStorage.deleteRegistration(r.id);
        }
      });
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeam) return;

    const regs = registrationStorage.getRegistrations();
    regs.forEach((r) => {
      if (r.eventId === editingTeam.eventId && (r.teamIdCode === editingTeam.teamIdCode || r.teamName === editingTeam.name)) {
        registrationStorage.updateRegistration(r.id, {
          teamName: editForm.name || r.teamName,
          teamIdCode: editForm.teamIdCode || r.teamIdCode,
        });
      }
    });

    setEditingTeam(null);
  };

  const filteredTeams = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.teamIdCode.toLowerCase().includes(search.toLowerCase()) ||
      t.leaderName.toLowerCase().includes(search.toLowerCase()) ||
      t.eventName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 py-6">
      <SectionHeader
        eyebrow="ADMINISTRATIVE OVERVIEW"
        title="All Event Teams Directory"
        subtitle="Global admin control panel listing every registered team across Kernel Overriders competitions with live CRUD operations."
      />

      {/* Filter & Search Bar */}
      <div className="glass-card bg-white rounded-3xl p-6 border border-purple-100 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by team name, Team ID, leader, event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs font-semibold pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-purple-500"
          />
        </div>
        <Badge variant="purple" className="px-4 py-2 text-xs font-black">
          Total Registered Teams: {teams.length}
        </Badge>
      </div>

      {/* Admin Teams Table */}
      <div className="glass-card bg-white rounded-3xl p-8 border border-purple-100 shadow-xl space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-purple-50 text-purple-900 font-black uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 rounded-l-2xl">Team Name & ID</th>
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">Leader</th>
                <th className="px-6 py-4">Roster Size</th>
                <th className="px-6 py-4">Status & Access</th>
                <th className="px-6 py-4 rounded-r-2xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {filteredTeams.length > 0 ? (
                filteredTeams.map((team) => (
                  <tr key={team.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-extrabold text-slate-900 text-sm">{team.name}</p>
                      <p className="text-[11px] font-mono font-bold text-purple-600">
                        ID: {team.teamIdCode} &bull; Pass: {team.teamPassword}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-purple-700">{team.eventName}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900 flex items-center gap-1">
                        <Crown className="w-3.5 h-3.5 text-amber-500" /> {team.leaderName}
                      </p>
                      <p className="text-[10px] text-slate-400">{team.leaderEmail}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {team.acceptedMembersCount} / {team.maxMembers} Members
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 items-start">
                        <button
                          onClick={() => handleToggleStatus(team)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black ${
                            team.registrationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {team.registrationStatus}
                        </button>
                        <button
                          onClick={() => handleToggleLock(team)}
                          className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                            team.isLocked ? 'text-rose-600' : 'text-slate-400 hover:text-purple-600'
                          }`}
                        >
                          {team.isLocked ? <Lock className="w-3 h-3 text-rose-500" /> : <Unlock className="w-3 h-3" />}
                          {team.isLocked ? 'Roster Locked' : 'Unlock Roster'}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingTeam(team);
                            setEditForm({ name: team.name, teamIdCode: team.teamIdCode });
                          }}
                          className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-600"
                          title="Edit Team"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTeam(team)}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600"
                          title="Delete Team"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 font-bold">
                    No teams registered yet. Teams created during event registrations will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Team Modal */}
      {editingTeam && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-purple-100 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-xl font-black text-slate-900">Edit Team Details</h3>
              <button onClick={() => setEditingTeam(null)} className="p-2 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Team Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-bold focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Team Code / ID</label>
                <input
                  type="text"
                  required
                  value={editForm.teamIdCode}
                  onChange={(e) => setEditForm({ ...editForm, teamIdCode: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-bold focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="secondary" type="button" className="flex-1" onClick={() => setEditingTeam(null)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" className="flex-1">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
