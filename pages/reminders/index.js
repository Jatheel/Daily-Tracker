import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { listReminders, updateReminder, deleteReminder } from "../../src/lib/dataStore";

export default function RemindersList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const nowIso = useMemo(() => new Date().toISOString(), []);

  async function load() {
    setLoading(true);
    setItems(listReminders());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleDone(id, done) {
    updateReminder(id, { done });
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, done } : r)));
  }

  async function onDelete(id) {
    if (!confirm("Delete this reminder?")) return;
    deleteReminder(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Reminders</h1>
        <Link className="btn btn-primary" href="/reminders/new">Add Reminder</Link>
      </div>
      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500">No reminders yet.</p>
      ) : (
        <ul className="divide-y">
          {items.map((r) => {
            const due = r.remind_at && r.remind_at <= nowIso && !r.done;
            return (
              <li key={r.id} className={`py-3 ${due ? "bg-yellow-50" : ""}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{r.title}</p>
                    {r.description && <p className="text-sm text-gray-600 mt-1">{r.description}</p>}
                    <p className="text-xs text-gray-400 mt-1">Remind at: {r.remind_at ? new Date(r.remind_at).toLocaleString() : "-"}</p>
                    {due && <p className="text-xs font-semibold text-yellow-700 mt-1">Due now</p>}
                  </div>
                  <div className="flex gap-2">
                    <label className="inline-flex items-center gap-2 text-xs">
                      <input type="checkbox" checked={!!r.done} onChange={(e) => toggleDone(r.id, e.target.checked)} /> Done
                    </label>
                    <Link className="btn btn-secondary text-xs" href={`/reminders/${r.id}`}>Edit</Link>
                    <button className="btn btn-secondary text-xs" onClick={() => onDelete(r.id)}>Delete</button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
