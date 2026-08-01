import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
      // Direct API lookup placeholder
      setCertData(null);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="space-y-12 py-8">
      <SectionHeader
        eyebrow="CREDENTIAL VERIFIER"
        title="Verify Certificate Authenticity"
        subtitle="Validate digital certificates issued by HackVerse using unique certificate credential IDs."
      />

      <div className="glass-card bg-white rounded-3xl p-6 border border-purple-100 shadow-xl max-w-xl mx-auto space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchId);
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Certificate ID (e.g. HV-2026-AI-8921)..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 rounded-2xl border border-slate-200 text-xs font-mono font-bold uppercase focus:outline-none focus:border-purple-500"
            />
          </div>
          <Button variant="primary" type="submit" disabled={loading} className="py-3 text-xs font-black">
            {loading ? 'Verifying...' : 'Verify Credential'}
          </Button>
        </form>
      </div>

      {searched && (
        <div className="max-w-2xl mx-auto">
          {certData ? (
            <div className="glass-card bg-white rounded-3xl p-8 border border-purple-100 shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  <span className="font-extrabold text-slate-900 text-sm">Authentic Certificate Verified</span>
                </div>
                <Badge variant="green">VALID CREDENTIAL</Badge>
              </div>
              <CertificateCanvas certData={certData} />
            </div>
          ) : (
            <div className="glass-card bg-white rounded-3xl p-8 text-center border border-purple-100 shadow-xl space-y-3">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
              <h4 className="text-xl font-black text-slate-900">Certificate Not Found</h4>
              <p className="text-xs text-slate-500 font-medium">
                No certificate found matching ID "{searchId}". Please check the certificate ID and try again.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
