import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12">
      <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-md w-full border border-white/90 shadow-2xl space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto shadow-md">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-slate-900">Email Verified!</h2>
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          Your student email address has been verified. You now have full access to HackVerse hackathons, team finder tools, and verified digital certificates.
        </p>
        <Button variant="primary" onClick={() => navigate('/dashboard')} className="w-full py-3.5">
          Go to Student Dashboard
        </Button>
      </div>
    </div>
  );
};
