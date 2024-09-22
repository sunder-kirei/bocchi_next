import { AnimeInfo } from "@/types/api/info";

export async function fetchInfo(id: string) {
  const res = await fetch(process.env.API_URL + "/anime/info?id=" + id);
  const json = await res.json();
  const data: AnimeInfo = json;
  return data;
}
