import { Recent } from "@/types/api/recent";

export async function fetchRecent() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/anime/recent", {
      cache: "no-store",
    });
    const json = await res.json();
    return json.results as Recent[];
  } catch (err) {
    console.error(err);
    return [];
  }
}
