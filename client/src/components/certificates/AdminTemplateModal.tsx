import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { MOCK_EVENTS } from '../../data/mockData';
import { X, Award, Image, Upload } from 'lucide-react';

interface AdminTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (templateData: any) => void;
}

export const AdminTemplateModal: React.FC<AdminTemplateModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [eventId, setEventId] = useState(MOCK_EVENTS[0].id);
  const [templateType, setTemplateType] = useState('Participation');
  const [templateUrl, setTemplateUrl] = useState('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      id: `tmpl-${Date.now()}`,
      name,
      eventId,
      templateType,
      templateUrl,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card bg-white p-8 rounded-3xl max-w-lg w-full shadow-2xl relative space-y-6 border border-purple-200"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
            <Upload className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Upload Certificate Template</h3>
          <p className="text-xs text-slate-500 font-medium">
            Store background templates in database for automatic certificate generation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Template Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. AI Zenith Winner Certificate Template"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Event *</label>
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
            >
              {MOCK_EVENTS.map((e) => (
                <option key={e.id} value={e.id}>{e.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Certificate Type</label>
            <select
              value={templateType}
              onChange={(e) => setTemplateType(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="Participation">Participation</option>
              <option value="Winner">Winner</option>
              <option value="Runner Up">Runner Up</option>
              <option value="Second Runner Up">Second Runner Up</option>
              <option value="Judge">Judge</option>
              <option value="Organizer">Organizer</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Template Background Image URL</label>
            <input
              type="url"
              required
              value={templateUrl}
              onChange={(e) => setTemplateUrl(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <Button variant="primary" type="submit" className="w-full py-3.5 mt-2">
            Upload & Save Template
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
