import { Recent } from "@/types/api/recent";

export async function fetchRecent() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/anime/recent",
    {}
  );
  const json = await res.json();
  return json.results as Recent[];
}
