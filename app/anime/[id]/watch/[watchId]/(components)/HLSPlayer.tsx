"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Watch } from "@/types/api/watch";
import Hls from "hls.js";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface HLSPlayerProps extends HTMLAttributes<HTMLElement> {
  data: Watch;
  animeID: string;
  episodeID: string;
  episode: number;
}

export const HLSPlayer: React.FC<HLSPlayerProps> = ({
  className,
  data,
  animeID,
  episodeID,
  episode,
  ...props
}) => {
  const [src, setSrc] = useState(
    data.sources.find((s) => s.quality === "default")?.url ??
      data.sources[0].url
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const getDuration = async () => {
      const res = await db.history.get(animeID);
      return res;
    };

    const setDuration = async (duration?: number) => {
      try {
        if (!duration) return;
        const dbID = await db.history.put({
          duration,
          animeID,
          episode,
          episodeID,
          timestamp: new Date(),
        });
        return dbID;
      } catch (err) {
        console.error(err);
      }
    };

    if (videoRef.current && Hls.isSupported()) {
      videoRef.current.addEventListener("timeupdate", () => {
        setDuration(videoRef.current?.currentTime);
      });

      const hls = new Hls({
        // xhrSetup: (_xhr: XMLHttpRequest) => {
        // Add the custom Referer header here
        // xhr.setRequestHeader("Referer", data.headers.Referer);
        // },
      });

      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MEDIA_ATTACHED, async () => {
        if (videoRef.current) {
          const duration = await getDuration();
          if (duration?.episodeID === episodeID) {
            videoRef.current.currentTime = duration?.duration ?? 0;
          }
        }
      });

      const keyListeners: (
        this: HTMLVideoElement,
        ev: KeyboardEvent
      ) => void = (e) => {
        e.preventDefault();
        if (e.key === "f") {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            videoRef.current?.requestFullscreen();
          }
        }
        if (e.key === " ") {
          if (document.activeElement !== videoRef.current) {
            if (videoRef.current?.paused) {
              videoRef.current?.play();
            } else {
              videoRef.current?.pause();
            }
          }
        }
        if (e.key === "m") {
          if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
          }
        }
      };

      videoRef.current.addEventListener("keydown", keyListeners);

      return () => {
        hls.destroy();
        if (videoRef.current) {
          videoRef.current.removeEventListener("keydown", keyListeners);
        }
      };
    } else if (videoRef.current) {
      // For browsers that support HLS natively (like Safari)
      videoRef.current.src = src;
    }
  }, [src, data, animeID, episode, episodeID]);

  return (
    <div
      className={twMerge("w-full h-full flex flex-col gap-y-4", className)}
      {...props}
    >
      <video
        ref={videoRef}
        className="aspect-video w-full rounded"
        controls
        playsInline
      />

      <div className="quality flex flex-wrap gap-2 mx-auto">
        {data.sources.map((s) => (
          <Button
            key={s.url}
            variant="outline"
            className={twMerge(
              "capitalize transition-all duration-300",
              s.url === src && "bg-primary text-white"
            )}
            onClick={() => {
              setSrc(s.url);
            }}
          >
            {s.quality}
          </Button>
        ))}
        <Button variant="outline" asChild>
          <a href={data.download} target="_blank">
            Download
          </a>
        </Button>
      </div>
    </div>
  );
};
