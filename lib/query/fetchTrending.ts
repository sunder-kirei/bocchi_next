import { Anime } from "@/types/api/anime";

export async function fetchTrending() {
  const res = await fetch(process.env.API_URL + "/anime/trending");
  const json = await res.json();
  const data: Anime[] = json.results;
  return data;
}
