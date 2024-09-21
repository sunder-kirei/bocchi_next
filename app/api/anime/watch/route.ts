import { AnimeProvider } from "@/lib/api/animeProvider";
import { InternalServerError } from "@/lib/api/errors";
import { StreamingServers } from "@consumet/extensions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      throw "id not found";
    }
    const data = await AnimeProvider.fetchEpisodeSources(id);
    return NextResponse.json(data);
  } catch (err) {
    return InternalServerError(err);
  }
}
