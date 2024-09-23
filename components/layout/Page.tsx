import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Page({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={twMerge(
        "min-h-screen w-full h-fit px-4 max-w-screen-2xl mx-auto pb-24",
        className
      )}
      {...props}
    ></div>
  );
}
