export const revalidate = 3600;

import { RecentsCarousel } from "@/app/(components)/carousel/RecentsCarousel";
import { Page } from "@/components/layout/Page";
import { fetchRecent } from "@/lib/query/fetchRecent";
import { fetchTrending } from "@/lib/query/fetchTrending";
import { AnimeCard } from "./(components)/AnimeCard";
import { Section } from "./(components)/Section";
import { SectionHeading } from "./(components)/SectionHeading";
import { fetchPopular } from "@/lib/query/fetchPopular";

export default async function Home() {
  const recent = await fetchRecent();
  const trending = await fetchTrending();
  const popular = await fetchPopular();

  return (
    <Page>
      <RecentsCarousel recents={recent} />
      <main className="flex flex-col gap-y-4 mt-4">
        {/* Trending */}
        <SectionHeading title="Trending" />
        <Section>
          {trending.map((anime) => (
            <AnimeCard anime={anime} key={anime.id} />
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

      <div className="temp w-full h-96"></div>
    </Page>
  );
}
