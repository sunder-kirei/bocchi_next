import { InternalServerError } from "@/lib/api/errors";
import { MetaProvider } from "@/lib/api/metaProvider";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");
  const page = Number(req.nextUrl.searchParams.get("page") ?? "1");
  try {
    if (!query) {
      throw "query not found";
    }
    const data = await MetaProvider.search(query, page);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return InternalServerError(err);
  }
}
