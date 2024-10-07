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
        "z-10 block aspect-[3/4] shrink-0 grow-0 basis-44 rounded bg-cover shadow-lg sm:basis-52",
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
