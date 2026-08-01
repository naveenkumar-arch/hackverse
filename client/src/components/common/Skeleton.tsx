import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl p-6 border border-white/90 shadow-xl space-y-4 animate-pulse">
      <div className="h-44 bg-slate-200/80 rounded-2xl w-full" />
      <div className="h-6 bg-slate-200/80 rounded-xl w-3/4" />
      <div className="h-4 bg-slate-200/60 rounded-lg w-1/2" />
      <div className="h-10 bg-slate-200/80 rounded-2xl w-full mt-4" />
    </div>
  );
};

export const SkeletonHeader: React.FC = () => {
  return (
    <div className="py-12 space-y-4 max-w-xl mx-auto text-center animate-pulse">
      <div className="h-4 bg-slate-200/60 rounded-lg w-1/3 mx-auto" />
      <div className="h-8 bg-slate-200/80 rounded-2xl w-3/4 mx-auto" />
      <div className="h-4 bg-slate-200/50 rounded-lg w-1/2 mx-auto" />
    </div>
  );
};

export const SkeletonTable: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl p-8 border border-white/90 shadow-xl space-y-4 animate-pulse">
      <div className="h-10 bg-purple-100/60 rounded-2xl w-full" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-12 bg-slate-100/60 rounded-xl w-full" />
      ))}
    </div>
  );
};
