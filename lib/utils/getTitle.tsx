import { Anime } from "@/types/api/anime";

export function getTitle(anime: Anime) {
  return anime.title.english || anime.title.romaji || anime.title.native;
}
