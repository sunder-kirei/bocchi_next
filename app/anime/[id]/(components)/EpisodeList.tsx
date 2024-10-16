/* eslint-disable @next/next/no-img-element */
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
import { Search } from "lucide-react";
import { HTMLAttributes, useEffect, useState } from "react";
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
  const [search, setSearch] = useState<string>("");
  const [episodes, setEpisodes] = useState(anime.episodes.reverse());

  const pages = Math.ceil(anime.totalEpisodes / 100);

  useEffect(() => {
    if (search == "") {
      setEpisodes(anime.episodes.slice(page * 100, (page + 1) * 100).reverse());
    } else {
      const foundEpisode = anime.episodes.find((e) => e.number === +search);
      setEpisodes(foundEpisode ? [foundEpisode] : []);
    }
  }, [search, page, anime.episodes]);

  return (
    <>
      <SectionHeading
        title="Episodes"
        className={twMerge("my-4 w-full justify-between gap-x-4", className)}
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
        <div className="flex items-center justify-center gap-x-2">
          <label htmlFor="episode_search">
            <Search className="size-4" />
          </label>
          <input
            className="w-20 bg-transparent outline-none"
            id="episode_search"
            title="episode search"
            placeholder="Search..."
            value={search?.toString()}
            onChange={(e) => {
              const val = e.target.value;
              if (val == "" || /[0-9]/.test(val)) {
                setSearch(e.target.value);
              }
            }}
          />
        </div>
      </SectionHeading>
      <div className="episode-grid">
        {episodes.map((episode) => (
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
              <img
                src={episode.image}
                alt="episode"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="px-4 py-2 text-xl">Episode {episode.number}</div>
          </a>
        ))}
      </div>
    </>
  );
}
