import { useRouter } from "next/router";
import { useState } from "react";
import { createUpdate } from "../../src/lib/dataStore";

export default function NewUpdate() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    setSaving(true);
    createUpdate({ title, notes });
    setSaving(false);
    router.push("/updates");
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Add Update</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What did you do?" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes (optional)</label>
          <textarea className="input" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any details…" />
        </div>
        <button className="btn btn-primary w-full" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
      </form>
    </div>
  );
}
