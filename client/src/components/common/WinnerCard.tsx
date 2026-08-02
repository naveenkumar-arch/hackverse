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
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      }}
      className="rounded-3xl p-6 space-y-4"
    >
      <div className="flex justify-between items-start">
        <Badge variant="yellow" className="gap-1.5 font-bold">
          <Trophy className="w-3.5 h-3.5 text-amber-900" />
          {winner.position}
        </Badge>
        <span
          style={{
            background: 'rgba(16,253,165,0.12)',
            color: '#34D399',
            border: '1px solid rgba(16,253,165,0.30)',
          }}
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
        >
          Prize: {winner.prizeAmount}
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-black text-white leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {winner.projectTitle}
        </h3>
        <p className="text-xs font-semibold text-violet-400">
          By {winner.teamName} &bull; {winner.eventName}
        </p>
      </div>

      <p className="text-xs font-medium line-clamp-3 leading-relaxed" style={{ color: 'rgba(148,163,184,0.75)' }}>
        {winner.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {winner.techStack.map((tech) => (
          <span
            key={tech}
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: '#C4B5FD',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
            className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>

      <div
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        className="pt-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>Score: {winner.score}/100</span>
        </div>

        <div className="flex gap-2">
          <a
            href={winner.repoUrl}
            target="_blank"
            rel="noreferrer"
            style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.30)' }}
            className="p-2 rounded-xl text-violet-300 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={winner.demoUrl}
            target="_blank"
            rel="noreferrer"
            style={{ background: 'rgba(244,114,182,0.15)', border: '1px solid rgba(244,114,182,0.30)' }}
            className="p-2 rounded-xl text-pink-300 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
