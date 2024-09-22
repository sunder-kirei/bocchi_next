"use client";

import React, {
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
  VideoHTMLAttributes,
} from "react";
import Hls from "hls.js";
import { twMerge } from "tailwind-merge";
import { Watch } from "@/types/api/watch";
import { Button } from "@/components/ui/button";

interface HLSPlayerProps extends HTMLAttributes<HTMLElement> {
  data: Watch;
}

export const HLSPlayer: React.FC<HLSPlayerProps> = ({
  className,
  data,
  ...props
}) => {
  const [src, setSrc] = useState(
    data.sources.find((s) => s.quality === "default")?.url ??
      data.sources[0].url
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls({
        xhrSetup: (xhr: XMLHttpRequest) => {
          // Add the custom Referer header here
          xhr.setRequestHeader("Referer", data.headers.Referer);
        },
      });

      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        if (videoRef.current) {
          // videoRef.current.muted = false;
        }
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current) {
      // For browsers that support HLS natively (like Safari)
      videoRef.current.src = src;
    }
  }, [src]);

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
        autoPlay
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
      </div>
    </div>
  );
};
