import { Recent } from "@/types/api/recent";

export async function fetchRecent() {
  const res = await fetch(process.env.API_URL + "/anime/recent");
  const json = await res.json();
  const data: Recent[] = json.results;
  return data;
}
