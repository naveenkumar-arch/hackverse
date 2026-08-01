import { EventRepository } from '../repositories/event.repository';
import { ApiError } from '../utils/apiError';
import { prisma } from '../config/db.config';

export class EventService {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  public async getAllEvents(filters: any = {}) {
    return this.eventRepository.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' },
    });
  }

  public async getEventBySlug(slug: string) {
    const event = await this.eventRepository.findBySlug(slug);
    if (!event) {
      throw ApiError.notFound('Event not found');
    }
    return event;
  }

  public async createEvent(organizerId: string, payload: any) {
    const slug = payload.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    return this.eventRepository.create({
      ...payload,
      slug,
      organizerId,
    });
  }

  public async updateEvent(id: string, payload: any) {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw ApiError.notFound('Event not found');
    }

    let slug = event.slug;
    if (payload.title && payload.title !== event.title) {
      slug = payload.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    return this.eventRepository.update(id, {
      ...payload,
      slug,
    });
  }

  public async deleteEvent(id: string) {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw ApiError.notFound('Event not found');
    }
    return this.eventRepository.delete(id);
  }

  public async toggleRegistrationStatus(id: string) {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw ApiError.notFound('Event not found');
    }

    return this.eventRepository.update(id, {
      isRegistrationOpen: !event.isRegistrationOpen,
    });
  }

  public async toggleSubmissionStatus(id: string) {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw ApiError.notFound('Event not found');
    }

    return this.eventRepository.update(id, {
      isSubmissionOpen: !event.isSubmissionOpen,
    });
  }

  public async getAllEventsAdmin() {
    return prisma.event.findMany({
      include: {
        organizer: {
          select: { id: true, fullName: true, email: true },
        },
        _count: {
          select: { registrations: true, teams: true, submissions: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
