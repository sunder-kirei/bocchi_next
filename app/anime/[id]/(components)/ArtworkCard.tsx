import ImageWithFallback from "@/components/ImageWithFallback";
import { Artwork } from "@/types/api/info";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  art: Artwork;
  color: string;
}

export function ArtworkCard({ className, style, art, color, ...props }: Props) {
  return (
    <div
      className={twMerge("relative h-72 shadow rounded", className)}
      style={
        {
          "--tw-shadow-color": color,
          "--tw-shadow": "var(--tw-shadow-colored)",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <ImageWithFallback
        src={art.img}
        alt={art.type}
        title={art.img}
        className="object-contain h-full w-full"
      />
    </div>
  );
}
