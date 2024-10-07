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
      ref={ref}
      className={twMerge(
        "relative flex flex-wrap justify-center gap-4 overflow-x-auto p-2 pb-4 scrollbar-none scrollbar-track-transparent scrollbar-thumb-accent scrollbar-corner-transparent sm:flex-nowrap sm:justify-start",
        className,
      )}
      {...props}
    >
      <Button
        size="icon"
        className="sticky left-4 top-1/2 z-10 hidden h-fit -translate-y-1/2 rounded-full bg-black/20 p-2 text-white hover:bg-black/90 sm:block"
        onClick={handleScrollLeft}
      >
        <ChevronLeft />
      </Button>
      {children}
      <Button
        size="icon"
        className="sticky right-4 top-1/2 hidden h-fit -translate-y-1/2 rounded-full bg-black/20 p-2 text-white hover:bg-black/90 sm:block"
        onClick={handleScrollRight}
      >
        <ChevronRight />
      </Button>
    </section>
  );
}
