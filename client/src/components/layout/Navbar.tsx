import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import { Menu, X, LogOut, Shield } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      <div
        style={{
          background: scrolled
            ? 'rgba(5,7,20,0.88)'
            : 'rgba(15,20,40,0.65)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: scrolled
            ? '0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.10)'
            : '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.10)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="rounded-full px-5 sm:px-6 py-2.5 flex items-center justify-between"
      >
        {/* Brand Logo with High Contrast Glass Badge */}
        <Link to="/" className="flex items-center group">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,242,254,0.92))',
              boxShadow: '0 0 20px rgba(139,92,246,0.35), inset 0 1px 0 rgba(255,255,255,1)',
              border: '1px solid rgba(255,255,255,0.9)',
            }}
            className="px-3 py-1.5 rounded-2xl flex items-center justify-center group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300"
          >
            <img
              src={logoImg}
              alt="Kernel Overriders"
              className="h-9 sm:h-10 w-auto object-contain brightness-105 contrast-105"
            />
          </div>
        </Link>

        {/* Center Pill Menu Navigation */}
        <nav
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
          }}
          className="hidden lg:flex items-center gap-1 p-1.5 rounded-full"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(96,165,250,0.25))',
                  border: '1px solid rgba(139,92,246,0.50)',
                  color: '#DDD6FE',
                  boxShadow: '0 0 16px rgba(139,92,246,0.30)',
                } : {}}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'scale-105'
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
                  <Button variant="yellow" size="sm" className="gap-1.5 text-xs font-bold">
                    <Shield className="w-3.5 h-3.5" /> Admin Panel
                  </Button>
                </Link>
              )}
              <Button variant="ghost" size="sm" onClick={logout} className="p-2 text-slate-400 hover:text-rose-400">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'rgba(5,7,20,0.95)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.10)',
          }}
          className="lg:hidden mt-2 p-6 rounded-3xl space-y-2"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(96,165,250,0.15))',
                  border: '1px solid rgba(139,92,246,0.40)',
                  color: '#DDD6FE',
                } : {}}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? '' : 'text-slate-300 hover:text-white hover:bg-white/8'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
