import Link from "next/link";

export default function SetupPage() {
  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Setup Supabase</h1>
      <p className="text-gray-700">Your Supabase environment variables are missing, so the app can’t connect yet.</p>
      <ol className="list-decimal pl-5 space-y-3 text-gray-800">
        <li>
          Copy <code>.env.local.example</code> to <code>.env.local</code> and paste your values from Supabase Settings → API:
          <pre className="bg-gray-50 p-3 rounded border mt-2 text-sm">NEXT_PUBLIC_SUPABASE_URL=...{"\n"}NEXT_PUBLIC_SUPABASE_ANON_KEY=...</pre>
        </li>
        <li>Restart the dev server after saving: stop it (Ctrl+C) then run <code>npm run dev</code> again.</li>
        <li>In Supabase → SQL Editor, run the SQL from <code>supabase.sql</code> in this project.</li>
      </ol>
      <div className="flex gap-2">
        <Link href="/" className="btn btn-primary">Back to Dashboard</Link>
        <a className="btn btn-secondary" href="https://app.supabase.com" target="_blank" rel="noreferrer">Open Supabase</a>
      </div>
    </div>
  );
}
