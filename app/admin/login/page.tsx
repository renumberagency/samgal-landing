import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 rounded-full bg-samgal text-white flex items-center justify-center text-2xl font-black mb-4">
            S
          </div>
          <h1 className="text-2xl font-black text-ink-950">לוח בקרה</h1>
          <p className="text-ink-500 text-sm mt-1">סמגל מטבחים</p>
        </div>

        <div className="bg-canvas-pure border border-ink-200 rounded-2xl p-6 sm:p-8 shadow-card">
          <LoginForm />
        </div>

        <p className="text-center text-ink-400 text-xs mt-6">
          גישה למורשים בלבד
        </p>
      </div>
    </main>
  );
}
