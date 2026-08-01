import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/common/Button';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('alex.rivera@stanford.edu');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password, rememberMe);
      navigate('/dashboard');
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="glass-card bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full border border-purple-100 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FACC15] via-[#FF2E4D] to-[#7C3AED] p-0.5 shadow-lg mx-auto">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#FF2E4D]" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-slate-900">Welcome Back</h2>
          <p className="text-xs text-slate-500 font-medium">
            Sign in to access your hackathons, team status, and dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <Link to="/forgot-password" className="text-xs font-bold text-purple-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs font-bold text-slate-600 cursor-pointer">
              Remember me on this device
            </label>
          </div>

          <Button variant="primary" type="submit" size="lg" className="w-full py-3.5 gap-2 mt-2" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In to Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 font-medium pt-4 border-t border-slate-100">
          Don't have an account?{' '}
          <Link to="/register" className="font-extrabold text-purple-600 hover:underline">
            Register as a Student
          </Link>
        </div>
      </div>
    </div>
  );
};
