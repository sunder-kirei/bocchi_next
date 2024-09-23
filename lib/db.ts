import Dexie, { EntityTable } from "dexie";

interface WatchHistory {
  duration: number;
  animeID: string;
  episodeID: string;
  episode: number;
}

const db = new Dexie("myDB") as Dexie & {
  history: EntityTable<WatchHistory, "animeID">;
};

db.version(1).stores({
  history: "&animeID, &episodeID, episode, duration",
});

export type { WatchHistory };
export { db };
