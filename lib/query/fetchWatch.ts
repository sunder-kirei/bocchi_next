import { Watch } from "@/types/api/watch";

export async function fetchWatch(id: string) {
  const res = await fetch(process.env.API_URL + "/anime/watch?id=" + id, {});
  const json = await res.json();
  const data: Watch = json;
  return data;
}
