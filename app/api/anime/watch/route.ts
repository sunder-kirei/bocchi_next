import { AnimeProvider } from "@/lib/api/animeProvider";
import { InternalServerError } from "@/lib/api/errors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    if (!id) {
      throw "id not found";
    }
    const data = await AnimeProvider.fetchEpisodeSources(id);
    return NextResponse.json(data);
  } catch (err) {
    return InternalServerError(err);
  }
}
