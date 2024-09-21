import { InternalServerError } from "@/lib/api/errors";
import { MetaProvider } from "@/lib/api/metaProvider";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      throw "id not found";
    }
    const data = await MetaProvider.fetchAnimeInfo(id);
    return NextResponse.json(data);
  } catch (err) {
    return InternalServerError(err);
  }
}
