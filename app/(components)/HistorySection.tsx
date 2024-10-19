"use client";

import { db } from "@/lib/db";
import { fetchInfoOnly } from "@/lib/query/fetchInfoOnly";
import { useLiveQuery } from "dexie-react-hooks";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { HistoryCard } from "./HistoryCard";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

type Props = HTMLAttributes<HTMLElement> & {};

export function HistorySection({ className, ...props }: Props) {
  const liveHistory = useLiveQuery(async () => {
    const data = (await db.history.toArray())
      .filter((h) => !h.deleted)
      .sort((a, b) => b.timestamp.getUTCDate() - a.timestamp.getUTCDate());
    const promises = data.map((h) => fetchInfoOnly(h.animeID));
    const _animes = await Promise.all(promises);
    return _animes.map((anime) => {
      const history = data.find((h) => h.animeID === anime.id)!;
      return {
        anime,
        history,
      };
    });
  });

  return (
    liveHistory &&
    liveHistory.length > 0 && (
      <>
        <SectionHeading title="History" />
        <Section
          className={twMerge("flex-nowrap justify-start", className)}
          {...props}
        >
          {liveHistory.map(({ anime, history }) => {
            return (
              <HistoryCard anime={anime} key={anime.id} history={history} />
            );
          })}
        </Section>
      </>
    )
  );
}
