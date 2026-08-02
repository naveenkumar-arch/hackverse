import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, Disc as Discord, Phone } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const glassCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.09)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)',
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    color: '#E2E8F0',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '0.875rem',
  };

  return (
    <div className="space-y-12 py-8">
      <SectionHeader
        eyebrow="GET IN TOUCH"
        title="We'd Love to Hear From You"
        subtitle="Have questions about sponsoring an event, hosting a university hackathon, or general support? Drop us a line."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div whileHover={{ y: -4 }} style={{ ...glassCard, borderRadius: '1.5rem' }} className="p-6 space-y-3">
            <div
              style={{
                background: 'rgba(251,191,36,0.12)',
                border: '1px solid rgba(251,191,36,0.30)',
              }}
              className="w-12 h-12 rounded-2xl text-amber-400 flex items-center justify-center"
            >
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Email Us Directly</h4>
            <p className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.70)' }}>For general inquiries & partnerships</p>
            <a href="mailto:team@kernel-overriders.dev" className="text-sm font-bold text-violet-400 hover:underline font-mono">
              team@kernel-overriders.dev
            </a>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} style={{ ...glassCard, borderRadius: '1.5rem' }} className="p-6 space-y-3">
            <div
              style={{
                background: 'rgba(34,211,238,0.12)',
                border: '1px solid rgba(34,211,238,0.30)',
              }}
              className="w-12 h-12 rounded-2xl text-cyan-400 flex items-center justify-center"
            >
              <Discord className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Join Community Discord</h4>
            <p className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.70)' }}>24/7 instant chat with 12,000+ student hackers</p>
            <a href="https://discord.gg" target="_blank" rel="noreferrer" className="text-sm font-bold text-cyan-400 hover:underline font-mono">
              discord.gg/kernel-overriders
            </a>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} style={{ ...glassCard, borderRadius: '1.5rem' }} className="p-6 space-y-3">
            <div
              style={{
                background: 'rgba(16,253,165,0.12)',
                border: '1px solid rgba(16,253,165,0.30)',
              }}
              className="w-12 h-12 rounded-2xl text-emerald-400 flex items-center justify-center"
            >
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Headquarters</h4>
            <p className="text-xs font-medium leading-relaxed" style={{ color: 'rgba(148,163,184,0.80)' }}>
              Kernel Overriders <br />
              Student Tech Collective <br />
              Silicon Valley / Remote Worldwide
            </p>
          </motion.div>

          {/* Direct Support Contacts */}
          <motion.div whileHover={{ y: -4 }} style={{ ...glassCard, borderRadius: '1.5rem' }} className="p-6 space-y-4">
            <div
              style={{
                background: 'rgba(244,114,182,0.12)',
                border: '1px solid rgba(244,114,182,0.30)',
              }}
              className="w-12 h-12 rounded-2xl text-pink-400 flex items-center justify-center"
            >
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Direct Support</h4>
            <p className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.70)' }}>Reach out directly to our support team</p>

            <div className="space-y-1 pt-1">
              <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Contact 1</p>
              <a href="tel:+919361858183" className="flex items-center gap-2 text-slate-200 hover:text-violet-400 transition-colors">
                <Phone className="w-4 h-4 shrink-0 text-violet-400" />
                <span className="text-sm font-bold font-mono">+91 93618 58183</span>
              </a>
              <a href="mailto:madhan600700@gmail.com" className="flex items-center gap-2 text-slate-200 hover:text-violet-400 transition-colors">
                <Mail className="w-4 h-4 shrink-0 text-violet-400" />
                <span className="text-xs font-medium font-mono break-all">madhan600700@gmail.com</span>
              </a>
            </div>

            <div className="space-y-1 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest mt-1">Contact 2</p>
              <a href="tel:+919342443023" className="flex items-center gap-2 text-slate-200 hover:text-pink-400 transition-colors">
                <Phone className="w-4 h-4 shrink-0 text-pink-400" />
                <span className="text-sm font-bold font-mono">+91 93424 43023</span>
              </a>
              <a href="mailto:amuthasurabi970@gmail.com" className="flex items-center gap-2 text-slate-200 hover:text-pink-400 transition-colors">
                <Mail className="w-4 h-4 shrink-0 text-pink-400" />
                <span className="text-xs font-medium font-mono break-all">amuthasurabi970@gmail.com</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div style={{ ...glassCard, borderRadius: '1.75rem' }} className="p-8 sm:p-10 space-y-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-3xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Send Us a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold block mb-1.5" style={{ color: 'rgba(226,232,240,0.85)' }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      style={inputStyle}
                      className="w-full px-4 py-3 text-xs font-medium focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-1.5" style={{ color: 'rgba(226,232,240,0.85)' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@university.edu"
                      style={inputStyle}
                      className="w-full px-4 py-3 text-xs font-medium focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: 'rgba(226,232,240,0.85)' }}>Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="Event Partnership / University Hackathon Sponsorship"
                    style={inputStyle}
                    className="w-full px-4 py-3 text-xs font-medium focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: 'rgba(226,232,240,0.85)' }}>Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your university community or question..."
                    style={inputStyle}
                    className="w-full px-4 py-3 text-xs font-medium focus:outline-none focus:border-violet-500"
                  />
                </div>

                <Button variant="primary" type="submit" className="w-full py-4 text-xs font-bold cursor-pointer">
                  Send Message
                </Button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div
                  style={{
                    background: 'rgba(16,253,165,0.15)',
                    border: '1px solid rgba(16,253,165,0.35)',
                  }}
                  className="w-16 h-16 rounded-full text-emerald-400 flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Message Delivered!</h3>
                <p className="text-xs font-medium max-w-sm mx-auto" style={{ color: 'rgba(148,163,184,0.80)' }}>
                  Thank you for reaching out. A Kernel Overriders organizer will get back to you within 24 hours.
                </p>
                <Button variant="secondary" onClick={() => setSubmitted(false)} className="text-xs font-bold cursor-pointer">
                  Send Another Message
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
