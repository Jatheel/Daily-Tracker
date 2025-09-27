import { useRouter } from "next/router";
import { useState } from "react";
import { createReminder } from "../../src/lib/dataStore";

export default function NewReminder() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [remindAt, setRemindAt] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    setSaving(true);
    const remind_at = remindAt ? new Date(remindAt).toISOString() : null;
    createReminder({ title, description, remind_at });
    setSaving(false);
    router.push("/reminders");
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Add Reminder</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What to remember?" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea className="input" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional details" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Remind at</label>
          <input className="input" type="datetime-local" value={remindAt} onChange={(e) => setRemindAt(e.target.value)} />
        </div>
        <button className="btn btn-primary w-full" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
      </form>
    </div>
  );
}
