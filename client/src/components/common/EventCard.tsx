import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EventItem } from '../../types';
import { Badge } from './Badge';
import { Button } from './Button';
import { Calendar, MapPin, Users, Trophy, ArrowRight } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface EventCardProps {
  event: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'HACKATHON': return 'purple';
      case 'CYBERSECURITY': return 'pink';
      case 'CODING_COMPETITION': return 'blue';
      case 'WORKSHOP': return 'yellow';
      default: return 'green';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col justify-between border border-white/80 shadow-xl shadow-purple-500/5 group"
    >
      <div>
        {/* Banner image with overlay pill */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.bannerUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant={getBadgeVariant(event.type)}>
              {event.type.replace('_', ' ')}
            </Badge>
            <Badge variant="outline">{event.mode}</Badge>
          </div>

          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-white text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              {event.prizePool}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              <Users className="w-3.5 h-3.5 text-purple-300" />
              {event.participantsCount}+ Hackers
            </span>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-1">
            {event.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium line-clamp-2 leading-relaxed">
            {event.shortDescription}
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            {event.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg border border-purple-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer details & CTA */}
      <div className="p-6 pt-0 space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-pink-500" />
            <span className="truncate max-w-[120px]">{event.location}</span>
          </div>
        </div>

        <Link to={`/events/${event.slug}`} className="block">
          <Button variant="primary" className="w-full gap-2 text-xs py-2.5">
            View Challenge Details
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
