import { Recent } from "@/types/api/recent";
import { MetaProvider } from "../api/metaProvider";

export async function fetchRecent() {
  const raw = await MetaProvider.fetchRecentEpisodes("gogoanime", 1, 5);
  console.dir({ raw });

  const data = [] as Recent[];

  for (const key in raw.results) {
    const gogo = raw.results[key];
    try {
      const info = await MetaProvider.fetchAnilistInfoById(gogo.id);
      data.push({
        ...gogo,
        image: info?.image || gogo.image || "",
        cover: info?.cover || gogo.cover || "",
        color: info?.color || gogo.color || "",
      } as Recent);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      data.push({ ...gogo } as Recent);
    }
  }
  console.dir({ data });
  return data;
}
