import { Relation } from "@/types/api/info";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  relation: Relation;
}

export function RelationCard({ className, style, relation, ...props }: Props) {
  return (
    <Link
      href={
        relation.episodes && relation.episodes > 0
          ? `/anime/${relation.id}`
          : ""
      }
      className={twMerge(
        "basis-96 grow-0 cursor-pointer shrink-0 shadow-lg shadow-primary rounded-md overflow-hidden flex text-primary h-48",
        className
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
      <div className="basis-32 grow-0 shrink-0 h-full relative">
        <Image
          src={relation.image}
          alt="image"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="data flex flex-col px-4 py-2">
        <span>{relation.relationType}</span>
        <span className="text-black line-clamp-2">
          {relation.title.userPreferred}
        </span>
        <span className="mt-auto flex gap-1">
          <span className="text-black">{relation.type}</span>
          <span className="text-black">{"\u2022"}</span>
          <span>{relation.status}</span>
        </span>
      </div>
    </Link>
  );
}
