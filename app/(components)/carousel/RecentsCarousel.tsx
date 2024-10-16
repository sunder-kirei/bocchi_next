"use client";

import "./recents.css";

import { Button } from "@/components/ui/button";
import { Anime } from "@/types/api/anime";
import useEmbla from "embla-carousel-react";
import { ChevronLeft, ChevronRight, PlayIcon, Plus } from "lucide-react";
import React, {
  HTMLAttributes,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { useDotButton } from "./DotButtons";
import Link from "next/link";

interface Props extends HTMLAttributes<HTMLElement> {
  recents: Anime[];
}

export function RecentsCarousel({ className, recents, ...props }: Props) {
  const [emblaRef, emblaApi] = useEmbla({ loop: true });
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const ref = useRef<HTMLDivElement>(null);
  const [isSM, setIsSM] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown: MouseEventHandler = (e) => {
    const container = ref.current;

    if (container) {
      setIsDragging(true);
      setStartX(e.pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
    }
  };

  const handleMouseMove: MouseEventHandler = (e) => {
    if (!isDragging) return;

    e.preventDefault();
    const container = ref.current;
    if (container) {
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUpOrLeave: MouseEventHandler = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    function update() {
      if (window.innerWidth >= 640) setIsSM(false);
      else setIsSM(true);
    }

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    ref.current?.scrollTo({
      left: selectedIndex * 50,
      behavior: "smooth",
    });
  }, [selectedIndex]);

  function handleScrollRight() {
    ref.current?.scrollTo({
      left: ref.current.scrollLeft + ref.current.clientWidth,
      behavior: "smooth",
    });
  }
  function handleScrollLeft() {
    ref.current?.scrollTo({
      left: ref.current.scrollLeft - ref.current.clientWidth,
      behavior: "smooth",
    });
  }

  return (
    <div
      className={twMerge(
        "relative mx-auto aspect-[9/14] max-h-[80vh] w-full sm:aspect-video",
        className,
      )}
      {...props}
    >
      <div
        className={twMerge(
          "relative flex h-full w-full flex-col overflow-hidden",
        )}
        ref={emblaRef}
      >
        <div className="flex h-full w-full touch-pan-y touch-pinch-zoom gap-x-8">
          {recents.map((anime, index) => (
            <a
              href={`/anime/${anime.id}`}
              key={index}
              className="w-full shrink-0 grow-0 basis-full rounded-sm"
            >
              <div
                className={twMerge(
                  "relative flex h-full w-full items-end overflow-hidden rounded-sm bg-cover bg-center",
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
                {/* {selectedIndex === index && (
                  <iframe
                    src={`https://youtube.com/embed/${anime.trailer.id}?modestbranding=1&showinfo=0&controls=0&playlist=${anime.trailer.id}&loop=1&autoplay=1&mute=1`}
                    className="absolute top-0 left-0 w-full h-full"
                  />
                )} */}
              </div>
            </a>
          ))}
        </div>
      </div>
      <div
        className="pointer-events-none absolute top-0 flex h-full w-full flex-row items-end justify-center gap-x-1 overflow-hidden p-4 text-white sm:justify-end sm:pl-20"
        style={{
          background: `linear-gradient(${
            isSM ? "360deg" : "45deg"
          }, rgba(0,0,0,0.8016456582633054) 0%, rgba(255,255,255,0) 100%)`,
        }}
      >
        <div className="pointer-events-auto flex h-fit w-full flex-col items-center gap-4 sm:items-start">
          <div className="flex h-full w-full flex-col items-center justify-end gap-2 sm:items-start">
            <div
              className="title text-center text-2xl font-bold sm:text-left"
              style={{
                color: recents[selectedIndex].color ?? "white",
              }}
            >
              {recents[selectedIndex].title.english ||
                recents[selectedIndex].title.romaji ||
                recents[selectedIndex].title.native}
            </div>
            <div className="text-center sm:text-left">
              {recents[selectedIndex].releaseDate || "Yet to be announced"}{" "}
              {"\u2022"} {recents[selectedIndex].type} {"\u2022"}{" "}
              {recents[selectedIndex].rating
                ? recents[selectedIndex].rating / 10
                : "Unrated"}
            </div>
            {!isSM && (
              <div
                dangerouslySetInnerHTML={{
                  __html: recents[selectedIndex].description
                    .split("<br>")
                    .slice(0, 3)
                    .join("<br>"),
                }}
                className="max-h-36 overflow-auto"
              />
            )}
            <div className="text-center sm:text-left">
              {recents[selectedIndex].genres.map((genre, idx) => (
                <React.Fragment key={idx}>
                  <span className="font-bold">{genre}</span>
                  {idx !== recents[selectedIndex].genres.length - 1 && " | "}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="mt-auto flex h-14 gap-4">
            <Link href={`/anime/${recents[selectedIndex].id}`}>
              <Button
                variant="default"
                className="flex h-full items-center justify-center gap-2 bg-white/20 p-6 text-xl text-white transition-all hover:scale-110 hover:bg-white/30"
                size="lg"
              >
                <PlayIcon size={20} fill="white" />
                Start Watching
              </Button>
            </Link>
            <Button
              variant="default"
              className="flex aspect-square h-full w-auto items-center justify-center bg-white/20 text-white transition-all hover:scale-110 hover:bg-white/30"
              size="icon"
            >
              <Plus size={24} fill="white" />
            </Button>
          </div>
        </div>
        <div
          ref={ref}
          className="pointer-events-auto relative ml-auto hidden h-40 w-full items-end gap-2 overflow-x-auto overflow-y-hidden py-1 sm:flex"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          <Button
            size="icon"
            className="sticky bottom-10 left-0 z-10 h-fit translate-y-1/2 rounded-full bg-black/20 p-2 text-white hover:bg-black/90"
            onClick={handleScrollLeft}
          >
            <ChevronLeft />
          </Button>
          {scrollSnaps.map((_, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(${recents[index].image})`,
              }}
              className={twMerge(
                "aspect-[3/4] h-20 origin-bottom cursor-pointer rounded-sm bg-cover transition-all",
                selectedIndex === index
                  ? "mx-4 scale-150 ring-1 ring-white"
                  : "hover:scale-110",
              )}
              onClick={() => onDotButtonClick(index)}
            />
          ))}
          <Button
            size="icon"
            className="sticky bottom-10 right-0 h-fit translate-y-1/2 rounded-full bg-black/20 p-2 text-white hover:bg-black/90"
            onClick={handleScrollRight}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
