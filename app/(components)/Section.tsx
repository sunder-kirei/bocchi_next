"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HTMLAttributes, useRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLElement>;

export function Section({ className, children, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);

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
    <section
      className={twMerge("relative gap-4 overflow-hidden", className)}
      {...props}
    >
      <Button
        size="icon"
        className="absolute left-4 top-1/2 z-10 hidden aspect-square w-fit -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white hover:bg-black/90 sm:grid"
        onClick={handleScrollLeft}
      >
        <ChevronLeft />
      </Button>
      <div
        className="flex flex-wrap justify-center gap-4 overflow-x-auto p-2 scrollbar-none scrollbar-track-transparent scrollbar-thumb-accent scrollbar-corner-transparent sm:flex-nowrap sm:justify-start"
        ref={ref}
      >
        {children}
      </div>
      <Button
        size="icon"
        className="absolute right-4 top-1/2 hidden aspect-square w-fit -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white hover:bg-black/90 sm:grid"
        onClick={handleScrollRight}
      >
        <ChevronRight />
      </Button>
    </section>
  );
}
