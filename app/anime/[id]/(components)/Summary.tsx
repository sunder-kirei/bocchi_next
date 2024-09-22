import { AnimeInfo } from "@/types/api/info";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  anime: AnimeInfo;
}

export function Summary({ className, anime, style, ...props }: Props) {
  return (
    <div
      className={twMerge("py-4 px-6 w-full flex flex-col h-fit", className)}
      style={{
        color: anime.color,
        ...style,
      }}
      {...props}
    >
      <span className="text-lg line-clamp-2">{anime.title.english}</span>
      <div className="data flex flex-col gap-1 my-2">
        <div className="flex">
          <span className="w-full">Episodes:</span>
          <span className="w-full">
            {anime.currentEpisode} / {anime.totalEpisodes}
          </span>
        </div>
        <div className="flex">
          <span className="w-full">Season:</span>
          <span className="w-full">
            {anime.season} {anime.startDate.year}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 text-white">
        {anime.genres.slice(0, 2).map((genre) => (
          <div key={genre} className="px-4 py-2 bg-primary rounded-full w-fit">
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
}
