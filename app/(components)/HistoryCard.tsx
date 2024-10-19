"use client";

import { Button } from "@/components/ui/button";
import useConfirm from "@/hooks/useConfirm";
import { db, WatchHistory } from "@/lib/db";
import { getTitle } from "@/lib/utils/getTitle";
import { Anime } from "@/types/api/anime";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { HTMLAttributes, MouseEventHandler } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  anime: Anime;
  history: WatchHistory;
}

export function HistoryCard({
  className,
  anime,
  style,
  history,
  ...props
}: Props) {
  const title = getTitle(anime);
  const [ConfirmationDialog, confirm] = useConfirm({
    message: "Are you sure?",
    title: "Sure about that🤔?",
  });

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const value = await confirm();
    if (value) {
      toast.promise(
        () =>
          db.history.update(anime.id, {
            deleted: true,
          }),
        {
          success: () => "Deleted from history",
          loading: "Deleting...",
        },
      );
    } else {
    }
  };
  return (
    <>
      <ConfirmationDialog />
      <Link
        className={twMerge(
          "hover: flex h-36 overflow-hidden rounded ring-1 transition-all hover:scale-105",
          className,
        )}
        href={`/anime/${anime.id}`}
        {...props}
        style={
          {
            "--tw-shadow-color": anime.color,
            "--tw-ring-color": anime.color,
            color: anime.color,
            "--tw-shadow": "var(--tw-shadow-colored)",
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <img
          src={anime.image}
          alt={title}
          title={title}
          className="h-full object-cover"
        />
        <div className="relative flex aspect-[4/3] flex-col p-2">
          <span>{title}</span>
          <span>
            Episode: {history.episode} / {anime.totalEpisodes}
          </span>
          {anime.nextAiringEpisode && (
            <div className="mt-4 flex w-fit items-center justify-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-red-500"></div>
              <span>
                {format(
                  new Date(anime.nextAiringEpisode.airingTime * 1000),
                  "dd MMM, yy hh:mm a",
                )}
              </span>
            </div>
          )}
          <Button
            size="icon"
            variant="ghost"
            onClick={handleDelete}
            className="absolute bottom-2 right-2 z-10 rounded-full p-2 text-red-500 hover:bg-red-500"
          >
            <Trash2 />
          </Button>
        </div>
      </Link>
    </>
  );
}
