import { Relation } from "@/types/api/info";
import Image from "next/image";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  relation: Relation;
}

export function RelationCard({ className, style, relation, ...props }: Props) {
  return (
    <a
      href={
        relation.episodes && relation.episodes > 0
          ? `/anime/${relation.id}`
          : undefined
      }
      className={twMerge(
        "flex h-48 max-w-full shrink-0 grow-0 basis-96 cursor-pointer overflow-hidden rounded-md text-primary shadow shadow-primary",
        className,
      )}
      style={
        {
          "--tw-shadow-color": relation.color,
          color: relation.color,
          "--tw-shadow": "var(--tw-shadow-colored)",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="relative h-full shrink-0 grow-0 basis-32">
        <Image
          src={relation.image}
          alt="image"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="data flex flex-col px-4 py-2">
        <span>{relation.relationType}</span>
        <span className="line-clamp-2 text-foreground">
          {relation.title.userPreferred}
        </span>
        <span className="mt-auto flex gap-1">
          <span className="text-foreground">{relation.type}</span>
          <span className="text-foreground">{"\u2022"}</span>
          <span>{relation.status}</span>
        </span>
      </div>
    </a>
  );
}
