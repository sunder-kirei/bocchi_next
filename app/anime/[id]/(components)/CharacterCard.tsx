import { Character } from "@/types/api/info";
import Image from "next/image";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  character: Character;
}

export function CharacterCard({ className, character, ...props }: Props) {
  return (
    <div
      className={twMerge(
        "basis-96 h-32 grow-0 shrink-0 shadow-lg shadow-secondary rounded-md overflow-hidden flex",
        className
      )}
      {...props}
    >
      <div className="h-full w-20 relative">
        <Image
          src={character.image}
          alt="character"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="data flex flex-col gap-y-1 px-4 py-2">
        <span>{character.name.userPreferred}</span>
        <span className="italic">
          (
          {character.voiceActors?.length
            ? character.voiceActors[0].name.userPreferred
            : ""}
          )
        </span>

        <span className="mt-auto text-secondary">{character.role}</span>
      </div>
      <div className="w-20 h-full ml-auto relative">
        <Image
          src={
            character.voiceActors?.length
              ? character.voiceActors[0].image
              : "/404.png"
          }
          fill={true}
          alt="va"
          className="object-cover"
        />
      </div>
    </div>
  );
}
