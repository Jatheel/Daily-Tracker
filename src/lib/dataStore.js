// Simple client-side data store using localStorage.
// This replaces Supabase for a no-backend mode.
// Data shape:
// {
//   updates: Array<{ id: string, title: string, notes?: string, created_at: string }>,
//   reminders: Array<{ id: string, title: string, description?: string, remind_at?: string|null, done: boolean, created_at: string }>
// }

const KEY = "daily-tracker:data";

function read() {
  if (typeof window === "undefined") return { updates: [], reminders: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { updates: [], reminders: [] };
    const parsed = JSON.parse(raw);
    return {
      updates: Array.isArray(parsed.updates) ? parsed.updates : [],
      reminders: Array.isArray(parsed.reminders) ? parsed.reminders : [],
    };
  } catch {
    return { updates: [], reminders: [] };
  }
}

function write(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Updates API
export function listUpdates() {
  const { updates } = read();
  return updates.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function createUpdate({ title, notes }) {
  const data = read();
  const item = { id: uid(), title, notes: notes || "", created_at: new Date().toISOString() };
  data.updates.push(item);
  write(data);
  return item;
}

export function getUpdate(id) {
  const { updates } = read();
  return updates.find((u) => u.id === id) || null;
}

export function updateUpdate(id, patch) {
  const data = read();
  const idx = data.updates.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  data.updates[idx] = { ...data.updates[idx], ...patch };
  write(data);
  return data.updates[idx];
}

export function deleteUpdate(id) {
  const data = read();
  data.updates = data.updates.filter((u) => u.id !== id);
  write(data);
}

// Reminders API
export function listReminders() {
  const { reminders } = read();
  return reminders.sort((a, b) => new Date(a.remind_at || 0) - new Date(b.remind_at || 0));
}

export function createReminder({ title, description, remind_at }) {
  const data = read();
  const item = {
    id: uid(),
    title,
    description: description || "",
    remind_at: remind_at || null,
    done: false,
    created_at: new Date().toISOString(),
  };
  data.reminders.push(item);
  write(data);
  return item;
}

export function getReminder(id) {
  const { reminders } = read();
  return reminders.find((r) => r.id === id) || null;
}

export function updateReminder(id, patch) {
  const data = read();
  const idx = data.reminders.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  data.reminders[idx] = { ...data.reminders[idx], ...patch };
  write(data);
  return data.reminders[idx];
}

export function deleteReminder(id) {
  const data = read();
  data.reminders = data.reminders.filter((r) => r.id !== id);
  write(data);
}

// Backup/Restore helpers
export function exportData() {
  // Return the full data object { updates, reminders }
  return read();
}

export function clearAll() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function importDataReplace(incoming) {
  // Replace existing data entirely with incoming object.
  const safe = {
    updates: Array.isArray(incoming?.updates) ? incoming.updates : [],
    reminders: Array.isArray(incoming?.reminders) ? incoming.reminders : [],
  };
  write(safe);
  return safe;
}

export function importDataMerge(incoming) {
  // Merge incoming into existing by id (incoming wins on conflicts)
  const current = read();
  const incU = Array.isArray(incoming?.updates) ? incoming.updates : [];
  const incR = Array.isArray(incoming?.reminders) ? incoming.reminders : [];

  const uById = new Map(current.updates.map((u) => [u.id, u]));
  for (const u of incU) uById.set(u.id, { ...(uById.get(u.id) || {}), ...u });
  const rById = new Map(current.reminders.map((r) => [r.id, r]));
  for (const r of incR) rById.set(r.id, { ...(rById.get(r.id) || {}), ...r });

  const merged = { updates: Array.from(uById.values()), reminders: Array.from(rById.values()) };
  write(merged);
  return merged;
}
