import React, { useState } from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { MOCK_EVENTS } from '../../data/mockData';
import { Users, Search, Lock, Unlock, Crown, Hash, ShieldCheck } from 'lucide-react';

export const TeamsAdmin: React.FC = () => {
  const [search, setSearch] = useState('');

  const mockAdminTeams = [
    {
      id: 'tm-1',
      name: 'NeuralCrafters',
      teamIdCode: 'TM-94820',
      teamPassword: 'SEC-8391',
      eventName: MOCK_EVENTS[0].title,
      leaderName: 'Alex Rivera',
      leaderEmail: 'alex.rivera@stanford.edu',
      acceptedMembersCount: 3,
      maxMembers: 4,
      isLocked: false,
      registrationStatus: 'REGISTERED',
    },
    {
      id: 'tm-2',
      name: 'CleanCode Guild',
      teamIdCode: 'TM-23910',
      teamPassword: 'SEC-4412',
      eventName: MOCK_EVENTS[0].title,
      leaderName: 'Sophia Patel',
      leaderEmail: 'sophia@mit.edu',
      acceptedMembersCount: 4,
      maxMembers: 4,
      isLocked: true,
      registrationStatus: 'REGISTERED',
    },
    {
      id: 'tm-3',
      name: 'HexOverlords',
      teamIdCode: 'TM-71029',
      teamPassword: 'SEC-9018',
      eventName: MOCK_EVENTS[1].title,
      leaderName: 'David Chen',
      leaderEmail: 'david@berkeley.edu',
      acceptedMembersCount: 2,
      maxMembers: 3,
      isLocked: false,
      registrationStatus: 'UNREGISTERED',
    },
  ];

  const filteredTeams = mockAdminTeams.filter(
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
        subtitle="Global admin control panel listing every registered and active team across HackVerse competitions."
      />

      {/* Filter & Search Bar */}
      <div className="glass-card rounded-3xl p-6 border border-white/90 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by team name, Team ID, leader, event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white text-slate-900 placeholder-slate-400 text-sm pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-purple-500"
          />
        </div>
        <Badge variant="purple" className="px-4 py-2 text-xs font-black">
          Total Teams Managed: {mockAdminTeams.length}
        </Badge>
      </div>

      {/* Admin Teams Table */}
      <div className="glass-card rounded-3xl p-8 border border-white/90 shadow-xl space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-purple-50/60 text-purple-900 text-xs font-black uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 rounded-l-2xl">Team Name & ID</th>
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">Leader</th>
                <th className="px-6 py-4">Capacity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 rounded-r-2xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {filteredTeams.map((team) => (
                <tr key={team.id} className="hover:bg-white/60 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-extrabold text-slate-900">{team.name}</p>
                    <p className="text-xs font-mono font-bold text-purple-600">ID: {team.teamIdCode} &bull; Pass: {team.teamPassword}</p>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-600">{team.eventName}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900 flex items-center gap-1">
                      <Crown className="w-3.5 h-3.5 text-amber-500" /> {team.leaderName}
                    </p>
                    <p className="text-xs text-slate-400">{team.leaderEmail}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {team.acceptedMembersCount} / {team.maxMembers} Members
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <Badge variant={team.registrationStatus === 'REGISTERED' ? 'purple' : 'yellow'}>
                        {team.registrationStatus}
                      </Badge>
                      {team.isLocked && (
                        <span className="text-[10px] font-bold text-pink-600 flex items-center gap-0.5">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="outline" size="sm" onClick={() => alert(`Inspecting team ${team.name}`)} className="text-xs py-1 px-3">
                      Inspect
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
