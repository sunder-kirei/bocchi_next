import { Anime } from "@/types/api/anime";
import { MetaProvider } from "../api/metaProvider";

export async function fetchPopular() {
  try {
    const json = await MetaProvider.fetchPopularAnime();
    const data: Anime[] = json.results as unknown as Anime[];
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
