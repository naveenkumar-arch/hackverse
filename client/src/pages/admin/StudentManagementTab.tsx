import React, { useState, useEffect } from 'react';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { exportToCsv } from '../../utils/csvExporter';
import { registrationStorage, TeamRegistrationRecord } from '../../utils/registrationStorage';
import {
  Search,
  Download,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  RotateCcw,
  Eye,
  Github,
  Linkedin,
  Filter,
} from 'lucide-react';

export interface StudentRegistrationItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  githubUrl?: string;
  linkedinUrl?: string;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  createdAt: string;
  eventName: string;
  teamName?: string;
  paymentStatus: string;
}

export const StudentManagementTab: React.FC = () => {
  const [students, setStudents] = useState<StudentRegistrationItem[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedStudent, setSelectedStudent] = useState<StudentRegistrationItem | null>(null);

  const loadStudents = () => {
    const records = registrationStorage.getRegistrations();
    const items: StudentRegistrationItem[] = records.map((r) => {
      let approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED' = 'PENDING';
      if (r.status === 'VERIFIED') approvalStatus = 'APPROVED';
      else if (r.status === 'REJECTED') approvalStatus = 'REJECTED';
      else if ((r as any).approvalStatus === 'SUSPENDED') approvalStatus = 'SUSPENDED';

      return {
        id: r.id,
        fullName: r.fullName,
        email: r.email,
        phone: r.phone,
        college: r.college,
        department: r.department,
        year: r.year,
        approvalStatus,
        createdAt: r.registeredAt,
        eventName: r.eventName,
        teamName: r.teamName,
        paymentStatus: r.paymentStatus,
      };
    });
    setStudents(items);
  };

  useEffect(() => {
    loadStudents();
    const handleUpdate = () => loadStudents();
    window.addEventListener('ko_registrations_updated', handleUpdate);
    return () => window.removeEventListener('ko_registrations_updated', handleUpdate);
  }, []);

  const handleUpdateStatus = (id: string, newStatus: 'APPROVED' | 'REJECTED' | 'SUSPENDED') => {
    let regStatus: 'REGISTERED' | 'VERIFIED' | 'REJECTED' = 'REGISTERED';
    if (newStatus === 'APPROVED') regStatus = 'VERIFIED';
    else if (newStatus === 'REJECTED') regStatus = 'REJECTED';

    registrationStorage.updateRegistration(id, {
      status: regStatus,
      ...(newStatus === 'SUSPENDED' ? { approvalStatus: 'SUSPENDED' } : {}),
    } as any);
  };

  const filteredStudents = students.filter((s) => {
    const matchesStatus = statusFilter === 'ALL' || s.approvalStatus === statusFilter;
    const matchesSearch =
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.college.toLowerCase().includes(search.toLowerCase()) ||
      s.eventName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <Badge variant="green">APPROVED</Badge>;
      case 'PENDING':
        return <Badge variant="yellow">PENDING APPROVAL</Badge>;
      case 'REJECTED':
        return <Badge variant="pink">REJECTED</Badge>;
      case 'SUSPENDED':
        return <Badge variant="purple">SUSPENDED</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="glass-card bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900">Student Registrations & Approval Queue</h3>
          <p className="text-xs text-slate-500 font-medium">
            Review, verify, and approve participant student accounts submitted via event registration forms.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => exportToCsv('student_registrations_ledger', filteredStudents)}
          className="gap-2 text-xs"
        >
          <Download className="w-4 h-4" /> Export Students CSV
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <div className="relative flex-grow">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name, email, college, or event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white text-slate-900 placeholder-slate-400 rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-purple-600" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-2xl px-4 py-2.5 focus:outline-none focus:border-purple-500"
          >
            <option value="ALL">All Statuses ({students.length})</option>
            <option value="PENDING">Pending Approval</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      {/* Student List Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-purple-50 text-purple-900 font-black uppercase tracking-wider">
            <tr>
              <th className="p-3.5 rounded-l-2xl">Student Info</th>
              <th className="p-3.5">College & Dept</th>
              <th className="p-3.5">Registered Event</th>
              <th className="p-3.5">Team</th>
              <th className="p-3.5">Approval Status</th>
              <th className="p-3.5 rounded-r-2xl">Admin Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="p-3.5">
                    <p className="font-extrabold text-slate-900 text-sm">{st.fullName}</p>
                    <p className="text-slate-400">{st.email}</p>
                    <p className="text-[10px] text-slate-400">{st.phone}</p>
                  </td>
                  <td className="p-3.5">
                    <p className="font-bold text-slate-800">{st.college}</p>
                    <p className="text-[10px] text-slate-500">{st.department} ({st.year})</p>
                  </td>
                  <td className="p-3.5 font-bold text-purple-700">{st.eventName}</td>
                  <td className="p-3.5 font-bold text-slate-800">{st.teamName || 'Solo'}</td>
                  <td className="p-3.5">{getStatusBadge(st.approvalStatus)}</td>
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      {st.approvalStatus === 'PENDING' && (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleUpdateStatus(st.id, 'APPROVED')}
                            className="text-[10px] py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateStatus(st.id, 'REJECTED')}
                            className="text-[10px] py-1 px-2.5 text-rose-600 border-rose-200 hover:bg-rose-50"
                          >
                            <XCircle className="w-3 h-3 mr-1" /> Reject
                          </Button>
                        </>
                      )}
                      {st.approvalStatus === 'APPROVED' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(st.id, 'SUSPENDED')}
                          className="text-[10px] py-1 px-2.5 text-purple-700 border-purple-200 hover:bg-purple-50"
                        >
                          <ShieldAlert className="w-3 h-3 mr-1" /> Suspend
                        </Button>
                      )}
                      {st.approvalStatus === 'SUSPENDED' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleUpdateStatus(st.id, 'APPROVED')}
                          className="text-[10px] py-1 px-2.5"
                        >
                          <RotateCcw className="w-3 h-3 mr-1" /> Reactivate
                        </Button>
                      )}
                      {st.approvalStatus === 'REJECTED' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleUpdateStatus(st.id, 'APPROVED')}
                          className="text-[10px] py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Approve
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedStudent(st)}
                        className="text-[10px] py-1 px-2 text-slate-500"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400 font-bold">
                  No student registrations found in queue. Register via event registration forms to populating this table.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-purple-100 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-xl font-black text-slate-900">{selectedStudent.fullName}</h3>
              <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-slate-600 font-black">✕</button>
            </div>
            <div className="space-y-2 text-xs font-semibold text-slate-700">
              <p><span className="text-slate-400">Email:</span> {selectedStudent.email}</p>
              <p><span className="text-slate-400">Phone:</span> {selectedStudent.phone}</p>
              <p><span className="text-slate-400">College:</span> {selectedStudent.college}</p>
              <p><span className="text-slate-400">Department:</span> {selectedStudent.department}</p>
              <p><span className="text-slate-400">Year:</span> {selectedStudent.year}</p>
              <p><span className="text-slate-400">Event:</span> {selectedStudent.eventName}</p>
              <p><span className="text-slate-400">Team Name:</span> {selectedStudent.teamName || 'Solo'}</p>
              <p><span className="text-slate-400">Payment Status:</span> {selectedStudent.paymentStatus}</p>
            </div>
            <Button variant="secondary" className="w-full" onClick={() => setSelectedStudent(null)}>
              Close Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
