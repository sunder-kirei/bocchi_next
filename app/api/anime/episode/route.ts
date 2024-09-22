import { InternalServerError } from "@/lib/api/errors";
import { MetaProvider } from "@/lib/api/metaProvider";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      throw "id not found";
    }
    const res = await MetaProvider.fetchAnimeInfo(id);
    const data = {
      ...res,
      artwork: res.artwork?.slice(0, 20),
    };
    return NextResponse.json(data);
  } catch (err) {
    return InternalServerError(err);
  }
}
