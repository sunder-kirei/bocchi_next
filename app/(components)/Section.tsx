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
        "flex flex-wrap sm:flex-nowrap p-2 gap-4 justify-center sm:justify-start overflow-x-auto scrollbar-none scrollbar-track-transparent scrollbar-thumb-accent pb-4 scrollbar-corner-transparent relative",
        className,
      )}
      {...props}
    >
      <Button
        size="icon"
        className="hidden sm:block sticky left-4 top-1/2 -translate-y-1/2 h-fit p-2 rounded-full bg-black/20 text-white  hover:bg-black/90 z-10"
        onClick={handleScrollLeft}
      >
        <ChevronLeft />
      </Button>
      {children}
      <Button
        size="icon"
        className="hidden sm:block sticky right-4 top-1/2 -translate-y-1/2 h-fit p-2 bg-black/20 text-white rounded-full hover:bg-black/90"
        onClick={handleScrollRight}
      >
        <ChevronRight />
      </Button>
    </section>
  );
}
