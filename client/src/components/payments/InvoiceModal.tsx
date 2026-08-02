import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { X, Download, Printer, ShieldCheck, FileText } from 'lucide-react';
import logoImg from '../../assets/logo.png';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, invoice }) => {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card bg-white p-8 sm:p-10 rounded-3xl max-w-lg w-full shadow-2xl relative space-y-6 border border-purple-200 my-8"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500">
          <X className="w-5 h-5" />
        </button>

        {/* Invoice Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="Kernel Overriders" className="h-8 w-auto object-contain" />
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">OFFICIAL PAYMENT INVOICE</p>
          </div>

          <div className="text-right space-y-1">
            <span className="text-xs font-mono font-black text-purple-700 block">{invoice.invoiceNumber}</span>
            <Badge variant={invoice.status === 'PAID' ? 'green' : 'yellow'}>{invoice.status}</Badge>
          </div>
        </div>

        {/* Invoice Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block">BILLED TO</span>
            <p className="font-extrabold text-slate-900">{invoice.user || 'Alex Rivera'}</p>
            <p className="text-slate-500">{invoice.email || 'alex@stanford.edu'}</p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block">TRANSACTION INFO</span>
            <p className="font-mono font-bold text-slate-700">{invoice.transactionId}</p>
            <p className="text-slate-500">Date: {invoice.date}</p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-3">
          <div className="flex justify-between text-xs font-bold text-slate-500 uppercase border-b border-purple-100 pb-2">
            <span>Description</span>
            <span>Amount</span>
          </div>
          <div className="flex justify-between text-sm font-extrabold text-slate-900">
            <span>Hackathon Team Registration Fee</span>
            <span>₹{invoice.amount || '499'}.00</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500 border-t border-purple-100 pt-2 font-bold">
            <span>Taxes & GST (0%)</span>
            <span>₹0.00</span>
          </div>
          <div className="flex justify-between text-base font-black text-purple-700 border-t border-purple-200 pt-2">
            <span>Total Paid</span>
            <span>₹{invoice.amount || '499'}.00</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex gap-3">
          <Button variant="primary" onClick={() => alert('Downloading Invoice PDF...')} className="w-full gap-2">
            <Download className="w-4 h-4" /> Download PDF Invoice
          </Button>
          <Button variant="secondary" onClick={() => window.print()} className="gap-2">
            <Printer className="w-4 h-4" /> Print
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
