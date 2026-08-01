import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12">
      <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-md w-full border border-white/90 shadow-2xl space-y-6">
        <Link to="/login" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-purple-600">
          <ArrowLeft className="w-4 h-4" /> Back to Sign In
        </Link>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900">Forgot Password?</h2>
              <p className="text-xs text-slate-500 font-medium">
                Enter your student email address and we'll send you a password reset link.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Student Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <Button variant="primary" type="submit" size="lg" className="w-full py-3.5 mt-2">
              Send Password Reset Link
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Check Your Email</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              We've sent a password reset link to <span className="font-bold text-purple-600">{email}</span>. Click the link inside to set a new password.
            </p>
            <Button variant="secondary" onClick={() => setSubmitted(false)} className="w-full">
              Resend Email
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
