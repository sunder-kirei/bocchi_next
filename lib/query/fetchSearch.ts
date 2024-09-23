import { Search } from "@/types/api/search";

export async function fetchSearch(query: string, page: number = 1) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/anime/search?q=${query}&page=${page}`
  );
  const json = await res.json();
  const data: Search = json;
  return data;
}
