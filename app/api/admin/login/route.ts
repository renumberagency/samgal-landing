import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, signAdminToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const expected = process.env.ADMIN_PASSWORD ?? "123456";
    if (password !== expected) {
      return NextResponse.json({ ok: false, error: "סיסמה שגויה" }, { status: 401 });
    }
    const token = await signAdminToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE.name, token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: ADMIN_COOKIE.maxAge,
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "שגיאה" }, { status: 500 });
  }
}
