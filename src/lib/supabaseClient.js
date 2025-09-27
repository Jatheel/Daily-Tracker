// Creates a single supabase client for the entire app.
// Read keys from environment variables (set in .env.local for local dev, Vercel for prod).
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const hasSupabase = !!supabaseUrl && !!supabaseAnonKey;

if (!hasSupabase && typeof window !== "undefined") {
  // Warn only in the browser to reduce noise during build.
  console.warn("Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
}

export const supabase = hasSupabase
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
