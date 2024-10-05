export async function fetchTrending() {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/anime/trending",
      {}
    );
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
}
