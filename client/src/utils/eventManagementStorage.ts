import { eventService } from '../services/event.service';
import { formatImageUrl } from './imageUtils';

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

export const GOOGLE_DRIVE_POSTER_LINK = 'https://drive.google.com/file/d/192gG8N1hrDuVLeR7ZE0HM4aFr1_swayh/view?usp=drive_link';

const INITIAL_MANAGED_EVENTS: ManagedEvent[] = [
  {
    id: 'evt-fullstack-ai-2026',
    title: 'FULL STACK WEB DEVELOPMENT USING AI',
    imageLink: formatImageUrl(GOOGLE_DRIVE_POSTER_LINK),
    description: "Kernel Overriders' Hackathon 2K26 is a 24-hour Full Stack Web Development Hackathon organized by Chennai Community. Participants will work in teams to solve a real-world problem statement by designing and developing a complete web application using modern technologies and AI tools. The hackathon encourages innovation, collaboration, rapid development, and problem-solving. Teams will build functional applications within 24 hours and submit a live deployment along with the source code for evaluation. Whether you are a beginner or an experienced developer, this event provides an excellent opportunity to showcase your technical skills, learn from peers, and compete for exciting prizes.",
    eventDate: '2026-08-15',
    startTime: '08:00',
    endTime: '08:00',
    durationHours: 24,
    prizePool: '1000',
    teamSize: 'solo or 2-4',
    registrationLink: 'https://forms.google.com/your-registration-form',
    submissionLink: 'https://forms.google.com/your-submission-form',
    status: 'UPCOMING',
    liveStartTime: null,
    isRegistrationEnabled: true,
    isSubmissionEnabled: false,
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
      let parsed = JSON.parse(data);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MANAGED_EVENTS));
        return INITIAL_MANAGED_EVENTS;
      }

      let updatedTarget = false;
      parsed = parsed.map((e: ManagedEvent) => {
        const formattedLink = formatImageUrl(e.imageLink);
        const isTarget =
          e.id === 'evt-codestorm-2026' ||
          e.id === 'evt-fullstack-ai-2026' ||
          e.title.toLowerCase().includes('full stack') ||
          e.title.toLowerCase().includes('codestorm');

        if (isTarget) {
          updatedTarget = true;
          return {
            ...e,
            title: 'FULL STACK WEB DEVELOPMENT USING AI',
            imageLink: formatImageUrl(GOOGLE_DRIVE_POSTER_LINK),
            description: e.description || INITIAL_MANAGED_EVENTS[0].description,
            eventDate: e.eventDate || '2026-08-15',
            startTime: e.startTime || '08:00',
            endTime: e.endTime || '08:00',
            durationHours: e.durationHours || 24,
            prizePool: e.prizePool || '1000',
            teamSize: e.teamSize || 'solo or 2-4',
          };
        }

        return {
          ...e,
          imageLink: formattedLink,
        };
      });

      if (!updatedTarget) {
        parsed.unshift(INITIAL_MANAGED_EVENTS[0]);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      return parsed;
    } catch {
      return INITIAL_MANAGED_EVENTS;
    }
  },

  saveEvents: (events: ManagedEvent[]): void => {
    const formatted = events.map((e) => ({
      ...e,
      imageLink: formatImageUrl(e.imageLink),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formatted));
    window.dispatchEvent(new Event('ko_managed_events_updated'));
  },

  addEvent: (eventData: Omit<ManagedEvent, 'id' | 'status' | 'liveStartTime' | 'isRegistrationEnabled' | 'isSubmissionEnabled' | 'winners' | 'createdAt'>): ManagedEvent => {
    const events = eventManagementStorage.getEvents();
    const newEvent: ManagedEvent = {
      id: `evt-${Date.now()}`,
      ...eventData,
      imageLink: formatImageUrl(eventData.imageLink),
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
    const formattedUpdates = {
      ...updates,
      ...(updates.imageLink ? { imageLink: formatImageUrl(updates.imageLink) } : {}),
    };
    const updated = events.map((e) => (e.id === id ? { ...e, ...formattedUpdates } : e));
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
