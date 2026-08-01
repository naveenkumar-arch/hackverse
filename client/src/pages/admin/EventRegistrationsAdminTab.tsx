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
    <div className="glass-card bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl space-y-6">
      {notice && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs text-center shadow-lg animate-pulse">
          {notice}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-slate-900">Event Registrations & Team Roster Ledger</h3>
            <Badge variant="purple">{registrations.length} Total Records</Badge>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Verify, edit, update, or purge duplicate team registrations submitted through the customer portal.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePurgeDuplicates}
            className="gap-1.5 text-xs text-purple-700 border-purple-200 hover:bg-purple-50"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Purge Duplicate Records
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => exportToCsv('event_registrations_ledger', filteredRegistrations)}
            className="gap-2 text-xs"
          >
            <Download className="w-4 h-4" /> Export CSV Ledger
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by Event, Team Name, Team ID (TM-94820), Leader Name, or City/State (e.g. Chennai, Tamil Nadu)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 placeholder-slate-400 rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-purple-500 shadow-sm"
        />
      </div>

      {/* Registrations List Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-purple-50 text-purple-900 font-black uppercase tracking-wider">
            <tr>
              <th className="p-3.5 rounded-l-2xl">Team Name & ID</th>
              <th className="p-3.5">Event Name</th>
              <th className="p-3.5">Leader Details</th>
              <th className="p-3.5">College & Location</th>
              <th className="p-3.5">Payment</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 rounded-r-2xl">Admin Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold">
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="p-3.5">
                    <p className="font-extrabold text-slate-900 text-sm">{reg.teamName}</p>
                    <p className="font-mono text-[10px] text-purple-600 font-black">ID: {reg.teamIdCode}</p>
                    {reg.teamPassword && <p className="font-mono text-[9px] text-slate-400">Pass: {reg.teamPassword}</p>}
                  </td>
                  <td className="p-3.5 font-bold text-slate-800">{reg.eventName}</td>
                  <td className="p-3.5">
                    <p className="font-extrabold text-slate-900">{reg.fullName}</p>
                    <p className="text-[10px] text-slate-400">{reg.email}</p>
                    <p className="text-[10px] text-slate-400">{reg.phone}</p>
                  </td>
                  <td className="p-3.5">
                    <p className="font-bold text-slate-800">{reg.college}</p>
                    <p className="text-[10px] text-[#FF2E4D] font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {reg.city}, {reg.state}
                    </p>
                  </td>
                  <td className="p-3.5">
                    <Badge variant={reg.paymentStatus === 'PAID' ? 'green' : 'yellow'}>{reg.paymentStatus}</Badge>
                  </td>
                  <td className="p-3.5">
                    <Badge variant={reg.status === 'VERIFIED' ? 'green' : 'pink'}>{reg.status || 'REGISTERED'}</Badge>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedRecordToEdit(reg);
                          setIsEditModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-600 transition-colors"
                        title="Edit Record"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRecord(reg.id, reg.teamName)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-400 font-bold">
                  No event registration records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Registration Modal */}
      <EditRegistrationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        record={selectedRecordToEdit}
        onSave={handleSaveEdit}
      />
    </div>
  );
};
