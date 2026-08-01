export interface TeamRegistrationRecord {
  id: string;
  eventId: string;
  eventName: string;
  teamName: string;
  teamIdCode: string;
  teamPassword?: string;
  role: 'LEADER' | 'MEMBER';
  fullName: string;
  email: string;
  phone: string;
  college: string;
  city: string;
  state: string;
  department: string;
  year: string;
  registeredAt: string;
  paymentStatus: 'PAID' | 'PENDING' | 'MANUAL_VERIFICATION';
  status: 'REGISTERED' | 'VERIFIED' | 'REJECTED';
}

const STORAGE_KEY = 'ko_event_registrations';

const INITIAL_CLEAN_REGISTRATIONS: TeamRegistrationRecord[] = [];

export const registrationStorage = {
  getRegistrations: (): TeamRegistrationRecord[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CLEAN_REGISTRATIONS));
        return INITIAL_CLEAN_REGISTRATIONS;
      }
      const list: TeamRegistrationRecord[] = JSON.parse(data);
      // Auto-sanitize on load strictly per event
      const seen = new Set<string>();
      const cleanList: TeamRegistrationRecord[] = [];
      for (const item of list) {
        const key = `${item.eventId}_${item.email.toLowerCase()}_${item.teamIdCode || item.teamName.toLowerCase()}`;
        if (!seen.has(key)) {
          seen.add(key);
          cleanList.push(item);
        }
      }
      return cleanList;
    } catch {
      return INITIAL_CLEAN_REGISTRATIONS;
    }
  },

  addRegistration: (record: TeamRegistrationRecord): TeamRegistrationRecord[] => {
    const list = registrationStorage.getRegistrations();
    // Match existing strictly per event (eventId MUST match)
    const existingIndex = list.findIndex(
      (r) =>
        r.eventId === record.eventId &&
        ((record.teamIdCode && r.teamIdCode === record.teamIdCode) ||
          r.email.toLowerCase() === record.email.toLowerCase())
    );

    let updatedList: TeamRegistrationRecord[];
    if (existingIndex !== -1) {
      // Modify existing record for THIS event in-place
      updatedList = [...list];
      updatedList[existingIndex] = {
        ...updatedList[existingIndex],
        ...record,
        id: updatedList[existingIndex].id,
      };
    } else {
      // Append new registration record (Preserves all previous event registrations!)
      updatedList = [record, ...list];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new Event('ko_registrations_updated'));
    return updatedList;
  },

  updateRegistration: (id: string, updatedFields: Partial<TeamRegistrationRecord>): TeamRegistrationRecord[] => {
    const list = registrationStorage.getRegistrations();
    const updatedList = list.map((r) => (r.id === id ? { ...r, ...updatedFields } : r));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new Event('ko_registrations_updated'));
    return updatedList;
  },

  deleteRegistration: (id: string): TeamRegistrationRecord[] => {
    const list = registrationStorage.getRegistrations();
    const updatedList = list.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new Event('ko_registrations_updated'));
    return updatedList;
  },

  purgeDuplicates: (): { list: TeamRegistrationRecord[]; removedCount: number } => {
    const list = registrationStorage.getRegistrations();
    const seen = new Set<string>();
    const cleanList: TeamRegistrationRecord[] = [];

    for (const item of list) {
      const key = `${item.eventId}_${item.email.toLowerCase()}_${item.teamIdCode || item.teamName.toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        cleanList.push(item);
      }
    }

    const removedCount = list.length - cleanList.length;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanList));
    window.dispatchEvent(new Event('ko_registrations_updated'));
    return { list: cleanList, removedCount };
  },
};
