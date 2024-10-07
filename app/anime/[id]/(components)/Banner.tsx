import ImageWithFallback from "@/components/ImageWithFallback";
import { AnimeInfo } from "@/types/api/info";
import { format } from "date-fns";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  anime: AnimeInfo;
}

export function Banner({ className, anime, ...props }: Props) {
  return (
    <div
      className={twMerge(
        "relative flex h-72 w-full items-end justify-end gap-2 bg-black/30 p-2",
        className,
      )}
      {...props}
    >
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <ImageWithFallback
          src={anime.cover}
          alt="cover"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div
        style={{
          backgroundColor: anime.color,
        }}
        className="w-fit rounded px-4 py-2 text-white"
      >
        {anime.rating ? anime.rating / 10 : "Unrated"}
      </div>
      {anime.isAdult && (
        <div className="w-fit rounded bg-red-600 px-4 py-2 text-white">
          NSFW
        </div>
      )}
      {anime.nextAiringEpisode && (
        <div
          className="absolute right-2 top-2 flex items-center gap-x-2 rounded px-4 py-2 text-white"
          style={{
            backgroundColor: anime.color,
          }}
        >
          <div className="size-2 animate-pulse rounded-full bg-red-500"></div>
          <span>
            {format(
              new Date(anime.nextAiringEpisode.airingTime * 1000),
              "dd MMM, yyyy hh:mm a",
            )}
          </span>
        </div>
      )}
    </div>
  );
}
