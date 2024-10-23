export const revalidate = 3600;

import { RecentsCarousel } from "@/app/(components)/carousel/RecentsCarousel";
import { Page } from "@/components/layout/Page";
import { fetchPopular } from "@/lib/query/fetchPopular";
import { fetchRecent } from "@/lib/query/fetchRecent";
import { fetchTrending } from "@/lib/query/fetchTrending";
import Link from "next/link";
import { AnimeCard } from "./(components)/AnimeCard";
import { HistorySection } from "./(components)/HistorySection";
import { Section } from "./(components)/Section";
import { SectionHeading } from "./(components)/SectionHeading";
import { Recent } from "@/types/api/recent";
import { Anime } from "@/types/api/anime";

export default async function Home() {
  const recent: Recent[] = await fetchRecent();
  const trending: Anime[] = await fetchTrending();
  const popular: Anime[] = await fetchPopular();

  return (
    <>
      {trending.length && <RecentsCarousel recents={trending} />}
      <Page className="sm:py-0 sm:pl-0">
        <main className="mt-4 flex flex-col gap-y-4 pb-20 pl-0 sm:pb-0 sm:pl-20">
          {/* History */}
          <HistorySection />
          {/* Trending */}
          <SectionHeading title="Recents" />
          <Section className="flex-nowrap justify-start">
            {recent.map((anime) => (
              <Link key={anime.episodeId} href={`/anime/${anime.id}`}>
                <div
                  className="relative aspect-video h-44 rounded bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${anime.image})`,
                  }}
                >
                  <div
                    className="absolute left-0 top-0 h-full w-full"
                    style={{
                      background: `linear-gradient(0deg, rgba(0,0,0,0.8016456582633054) 0%, rgba(255,255,255,0) 100%)`,
                    }}
                  >
                    <div className="absolute bottom-0 flex h-16 w-full items-start gap-2 px-4 py-2">
                      <div
                        className="line-clamp-2 w-full overflow-ellipsis font-bold"
                        style={{
                          color: anime.color || "white",
                        }}
                      >
                        {anime.title.english ||
                          anime.title.romaji ||
                          anime.title.native}
                      </div>
                      <div className="w-1/4 rounded bg-accent text-center font-semibold text-white">
                        {anime.episodeNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Section>
          {/* Popular */}
          <SectionHeading title="Popular" />
          <Section>
            {popular.map((anime) => (
              <AnimeCard anime={anime} key={anime.id} />
            ))}
          </Section>
        </main>
      </Page>
    </>
  );
}
