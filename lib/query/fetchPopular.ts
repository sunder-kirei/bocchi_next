import { Anime } from "@/types/api/anime";

export async function fetchPopular() {
  const res = await fetch(process.env.API_URL + "/anime/popular");
  const json = await res.json();
  const data: Anime[] = json.results;
  return data;
}
