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
          <div className="glass-card rounded-3xl p-6 border border-white/90 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-extrabold text-slate-900">Email Us Directly</h4>
            <p className="text-xs text-slate-500 font-medium">For general inquiries & partnerships</p>
            <a href="mailto:team@hackverse.dev" className="text-sm font-bold text-purple-600 hover:underline">
              team@hackverse.dev
            </a>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/90 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Discord className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-extrabold text-slate-900">Join Community Discord</h4>
            <p className="text-xs text-slate-500 font-medium">24/7 instant chat with 50,000+ student hackers</p>
            <a href="https://discord.gg" target="_blank" rel="noreferrer" className="text-sm font-bold text-pink-600 hover:underline">
              discord.gg/kernel-overriders
            </a>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/90 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-extrabold text-slate-900">Headquarters</h4>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              HackVerse <br />
              500 Howard Street, Suite 400 <br />
              San Francisco, CA 94105
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/90 shadow-2xl space-y-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-2xl font-extrabold text-slate-900">Send Us a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Alex Rivera"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="alex@university.edu"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
                  <input
                    required
                    type="text"
                    placeholder="Sponsorship / University Partnership"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <Button variant="primary" type="submit" size="lg" className="w-full gap-2 py-3.5">
                  <Send className="w-4 h-4" /> Send Message
                </Button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">
                  Thank you for reaching out. Our support team will get back to you within 24 hours.
                </p>
                <Button variant="secondary" onClick={() => setSubmitted(false)}>
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
