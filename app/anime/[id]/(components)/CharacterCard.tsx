/* eslint-disable @next/next/no-img-element */
import { Character } from "@/types/api/info";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  character: Character;
}

export function CharacterCard({ className, character, ...props }: Props) {
  return (
    <div
      className={twMerge(
        "group flex h-fit max-w-full shrink-0 grow-0 flex-col items-center gap-1 overflow-hidden",
        className,
      )}
      {...props}
    >
      <div
        className="aspect-[12/16] h-44 w-full rounded-sm bg-cover bg-center shadow shadow-secondary"
        style={{
          backgroundImage: `url(${character.image})`,
        }}
      ></div>
      <span>{character.name.userPreferred}</span>
      {/* <div className="relative h-full w-20">
        <img
          src={character.image}
          alt="character"
          className="h-full w-full object-cover"
          title="character-image"
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
      <div className="relative ml-auto h-full w-20">
        <img
          src={
            character.voiceActors?.length
              ? character.voiceActors[0].image
              : "/404.png"
          }
          alt="va"
          className="h-full w-full object-cover"
        />
      </div> */}
    </div>
  );
}
