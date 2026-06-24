import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getDb(): SupabaseClient | null {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  _client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-app": "samgal-landing" } },
  });
  return _client;
}

export type EventName =
  | "pageview"
  | "scroll_50"
  | "scroll_90"
  | "engaged"
  | "phone_click"
  | "wa_click"
  | "form_focus"
  | "form_submit"
  | "lead_success";

export type Lead = {
  id?: number;
  created_at?: string;
  name: string;
  city: string;
  phone: string;
  source: string;
};

export type AdminStats = {
  events_by_day: Array<{ event: string; day: string; count: number }>;
  sessions_by_day: Array<{ day: string; count: number }>;
  recent_leads: Lead[];
};

export function dayKey(d: Date, tz = "Asia/Jerusalem"): string {
  // Returns YYYY-MM-DD in the given timezone
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(d);
}

export function lastNDays(n: number): string[] {
  const out: string[] = [];
  const now = Date.now();
  for (let i = 0; i < n; i++) {
    out.push(dayKey(new Date(now - i * 86_400_000)));
  }
  return out;
}
