import React, { useState, useEffect } from 'react';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { exportToCsv } from '../../utils/csvExporter';
import { registrationStorage, TeamRegistrationRecord } from '../../utils/registrationStorage';
import { EditRegistrationModal } from '../../components/admin/EditRegistrationModal';
import {
  Search,
  Download,
  MapPin,
  Users,
  Edit,
  Trash2,
  Sparkles,
  ShieldCheck,
  Filter,
  RefreshCw,
} from 'lucide-react';

export const EventRegistrationsAdminTab: React.FC = () => {
  const [registrations, setRegistrations] = useState<TeamRegistrationRecord[]>([]);
  const [search, setSearch] = useState('');
  const [selectedRecordToEdit, setSelectedRecordToEdit] = useState<TeamRegistrationRecord | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const loadRegistrations = () => {
    const list = registrationStorage.getRegistrations();
    setRegistrations(list);
  };

  useEffect(() => {
    loadRegistrations();

    const handleUpdate = () => loadRegistrations();
    window.addEventListener('ko_registrations_updated', handleUpdate);
    return () => window.removeEventListener('ko_registrations_updated', handleUpdate);
  }, []);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3500);
  };

  const handlePurgeDuplicates = () => {
    const { list, removedCount } = registrationStorage.purgeDuplicates();
    setRegistrations(list);
    showNotice(`Purged ${removedCount} duplicate registration records!`);
  };

  const handleDeleteRecord = (id: string, teamName: string) => {
    if (window.confirm(`Are you sure you want to delete registration record for "${teamName}"?`)) {
      const updated = registrationStorage.deleteRegistration(id);
      setRegistrations(updated);
      showNotice(`Deleted registration record for ${teamName}`);
    }
  };

  const handleSaveEdit = (id: string, updatedFields: Partial<TeamRegistrationRecord>) => {
    const updated = registrationStorage.updateRegistration(id, updatedFields);
    setRegistrations(updated);
    showNotice(`Updated registration details for ${updatedFields.teamName || 'Team'}`);
  };

  const filteredRegistrations = registrations.filter((r) => {
    const query = search.toLowerCase();
    return (
      r.eventName.toLowerCase().includes(query) ||
      r.teamName.toLowerCase().includes(query) ||
      r.teamIdCode.toLowerCase().includes(query) ||
      r.fullName.toLowerCase().includes(query) ||
      r.email.toLowerCase().includes(query) ||
      r.city.toLowerCase().includes(query) ||
      r.state.toLowerCase().includes(query)
    );
  });

  return (
    <div className="glass-card bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-purple-500/20 shadow-2xl space-y-6 text-slate-100">
      {notice && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs text-center shadow-lg animate-pulse">
          {notice}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-white">Event Registrations & Team Roster Ledger</h3>
            <Badge variant="purple">{registrations.length} Total Records</Badge>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Verify, edit, update, or purge duplicate team registrations submitted through the customer portal.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePurgeDuplicates}
            className="gap-1.5 text-xs text-amber-300 border-amber-500/40 hover:bg-amber-950/30"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Purge Duplicates
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => exportToCsv('event_registrations_ledger', filteredRegistrations)}
            className="gap-2 text-xs"
          >
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by team name, Team ID, leader email, city, state, event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 text-white placeholder-slate-400 rounded-2xl border border-slate-700/80 text-xs font-semibold focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Registrations Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-200">
          <thead className="bg-purple-950/40 text-purple-200 font-black uppercase tracking-wider border-b border-purple-900/30">
            <tr>
              <th className="p-3.5 rounded-l-2xl">Team & ID</th>
              <th className="p-3.5">Leader / Contact</th>
              <th className="p-3.5">College & Location</th>
              <th className="p-3.5">Registered Event</th>
              <th className="p-3.5">Payment</th>
              <th className="p-3.5 rounded-r-2xl">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-semibold">
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-purple-950/30 transition-colors">
                  <td className="p-3.5">
                    <p className="font-extrabold text-white text-sm">{reg.teamName}</p>
                    <p className="font-mono text-[10px] text-cyan-400 font-bold">{reg.teamIdCode}</p>
                  </td>
                  <td className="p-3.5">
                    <p className="font-bold text-white">{reg.fullName}</p>
                    <p className="text-slate-400 text-[10px]">{reg.email}</p>
                    <p className="text-slate-500 text-[10px]">{reg.phone}</p>
                  </td>
                  <td className="p-3.5">
                    <p className="font-bold text-slate-200">{reg.college}</p>
                    <p className="text-[10px] text-[#FF2E4D] font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {reg.city}, {reg.state}
                    </p>
                  </td>
                  <td className="p-3.5 font-bold text-purple-400">{reg.eventName}</td>
                  <td className="p-3.5">
                    <Badge variant="green">{reg.paymentStatus}</Badge>
                  </td>
                  <td className="p-3.5">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedRecordToEdit(reg);
                          setIsEditModalOpen(true);
                        }}
                        className="p-1.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 text-purple-300 border border-purple-500/30"
                        title="Edit Record"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteRecord(reg.id, reg.teamName)}
                        className="p-1.5 rounded-xl bg-rose-900/40 hover:bg-rose-800/60 text-rose-300 border border-rose-500/30"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400 font-bold">
                  No event registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Registration Modal */}
      {selectedRecordToEdit && (
        <EditRegistrationModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedRecordToEdit(null);
          }}
          record={selectedRecordToEdit}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};
