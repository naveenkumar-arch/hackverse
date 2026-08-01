import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import { Sparkles, Menu, X, LogOut, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/results', label: 'Results' },
    { path: '/verify', label: 'Verify Cert' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-4 z-50 px-3 sm:px-5 max-w-[1440px] mx-auto mb-6">
      <div className="bg-[#0D0F1A]/90 backdrop-blur-xl rounded-full px-6 py-3 border border-[#00F0FF]/30 shadow-[0_0_25px_rgba(0,240,255,0.2)] flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00F0FF] to-[#7209B7] border border-[#00F0FF]/60 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.5)] group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-display font-black tracking-wider text-gradient-monarch leading-none">
              Kernel Overriders
            </span>
          </div>
        </Link>

        {/* Center Pill Menu Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#131525]/90 p-1.5 rounded-full border border-[#00F0FF]/20">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
                  isActive
                    ? 'bg-[#00F0FF] text-[#090A0F] shadow-[0_0_15px_rgba(0,240,255,0.6)] scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && (
            <div className="flex items-center gap-2">
              {user?.role === 'ADMIN' && (
                <Link to="/admin-portal">
                  <Button variant="yellow" size="sm" className="gap-1.5 text-xs font-black">
                    <Shield className="w-3.5 h-3.5" /> Admin Panel
                  </Button>
                </Link>
              )}
              <Button variant="ghost" size="sm" onClick={logout} className="p-2 text-slate-500 hover:text-rose-600">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>


        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 glass-card bg-white/95 p-6 rounded-3xl border border-white/90 shadow-2xl space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
