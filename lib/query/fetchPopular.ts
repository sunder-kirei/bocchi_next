import { Anime } from "@/types/api/anime";
import { MetaProvider } from "../api/metaProvider";

export async function fetchPopular() {
  const json = await MetaProvider.fetchPopularAnime();
  const data: Anime[] = json.results as unknown as Anime[];
  return data;
}
