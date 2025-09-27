import Link from "next/link";
import { useEffect, useState } from "react";
import { listUpdates, deleteUpdate } from "../../src/lib/dataStore";

export default function UpdatesList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setItems(listUpdates());
    setLoading(false);
  }, []);

  async function onDelete(id) {
    if (!confirm("Delete this update?")) return;
    deleteUpdate(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">All Updates</h1>
        <Link className="btn btn-primary" href="/updates/new">Add Update</Link>
      </div>
      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500">No updates yet.</p>
      ) : (
        <ul className="divide-y">
          {items.map((u) => (
            <li key={u.id} className="py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{u.title}</p>
                  {u.notes && <p className="text-sm text-gray-600 mt-1">{u.notes}</p>}
                  <p className="text-xs text-gray-400 mt-1">{new Date(u.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Link className="btn btn-secondary text-xs" href={`/updates/${u.id}`}>Edit</Link>
                  <button onClick={() => onDelete(u.id)} className="btn btn-secondary text-xs">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
