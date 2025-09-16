import { BASE_URL } from "@/constants/api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const year = Number(searchParams.get("year"));
    const month = Number(searchParams.get("month"));
    if (!year || !month) {
      return NextResponse.json(
        { error: "year and month required" },
        { status: 400 }
      );
    }

    const key = process.env.NYT_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "NYT_API_KEY not configured" },
        { status: 500 }
      );
    }

    const upstream = `${BASE_URL}${year}/${month}.json?api-key=${encodeURIComponent(
      key
    )}`;
    const res = await fetch(upstream, { cache: "no-store" });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { error: `Upstream error ${res.status}`, details: text },
        { status: res.status }
      );
    }

    const json = await res.json();
    return NextResponse.json(json, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
