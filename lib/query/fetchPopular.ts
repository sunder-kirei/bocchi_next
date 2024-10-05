import { Anime } from "@/types/api/anime";

export async function fetchPopular() {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/anime/popular",
      {}
    );
    const json = await res.json();
    const data: Anime[] = json.results as unknown as Anime[];
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
