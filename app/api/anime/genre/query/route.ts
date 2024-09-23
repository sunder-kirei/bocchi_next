import { AnimeProvider } from "@/lib/api/animeProvider";
import { InternalServerError } from "@/lib/api/errors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get("page") ?? "1");
  const genre = req.nextUrl.searchParams.get("genre");
  try {
    if (!genre) {
      throw "genre not found";
    }
    const data = await AnimeProvider.fetchGenreInfo(genre, page);
    return NextResponse.json(data);
  } catch (err) {
    return InternalServerError(err);
  }
}
