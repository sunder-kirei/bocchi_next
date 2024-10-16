import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Page({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={twMerge(
        "mx-auto h-fit min-h-screen w-full max-w-screen-2xl p-4 pb-20 sm:pb-4 sm:pl-20",
        className,
      )}
      {...props}
    ></div>
  );
}
