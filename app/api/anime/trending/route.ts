import { InternalServerError } from "@/lib/api/errors";
import { MetaProvider } from "@/lib/api/metaProvider";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const page = Number(req.nextUrl.searchParams.get("page") ?? "1");
    const data = await MetaProvider.fetchTrendingAnime(page);
    return NextResponse.json(data);
  } catch (err) {
    return InternalServerError(err);
  }
}
