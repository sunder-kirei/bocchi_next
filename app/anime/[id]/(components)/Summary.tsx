import { AnimeInfo } from "@/types/api/info";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  anime: AnimeInfo;
}

export function Summary({ className, anime, style, ...props }: Props) {
  return (
    <div
      className={twMerge(
        "flex h-fit w-full flex-col px-2 py-2 sm:px-4 sm:py-6",
        className,
      )}
      style={{
        color: anime.color ?? "white",
        ...style,
      }}
      {...props}
    >
      <span className="line-clamp-2 text-base sm:text-lg">
        {anime.title.english || anime.title.romaji || anime.title.native}
      </span>
      <div className="data my-2 flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <span className="w-full">Episodes:</span>
          <span className="w-full text-sm sm:text-base">
            {anime.totalEpisodes && anime.totalEpisodes > 0
              ? `${anime.currentEpisode} / ${anime.totalEpisodes}`
              : "Not yet aired"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-full">Season:</span>
          <span className="w-full text-sm sm:text-base">
            {anime.startDate.year
              ? `${anime.season} ${anime.startDate.year}`
              : "Yet to be announced"}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 text-white">
        {anime.genres.slice(0, 2).map((genre) => (
          <div
            key={genre}
            className="w-fit rounded-full bg-primary px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
          >
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
}
