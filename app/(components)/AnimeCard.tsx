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
        "basis-36 sm:basis-52 grow-0 shrink-0 shadow shadow-primary rounded-md overflow-hidden",
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
      <div className="w-full p-4 flex flex-col items-center gap-y-1">
        <div className="w-full flex items-center justify-between ">
          <span className="line-clamp-2 sm:line-clamp-1">
            {anime.title.english}
          </span>
          <span
            className="text-white px-2 py-1 rounded hidden sm:inline"
            style={{
              backgroundColor: anime.color,
            }}
          >
            {anime.type}
          </span>
        </div>
        <div className="w-full flex-wrap items-center gap-2 text-xs hidden sm:flex">
          {anime.genres.slice(0, 2).map((genre) => (
            <div
              className="text-white px-2 py-1 rounded bg-primary"
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
