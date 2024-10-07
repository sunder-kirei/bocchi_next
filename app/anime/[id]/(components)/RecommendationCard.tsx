import { Recommendation } from "@/types/api/info";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  recommendation: Recommendation;
}

export function RecommendationCard({
  className,
  recommendation,
  ...props
}: Props) {
  return (
    <a
      href={`/anime/${recommendation.id}`}
      className={twMerge(
        "shrink-0 grow-0 basis-36 overflow-hidden rounded-md shadow shadow-primary sm:basis-52",
        className,
      )}
      key={recommendation.id}
      {...props}
    >
      <div
        className="aspect-[3/4] w-full bg-cover"
        style={{
          backgroundImage: `url(${recommendation.image})`,
        }}
      ></div>
      <div className="flex w-full flex-col items-center gap-y-1 p-4">
        <div className="flex w-full items-center justify-between">
          <span className="line-clamp-1">
            {recommendation.title.userPreferred}
          </span>
          <span className="rounded px-2 py-1 text-white">
            {recommendation.type}
          </span>
        </div>
      </div>
    </a>
  );
}
