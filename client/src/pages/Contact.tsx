import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, Disc as Discord } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          <div className="bg-white rounded-3xl p-6 border-2 border-[#1E1B4B] shadow-[6px_6px_0px_0px_#1E1B4B] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F7D046] text-[#1E1B4B] border-2 border-[#1E1B4B] flex items-center justify-center shadow-[2px_2px_0px_0px_#1E1B4B]">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-[#1E1B4B]">Email Us Directly</h4>
            <p className="text-xs text-slate-600 font-bold">For general inquiries & partnerships</p>
            <a href="mailto:team@kernel-overriders.dev" className="text-sm font-black text-[#FF334B] hover:underline font-mono">
              team@kernel-overriders.dev
            </a>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-[#1E1B4B] shadow-[6px_6px_0px_0px_#1E1B4B] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#5CE1E6] text-[#1E1B4B] border-2 border-[#1E1B4B] flex items-center justify-center shadow-[2px_2px_0px_0px_#1E1B4B]">
              <Discord className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-[#1E1B4B]">Join Community Discord</h4>
            <p className="text-xs text-slate-600 font-bold">24/7 instant chat with 12,000+ student hackers</p>
            <a href="https://discord.gg" target="_blank" rel="noreferrer" className="text-sm font-black text-[#1E1B4B] hover:underline font-mono">
              discord.gg/kernel-overriders
            </a>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-[#1E1B4B] shadow-[6px_6px_0px_0px_#1E1B4B] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#78E29A] text-[#1E1B4B] border-2 border-[#1E1B4B] flex items-center justify-center shadow-[2px_2px_0px_0px_#1E1B4B]">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-[#1E1B4B]">Headquarters</h4>
            <p className="text-xs text-slate-700 font-bold leading-relaxed">
              Kernel Overriders <br />
              Student Tech Collective <br />
              Silicon Valley / Remote Worldwide
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#1E1B4B] shadow-[8px_8px_0px_0px_#1E1B4B] space-y-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-3xl font-black text-[#1E1B4B]">Send Us a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-[#1E1B4B] block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-[#FAF7EE] text-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] font-bold text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-[#1E1B4B] block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@university.edu"
                      className="w-full px-4 py-3 bg-[#FAF7EE] text-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] font-bold text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-[#1E1B4B] block mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="Event Partnership / University Hackathon Sponsorship"
                    className="w-full px-4 py-3 bg-[#FAF7EE] text-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] font-bold text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#1E1B4B] block mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your university community or question..."
                    className="w-full px-4 py-3 bg-[#FAF7EE] text-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] font-bold text-xs focus:outline-none"
                  />
                </div>

                <Button variant="primary" type="submit" className="w-full py-4 text-xs font-black cursor-pointer">
                  Send Message
                </Button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#78E29A] text-[#1E1B4B] border-2 border-[#1E1B4B] flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#1E1B4B]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#1E1B4B]">Message Delivered!</h3>
                <p className="text-xs text-slate-700 font-bold max-w-sm mx-auto">
                  Thank you for reaching out. A Kernel Overriders organizer will get back to you within 24 hours.
                </p>
                <Button variant="secondary" onClick={() => setSubmitted(false)} className="text-xs font-black cursor-pointer">
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
