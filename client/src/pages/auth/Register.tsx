import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/common/Button';
import { Mail, Lock, User, Phone, GraduationCap, Github, Linkedin, ArrowRight } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: 'Computer Science',
    year: '3rd Year',
    githubUrl: '',
    linkedinUrl: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await registerUser(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    color: '#E2E8F0',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '0.875rem',
  };

  return (
    <div className="py-12 flex justify-center items-center">
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 12px 48px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
        className="rounded-3xl p-8 sm:p-12 max-w-2xl w-full space-y-6"
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
          <h2 className="text-3xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Student Registration</h2>
          <p className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.75)' }}>
            Join 15,000+ student developers competing in global hackathons & earning certificates.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: 'rgba(226,232,240,0.85)' }}>Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.6)' }} />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  style={inputStyle}
                  className="w-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: 'rgba(226,232,240,0.85)' }}>Student Email *</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.6)' }} />
                <input
                  type="email"
                  required
                  placeholder="alex@stanford.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                  className="w-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: 'rgba(226,232,240,0.85)' }}>College / University *</label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.6)' }} />
                <input
                  type="text"
                  required
                  placeholder="e.g. Stanford University"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  style={inputStyle}
                  className="w-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: 'rgba(226,232,240,0.85)' }}>Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.6)' }} />
                <input
                  type="text"
                  placeholder="+1 (555) 234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={inputStyle}
                  className="w-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: 'rgba(226,232,240,0.85)' }}>GitHub Profile URL</label>
              <div className="relative">
                <Github className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.6)' }} />
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  style={inputStyle}
                  className="w-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: 'rgba(226,232,240,0.85)' }}>LinkedIn Profile URL</label>
              <div className="relative">
                <Linkedin className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.6)' }} />
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  style={inputStyle}
                  className="w-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: 'rgba(226,232,240,0.85)' }}>Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.6)' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={inputStyle}
                  className="w-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: 'rgba(226,232,240,0.85)' }}>Confirm Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.6)' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  style={inputStyle}
                  className="w-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <Button variant="primary" type="submit" size="lg" className="w-full py-3.5 gap-2 mt-4" disabled={loading}>
            {loading ? 'Creating Account...' : 'Complete Registration'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          className="text-center text-xs font-medium pt-4"
        >
          <span style={{ color: 'rgba(148,163,184,0.7)' }}>Already have an account? </span>
          <Link to="/login" className="font-bold text-violet-400 hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};
