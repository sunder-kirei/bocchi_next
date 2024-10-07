import { Hero } from "@/app/anime/[id]/(components)/Hero";
import { Page } from "@/components/layout/Page";
import { fetchInfo } from "@/lib/query/fetchInfo";
import { fetchWatch } from "@/lib/query/fetchWatch";
import { format } from "date-fns";
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
      <main className="mt-4">
        <div className="flex">
          <Hero
            color={anime.color}
            image={anime.image}
            className="w-44"
            id={anime.id}
          />
          <div
            className={twMerge(
              "flex h-fit w-full flex-col p-2 sm:px-6 sm:py-4",
            )}
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
              {anime.nextAiringEpisode && (
                <div
                  className="flex w-fit items-center gap-x-2 rounded p-2 text-white sm:px-4 sm:py-2"
                  style={{
                    backgroundColor: anime.color,
                  }}
                >
                  <div className="size-2 animate-pulse rounded-full bg-red-500"></div>
                  <span>
                    {format(
                      new Date(anime.nextAiringEpisode.airingTime * 1000),
                      "dd MMM hh:mm a",
                    )}
                  </span>
                </div>
              )}
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
          </div>{" "}
        </div>
        <EpisodeList anime={anime} current={currentEpisode} />
      </main>
    </Page>
  );
}
