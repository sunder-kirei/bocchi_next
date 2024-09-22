import { InternalServerError } from "@/lib/api/errors";
import { MetaProvider } from "@/lib/api/metaProvider";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await MetaProvider.fetchRandomAnime();
    return NextResponse.json(data);
  } catch (err) {
    return InternalServerError(err);
  }
}
