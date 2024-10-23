export async function fetchRecent() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/anime/recent", {
      cache: "no-store",
    });
    const json = await res.json();
    return json.results;
  } catch (err) {
    console.error(err);
    return [];
  }
}
