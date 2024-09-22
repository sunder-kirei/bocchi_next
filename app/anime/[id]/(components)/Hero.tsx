import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  image: string;
  color: string;
}

export function Hero({ className, style, image, color, ...props }: Props) {
  return (
    <div
      className={twMerge(
        "basis-52 shrink-0 grow-0 aspect-[3/4] bg-cover rounded shadow-lg  z-10",
        className
      )}
      style={
        {
          backgroundImage: `url(${image})`,
          "--tw-shadow-color": color,
          "--tw-shadow": "var(--tw-shadow-colored)",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
