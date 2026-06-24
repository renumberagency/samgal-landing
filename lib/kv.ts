import { Redis } from "@upstash/redis";

let _kv: Redis | null = null;

export function getKv(): Redis | null {
  if (_kv) return _kv;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  _kv = Redis.fromEnv();
  return _kv;
}

export function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function dayKey(d: Date): string {
  return d.toISOString().split("T")[0];
}

export function lastNDays(n: number): string[] {
  const out: string[] = [];
  const now = Date.now();
  for (let i = 0; i < n; i++) {
    out.push(dayKey(new Date(now - i * 86_400_000)));
  }
  return out;
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
  name: string;
  city: string;
  phone: string;
  source: string;
  receivedAt: string;
};
