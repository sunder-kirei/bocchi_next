export const maxDuration = 60;

import { InternalServerError } from "@/lib/api/errors";
import { MetaProvider } from "@/lib/api/metaProvider";
import { IAnimeInfo } from "@consumet/extensions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await MetaProvider.fetchRecentEpisodes("gogoanime", 1, 10);
    const promises: Promise<IAnimeInfo>[] = [];
    data.results.forEach((anime) => {
      promises.push(MetaProvider.fetchAnimeInfo(anime.id));
    });
    const info = await Promise.all(promises);

    const result = data.results.map((gogo) => {
      const found = info.find((i) => i.id === gogo.id);
      return {
        ...gogo,
        image: found?.image,
        cover: found?.cover,
        color: found?.color,
      };
    });

    return NextResponse.json({ ...data, results: result });
  } catch (err) {
    return InternalServerError(err);
  }
}
