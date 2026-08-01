import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { RefreshCw, Home } from 'lucide-react';

export const ServerError: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/90 shadow-2xl text-center space-y-6 max-w-lg w-full">
        <div className="w-20 h-20 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
          500
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900">Server Error</h1>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            Our servers encountered an unexpected issue. Please try refreshing the page or check back in a few minutes.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button variant="primary" onClick={() => window.location.reload()} className="w-full gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh Page
          </Button>
          <Link to="/" className="w-full">
            <Button variant="secondary" className="w-full gap-2">
              <Home className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
