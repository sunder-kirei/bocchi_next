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
        "mx-auto sm:aspect-video aspect-[9/14] max-h-[80vh] w-full relative",
        className
      )}
      {...props}
    >
      <div
        className={twMerge(
          "overflow-hidden w-full h-full flex flex-col relative"
        )}
        ref={emblaRef}
      >
        <div className="flex touch-pan-y touch-pinch-zoom h-full w-full gap-x-8">
          {recents.map((anime, index) => (
            <a
              href={`/anime/${anime.id}`}
              key={index}
              className="basis-full grow-0 shrink-0 rounded-sm w-full"
            >
              <div
                className={twMerge(
                  "relative h-full bg-cover bg-center rounded-sm overflow-hidden flex items-end w-full"
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
        className="w-full h-full text-white flex flex-row items-end sm:justify-end justify-center gap-x-1 overflow-hidden absolute p-4 sm:pl-20 top-0 pointer-events-none"
        style={{
          background: `linear-gradient(${
            isSM ? "360deg" : "45deg"
          }, rgba(0,0,0,0.8016456582633054) 0%, rgba(255,255,255,0) 100%)`,
        }}
      >
        <div className="w-full h-fit flex flex-col gap-4 pointer-events-auto items-center sm:items-start">
          <div className="w-full h-full flex flex-col gap-2 justify-end items-center sm:items-start">
            <div
              className="title text-2xl text-center sm:text-left font-bold"
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
                ? recents[selectedIndex].rating
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
          <div className="flex gap-4 h-14 mt-auto">
            <Button
              variant="default"
              className="flex gap-2 h-full text-xl p-6 bg-white/20 text-white items-center justify-center hover:bg-white/30 hover:scale-110 transition-all"
              size="lg"
            >
              <PlayIcon size={20} fill="white" />
              Start Watching
            </Button>
            <Button
              variant="default"
              className="flex h-full w-auto aspect-square bg-white/20 text-white items-center justify-center hover:bg-white/30 hover:scale-110 transition-all"
              size="icon"
            >
              <Plus size={24} fill="white" />
            </Button>
          </div>
        </div>
        <div
          ref={ref}
          className="hidden sm:flex gap-2 w-full h-40 ml-auto relative overflow-x-auto overflow-y-hidden items-end py-1 pointer-events-auto"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          <Button
            size="icon"
            className="sticky left-0 bottom-10 translate-y-1/2 h-fit p-2 rounded-full bg-black/20 text-white  hover:bg-black/90 z-10"
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
                "h-20 aspect-[3/4] bg-cover transition-all origin-bottom cursor-pointer rounded-sm",
                selectedIndex === index
                  ? "scale-150 mx-4 ring-1 ring-white"
                  : "hover:scale-110"
              )}
              onClick={() => onDotButtonClick(index)}
            />
          ))}
          <Button
            size="icon"
            className="sticky right-0 bottom-10 translate-y-1/2 h-fit p-2 bg-black/20 text-white rounded-full hover:bg-black/90"
            onClick={handleScrollRight}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
