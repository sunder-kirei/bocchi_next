import { Artwork } from "@/types/api/info";

export async function fetchArtwork(id: string, page: number = 1) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/anime/artwork?id=${id}&page=${page}`,
  );
  const json = await res.json();
  const data: Artwork[] = json.artwork;
  return { data, hasNextPage: json.hasNextPage };
}
