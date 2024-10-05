import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  image: string;
  color: string;
  id?: string;
}

export function Hero({ className, style, id, image, color, ...props }: Props) {
  return (
    <a
      className={twMerge(
        "basis-44 sm:basis-52 shrink-0 grow-0 aspect-[3/4] bg-cover rounded shadow-lg z-10 block",
        className,
      )}
      href={id ? `/anime/${id}` : undefined}
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
