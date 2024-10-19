import Dexie, { EntityTable } from "dexie";

interface WatchHistory {
  duration: number;
  animeID: string;
  episodeID: string;
  episode: number;
  timestamp: Date;
  deleted?: boolean
}

const db = new Dexie("myDB") as Dexie & {
  history: EntityTable<WatchHistory, "animeID">;
};

db.version(1).stores({
  history: "&animeID, &episodeID, episode, duration",
});

db.version(2)
  .stores({
    history: "&animeID, &episodeID, episode, duration, timestamp",
  })
  .upgrade((t) => {
    const timestamp = new Date(0);
    return t
      .table("history")
      .toCollection()
      .modify((h) => {
        h.timestamp = timestamp;
      });
  });

db.version(3)
  .stores({
    history: "&animeID, &episodeID, episode, duration, timestamp, deleted",
  })
  .upgrade((t) => {
    return t
      .table("history")
      .toCollection()
      .modify((h) => {
        h.deleted = false;
      });
  });

export type { WatchHistory };
export { db };
