import { AnimeInfo } from "@/types/api/info";

export async function fetchInfo(id: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/anime/infoonly?id=" + id,
    {
      cache: "no-store",
    },
  );
  const json = await res.json();
  const data: AnimeInfo = json;
  return data;
}
