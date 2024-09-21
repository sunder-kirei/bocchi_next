import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Page({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={twMerge("min-h-screen w-full h-fit", className)}
      {...props}
    ></div>
  );
}
