import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin, Disc as Discord, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-2 border-[#1E1B4B] text-[#1E1B4B] pt-12 pb-8 rounded-t-[3rem] relative overflow-hidden mt-12 shadow-[0px_-4px_0px_0px_#1E1B4B]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 space-y-10 relative z-10">

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b-2 border-[#1E1B4B]/10 pb-16">
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#F7D046] border-2 border-[#1E1B4B] flex items-center justify-center shadow-[2px_2px_0px_0px_#1E1B4B]">
                <Sparkles className="w-5 h-5 text-[#1E1B4B]" />
              </div>
              <span className="text-3xl font-black text-gradient-hackverse">HackVerse</span>
            </Link>
            <p className="text-slate-600 text-xs sm:text-sm max-w-sm leading-relaxed font-bold">
              A student-run tech community running online hackathons, coding competitions, workshops and cybersecurity events.
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
                  className="w-10 h-10 rounded-2xl bg-white text-[#1E1B4B] flex items-center justify-center transition-all border-2 border-[#1E1B4B] shadow-[2px_2px_0px_0px_#1E1B4B] hover:bg-[#F7D046]"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FF334B]">Events</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-600">
              <li><Link to="/events" className="hover:text-[#FF334B] transition-colors">AI Hackathons</Link></li>
              <li><Link to="/events" className="hover:text-[#FF334B] transition-colors">CTF Cyber Matrix</Link></li>
              <li><Link to="/events" className="hover:text-[#FF334B] transition-colors">CodeSprint Battles</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#5CE1E6]">Platform</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-600">
              <li><Link to="/results" className="hover:text-[#5CE1E6] transition-colors">Past Winners</Link></li>
              <li><Link to="/verify" className="hover:text-[#5CE1E6] transition-colors">Verify Certificate</Link></li>
              <li><Link to="/about" className="hover:text-[#5CE1E6] transition-colors">About Mission</Link></li>
              <li><Link to="/help" className="hover:text-[#5CE1E6] transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#F7D046]">Legal</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-600">
              <li><Link to="/privacy" className="hover:text-[#F7D046] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#F7D046] transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-[#F7D046] transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-bold gap-4">
          <p>© {new Date().getFullYear()} HackVerse. Built by students, for students.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-[#FF334B] fill-[#FF334B]" /> for developers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};
