import { Anime } from "@/types/api/anime";
import { MetaProvider } from "../api/metaProvider";

export async function fetchTrending() {
  try {
    const data: Anime[] = (await MetaProvider.fetchTrendingAnime())
      .results as unknown as Anime[];
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
