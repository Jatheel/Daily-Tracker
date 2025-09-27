import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { listUpdates, listReminders } from "../src/lib/dataStore";

export default function Home() {
  const [updates, setUpdates] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const allUpdates = listUpdates();
    const todays = allUpdates.filter((u) => {
      const t = new Date(u.created_at).getTime();
      return t >= todayStart.getTime() && t <= todayEnd.getTime();
    });
    setUpdates(todays);

    const rs = listReminders();
    setReminders(rs);
    setLoading(false);
  }, []);

  const nowIso = useMemo(() => new Date().toISOString(), []);

  return (
    <div className="p-4 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Daily Tracker</h1>
        <p className="text-sm text-gray-600">Today’s updates and upcoming reminders (stored locally on this device)</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">Today’s Updates</h2>
            <Link className="btn btn-secondary" href="/updates">View all</Link>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : updates.length === 0 ? (
            <p className="text-sm text-gray-500">No updates yet today.</p>
          ) : (
            <ul className="divide-y">
              {updates.map((u) => (
                <li key={u.id} className="py-3">
                  <p className="font-medium">{u.title}</p>
                  {u.notes && <p className="text-sm text-gray-600 mt-1">{u.notes}</p>}
                  <p className="text-xs text-gray-400 mt-1">{new Date(u.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4">
            <Link className="btn btn-primary w-full" href="/updates/new">Add Update</Link>
          </div>
        </section>

        <section className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">Upcoming Reminders</h2>
            <Link className="btn btn-secondary" href="/reminders">View all</Link>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : reminders.length === 0 ? (
            <p className="text-sm text-gray-500">No reminders.</p>
          ) : (
            <ul className="divide-y">
              {reminders.map((r) => {
                const due = r.remind_at && r.remind_at <= nowIso && !r.done;
                return (
                  <li key={r.id} className={`py-3 ${due ? "bg-yellow-50" : ""}`}>
                    <p className="font-medium">{r.title}</p>
                    {r.description && <p className="text-sm text-gray-600 mt-1">{r.description}</p>}
                    <p className="text-xs text-gray-400 mt-1">
                      Remind at: {r.remind_at ? new Date(r.remind_at).toLocaleString() : "-"}
                    </p>
                    {due && (
                      <p className="text-xs font-semibold text-yellow-700 mt-1">Due now</p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          <div className="mt-4">
            <Link className="btn btn-primary w-full" href="/reminders/new">Add Reminder</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
