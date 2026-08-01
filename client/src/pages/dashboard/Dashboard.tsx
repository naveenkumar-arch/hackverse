import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { MyTeamTab } from './MyTeamTab';
import { UpiPaymentModal } from '../../components/payments/UpiPaymentModal';
import { InvoiceModal } from '../../components/payments/InvoiceModal';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Code,
  Award,
  CreditCard,
  Bell,
  User,
  Shield,
  Settings,
  LogOut,
  Camera,
  ShieldAlert,
  FileText,
  QrCode,
  Lock,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');

  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  // Check student approval status
  const isApproved = user?.approvalStatus === 'APPROVED' || !user?.approvalStatus;

  // Payments State
  const [payments, setPayments] = useState([
    {
      id: 'pay-1',
      transactionId: 'TX-984210',
      invoiceNumber: 'INV-2026-9812',
      eventName: MOCK_EVENTS[0].title,
      user: user?.fullName || 'Alex Rivera',
      email: user?.email || 'alex@stanford.edu',
      amount: 499,
      status: 'PAID',
      paymentMethod: 'UPI',
      upiUtr: '421980123456',
      date: 'August 1, 2026',
    },
  ]);

  // Form states
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    college: user?.college || '',
    department: user?.department || '',
    year: user?.year || 'Senior (4th Year)',
    bio: user?.bio || '',
    githubUrl: user?.githubUrl || '',
    linkedinUrl: user?.linkedinUrl || '',
    avatarUrl: user?.avatarUrl || '',
  });

  const [profileMessage, setProfileMessage] = useState('');

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(profileForm);
    setProfileMessage('Profile updated successfully!');
    setTimeout(() => setProfileMessage(''), 3000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'my-team', label: 'My Team & Requests', icon: Users },
    { id: 'events', label: 'Registered Events', icon: Calendar },
    { id: 'submissions', label: 'Submissions', icon: Code },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'payments', label: 'Payments & Invoices', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Edit Profile', icon: User },
    { id: 'security', label: 'Change Password', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="py-6 space-y-8">
      {/* Pending Approval Warning Banner */}
      {!isApproved && (
        <div className="glass-card bg-amber-50 border border-amber-300 p-6 rounded-3xl shadow-xl flex items-center gap-4 text-amber-900">
          <ShieldAlert className="w-8 h-8 text-amber-600 flex-shrink-0 animate-bounce" />
          <div className="space-y-1">
            <h4 className="font-black text-base">Account Status: Pending Admin Approval</h4>
            <p className="text-xs font-semibold leading-relaxed text-amber-800">
              Your student registration is currently being reviewed by HackVerse administrators. Once approved, event registrations and team management features will automatically unlock.
            </p>
          </div>
        </div>
      )}

      {/* Header Profile Bar */}
      <div className="glass-card bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <img
              src={
                user?.avatarUrl ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
              }
              alt={user?.fullName}
              className="w-20 h-20 rounded-3xl object-cover border-4 border-purple-200 shadow-md"
            />
            <button
              onClick={() => setActiveTab('profile')}
              className="absolute -bottom-1 -right-1 p-2 rounded-full bg-purple-600 text-white shadow-md hover:bg-purple-700 transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{user?.fullName}</h1>
              <Badge variant={isApproved ? 'green' : 'yellow'}>
                {isApproved ? 'APPROVED STUDENT' : 'PENDING APPROVAL'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 font-bold">
              {user?.college || 'Stanford University'} &bull; {user?.department || 'Computer Science'} ({user?.year})
            </p>
            <p className="text-xs text-purple-600 font-semibold">{user?.email}</p>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={logout} className="gap-2 text-xs border-rose-200 text-rose-600 hover:bg-rose-50">
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3">
          <div className="glass-card bg-white rounded-3xl p-3 border border-purple-100 shadow-xl space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#FF2E4D] to-[#FF4767] text-white shadow-lg'
                      : 'text-slate-600 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content View */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="glass-card bg-white p-5 rounded-2xl border border-purple-100 shadow-md text-center space-y-1">
                    <Calendar className="w-6 h-6 text-purple-600 mx-auto" />
                    <span className="block text-2xl font-black text-slate-900">2</span>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase">REGISTERED EVENTS</span>
                  </div>
                  <div className="glass-card bg-white p-5 rounded-2xl border border-purple-100 shadow-md text-center space-y-1">
                    <Code className="w-6 h-6 text-pink-600 mx-auto" />
                    <span className="block text-2xl font-black text-slate-900">1</span>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase">SUBMISSIONS</span>
                  </div>
                  <div className="glass-card bg-white p-5 rounded-2xl border border-purple-100 shadow-md text-center space-y-1">
                    <Award className="w-6 h-6 text-amber-500 mx-auto" />
                    <span className="block text-2xl font-black text-slate-900">2</span>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase">CERTIFICATES</span>
                  </div>
                  <div className="glass-card bg-white p-5 rounded-2xl border border-purple-100 shadow-md text-center space-y-1">
                    <CreditCard className="w-6 h-6 text-emerald-600 mx-auto" />
                    <span className="block text-2xl font-black text-slate-900">₹499</span>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase">PAYMENT STATUS</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* MY TEAM TAB */}
            {activeTab === 'my-team' && (
              <motion.div key="my-team" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {!isApproved ? (
                  <div className="glass-card bg-white rounded-3xl p-12 text-center border border-amber-200 shadow-xl space-y-4">
                    <Lock className="w-12 h-12 text-amber-500 mx-auto" />
                    <h3 className="text-2xl font-black text-slate-900">Team Features Locked</h3>
                    <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                      Your student account is pending approval by a HackVerse administrator. Creating or joining teams will unlock automatically once approved.
                    </p>
                  </div>
                ) : (
                  <MyTeamTab />
                )}
              </motion.div>
            )}

            {/* PAYMENTS TAB */}
            {activeTab === 'payments' && (
              <motion.div key="payments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">Payment & Invoice Ledger</h3>
                    <p className="text-xs text-slate-500 font-medium">Pay registration fees via UPI QR code to unlock event participation.</p>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => setIsUpiModalOpen(true)} className="gap-2 text-xs">
                    <QrCode className="w-4 h-4" /> Pay Registration Fee (UPI)
                  </Button>
                </div>

                <div className="space-y-4">
                  {payments.map((p) => (
                    <div key={p.id} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-purple-600">{p.invoiceNumber}</span>
                          <Badge variant={p.status === 'PAID' ? 'green' : p.status === 'MANUAL_VERIFICATION' ? 'yellow' : 'pink'}>
                            {p.status}
                          </Badge>
                        </div>
                        <h4 className="text-base font-extrabold text-slate-900 mt-1">{p.eventName}</h4>
                        <p className="text-xs text-slate-500 font-medium">Method: {p.paymentMethod} &bull; UTR: {p.upiUtr || 'N/A'}</p>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="text-base font-black text-emerald-600">₹{p.amount}.00</span>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setSelectedInvoice(p);
                            setIsInvoiceModalOpen(true);
                          }}
                          className="gap-1.5 text-xs"
                        >
                          <FileText className="w-3.5 h-3.5" /> View Invoice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CERTIFICATES TAB */}
            {activeTab === 'certificates' && (
              <motion.div key="certificates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl space-y-6">
                <h3 className="text-xl font-extrabold text-slate-900">Issued Digital Certificates</h3>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-purple-600">KO-2026-WINN-8921</span>
                      <h4 className="text-base font-extrabold text-slate-900">HackVerse AI Zenith 2026</h4>
                      <p className="text-xs text-slate-500 font-medium">Type: Winner Certificate (1st Place)</p>
                    </div>
                    <div className="flex gap-2">
                      <a href="/verify/HV-2026-WINN-8921" target="_blank" rel="noreferrer">
                        <Button variant="secondary" size="sm">Verify Credentials</Button>
                      </a>
                      <Button variant="primary" size="sm" onClick={() => alert('Certificate PDF downloaded!')}>
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* EDIT PROFILE TAB */}
            {activeTab === 'profile' && (
              <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl space-y-6">
                <h3 className="text-xl font-extrabold text-slate-900">Edit Student Profile</h3>
                {profileMessage && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold text-center">
                    {profileMessage}
                  </div>
                )}
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                      <input type="text" value={profileForm.fullName} onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })} className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                      <input type="text" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm" />
                    </div>
                  </div>
                  <Button variant="primary" type="submit">Save Profile Changes</Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Payment Modals */}
      <UpiPaymentModal
        isOpen={isUpiModalOpen}
        onClose={() => setIsUpiModalOpen(false)}
        eventName={MOCK_EVENTS[0].title}
        registrationFee={499}
        onSuccess={(newPayment) => {
          setPayments((prev) => [newPayment, ...prev]);
        }}
      />

      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        invoice={selectedInvoice}
      />
    </div>
  );
};
