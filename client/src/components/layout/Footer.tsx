import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin, Disc as Discord, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-purple-100 text-slate-700 pt-12 pb-8 rounded-t-[3rem] relative overflow-hidden mt-12 shadow-2xl">
      {/* Bright ambient background light */}
      <div className="glow-blob-yellow -top-20 left-10" />
      <div className="glow-blob-purple -bottom-20 right-10" />

      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 space-y-10 relative z-10">

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-slate-100 pb-16">
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FACC15] via-[#FF2E4D] to-[#7C3AED] p-0.5 shadow-md">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#FF2E4D]" />
                </div>
              </div>
              <span className="text-2xl font-black text-slate-900">Kernel Overriders</span>
            </Link>
            <p className="text-slate-500 text-xs sm:text-sm max-w-sm leading-relaxed font-medium">
              The premier student tech community platform connecting global developers to hackathons, coding contests, cybersecurity battles, and tech career opportunities.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { icon: Twitter, href: '#' },
                { icon: Discord, href: '#' },
                { icon: Github, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white flex items-center justify-center transition-colors border border-purple-100 shadow-sm"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-purple-600">Events</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li><Link to="/events" className="hover:text-purple-600 transition-colors">AI Hackathons</Link></li>
              <li><Link to="/events" className="hover:text-purple-600 transition-colors">CTF Cyber Matrix</Link></li>
              <li><Link to="/events" className="hover:text-purple-600 transition-colors">CodeSprint Battles</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-pink-600">Platform</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li><Link to="/results" className="hover:text-pink-600 transition-colors">Past Winners</Link></li>
              <li><Link to="/verify" className="hover:text-pink-600 transition-colors">Verify Certificate</Link></li>
              <li><Link to="/about" className="hover:text-pink-600 transition-colors">About Mission</Link></li>
              <li><Link to="/help" className="hover:text-pink-600 transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-600">Legal</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li><Link to="/privacy" className="hover:text-amber-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-amber-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-amber-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 font-bold gap-4">
          <p>© {new Date().getFullYear()} Kernel Overriders. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> for developers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};
