import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Page({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={twMerge(
        "mx-auto h-fit w-full max-w-screen-2xl p-4 sm:pl-20",
        className,
      )}
      {...props}
    ></div>
  );
}
