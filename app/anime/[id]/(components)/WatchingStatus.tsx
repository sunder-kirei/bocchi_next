"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { db, WatchHistory } from "@/lib/db";
import { AnimeInfo } from "@/types/api/info";
import { AnchorHTMLAttributes, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  anime: AnimeInfo;
}

export function WatchingStatus({ className, style, anime, ...props }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<WatchHistory | undefined>(undefined);
  const url =
    anime.episodes && anime.episodes.length > 0
      ? history
        ? `/anime/${history.animeID}/watch/${history.episodeID}`
        : `/anime/${anime.id}/watch/${anime.episodes[0]?.id}`
      : undefined;

  useEffect(() => {
    const getHistory = async () => {
      const history = await db.history.get(anime.id);
      return history;
    };

    setIsLoading(true);
    getHistory()
      .then((history) => setHistory(history))
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [anime.id]);

  return isLoading ? (
    <Skeleton className="mt-8 h-12 w-full" />
  ) : (
    <a
      href={url}
      className={twMerge(
        "mt-8 flex w-full items-center justify-center gap-x-2 rounded-md px-4 py-2 text-center text-xl text-white",
        !url && "cursor-not-allowed",
        className,
      )}
      style={{
        backgroundColor: url
          ? (anime.color ?? "hsl( 334 65.3% 80.8%)")
          : "grey",
        ...style,
      }}
      {...props}
    >
      {history ? `Continue Episode ${history.episode}` : "Start Watching"}
    </a>
  );
}
