import { Recent } from "@/types/api/recent";
import { MetaProvider } from "../api/metaProvider";

export async function fetchRecent() {
  const raw = await MetaProvider.fetchRecentEpisodes();
  return raw.results as Recent[];
}
