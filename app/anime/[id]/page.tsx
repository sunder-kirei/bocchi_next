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
    <>
      <Banner anime={anime} />
      <Page className="px-0">
        <main className="mx-auto w-full max-w-screen-lg px-4 pb-4 sm:pl-20">
          <div className="flex w-full">
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

          <SectionHeading title="Description" className="mb-2 mt-4" />
          <p
            className="text-justify"
            dangerouslySetInnerHTML={{ __html: anime.description }}
          />

          {anime.episodes && anime.episodes.length > 0 && (
            <EpisodeList anime={anime} />
          )}

          {anime.relations && anime.relations.length > 0 && (
            <>
              <SectionHeading
                title="Relations"
                className="mb-2 mt-4"
                dialogContent={
                  <DialogContent className="flex max-h-[80%] flex-wrap justify-center overflow-y-auto">
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

          {anime.characters && anime.characters.length > 0 && (
            <>
              <SectionHeading
                title="Characters"
                className="mb-2 mt-4"
                dialogContent={
                  <DialogContent className="flex max-h-[80%] flex-wrap justify-center overflow-y-auto">
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

          {anime.recommendations && anime.recommendations.length > 0 && (
            <>
              <SectionHeading
                title="Recommendations"
                className="mb-2 mt-4"
                dialogContent={
                  <DialogContent className="flex max-h-[80%] flex-wrap justify-center overflow-y-auto">
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

          {anime.artwork && anime.artwork.length > 0 && (
            <>
              <SectionHeading
                title="Artworks"
                className="mb-2 mt-4"
                dialogContent={
                  <DialogContent
                    className="h-full max-h-[80%] w-full max-w-[80%] overflow-y-auto scrollbar-none"
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
    </>
  );
}
