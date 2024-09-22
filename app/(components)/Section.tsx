import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLElement>;

export function Section({ className, ...props }: Props) {
  return (
    <section
      className={twMerge(
        "flex flex-wrap sm:flex-nowrap gap-4 justify-start overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent pb-4 px-2 scrollbar-corner-transparent",
        className
      )}
      {...props}
    />
  );
}
