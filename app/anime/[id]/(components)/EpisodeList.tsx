"use client";

import { SectionHeading } from "@/app/(components)/SectionHeading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimeInfo } from "@/types/api/info";
import Image from "next/image";
import { HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  anime: AnimeInfo;
  current?: number;
}

export function EpisodeList({
  className,
  anime,
  current = 0,
  ...props
}: Props) {
  // page : [0, _]
  const [page, setPage] = useState(
    Math.max(Math.floor((current - 1) / 100), 0),
  );
  const pages = Math.ceil(anime.totalEpisodes / 100);

  return (
    <>
      <SectionHeading
        title="Episodes"
        className={twMerge("mb-2 mt-4 w-full", className)}
        {...props}
      >
        {anime.totalEpisodes > 100 && (
          <Select
            value={page.toString()}
            onValueChange={(val) => setPage(Number(val))}
          >
            <SelectTrigger className="ml-auto w-fit">
              <SelectValue placeholder="Select episodes" />
            </SelectTrigger>
            <SelectContent className="z-100">
              {Array.from({ length: pages }, (_, idx) => {
                return (
                  <SelectItem value={idx.toString()} key={idx}>
                    {idx * 100 + 1} - {(idx + 1) * 100}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      </SectionHeading>
      <div className="episode-grid">
        {anime.episodes
          .slice(page * 100, (page + 1) * 100)
          .reverse()
          .map((episode) => (
            <a
              key={episode.id}
              href={`/anime/${anime.id}/watch/${episode.id}`}
              className={twMerge(
                "flex h-20 w-full overflow-hidden rounded border",
                current === episode.number && "ring ring-primary",
              )}
              style={
                current === episode.number
                  ? ({
                      "--tw-shadow-color": anime.color,
                      "--tw-shadow": "var(--tw-shadow-colored)",
                    } as React.CSSProperties)
                  : {}
              }
            >
              <div className="relative aspect-[3/4] h-full">
                <Image
                  src={episode.image}
                  alt="episode"
                  fill={true}
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-2 text-xl">Episode {episode.number}</div>
            </a>
          ))}
      </div>
    </>
  );
}
