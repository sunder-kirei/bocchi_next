export const maxDuration = 60;

import { InternalServerError } from "@/lib/api/errors";
import { MetaProvider } from "@/lib/api/metaProvider";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await MetaProvider.fetchRecentEpisodes("gogoanime", 1, 10);
    return NextResponse.json({ ...data, results: data.results });
  } catch (err) {
    return InternalServerError(err);
  }
}
