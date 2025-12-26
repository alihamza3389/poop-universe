export type GuestEntry = {
  mood: string;
  created_at: string;
};

const KEY = "guest_checkins";

export function getGuestEntries(): GuestEntry[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function addGuestEntry(mood: string) {
  const entries = getGuestEntries();
  entries.unshift({
    mood,
    created_at: new Date().toISOString(),
  });
  localStorage.setItem(KEY, JSON.stringify(entries));
}

export function getGuestStreak(): number {
  const entries = getGuestEntries();
  return entries.length;
}
