import { Recent } from "@/types/api/recent";
import { MetaProvider } from "../api/metaProvider";
import { IAnimeInfo } from "@consumet/extensions";

export async function fetchRecent() {
  const raw = await MetaProvider.fetchRecentEpisodes("gogoanime", 1, 10);
  const promises: Promise<IAnimeInfo>[] = [];
  raw.results.forEach((anime) => {
    promises.push(MetaProvider.fetchAnilistInfoById(anime.id));
  });
  const info = await Promise.all(promises);

  const data = raw.results.map((gogo) => {
    const found = info.find((i) => i.id === gogo.id);
    return {
      ...gogo,
      image: found?.image,
      cover: found?.cover,
      color: found?.color,
    };
  }) as Recent[];

  return data;
}
