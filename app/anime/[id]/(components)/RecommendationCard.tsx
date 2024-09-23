import { Recommendation } from "@/types/api/info";
import a from "next/link";
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
        "basis-36 sm:basis-52 grow-0 shrink-0 shadow shadow-primary rounded-md overflow-hidden",
        className
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
      <div className="w-full p-4 flex flex-col items-center gap-y-1">
        <div className="w-full flex items-center justify-between ">
          <span className="line-clamp-1">
            {recommendation.title.userPreferred}
          </span>
          <span className="text-white px-2 py-1 rounded">
            {recommendation.type}
          </span>
        </div>
      </div>
    </a>
  );
}
