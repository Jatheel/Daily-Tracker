import { useRef, useState } from "react";
import { exportData, importDataReplace, importDataMerge, clearAll } from "../src/lib/dataStore";

export default function BackupPage() {
  const fileRef = useRef(null);
  const [status, setStatus] = useState("");

  function download(filename, text) {
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function onExport() {
    const data = exportData();
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    download(`daily-tracker-backup-${stamp}.json`, JSON.stringify(data, null, 2));
    setStatus("Exported current data as JSON file.");
  }

  async function handleImport(mode) {
    const file = fileRef.current?.files?.[0];
    if (!file) return setStatus("Choose a .json file first.");
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      if (mode === "replace") importDataReplace(json);
      else importDataMerge(json);
      setStatus(`Import ${mode} successful.`);
    } catch (e) {
      console.error(e);
      setStatus("Import failed: invalid JSON or error parsing file.");
    }
  }

  function onClear() {
    if (!confirm("This will delete all local data. Continue?")) return;
    clearAll();
    setStatus("All local data cleared.");
  }

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Backup & Restore</h1>
      <p className="text-sm text-gray-700">Export your data to a JSON file, or import it on another device/browser.</p>

      <section className="card p-4 space-y-3">
        <h2 className="font-medium">Export</h2>
        <button className="btn btn-primary" onClick={onExport}>Download JSON Backup</button>
      </section>

      <section className="card p-4 space-y-3">
        <h2 className="font-medium">Import</h2>
        <input ref={fileRef} type="file" accept="application/json" className="block" />
        <div className="flex gap-2 flex-wrap">
          <button className="btn btn-secondary" onClick={() => handleImport("merge")}>
            Import (Merge)
          </button>
          <button className="btn btn-secondary" onClick={() => handleImport("replace")}>
            Import (Replace All)
          </button>
        </div>
        <p className="text-xs text-gray-500">Merge keeps existing items and updates or adds imported ones (by id). Replace overwrites everything.</p>
      </section>

      <section className="card p-4 space-y-3">
        <h2 className="font-medium">Danger Zone</h2>
        <button className="btn btn-secondary" onClick={onClear}>Clear All Local Data</button>
      </section>

      {status && <p className="text-sm text-gray-700">{status}</p>}
    </div>
  );
}
