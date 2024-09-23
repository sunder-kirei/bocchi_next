import { Anime } from "@/types/api/anime";
import { MetaProvider } from "../api/metaProvider";

export async function fetchTrending() {
  const data: Anime[] = (await MetaProvider.fetchTrendingAnime())
    .results as unknown as Anime[];
  return data;
}
