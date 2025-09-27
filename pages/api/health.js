import { supabase, hasSupabase } from "../../src/lib/supabaseClient";

export default async function handler(req, res) {
  if (!hasSupabase) {
    return res.status(200).json({ ok: false, reason: "missing-env" });
  }
  try {
    // Simple no-op call: list tables via a harmless select with limit 0
    const { error } = await supabase.from("updates").select("id", { count: "exact", head: true }).limit(0);
    if (error) return res.status(200).json({ ok: false, reason: "db-error", message: error.message });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(200).json({ ok: false, reason: "exception", message: e.message });
  }
}
