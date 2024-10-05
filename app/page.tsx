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

export default async function Home() {
  const recent = await fetchRecent();
  const trending = await fetchTrending();
  const popular = await fetchPopular();

  return (
    <Page className="sm:px-0 sm:py-0">
      {trending.length && <RecentsCarousel recents={trending} />}
      <main className="flex flex-col gap-y-4 mt-4 sm:pl-20 pl-0 pb-20 sm:pb-0">
        {/* History */}
        <HistorySection />
        {/* Trending */}
        <SectionHeading title="Recents" />
        <Section className="flex-nowrap">
          {recent.map((anime) => (
            <Link key={anime.episodeId} href={`/anime/${anime.id}`}>
              <div
                className="h-44 aspect-video bg-cover bg-center rounded relative"
                style={{
                  backgroundImage: `url(${anime.image})`,
                }}
              >
                <div
                  className="absolute w-full h-full top-0 left-0"
                  style={{
                    background: `linear-gradient(0deg, rgba(0,0,0,0.8016456582633054) 0%, rgba(255,255,255,0) 100%)`,
                  }}
                >
                  <div className="h-16 w-full absolute bottom-0 flex items-start gap-2 px-4 py-2">
                    <div
                      className="line-clamp-2 overflow-ellipsis w-full font-bold"
                      style={{
                        color: anime.color || "white",
                      }}
                    >
                      {anime.title.english ||
                        anime.title.romaji ||
                        anime.title.native}
                    </div>
                    <div className="w-1/4 font-semibold text-white text-center bg-accent rounded">
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
  );
}
