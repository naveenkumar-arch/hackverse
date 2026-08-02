import React from 'react';
import { ShieldCheck, Award, QrCode } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import { Badge } from '../common/Badge';

interface CertificateCanvasProps {
  certificateNumber: string;
  recipientName: string;
  eventName: string;
  certificateType: 'Participation' | 'Winner' | 'Runner Up' | 'Second Runner Up' | 'Judge' | 'Organizer' | string;
  issueDate: string;
  communityName?: string;
  qrCodeUrl?: string;
  verificationUrl?: string;
}

export const CertificateCanvas: React.FC<CertificateCanvasProps> = ({
  certificateNumber,
  recipientName,
  eventName,
  certificateType,
  issueDate,
  communityName = 'Kernel Overriders',
  qrCodeUrl,
  verificationUrl,
}) => {
  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'Winner': return 'yellow';
      case 'Runner Up': return 'purple';
      case 'Second Runner Up': return 'pink';
      case 'Judge': return 'blue';
      case 'Organizer': return 'green';
      default: return 'outline';
    }
  };

  const defaultQr = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
    verificationUrl || `https://kernel-overriders.vercel.app/verify/${certificateNumber}`
  )}`;

  return (
    <div className="glass-card bg-white p-8 sm:p-12 rounded-3xl border-8 border-purple-200 text-center space-y-6 shadow-2xl relative overflow-hidden max-w-2xl mx-auto">
      {/* Background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Logo */}
      <div className="flex items-center justify-between border-b border-purple-100 pb-4 relative z-10">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="Kernel Overriders" className="h-10 w-auto object-contain" />
        </div>
        <Badge variant={getTypeBadgeVariant(certificateType)} className="font-extrabold uppercase">
          {certificateType} CERTIFICATE
        </Badge>
      </div>

      {/* Title & Recipient */}
      <div className="space-y-3 relative z-10 py-2">
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
          CERTIFICATE OF {certificateType.toUpperCase()}
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight text-gradient-purple-pink">
          {recipientName}
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          For outstanding achievement and active contribution in
        </p>
        <h3 className="text-xl font-extrabold text-slate-900">{eventName}</h3>
      </div>

      {/* Footer Credentials & QR Code */}
      <div className="pt-6 border-t border-purple-100 flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
        <div className="text-left space-y-1">
          <p className="text-[11px] text-slate-400 font-bold uppercase">CERTIFICATE ID</p>
          <p className="text-xs font-mono font-black text-purple-700">{certificateNumber}</p>
          <p className="text-[11px] text-slate-500 font-medium">Issued on {issueDate}</p>
        </div>

        {/* Live QR Code Box */}
        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-2xl border border-purple-100">
          <img
            src={qrCodeUrl || defaultQr}
            alt="Scan QR Code"
            className="w-16 h-16 rounded-xl border border-white shadow-sm object-contain"
          />
          <div className="text-left space-y-0.5">
            <span className="text-[10px] font-black uppercase text-purple-600 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" /> SCAN TO VERIFY
            </span>
            <p className="text-[9px] text-slate-400 font-mono">kernel-overriders.vercel.app/verify</p>
          </div>
        </div>
      </div>
    </div>
  );
};
