import { Anime } from "@/types/api/anime";

export async function fetchInfoOnly(id: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/anime/infoonly?id=" + id,
    {},
  );
  const json = await res.json();
  const data: Anime = json;
  return data;
}
