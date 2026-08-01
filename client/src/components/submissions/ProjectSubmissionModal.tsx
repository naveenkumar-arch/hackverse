import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { X, Code, Github, ExternalLink, Video, FileText, AlertCircle, CheckCircle2, CreditCard } from 'lucide-react';

interface ProjectSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
  isLeader?: boolean;
  isPaid?: boolean;
  onSuccess: (submissionData: any) => void;
}

export const ProjectSubmissionModal: React.FC<ProjectSubmissionModalProps> = ({
  isOpen,
  onClose,
  event,
  isLeader = true,
  isPaid = true,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    repoUrl: '',
    demoUrl: '',
    videoUrl: '',
    presentationPdfUrl: '',
    techStack: 'React, TypeScript, Python, PyTorch',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  // Deadline validation
  const isSubmissionClosed = !event?.isSubmissionOpen;
  const isDeadlinePassed = event?.submissionDeadline ? new Date() > new Date(event.submissionDeadline) : false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLeader || !isPaid) return;

    setLoading(true);
    setTimeout(() => {
      onSuccess({
        ...formData,
        submittedAt: new Date().toISOString(),
        techStack: formData.techStack.split(',').map((s) => s.trim()),
      });
      setLoading(false);
      setSuccess(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card bg-white p-8 rounded-3xl max-w-lg w-full shadow-2xl relative space-y-6 border border-purple-200 my-8"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
            <Code className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Project Submission</h3>
          <p className="text-xs text-slate-500 font-medium">
            Event: <span className="font-bold text-slate-800">{event?.title}</span> &bull; Only Team Leader can submit.
          </p>
        </div>

        {/* Validation warnings */}
        {!isLeader && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>Only the Team Leader is authorized to submit the project.</span>
          </div>
        )}

        {!isPaid && (
          <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-pink-800 text-xs font-bold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-pink-600 flex-shrink-0" />
            <span>Participation Gate: Only teams with a PAID registration fee status can submit projects. Please complete payment in Student Dashboard.</span>
          </div>
        )}

        {(isSubmissionClosed || isDeadlinePassed) && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>
              Submissions are disabled. {isDeadlinePassed ? 'Submission deadline has passed.' : 'Submissions closed by Admin.'}
            </span>
          </div>
        )}

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Project Name *</label>
              <input
                type="text"
                required
                disabled={!isLeader || !isPaid || isSubmissionClosed || isDeadlinePassed}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. NeuroMesh AI"
                className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 disabled:bg-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">GitHub Repository URL *</label>
              <div className="relative">
                <Github className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  required
                  disabled={!isLeader || !isPaid || isSubmissionClosed || isDeadlinePassed}
                  value={formData.repoUrl}
                  onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                  placeholder="https://github.com/team/repository"
                  className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 disabled:bg-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Live Demo URL</label>
              <div className="relative">
                <ExternalLink className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  disabled={!isLeader || !isPaid || isSubmissionClosed || isDeadlinePassed}
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  placeholder="https://neuromesh-demo.vercel.app"
                  className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 disabled:bg-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Demo Video Link (Loom / YouTube)</label>
              <div className="relative">
                <Video className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  disabled={!isLeader || !isPaid || isSubmissionClosed || isDeadlinePassed}
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 disabled:bg-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Presentation PDF Link</label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  disabled={!isLeader || !isPaid || isSubmissionClosed || isDeadlinePassed}
                  value={formData.presentationPdfUrl}
                  onChange={(e) => setFormData({ ...formData, presentationPdfUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 disabled:bg-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Tech Stack (comma separated)</label>
              <input
                type="text"
                disabled={!isLeader || !isPaid || isSubmissionClosed || isDeadlinePassed}
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                placeholder="React, TypeScript, Python, PyTorch"
                className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 disabled:bg-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Project Description *</label>
              <textarea
                required
                rows={3}
                disabled={!isLeader || !isPaid || isSubmissionClosed || isDeadlinePassed}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Explain the problem, your architecture, and key features built..."
                className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 disabled:bg-slate-100"
              />
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-full py-3.5 mt-2"
              disabled={!isLeader || !isPaid || isSubmissionClosed || isDeadlinePassed || loading}
            >
              {loading ? 'Submitting Project...' : 'Submit Final Project'}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Project Submitted!</h3>
            <p className="text-xs text-slate-600 font-medium">
              Your submission timestamp has been recorded. Judges will evaluate your project after the deadline.
            </p>
            <Button variant="secondary" onClick={onClose} className="w-full">
              Done
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
