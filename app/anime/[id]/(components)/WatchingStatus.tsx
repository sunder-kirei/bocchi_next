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
    <Skeleton className="w-full h-12 mt-8" />
  ) : (
    <a
      href={url}
      className={twMerge(
        "px-4 py-2 w-full rounded-md mt-8 text-xl text-white text-center flex gap-x-2 items-center justify-center",
        !url && "cursor-not-allowed",
        className
      )}
      style={{
        backgroundColor: url ? anime.color : "grey",
        ...style,
      }}
      {...props}
    >
      {history ? `Continue Episode ${history.episode}` : "Start Watching"}
    </a>
  );
}
