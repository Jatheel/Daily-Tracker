import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { getReminder, updateReminder } from "../../src/lib/dataStore";

export default function EditReminder() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [remindAt, setRemindAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
  if (!id) return;
    setLoading(true);
    const data = getReminder(id);
    if (data) {
      setTitle(data.title || "");
      setDescription(data.description || "");
      setRemindAt(data.remind_at ? new Date(data.remind_at).toISOString().slice(0, 16) : "");
    }
    setLoading(false);
  }, [id]);

  async function onSubmit(e) {
    e.preventDefault();
  if (!title.trim()) return alert("Title is required");
    setSaving(true);
    const payload = { title, description, remind_at: remindAt ? new Date(remindAt).toISOString() : null };
    updateReminder(id, payload);
    setSaving(false);
    router.push("/reminders");
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Edit Reminder</h1>
      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea className="input" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Remind at</label>
            <input className="input" type="datetime-local" value={remindAt} onChange={(e) => setRemindAt(e.target.value)} />
          </div>
          <button className="btn btn-primary w-full" disabled={saving}>{saving ? "Saving…" : "Save Changes"}</button>
        </form>
      )}
    </div>
  );
}
