import { useState } from "react";
import { useRouter } from "next/router";
import { supabase, hasSupabase } from "../src/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    if (!email) return;
    if (!hasSupabase) return alert("Supabase not configured. See Setup page.");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } });
    setLoading(false);
    if (error) return alert(error.message);
    setSent(true);
  }

  async function signOut() {
    if (!hasSupabase) return router.push("/");
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>
      {!hasSupabase && (
        <p className="text-sm text-red-600 mb-3">Supabase not configured. Go to <a className="underline" href="/setup">Setup</a>.</p>
      )}
      <p className="text-sm text-gray-600 mb-4">Email sign-in link (no password). Check your inbox after submitting.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <button className="btn btn-primary w-full" disabled={loading}>{loading ? "Sending…" : "Send sign-in link"}</button>
      </form>
      {sent && <p className="text-sm text-green-700 mt-3">Check your email for the sign-in link.</p>}
      <hr className="my-6" />
      <button className="btn btn-secondary w-full" onClick={signOut}>Sign out</button>
    </div>
  );
}
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../src/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } });
    setLoading(false);
    if (error) return alert(error.message);
    setSent(true);
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>
      <p className="text-sm text-gray-600 mb-4">We use email sign-in links (no password). Check your inbox after submitting.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <button className="btn btn-primary w-full" disabled={loading}>{loading ? "Sending…" : "Send sign-in link"}</button>
      </form>
      {sent && <p className="text-sm text-green-700 mt-3">Check your email for the sign-in link.</p>}
      <hr className="my-6" />
      <button className="btn btn-secondary w-full" onClick={signOut}>Sign out</button>
    </div>
  );
}
