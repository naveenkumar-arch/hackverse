import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { CertificateCanvas } from '../components/certificates/CertificateCanvas';
import { Search, ShieldCheck, Download, AlertCircle } from 'lucide-react';

export const CertificateVerification: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [searchId, setSearchId] = useState(id || '');
  const [certData, setCertData] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (targetCertId: string) => {
    if (!targetCertId.trim()) return;
    setLoading(true);
    setSearched(true);
    setTimeout(() => {
      setCertData(null);
      setLoading(false);
    }, 400);
  };

  const glassCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.09)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)',
  };

  return (
    <div className="space-y-12 py-8">
      <SectionHeader
        eyebrow="CREDENTIAL VERIFIER"
        title="Verify Certificate Authenticity"
        subtitle="Validate digital certificates issued by Kernel Overriders using unique certificate credential IDs."
      />

      <div style={{ ...glassCard, borderRadius: '1.5rem', maxWidth: '36rem', margin: '0 auto' }} className="p-6 sm:p-8 space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchId);
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-grow">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.6)' }} />
            <input
              type="text"
              placeholder="Enter Certificate ID (e.g. KO-2026-AI-8921)..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: '#E2E8F0',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '0.875rem',
              }}
              className="w-full pl-11 pr-4 py-3 text-xs font-mono font-semibold uppercase focus:outline-none focus:border-violet-500"
            />
          </div>
          <Button variant="primary" type="submit" disabled={loading} className="py-3 text-xs font-bold cursor-pointer">
            {loading ? 'Verifying...' : 'Verify Credential'}
          </Button>
        </form>
      </div>

      {searched && (
        <div className="max-w-2xl mx-auto">
          {certData ? (
            <div style={{ ...glassCard, borderRadius: '1.5rem' }} className="p-8 space-y-6">
              <div className="flex justify-between items-center pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <span className="font-extrabold text-white text-sm">Authentic Certificate Verified</span>
                </div>
                <Badge variant="green">VALID CREDENTIAL</Badge>
              </div>
              <CertificateCanvas certData={certData} />
            </div>
          ) : (
            <div style={{ ...glassCard, borderRadius: '1.5rem' }} className="p-8 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
              <h4 className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Certificate Not Found</h4>
              <p className="text-xs font-medium" style={{ color: 'rgba(148,163,184,0.75)' }}>
                No certificate found matching ID "{searchId}". Please check the certificate ID and try again.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
