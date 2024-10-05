import { InternalServerError } from "@/lib/api/errors";
import { MetaProvider } from "@/lib/api/metaProvider";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const page = req.nextUrl.searchParams.get("page") ?? "1";
  try {
    if (!id) {
      throw "id not found";
    }
    const data = await MetaProvider.fetchAnimeInfo(id);
    return NextResponse.json({
      hasNextPage: Number(page) * 50 < data.artwork.length,
      artwork: data.artwork.slice(
        Math.max(Number(page) - 1, 0) * 50,
        Number(page) * 50,
      ),
    });
  } catch (err) {
    return InternalServerError(err);
  }
}
