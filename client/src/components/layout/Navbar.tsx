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
      <div className="bg-white rounded-full px-6 py-3 border-2 border-[#1E1B4B] shadow-[4px_4px_0px_0px_#1E1B4B] flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-[#FFE600] border-2 border-[#120E38] flex items-center justify-center shadow-[3px_3px_0px_0px_#120E38] group-hover:rotate-12 transition-transform">
            <Sparkles className="w-5 h-5 text-[#120E38] fill-[#120E38]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-gradient-hackverse leading-none">
              Kernel Overriders
            </span>
          </div>
        </Link>

        {/* Center Pill Menu Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border-2 border-[#120E38]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
                  isActive
                    ? 'bg-[#FFE600] text-[#120E38] border-2 border-[#120E38] shadow-[2px_2px_0px_0px_#120E38] scale-105'
                    : 'text-[#120E38] hover:bg-white'
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
