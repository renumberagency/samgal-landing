"use client";

import { useEffect } from "react";

const SESSION_KEY = "samgal_sid";
const FIRED_KEY = "samgal_fired";

function getSessionId(): string {
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return "";
  }
}

function alreadyFired(event: string): boolean {
  try {
    const raw = sessionStorage.getItem(FIRED_KEY);
    const fired: string[] = raw ? JSON.parse(raw) : [];
    return fired.includes(event);
  } catch {
    return false;
  }
}

function markFired(event: string) {
  try {
    const raw = sessionStorage.getItem(FIRED_KEY);
    const fired: string[] = raw ? JSON.parse(raw) : [];
    if (!fired.includes(event)) {
      fired.push(event);
      sessionStorage.setItem(FIRED_KEY, JSON.stringify(fired));
    }
  } catch {}
}

export function track(event: string, options: { dedupe?: boolean } = {}) {
  if (typeof window === "undefined") return;
  if (options.dedupe && alreadyFired(event)) return;
  if (options.dedupe) markFired(event);

  const sessionId = getSessionId();
  const body = JSON.stringify({ event, sessionId });
  const url = "/api/track";

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon(url, blob);
  } else {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }
}

export default function Tracker() {
  useEffect(() => {
    track("pageview");

    const engagedTimer = window.setTimeout(() => {
      track("engaged", { dedupe: true });
    }, 30_000);

    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      if (pct >= 50) track("scroll_50", { dedupe: true });
      if (pct >= 90) track("scroll_90", { dedupe: true });
    }

    let ticking = false;
    function onScrollThrottled() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScrollThrottled, { passive: true });

    return () => {
      window.clearTimeout(engagedTimer);
      window.removeEventListener("scroll", onScrollThrottled);
    };
  }, []);

  return null;
}
