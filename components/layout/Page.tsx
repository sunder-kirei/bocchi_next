import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Page({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={twMerge(
        "min-h-screen w-full h-fit p-4 sm:pl-20 pb-20 sm:pb-0 max-w-screen-2xl mx-auto",
        className,
      )}
      {...props}
    ></div>
  );
}
