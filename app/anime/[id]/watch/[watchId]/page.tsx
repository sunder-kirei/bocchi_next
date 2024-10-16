import { Hero } from "@/app/anime/[id]/(components)/Hero";
import { Page } from "@/components/layout/Page";
import { fetchInfo } from "@/lib/query/fetchInfo";
import { fetchWatch } from "@/lib/query/fetchWatch";
import { Play } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { EpisodeList } from "../../(components)/EpisodeList";
import { HLSPlayer } from "./(components)/HLSPlayer";

export default async function WatchPage({
  params: { id, watchId },
}: {
  params: { id: string; watchId: string };
}) {
  const data = await fetchWatch(watchId);
  const anime = await fetchInfo(id);
  const currentEpisode = anime.episodes.find((e) => e.id === watchId)?.number;

  return (
    <Page className="max-w-screen-lg">
      <HLSPlayer
        data={data}
        className="mx-auto"
        animeID={id}
        episodeID={watchId}
        episode={currentEpisode || 0}
      />
      <main className="mt-4 h-full">
        <div className="flex h-full">
          <Hero
            color={anime.color}
            image={anime.image}
            className="w-44"
            id={anime.id}
          />
          <div
            className={twMerge("flex w-full flex-col p-2 sm:px-6 sm:py-4")}
            style={{
              color: anime.color,
            }}
          >
            <span className="line-clamp-2 text-base sm:text-lg">
              {anime.title.english}
            </span>
            <div className="data my-2 flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className="w-full">Episodes:</span>
                <span className="w-full text-sm sm:text-base">
                  {currentEpisode} / {anime.totalEpisodes}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-full">Season:</span>
                <span className="w-full text-sm sm:text-base">
                  {anime.season} {anime.startDate.year}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 text-white">
              {anime.genres.slice(0, 2).map((genre) => (
                <div
                  key={genre}
                  className="w-fit rounded-full bg-primary px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
                >
                  {genre}
                </div>
              ))}
            </div>

            {anime.episodes.length > (currentEpisode ?? 0) && (
              <Link
                className="my-auto flex w-fit items-center justify-center gap-x-2 rounded p-2 text-white sm:px-4 sm:py-2"
                style={{
                  backgroundColor: anime.color,
                }}
                href={`/anime/${anime.id}/watch/${anime.episodes[currentEpisode ?? 0].id}`}
              >
                <Play size={14} />
                Next Episode
              </Link>
            )}
          </div>
        </div>
        <EpisodeList anime={anime} current={currentEpisode} />
      </main>
    </Page>
  );
}
