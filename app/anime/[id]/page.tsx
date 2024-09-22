import { Section } from "@/app/(components)/Section";
import { SectionHeading } from "@/app/(components)/SectionHeading";
import { Page } from "@/components/layout/Page";
import { DialogContent } from "@/components/ui/dialog";
import { fetchInfo } from "@/lib/query/fetchInfo";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { CharacterCard } from "./(components)/CharacterCard";
import { EpisodeList } from "./(components)/EpisodeList";
import { RecommendationCard } from "./(components)/RecommendationCard";
import { RelationCard } from "./(components)/RelationCard";
import Image from "next/image";
import ImageWithFallback from "@/components/ImageWithFallback";
import { ArtworkCard } from "./(components)/ArtworkCard";

export default async function InfoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const anime = await fetchInfo(id);

  return (
    <Page className="px-0">
      <div className="w-full h-72 relative flex items-end justify-end p-2 gap-2 bg-black/30">
        <img
          src={anime.cover}
          alt="cover"
          className="-z-10 absolute w-full h-full top-0 left-0 object-cover object-center"
        />
        <div
          style={{
            backgroundColor: anime.color,
          }}
          className="text-white px-4 py-2 w-fit rounded"
        >
          {anime.rating / 10}
        </div>
        {anime.isAdult && (
          <div className="text-white px-4 py-2 w-fit rounded bg-red-600">
            NSFW
          </div>
        )}
        {anime.nextAiringEpisode && (
          <div
            className="flex items-center absolute top-2 right-2 gap-x-2 px-4 py-2 rounded text-white"
            style={{
              backgroundColor: anime.color,
            }}
          >
            <div className="size-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>
              {format(
                new Date(anime.nextAiringEpisode.airingTime * 1000),
                "dd MMM, yyyy hh:mm a"
              )}
            </span>
          </div>
        )}
      </div>
      <main className="max-w-screen-lg mx-auto w-full px-4">
        <div className="w-full flex">
          <div
            className="basis-52 shrink-0 grow-0 aspect-[3/4] bg-cover rounded shadow-lg -mt-24 z-10"
            style={
              {
                backgroundImage: `url(${anime.image})`,
                "--tw-shadow-color": anime.color,
                "--tw-shadow": "var(--tw-shadow-colored)",
              } as React.CSSProperties
            }
          />
          <div
            className="py-4 px-6 w-full flex flex-col h-fit"
            style={{
              color: anime.color,
            }}
          >
            <span className="text-lg line-clamp-2">{anime.title.english}</span>
            <div className="data flex flex-col gap-1 my-2">
              <div className="flex">
                <span className="w-full">Episodes:</span>
                <span className="w-full">
                  {anime.currentEpisode} / {anime.totalEpisodes}
                </span>
              </div>
              <div className="flex">
                <span className="w-full">Season:</span>
                <span className="w-full">
                  {anime.season} {anime.startDate.year}
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
        </div>

        <Link
          href={``}
          className="px-4 py-2 w-full rounded-md mt-8 text-xl text-white text-center flex gap-x-2 items-center justify-center"
          style={{
            backgroundColor: anime.color,
          }}
        >
          Start Watching
        </Link>
        <Link
          href={``}
          className="px-4 py-2 w-full rounded-md mt-2 text-xl text-white text-center flex gap-x-2 items-center justify-center bg-accent"
        >
          Add to list
        </Link>

        <SectionHeading title="Description" className="mt-4 mb-2" />
        <p
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: anime.description }}
        />

        <EpisodeList anime={anime} />

        <SectionHeading
          title="Relations"
          className="mt-4 mb-2"
          dialogContent={
            <DialogContent className="bg-white flex flex-wrap justify-center overflow-y-auto max-h-[80%]">
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

        <SectionHeading
          title="Characters"
          className="mt-4 mb-2"
          dialogContent={
            <DialogContent className="bg-white flex flex-wrap justify-center overflow-y-auto max-h-[80%]">
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

        <SectionHeading
          title="Recommendations"
          className="mt-4 mb-2"
          dialogContent={
            <DialogContent className="bg-white flex flex-wrap justify-center overflow-y-auto max-h-[80%]">
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

        <SectionHeading
          title="Artworks"
          className="mt-4 mb-2"
          dialogContent={
            <DialogContent className="bg-white flex flex-wrap justify-center overflow-y-auto max-h-[80%]">
              {anime.recommendations.map((recommendation) => (
                <RecommendationCard
                  recommendation={recommendation}
                  key={recommendation.id}
                />
              ))}
            </DialogContent>
          }
        />
        <div className="episode-grid">
          {anime.artwork.map((art, idx) => (
            <ArtworkCard art={art} key={idx} color={anime.color} />
          ))}
        </div>
      </main>
      <div className="h-[1000px]"></div>
    </Page>
  );
}
