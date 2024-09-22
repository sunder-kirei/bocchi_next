import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { Anime } from "@/types/api/anime";
import { AnimeInfo } from "@/types/api/info";
import { format } from "date-fns";
import ImageWithFallback from "@/components/ImageWithFallback";

interface Props extends HTMLAttributes<HTMLElement> {
  anime: AnimeInfo;
}

export function Banner({ className, anime, ...props }: Props) {
  return (
    <div
      className={twMerge(
        "w-full h-72 relative flex items-end justify-end p-2 gap-2 bg-black/30",
        className
      )}
    >
      <div className="absolute -z-10 w-full h-full top-0 left-0">
        <ImageWithFallback
          src={anime.cover}
          alt="cover"
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div
        style={{
          backgroundColor: anime.color,
        }}
        className="text-white px-4 py-2 w-fit rounded"
      >
        {anime.rating / 10}
      </div>
      {anime.isAdult && (
        <div className="text-white px-4 py-2 w-fit rounded bg-red-600">
          NSFW
        </div>
      )}
      {anime.nextAiringEpisode && (
        <div
          className="flex items-center absolute top-2 right-2 gap-x-2 px-4 py-2 rounded text-white"
          style={{
            backgroundColor: anime.color,
          }}
        >
          <div className="size-2 bg-red-500 rounded-full animate-pulse"></div>
          <span>
            {format(
              new Date(anime.nextAiringEpisode.airingTime * 1000),
              "dd MMM, yyyy hh:mm a"
            )}
          </span>
        </div>
      )}
    </div>
  );
}
