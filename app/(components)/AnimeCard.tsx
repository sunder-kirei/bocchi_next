import { Anime } from "@/types/api/anime";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  anime: Anime;
  href?: string;
}

export function AnimeCard({ className, style, anime, href, ...props }: Props) {
  return (
    <a
      href={href || `/anime/${anime.id}`}
      className={twMerge(
        "shrink-0 grow-0 basis-36 overflow-hidden rounded-md shadow shadow-primary sm:basis-52",
        className,
      )}
      key={anime.id}
      style={
        {
          "--tw-shadow-color": anime.color,
          "--tw-ring-color": anime.color,
          color: anime.color,
          "--tw-shadow": "var(--tw-shadow-colored)",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        className="aspect-[3/4] w-full bg-cover"
        style={{
          backgroundImage: `url(${anime.image})`,
        }}
      ></div>
      <div className="flex w-full flex-col items-center gap-y-1 p-4">
        <div className="flex w-full items-center justify-between">
          <span className="line-clamp-2 sm:line-clamp-1">
            {anime.title.english}
          </span>
          <span
            className="hidden rounded px-2 py-1 text-white sm:inline"
            style={{
              backgroundColor: anime.color,
            }}
          >
            {anime.type}
          </span>
        </div>
        <div className="hidden w-full flex-wrap items-center gap-2 text-xs sm:flex">
          {anime.genres.slice(0, 2).map((genre) => (
            <div
              className="rounded bg-primary px-2 py-1 text-white"
              key={genre}
            >
              {genre}
            </div>
          ))}
        </div>
      </div>
    </a>
  );
}
