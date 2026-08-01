import { Event, EventStatus } from '@prisma/client';
import { BaseRepository } from './base.repository';
import { prisma } from '../config/db.config';

export class EventRepository extends BaseRepository<Event> {
  constructor() {
    super(prisma, 'event');
  }

  async findBySlug(slug: string): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: { slug },
      include: {
        organizer: {
          select: { id: true, fullName: true, email: true, avatarUrl: true },
        },
        sponsors: true,
        faqs: true,
      },
    });
  }

  async findUpcomingEvents(limit = 10): Promise<Event[]> {
    return this.prisma.event.findMany({
      where: {
        status: EventStatus.UPCOMING,
        startDate: { gte: new Date() },
      },
      take: limit,
      orderBy: { startDate: 'asc' },
    });
  }
}
