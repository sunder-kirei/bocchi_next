"use client";

import { SectionHeading } from "@/app/(components)/SectionHeading";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { AnimeInfo } from "@/types/api/info";
import Link from "next/link";
import { HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  anime: AnimeInfo;
}

export function EpisodeList({ className, anime, ...props }: Props) {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(anime.totalEpisodes / 100);

  return (
    <>
      <SectionHeading
        title="Episodes"
        className={twMerge("mt-4 mb-2 w-full", className)}
        {...props}
      >
        {anime.totalEpisodes > 100 && (
          <Select
            value={page.toString()}
            onValueChange={(val) => setPage(Number(val))}
          >
            <SelectTrigger className="w-fit ml-auto">
              <SelectValue placeholder="Select episodes" />
            </SelectTrigger>
            <SelectContent className="z-100 bg-white">
              {Array.from({ length: pages }, (_, idx) => {
                console.log({ _, idx });
                return (
                  <SelectItem value={idx.toString()} key={idx}>
                    {(pages - idx - 1) * 100 + 1} - {(pages - idx) * 100}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      </SectionHeading>
      <div className="episode-grid">
        {anime.episodes
          .slice((pages - page - 1) * 100, (pages - page) * 100)
          .reverse()
          .map((episode) => (
            <Link
              key={episode.id}
              href={`/watch/${episode.id}`}
              className="border flex h-20 w-full rounded overflow-hidden"
            >
              <img
                src={episode.image}
                alt="episode"
                className="h-full aspect-[3/4] object-cover"
              />
              <div className="px-4 py-2 text-xl">Episode {episode.number}</div>
            </Link>
          ))}
      </div>
    </>
  );
}
