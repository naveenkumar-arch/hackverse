import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { X, QrCode, CreditCard, ShieldCheck, CheckCircle2, Copy, Check } from 'lucide-react';

interface UpiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  registrationFee?: number;
  onSuccess: (paymentData: any) => void;
}

export const UpiPaymentModal: React.FC<UpiPaymentModalProps> = ({
  isOpen,
  onClose,
  eventName,
  registrationFee = 499,
  onSuccess,
}) => {
  const [upiUtr, setUpiUtr] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const upiId = 'hackverse@upi';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `upi://pay?pa=${upiId}&pn=HackVerse&am=${registrationFee}&cu=INR`
  )}`;

  if (!isOpen) return null;

  const copyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (upiUtr.length !== 12 || !/^\d+$/.test(upiUtr)) {
      setError('Please enter a valid 12-digit UPI UTR / Reference Number');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      onSuccess({
        id: `pay-${Date.now()}`,
        transactionId: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        invoiceNumber: `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        upiUtr,
        amount: registrationFee,
        status: 'MANUAL_VERIFICATION',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      });
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card bg-white p-8 rounded-3xl max-w-lg w-full shadow-2xl relative space-y-6 border border-purple-200 my-8"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">UPI Registration Payment</h3>
          <p className="text-xs text-slate-500 font-medium">
            Scan QR code or use UPI ID to pay <span className="font-black text-emerald-600">₹{registrationFee}.00</span>
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* QR Code display */}
            <div className="bg-purple-50/60 p-6 rounded-3xl border border-purple-100 text-center space-y-3">
              <img
                src={qrCodeUrl}
                alt="UPI Payment QR Code"
                className="w-44 h-44 mx-auto rounded-2xl border-4 border-white shadow-md"
              />
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-bold text-slate-600">UPI ID:</span>
                <code className="text-xs font-mono font-black text-purple-700 bg-white px-2 py-1 rounded-lg border border-purple-200">
                  {upiId}
                </code>
                <button
                  type="button"
                  onClick={copyUpi}
                  className="p-1.5 rounded-lg bg-white text-purple-600 border border-purple-200 hover:bg-purple-100"
                >
                  {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Enter 12-Digit UPI UTR / Reference No. *
              </label>
              <input
                type="text"
                required
                maxLength={12}
                placeholder="e.g. 421980123456"
                value={upiUtr}
                onChange={(e) => setUpiUtr(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 bg-white font-mono text-sm tracking-wider rounded-2xl border border-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            <Button variant="primary" type="submit" className="w-full py-3.5" disabled={loading}>
              {loading ? 'Verifying UTR...' : 'Submit UTR Code for Verification'}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">UTR Submitted!</h3>
            <p className="text-xs text-slate-600 font-medium">
              Your payment status is set to <span className="font-bold text-purple-600">MANUAL_VERIFICATION</span>. Admin will verify your transaction shortly.
            </p>
            <Button variant="secondary" onClick={onClose} className="w-full">
              Done
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
