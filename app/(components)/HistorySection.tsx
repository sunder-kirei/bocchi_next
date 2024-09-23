"use client";

import { db, WatchHistory } from "@/lib/db";
import { Anime } from "@/types/api/anime";
import { HTMLAttributes, useEffect, useState } from "react";
import { AnimeCard } from "./AnimeCard";
import { Section } from "./Section";
import { twMerge } from "tailwind-merge";
import { fetchInfoOnly } from "@/lib/query/fetchInfoOnly";
import { SectionHeading } from "./SectionHeading";

interface Props extends HTMLAttributes<HTMLElement> {}

export function HistorySection({ className, ...props }: Props) {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [histories, setHistories] = useState<WatchHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getHistory() {
      const data = await db.history.toArray();
      return data;
    }
    setIsLoading(true);
    getHistory()
      .then((data) => {
        setHistories(data);
        const promises = data.map((h) => fetchInfoOnly(h.animeID));
        Promise.all(promises)
          .then((a) => setAnimes(a))
          .catch((err) => console.error(err))
          .finally(() => setIsLoading(false));
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    !isLoading &&
    animes.length > 0 && (
      <>
        <SectionHeading title="History" />
        <Section className={twMerge("", className)} {...props}>
          {animes.map((anime) => {
            const history = histories.find((h) => h.animeID === anime.id);
            const href = history
              ? `/anime/${anime.id}/watch/${history.episodeID}`
              : undefined;
            return <AnimeCard anime={anime} key={anime.id} href={href} />;
          })}
        </Section>
      </>
    )
  );
}
