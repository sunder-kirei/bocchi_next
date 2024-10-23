import { InternalServerError } from "@/lib/api/errors";
import { MetaProvider } from "@/lib/api/metaProvider";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const dub = req.nextUrl.searchParams.get("dub") === "true";
  try {
    if (!id) {
      throw "id not found";
    }
    const res = await MetaProvider.fetchAnimeInfo(id, dub);
    res.totalEpisodes = res.totalEpisodes || res.episodes?.length || 0;

    const data = {
      ...res,
      artwork: res.artwork?.slice(0, 20),
    };
    return NextResponse.json(data);
  } catch (err) {
    return InternalServerError(err);
  }
}
