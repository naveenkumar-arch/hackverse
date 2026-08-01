import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Home, ArrowLeft, Search } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/90 shadow-2xl text-center space-y-6 max-w-lg w-full">
        <div className="w-20 h-20 rounded-3xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900">Page Not Found</h1>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            The page or competition route you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link to="/" className="w-full">
            <Button variant="primary" className="w-full gap-2">
              <Home className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
          <Link to="/events" className="w-full">
            <Button variant="secondary" className="w-full gap-2">
              <Search className="w-4 h-4" /> Browse Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
