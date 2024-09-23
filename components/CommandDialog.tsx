"use client";

import debouce from "lodash.debounce";
import { CreditCard, Loader2, Settings, User } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
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

  console.log(results?.results);

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
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Anime Search">
            {!isLoading &&
              results &&
              results.results.map((anime) => (
                <CommandItem
                  key={anime.id}
                  className={twMerge(
                    "border mb-2 transition-all",
                    "data-[selected=true]:shadow",
                    "data-[selected=true]:bg-inherit"
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
                    className="h-32 w-full p-0 flex gap-2"
                  >
                    <ImageWithFallback
                      src={anime.image}
                      alt={anime.id}
                      className="h-full aspect-[2/3] rounded object-cover"
                    />
                    <div
                      className={twMerge(
                        "w-full flex flex-col items-end h-full text-end"
                      )}
                    >
                      <span className="text-lg line-clamp-2">
                        {anime.title.english}
                      </span>
                      <div className="data flex flex-col gap-1 my-2">
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
                            className="px-4 py-2 bg-primary rounded-full w-fit"
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
              <div className="py-6 grid place-items-center text-sm w-full">
                <Loader2 className="animate-spin" />
              </div>
            )}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
