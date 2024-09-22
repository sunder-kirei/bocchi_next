"use client";

import { fetchArtwork } from "@/lib/query/fetchArtwork";
import { AnimeInfo, Artwork } from "@/types/api/info";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ArtworkCard } from "./ArtworkCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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
      .finally(() => setIsLoading(false));
  }, [page]);

  return (
    <>
      <h2 className="text-xl text-center font-semibold">Artworks</h2>
      {isLoading ? (
        <div className="h-full w-full flex flex-wrap gap-2 justify-center">
          <Skeleton className="h-72 aspect-[3/4] bg-black/20" />
          <Skeleton className="h-72 aspect-[3/4] bg-black/20" />
          <Skeleton className="h-72 aspect-[3/4] bg-black/20" />
          <Skeleton className="h-72 aspect-[3/4] bg-black/20" />
        </div>
      ) : (
        <>
          <div className="episode-grid w-full h-full">
            {artworks.map((art, idx) => (
              <ArtworkCard art={art} key={idx} color={anime.color} />
            ))}
          </div>
          <div className="sticky bottom-2 right-2 w-fit text-xl items-center flex gap-x-2">
            <Button
              className="rounded-full size-12 bg-secondary grid place-items-center"
              onClick={() => {
                setPage((prev) => Math.max(prev - 1, 1));
              }}
              disabled={page === 1}
            >
              <ChevronLeft className="size-8 text-white" />
            </Button>
            <Button
              className="rounded-full size-12 bg-secondary grid place-items-center"
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
