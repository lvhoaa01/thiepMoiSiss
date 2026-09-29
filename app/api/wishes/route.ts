import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site.config";
import type { ApiResponse, Wish } from "@/types";

export const dynamic = "force-dynamic";

function getEndpoint(): string | null {
  const endpoint =
    process.env.APPS_SCRIPT_URL ??
    process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ??
    siteConfig.api.appsScriptUrl;

  if (!endpoint || endpoint.includes("REPLACE_WITH_YOUR_DEPLOYMENT_ID")) {
    return null;
  }

  return endpoint;
}

export async function GET() {
  const endpoint = getEndpoint();
  if (!endpoint) {
    return NextResponse.json<ApiResponse<Wish[]>>({ ok: true, data: [] });
  }

  try {
    const url = new URL(endpoint);
    url.searchParams.set("action", "wishes");

    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return NextResponse.json<ApiResponse<Wish[]>>(
        { ok: false, error: `upstream-http-${response.status}` },
        { status: 502 },
      );
    }

    const payload = (await response.json()) as ApiResponse<Wish[]>;
    if (!payload.ok) {
      return NextResponse.json<ApiResponse<Wish[]>>(payload, { status: 502 });
    }

    return NextResponse.json<ApiResponse<Wish[]>>({
      ok: true,
      data: Array.isArray(payload.data) ? payload.data : [],
    });
  } catch {
    return NextResponse.json<ApiResponse<Wish[]>>(
      { ok: false, error: "upstream-network" },
      { status: 502 },
    );
  }
}
