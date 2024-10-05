import { Section } from "@/app/(components)/Section";
import { SectionHeading } from "@/app/(components)/SectionHeading";
import { Page } from "@/components/layout/Page";
import { DialogContent } from "@/components/ui/dialog";
import { fetchInfo } from "@/lib/query/fetchInfo";
import React from "react";
import { ArtworkCard } from "./(components)/ArtworkCard";
import { ArtworkGrid } from "./(components)/ArtWorkGrid";
import { Banner } from "./(components)/Banner";
import { CharacterCard } from "./(components)/CharacterCard";
import { EpisodeList } from "./(components)/EpisodeList";
import { Hero } from "./(components)/Hero";
import { RecommendationCard } from "./(components)/RecommendationCard";
import { RelationCard } from "./(components)/RelationCard";
import { Summary } from "./(components)/Summary";
import { WatchingStatus } from "./(components)/WatchingStatus";

export default async function InfoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const anime = await fetchInfo(id);

  return (
    <Page className="px-0">
      <Banner anime={anime} />
      <main className="max-w-screen-lg mx-auto w-full px-4 sm:pl-20">
        <div className="w-full flex">
          <Hero className="-mt-24" color={anime.color} image={anime.image} />
          <Summary anime={anime} />
        </div>

        {/* Start Watching */}
        <WatchingStatus anime={anime} />
        {/* <a
          href={``}
          className="px-4 py-2 w-full rounded-md mt-2 text-xl text-white text-center flex gap-x-2 items-center justify-center bg-accent"
        >
          Add to list
        </a> */}

        <SectionHeading title="Description" className="mt-4 mb-2" />
        <p
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: anime.description }}
        />

        {anime.episodes && anime.episodes.length && (
          <EpisodeList anime={anime} />
        )}

        {anime.relations && anime.relations.length && (
          <>
            <SectionHeading
              title="Relations"
              className="mt-4 mb-2"
              dialogContent={
                <DialogContent className=" flex flex-wrap justify-center overflow-y-auto max-h-[80%]">
                  {anime.relations.map((relation) => (
                    <RelationCard relation={relation} key={relation.id} />
                  ))}
                </DialogContent>
              }
            />
            <Section
              style={
                {
                  "--scrollbar-thumb": `${anime.color} !important`,
                } as React.CSSProperties
              }
            >
              {anime.relations.slice(0, 10).map((relation) => (
                <RelationCard relation={relation} key={relation.id} />
              ))}
            </Section>
          </>
        )}

        {anime.characters && anime.characters.length && (
          <>
            <SectionHeading
              title="Characters"
              className="mt-4 mb-2"
              dialogContent={
                <DialogContent className=" flex flex-wrap justify-center overflow-y-auto max-h-[80%]">
                  {anime.characters.map((character) => (
                    <CharacterCard character={character} key={character.id} />
                  ))}
                </DialogContent>
              }
            />
            <Section className="scrollbar-thumb-secondary">
              {anime.characters.slice(0, 10).map((character) => (
                <CharacterCard character={character} key={character.id} />
              ))}
            </Section>
          </>
        )}

        {anime.recommendations && anime.recommendations.length && (
          <>
            <SectionHeading
              title="Recommendations"
              className="mt-4 mb-2"
              dialogContent={
                <DialogContent className=" flex flex-wrap justify-center overflow-y-auto max-h-[80%]">
                  {anime.recommendations.map((recommendation) => (
                    <RecommendationCard
                      recommendation={recommendation}
                      key={recommendation.id}
                    />
                  ))}
                </DialogContent>
              }
            />
            <Section className="scrollbar-thumb-primary">
              {anime.recommendations.slice(0, 10).map((recommendation) => (
                <RecommendationCard
                  recommendation={recommendation}
                  key={recommendation.id}
                />
              ))}
            </Section>
          </>
        )}

        {anime.artwork && anime.artwork.length && (
          <>
            <SectionHeading
              title="Artworks"
              className="mt-4 mb-2"
              dialogContent={
                <DialogContent
                  className="max-h-[80%] h-full max-w-[80%] w-full overflow-y-auto scrollbar-none"
                  style={
                    {
                      "--scrollbar-thumb": `${anime.color}`,
                    } as React.CSSProperties
                  }
                >
                  <ArtworkGrid anime={anime} />
                </DialogContent>
              }
            />
            <div className="episode-grid">
              {anime.artwork?.map((art, idx) => (
                <ArtworkCard art={art} key={idx} color={anime.color} />
              ))}
            </div>
          </>
        )}
      </main>
    </Page>
  );
}
