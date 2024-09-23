"use client";

import "./recents.css";

import { Recent } from "@/types/api/recent";
import AutoPlay from "embla-carousel-autoplay";
import useEmbla from "embla-carousel-react";
import { HTMLAttributes, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { DotButton, useDotButton } from "./DotButtons";

interface Props extends HTMLAttributes<HTMLElement> {
  recents: Recent[];
}

export function RecentsCarousel({ className, recents, ...props }: Props) {
  const [emblaRef, emblaApi] = useEmbla({ loop: true }, [
    AutoPlay({ playOnInit: true, delay: 3000 }),
  ]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const [isSM, setIsSM] = useState(false);

  useEffect(() => {
    function update() {
      if (window.innerWidth >= 768) setIsSM(false);
      else setIsSM(true);
    }

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      className={twMerge("mx-auto aspect-[9/14] w-full sm:h-96", className)}
      {...props}
    >
      <div
        className={twMerge("overflow-hidden w-full h-full flex flex-col")}
        ref={emblaRef}
      >
        <div className="flex touch-pan-y touch-pinch-zoom h-full w-full gap-x-8">
          {recents.map((anime, index) => (
            <a
              href={`/anime/${anime.id}/watch/${anime.episodeId}`}
              key={index}
              className="basis-full grow-0 shrink-0 rounded-sm p-2 w-full"
            >
              <div
                className={twMerge(
                  "h-full bg-cover bg-center rounded-sm overflow-hidden flex items-end ring w-full"
                )}
                style={
                  {
                    backgroundImage: isSM
                      ? `url(${anime.image})`
                      : `url(${anime.cover})`,
                    "--tw-ring-color": anime.color,
                  } as React.CSSProperties
                }
              >
                <div className="w-full h-20 text-white bg-black/10 p-4 flex items-center justify-end gap-x-1 overflow-hidden">
                  <div
                    className="overflow-ellipsis py-2 px-4 rounded-full text-nowrap overflow-hidden"
                    style={{
                      backgroundColor: anime.color,
                    }}
                  >
                    {anime.title.english}
                  </div>
                  <span
                    className="p-2 rounded-sm"
                    style={{
                      backgroundColor: anime.color,
                    }}
                  >
                    {anime.type}
                  </span>
                  <span
                    className="p-2 rounded-sm"
                    style={{
                      backgroundColor: anime.color,
                    }}
                  >
                    {anime.episodeNumber}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="h-4 w-full flex gap-x-2 justify-center my-2 sm:justify-end">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={twMerge(
                "h-full aspect-square rounded-full transition-all duration-300 border-primary border",
                selectedIndex === index && "bg-primary aspect-[32/9]"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
