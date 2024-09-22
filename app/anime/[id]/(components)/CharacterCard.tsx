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
        "basis-96 h-32 grow-0 shrink-0 shadow-lg shadow-secondary rounded-md overflow-hidden flex",
        className
      )}
      {...props}
    >
      <img
        src={character.image}
        alt="character"
        className="object-cover w-20 h-full"
      />
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
      <img
        src={
          character.voiceActors?.length
            ? character.voiceActors[0].image
            : "/404.png"
        }
        alt="va"
        className="object-cover w-20 h-full ml-auto"
      />
    </div>
  );
}
