export async function fetchPopular() {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/anime/popular",
      {
        cache: "no-store",
      },
    );
    const json = await res.json();
    const data = json.results;
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
