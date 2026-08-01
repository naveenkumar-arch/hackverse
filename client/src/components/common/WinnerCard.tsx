import React from 'react';
import { motion } from 'framer-motion';
import { WinnerItem } from '../../types';
import { Badge } from './Badge';
import { ExternalLink, Github, Trophy, Star } from 'lucide-react';

interface WinnerCardProps {
  winner: WinnerItem;
}

export const WinnerCard: React.FC<WinnerCardProps> = ({ winner }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="glass-card glass-card-hover rounded-3xl p-6 border border-white/80 shadow-xl shadow-purple-500/5 space-y-4"
    >
      <div className="flex justify-between items-start">
        <Badge variant="yellow" className="gap-1.5 font-bold">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          {winner.position}
        </Badge>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          Prize: {winner.prizeAmount}
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
          {winner.projectTitle}
        </h3>
        <p className="text-xs font-bold text-purple-600">
          By {winner.teamName} &bull; {winner.eventName}
        </p>
      </div>

      <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed">
        {winner.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {winner.techStack.map((tech) => (
          <span key={tech} className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
            {tech}
          </span>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>Score: {winner.score}/100</span>
        </div>

        <div className="flex gap-2">
          <a
            href={winner.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={winner.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
