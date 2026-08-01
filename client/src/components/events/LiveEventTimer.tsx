import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface LiveEventTimerProps {
  liveStartTime: number; // epoch ms
  durationHours: number;
  onExpire?: () => void;
}

export const LiveEventTimer: React.FC<LiveEventTimerProps> = ({
  liveStartTime,
  durationHours,
  onExpire,
}) => {
  const targetEndTime = liveStartTime + durationHours * 3600 * 1000;
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const diff = Math.max(0, Math.floor((targetEndTime - Date.now()) / 1000));
      setTimeLeft(diff);

      if (diff <= 0 && onExpire) {
        onExpire();
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetEndTime, onExpire]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-white border border-pink-500/40 shadow-lg font-mono font-black text-xs">
      <Clock className="w-4 h-4 text-pink-400 animate-spin" />
      <span className="text-pink-300">{pad(hours)}:{pad(minutes)}:{pad(seconds)}</span>
    </div>
  );
};
