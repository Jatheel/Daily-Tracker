import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUpdate, updateUpdate } from "../../src/lib/dataStore";

export default function EditUpdate() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const data = getUpdate(id);
    if (data) {
      setTitle(data.title || "");
      setNotes(data.notes || "");
    }
    setLoading(false);
  }, [id]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    setSaving(true);
    updateUpdate(id, { title, notes });
    setSaving(false);
    router.push("/updates");
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Edit Update</h1>
      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea className="input" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <button className="btn btn-primary w-full" disabled={saving}>{saving ? "Saving…" : "Save Changes"}</button>
        </form>
      )}
    </div>
  );
}
