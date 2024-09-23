import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLElement>;

export function Section({ className, ...props }: Props) {
  return (
    <section
      className={twMerge(
        "flex flex-wrap sm:flex-nowrap p-2 gap-4 justify-center sm:justify-start overflow-x-auto scrollbar-none scrollbar-track-transparent scrollbar-thumb-accent pb-4 scrollbar-corner-transparent",
        className
      )}
      {...props}
    />
  );
}
