import { AnimeProvider } from "@/lib/api/animeProvider";
import { InternalServerError } from "@/lib/api/errors";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await AnimeProvider.fetchAnimeList();
    return NextResponse.json(data);
  } catch (err) {
    return InternalServerError(err);
  }
}
