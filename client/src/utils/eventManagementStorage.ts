export interface ManagedEvent {
  id: string;
  title: string;
  imageLink: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  registrationLink: string;
  submissionLink: string;
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  liveStartTime: number | null; // epoch timestamp when Admin clicks "Start Event"
  isSubmissionEnabled: boolean;
  winners: {
    firstPlace: string;
    secondPlace: string;
    thirdPlace: string;
  } | null;
  createdAt: string;
}

const STORAGE_KEY = 'ko_managed_events';

const INITIAL_MANAGED_EVENTS: ManagedEvent[] = [];

export const eventManagementStorage = {
  getEvents: (): ManagedEvent[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MANAGED_EVENTS));
        return INITIAL_MANAGED_EVENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_MANAGED_EVENTS;
    }
  },

  saveEvents: (events: ManagedEvent[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    window.dispatchEvent(new Event('ko_managed_events_updated'));
  },

  addEvent: (eventData: Omit<ManagedEvent, 'id' | 'status' | 'liveStartTime' | 'isSubmissionEnabled' | 'winners' | 'createdAt'>): ManagedEvent => {
    const events = eventManagementStorage.getEvents();
    const newEvent: ManagedEvent = {
      id: `evt-${Date.now()}`,
      ...eventData,
      status: 'UPCOMING',
      liveStartTime: null,
      isSubmissionEnabled: false,
      winners: null,
      createdAt: new Date().toISOString(),
    };

    const updated = [newEvent, ...events];
    eventManagementStorage.saveEvents(updated);
    return newEvent;
  },

  updateEvent: (id: string, updates: Partial<ManagedEvent>): ManagedEvent[] => {
    const events = eventManagementStorage.getEvents();
    const updated = events.map((e) => (e.id === id ? { ...e, ...updates } : e));
    eventManagementStorage.saveEvents(updated);
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
    return updated;
  },

  toggleSubmissionLink: (id: string, enabled: boolean): ManagedEvent[] => {
    const events = eventManagementStorage.getEvents();
    const updated = events.map((e) => (e.id === id ? { ...e, isSubmissionEnabled: enabled } : e));
    eventManagementStorage.saveEvents(updated);
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
    return updated;
  },

  deleteEvent: (id: string): ManagedEvent[] => {
    const events = eventManagementStorage.getEvents();
    const updated = events.filter((e) => e.id !== id);
    eventManagementStorage.saveEvents(updated);
    return updated;
  },
};
