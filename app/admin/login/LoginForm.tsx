"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data?.error ?? "שגיאה");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("בעיית רשת");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input
        type="password"
        required
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="סיסמה"
        aria-label="סיסמת מנהל"
        className="w-full h-14 px-5 rounded-xl bg-canvas-pure border border-ink-200
          text-ink-950 placeholder-ink-400 text-base text-center font-mono tracking-widest
          focus:outline-none focus:border-samgal focus:ring-4 focus:ring-samgal/10 transition"
      />
      <button
        type="submit"
        disabled={loading}
        className="h-14 rounded-xl gradient-accent text-canvas font-bold text-lg
          disabled:opacity-60 disabled:cursor-not-allowed
          shadow-accent hover:shadow-accent-hover transition-shadow"
      >
        {loading ? "מתחבר..." : "התחבר"}
      </button>
      {error && (
        <p className="text-red-600 text-sm text-center" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
