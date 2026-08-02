import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Disc as Discord, Heart } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(5,7,20,0.98) 20%)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="text-slate-300 pt-16 pb-8 rounded-t-[3rem] mt-12"
    >
      {/* Footer glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-200px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(34,211,238,0.6), transparent)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 space-y-12 relative z-10">

        {/* Links Grid */}
        <div
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-16"
        >
          <div className="col-span-2 space-y-5">
            <Link to="/" className="inline-block group">
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,242,254,0.92))',
                  boxShadow: '0 0 25px rgba(139,92,246,0.35), inset 0 1px 0 rgba(255,255,255,1)',
                  border: '1px solid rgba(255,255,255,0.9)',
                }}
                className="px-4 py-2 rounded-2xl inline-flex items-center justify-center group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300"
              >
                <img
                  src={logoImg}
                  alt="Kernel Overriders"
                  className="h-12 w-auto object-contain brightness-105 contrast-105"
                />
              </div>
            </Link>
            <p style={{ color: 'rgba(148,163,184,0.85)' }} className="text-xs sm:text-sm max-w-sm leading-relaxed font-medium">
              A student-run tech community running online hackathons, coding competitions, workshops and cybersecurity events.
            </p>
            <div className="flex gap-3 pt-1">
              {[
                { icon: Twitter, href: '#', color: 'rgba(34,211,238,0.25)', hoverGlow: '#22D3EE' },
                { icon: Discord, href: '#', color: 'rgba(139,92,246,0.25)', hoverGlow: '#8B5CF6' },
                { icon: Github, href: '#', color: 'rgba(255,255,255,0.10)', hoverGlow: '#fff' },
                { icon: Linkedin, href: '#', color: 'rgba(96,165,250,0.25)', hoverGlow: '#60A5FA' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  style={{
                    background: social.color,
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${social.hoverGlow}40`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${social.hoverGlow}55`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                  className="w-10 h-10 rounded-2xl text-slate-200 flex items-center justify-center"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4
              style={{
                background: 'linear-gradient(135deg, #F472B6, #FB923C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              className="text-xs font-bold uppercase tracking-widest"
            >Events</h4>
            <ul className="space-y-2.5 text-xs font-medium" style={{ color: 'rgba(148,163,184,0.80)' }}>
              <li><Link to="/events" className="hover:text-violet-400 transition-colors">AI Hackathons</Link></li>
              <li><Link to="/events" className="hover:text-violet-400 transition-colors">CTF Cyber Matrix</Link></li>
              <li><Link to="/events" className="hover:text-violet-400 transition-colors">CodeSprint Battles</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4
              style={{
                background: 'linear-gradient(135deg, #22D3EE, #34D399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              className="text-xs font-bold uppercase tracking-widest"
            >Platform</h4>
            <ul className="space-y-2.5 text-xs font-medium" style={{ color: 'rgba(148,163,184,0.80)' }}>
              <li><Link to="/results" className="hover:text-cyan-400 transition-colors">Past Winners</Link></li>
              <li><Link to="/verify" className="hover:text-cyan-400 transition-colors">Verify Certificate</Link></li>
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Mission</Link></li>
              <li><Link to="/help" className="hover:text-cyan-400 transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4
              style={{
                background: 'linear-gradient(135deg, #FBBF24, #FDE68A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              className="text-xs font-bold uppercase tracking-widest"
            >Legal</h4>
            <ul className="space-y-2.5 text-xs font-medium" style={{ color: 'rgba(148,163,184,0.80)' }}>
              <li><Link to="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs gap-4" style={{ color: 'rgba(100,116,139,0.85)' }}>
          <p>© {new Date().getFullYear()} Kernel Overriders. Built by students, for students.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> for developers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};
