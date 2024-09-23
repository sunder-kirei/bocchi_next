import { InternalServerError } from "@/lib/api/errors";
import { MetaProvider } from "@/lib/api/metaProvider";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    if (!id) {
      throw "id not found";
    }
    const data = await MetaProvider.fetchAnilistInfoById(id);

    return NextResponse.json(data);
  } catch (err) {
    return InternalServerError(err);
  }
}
