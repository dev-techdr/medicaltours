"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HeroVideoBackgroundProps = {
  src: string;
  poster: string;
  posterAlt: string;
};

export function HeroVideoBackground({ src, poster, posterAlt }: HeroVideoBackgroundProps) {
  const [reduceMotion, setReduceMotion] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const video = videoRef.current;
    if (!video) return;

    // Playback rate controls the "slow motion" feel for the background video.
    // Keep it subtle so the hero text remains visually stable.
    video.playbackRate = 0.75;

    // Some browsers require an explicit play() call after muting/autoplay rules.
    // Ignore failures since we still render the poster fallback when motion is reduced.
    void video.play().catch(() => undefined);
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0" aria-hidden>
      {reduceMotion ? (
        <Image
          src={poster}
          alt={posterAlt}
          fill
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className="object-cover object-[center_25%]"
        />
      ) : (
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-[center_25%]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="media-overlay media-overlay-hero absolute inset-0" />
    </div>
  );
}
