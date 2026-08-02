import { eventService } from '../services/event.service';

export interface ManagedEvent {
  id: string;
  title: string;
  imageLink: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  prizePool?: string;
  teamSize?: string;
  registrationLink: string;
  submissionLink: string;
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  liveStartTime: number | null; // epoch timestamp when Admin clicks "Start Event"
  isRegistrationEnabled: boolean;
  isSubmissionEnabled: boolean;
  winners: {
    firstPlace: string;
    secondPlace: string;
    thirdPlace: string;
  } | null;
  createdAt: string;
}

const STORAGE_KEY = 'ko_managed_events';

const INITIAL_MANAGED_EVENTS: ManagedEvent[] = [
  {
    id: 'evt-codestorm-2026',
    title: 'CodeStorm 2026',
    imageLink: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    description: '48 hours. One idea. Ship something people actually want to use. Compete for ₹1,50,000 prize pool with 2-4 members per team.',
    eventDate: '2026-09-15',
    startTime: '09:00',
    endTime: '18:00',
    durationHours: 24,
    prizePool: '₹1,50,000 pool',
    teamSize: '2 – 4 members',
    registrationLink: 'https://forms.google.com/your-registration-form',
    submissionLink: 'https://forms.google.com/your-submission-form',
    status: 'UPCOMING',
    liveStartTime: null,
    isRegistrationEnabled: true,
    isSubmissionEnabled: true,
    winners: null,
    createdAt: new Date().toISOString(),
  },
];

export const eventManagementStorage = {
  getEvents: (): ManagedEvent[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data === null) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MANAGED_EVENTS));
        return INITIAL_MANAGED_EVENTS;
      }
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        return [];
      }
      return parsed;
    } catch {
      return [];
    }
  },

  saveEvents: (events: ManagedEvent[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    window.dispatchEvent(new Event('ko_managed_events_updated'));
  },

  addEvent: (eventData: Omit<ManagedEvent, 'id' | 'status' | 'liveStartTime' | 'isRegistrationEnabled' | 'isSubmissionEnabled' | 'winners' | 'createdAt'>): ManagedEvent => {
    const events = eventManagementStorage.getEvents();
    const newEvent: ManagedEvent = {
      id: `evt-${Date.now()}`,
      ...eventData,
      status: 'UPCOMING',
      liveStartTime: null,
      isRegistrationEnabled: true,
      isSubmissionEnabled: false,
      winners: null,
      createdAt: new Date().toISOString(),
    };

    const updated = [newEvent, ...events];
    eventManagementStorage.saveEvents(updated);

    // Asynchronously create event in database if server API is available
    eventService.createEvent(newEvent).catch((err) => {
      console.warn('Backend DB sync (addEvent) fallback notice:', err?.message || err);
    });

    return newEvent;
  },

  updateEvent: (id: string, updates: Partial<ManagedEvent>): ManagedEvent[] => {
    const events = eventManagementStorage.getEvents();
    const updated = events.map((e) => (e.id === id ? { ...e, ...updates } : e));
    eventManagementStorage.saveEvents(updated);

    // Asynchronously update event in database if server API is available
    eventService.updateEvent(id, updates).catch((err) => {
      console.warn('Backend DB sync (updateEvent) fallback notice:', err?.message || err);
    });

    return updated;
  },

  startEvent: (id: string): ManagedEvent[] => {
    const events = eventManagementStorage.getEvents();
    const updated = events.map((e) =>
      e.id === id
        ? {
            ...e,
            status: 'LIVE' as const,
            liveStartTime: Date.now(),
          }
        : e
    );
    eventManagementStorage.saveEvents(updated);

    eventService.updateEvent(id, { status: 'LIVE', liveStartTime: Date.now() } as any).catch((err) => {
      console.warn('Backend DB sync (startEvent) fallback notice:', err?.message || err);
    });

    return updated;
  },

  toggleRegistrationLink: (id: string, enabled: boolean): ManagedEvent[] => {
    const events = eventManagementStorage.getEvents();
    const updated = events.map((e) => (e.id === id ? { ...e, isRegistrationEnabled: enabled } : e));
    eventManagementStorage.saveEvents(updated);

    eventService.updateEvent(id, { isRegistrationEnabled: enabled } as any).catch((err) => {
      console.warn('Backend DB sync (toggleRegistration) fallback notice:', err?.message || err);
    });

    return updated;
  },

  toggleSubmissionLink: (id: string, enabled: boolean): ManagedEvent[] => {
    const events = eventManagementStorage.getEvents();
    const updated = events.map((e) => (e.id === id ? { ...e, isSubmissionEnabled: enabled } : e));
    eventManagementStorage.saveEvents(updated);

    eventService.updateEvent(id, { isSubmissionEnabled: enabled } as any).catch((err) => {
      console.warn('Backend DB sync (toggleSubmission) fallback notice:', err?.message || err);
    });

    return updated;
  },

  completeEventAndDeclareWinners: (
    id: string,
    winners: { firstPlace: string; secondPlace: string; thirdPlace: string }
  ): ManagedEvent[] => {
    const events = eventManagementStorage.getEvents();
    const updated = events.map((e) =>
      e.id === id
        ? {
            ...e,
            status: 'COMPLETED' as const,
            isSubmissionEnabled: false,
            winners,
          }
        : e
    );
    eventManagementStorage.saveEvents(updated);

    eventService.updateEvent(id, { status: 'COMPLETED', isSubmissionEnabled: false, winners } as any).catch((err) => {
      console.warn('Backend DB sync (completeEvent) fallback notice:', err?.message || err);
    });

    return updated;
  },

  deleteEvent: (id: string): ManagedEvent[] => {
    const events = eventManagementStorage.getEvents();
    const updated = events.filter((e) => e.id !== id);
    eventManagementStorage.saveEvents(updated);

    // Asynchronously delete event from database if server API is available
    eventService.deleteEvent(id).catch((err) => {
      console.warn('Backend DB sync (deleteEvent) fallback notice:', err?.message || err);
    });

    return updated;
  },
};
