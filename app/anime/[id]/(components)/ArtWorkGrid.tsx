"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchArtwork } from "@/lib/query/fetchArtwork";
import { AnimeInfo, Artwork } from "@/types/api/info";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ArtworkCard } from "./ArtworkCard";

interface Props {
  anime: AnimeInfo;
}

export function ArtworkGrid({ anime }: Props) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchArtwork(anime.id, page)
      .then((data) => {
        setArtworks(data.data);
        setHasNextPage(data.hasNextPage);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [page, anime]);

  return (
    <>
      <h2 className="text-center text-xl font-semibold">Artworks</h2>
      {isLoading ? (
        <div className="flex h-full w-full flex-wrap justify-center gap-2">
          <Skeleton className="aspect-[3/4] h-72" />
          <Skeleton className="aspect-[3/4] h-72" />
          <Skeleton className="aspect-[3/4] h-72" />
          <Skeleton className="aspect-[3/4] h-72" />
        </div>
      ) : (
        <>
          <div className="episode-grid h-full w-full">
            {artworks.map((art, idx) => (
              <ArtworkCard art={art} key={idx} color={anime.color} />
            ))}
          </div>
          <div className="sticky bottom-2 right-2 flex w-fit items-center gap-x-2 text-xl">
            <Button
              className="grid size-12 place-items-center rounded-full bg-secondary"
              onClick={() => {
                setPage((prev) => Math.max(prev - 1, 1));
              }}
              disabled={page === 1}
            >
              <ChevronLeft className="size-8 text-white" />
            </Button>
            <Button
              className="grid size-12 place-items-center rounded-full bg-secondary"
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
              disabled={!hasNextPage}
            >
              <ChevronRight className="size-8 text-white" />
            </Button>
          </div>
        </>
      )}
    </>
  );
}
