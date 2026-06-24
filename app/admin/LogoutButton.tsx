"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="text-sm text-ink-500 hover:text-ink-950 px-3 py-1.5 rounded-lg
        hover:bg-canvas-soft transition"
    >
      יציאה ←
    </button>
  );
}
