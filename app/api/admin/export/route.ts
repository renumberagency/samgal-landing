import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

function csvEscape(v: unknown): string {
  const s = String(v ?? "");
  if (/[",\n\r]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ ok: false, error: "db not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const source = searchParams.get("source");

  let query = db
    .from("samgal_leads")
    .select("created_at, name, city, phone, source, ip")
    .order("created_at", { ascending: false });

  if (from) query = query.gte("created_at", `${from}T00:00:00+03:00`);
  if (to) query = query.lte("created_at", `${to}T23:59:59+03:00`);
  if (source && source !== "all") query = query.eq("source", source);

  const { data, error } = await query;
  if (error) {
    console.error("[EXPORT]", error);
    return NextResponse.json({ ok: false, error: "query failed" }, { status: 500 });
  }

  const bom = "﻿";
  const header = ["תאריך", "שם", "עיר", "טלפון", "מקור", "IP"].map(csvEscape).join(",");
  const rows = (data ?? []).map((l) =>
    [
      formatDate(l.created_at as string),
      l.name,
      l.city,
      l.phone,
      l.source,
      l.ip ?? "",
    ].map(csvEscape).join(",")
  );
  const csv = bom + [header, ...rows].join("\n");

  const today = new Date().toISOString().slice(0, 10);
  const suffix = source && source !== "all" ? `-${source}` : "";
  const filename = `samgal-leads${suffix}-${today}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
