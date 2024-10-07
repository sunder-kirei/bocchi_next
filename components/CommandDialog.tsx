"use client";

import debouce from "lodash.debounce";
import { Loader2 } from "lucide-react";

import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { fetchSearch } from "@/lib/query/fetchSearch";
import { Search } from "@/types/api/search";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import ImageWithFallback from "./ImageWithFallback";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export function AppCommandDialog({ open, setOpen }: Props) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Search | undefined>(undefined);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [setOpen]);

  useEffect(() => {
    if (query !== "") {
      setIsLoading(true);
      fetchSearch(query)
        .then((data) => setResults(data))
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    } else {
      setResults(undefined);
    }
  }, [query]);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={debouce((val) => {
            setQuery(val);
          }, 600)}
        />
        <CommandList className="scrollbar-none">
          <CommandGroup heading="Anime Search">
            {((!isLoading && !results) ||
              (!isLoading && results && results.results.length === 0)) && (
              <div className="grid place-items-center p-4">No results</div>
            )}
            {!isLoading &&
              results &&
              results.results.map((anime) => (
                <CommandItem
                  key={anime.id}
                  className={twMerge(
                    "mb-2 border transition-all",
                    "data-[selected=true]:shadow",
                    "data-[selected=true]:bg-inherit",
                  )}
                  style={
                    {
                      "--tw-shadow-color": anime.color,
                      color: anime.color,
                      "--tw-shadow": "var(--tw-shadow-colored)",
                    } as React.CSSProperties
                  }
                >
                  <a
                    href={
                      anime.totalEpisodes && anime.totalEpisodes > 0
                        ? `/anime/${anime.id}`
                        : undefined
                    }
                    className="flex h-32 w-full gap-2 p-0"
                  >
                    <ImageWithFallback
                      src={anime.image}
                      alt={anime.id}
                      className="aspect-[2/3] h-full rounded object-cover"
                    />
                    <div
                      className={twMerge(
                        "flex h-full w-full flex-col items-end text-end",
                      )}
                    >
                      <span className="line-clamp-2 text-lg">
                        {anime.title.english}
                      </span>
                      <div className="data my-2 flex flex-col gap-1">
                        <div className="flex">
                          <span className="w-full">Episodes:</span>
                          <span className="w-full">
                            {anime.currentEpisodeCount} / {anime.totalEpisodes}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 text-white">
                        {anime.genres.slice(0, 2).map((genre) => (
                          <div
                            key={genre}
                            className="w-fit rounded-full bg-primary px-4 py-2"
                          >
                            {genre}
                          </div>
                        ))}
                      </div>
                    </div>
                  </a>
                </CommandItem>
              ))}
            {isLoading && (
              <div className="grid w-full place-items-center py-6 text-sm">
                <Loader2 className="animate-spin" />
              </div>
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
