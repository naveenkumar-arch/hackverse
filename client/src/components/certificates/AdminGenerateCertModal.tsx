import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { MOCK_EVENTS } from '../../data/mockData';
import { X, Award, Sparkles, UserCheck } from 'lucide-react';

interface AdminGenerateCertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (certData: any) => void;
}

export const AdminGenerateCertModal: React.FC<AdminGenerateCertModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [recipientName, setRecipientName] = useState('');
  const [eventId, setEventId] = useState(MOCK_EVENTS[0].id);
  const [certificateType, setCertificateType] = useState('Participation');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventObj = MOCK_EVENTS.find((ev) => ev.id === eventId) || MOCK_EVENTS[0];
    const shortRandom = Math.floor(1000 + Math.random() * 9000);
    const typeCode = certificateType.toUpperCase().replace(/\s+/g, '-').slice(0, 4);
    const certificateNumber = `KO-2026-${typeCode}-${shortRandom}`;
    const verificationUrl = `https://kernel-overriders.vercel.app/verify/${certificateNumber}`;

    onSuccess({
      id: `cert-${Date.now()}`,
      certificateNumber,
      recipientName,
      eventName: eventObj.title,
      certificateType,
      communityName: 'Kernel Overriders',
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verificationUrl,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(verificationUrl)}`,
    });
    onClose();
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
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Generate Digital Certificate</h3>
          <p className="text-xs text-slate-500 font-medium">
            Issue auto-generated verified certificates for participants, winners, judges, and organizers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Recipient Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Rivera"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Event *</label>
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
            >
              {MOCK_EVENTS.map((e) => (
                <option key={e.id} value={e.id}>{e.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Certificate Type *</label>
            <select
              value={certificateType}
              onChange={(e) => setCertificateType(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="Participation">Participation</option>
              <option value="Winner">Winner (1st Place)</option>
              <option value="Runner Up">Runner Up (2nd Place)</option>
              <option value="Second Runner Up">Second Runner Up (3rd Place)</option>
              <option value="Judge">Judge / Mentor</option>
              <option value="Organizer">Organizer</option>
            </select>
          </div>

          <Button variant="primary" type="submit" className="w-full py-3.5 mt-2">
            Generate & Issue Certificate
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
