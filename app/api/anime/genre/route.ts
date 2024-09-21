import { AnimeProvider } from "@/lib/api/animeProvider";
import { InternalServerError } from "@/lib/api/errors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await AnimeProvider.fetchGenreList();
    return NextResponse.json(data);
  } catch (err) {
    return InternalServerError(err);
  }
}
