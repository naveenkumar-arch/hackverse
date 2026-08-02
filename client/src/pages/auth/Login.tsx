import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/common/Button';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import logoImg from '../../assets/logo.png';

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
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 12px 48px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
        className="rounded-3xl p-8 sm:p-12 max-w-md w-full space-y-6"
      >
        <div className="text-center space-y-3">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,242,254,0.92))',
              boxShadow: '0 0 25px rgba(139,92,246,0.35)',
              border: '1px solid rgba(255,255,255,0.9)',
            }}
            className="px-4 py-2 rounded-2xl inline-flex items-center justify-center mx-auto"
          >
            <img src={logoImg} alt="Kernel Overriders" className="h-12 w-auto object-contain brightness-105 contrast-105" />
          </div>
          <h2 className="text-3xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Welcome Back</h2>
          <p className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.75)' }}>
            Sign in to access your hackathons, team status, and dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: 'rgba(226,232,240,0.85)' }}>Student Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.6)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: '#E2E8F0',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '0.875rem',
                }}
                className="w-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold" style={{ color: 'rgba(226,232,240,0.85)' }}>Password</label>
              <Link to="/forgot-password" className="text-xs font-semibold text-violet-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.6)' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: '#E2E8F0',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '0.875rem',
                }}
                className="w-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-violet-500 rounded cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs font-medium cursor-pointer" style={{ color: 'rgba(148,163,184,0.8)' }}>
              Remember me on this device
            </label>
          </div>

          <Button variant="primary" type="submit" size="lg" className="w-full py-3.5 gap-2 mt-2" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In to Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          className="text-center text-xs font-medium pt-4"
        >
          <span style={{ color: 'rgba(148,163,184,0.7)' }}>Don't have an account? </span>
          <Link to="/register" className="font-bold text-violet-400 hover:underline">
            Register as a Student
          </Link>
        </div>
      </div>
    </div>
  );
};
