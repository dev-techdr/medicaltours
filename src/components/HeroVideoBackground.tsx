"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";

type HeroVideoBackgroundProps = {
  src: string;
  poster: string;
  posterAlt: string;
};

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroVideoBackground({ src, poster, posterAlt }: HeroVideoBackgroundProps) {
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const video = videoRef.current;
    if (!video) return;

    // Playback rate controls the "slow motion" feel for the background video.
    // Keep it subtle so the hero text remains visually stable.
    video.playbackRate = 0.75;

    // Some browsers require an explicit play() call after muting/autoplay rules.
    // Ignore failures — poster Image underneath still covers the hero.
    void video.play().catch(() => undefined);
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0" aria-hidden>
      {/* Always-on poster reserves LCP paint; video fades in on top when allowed */}
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
      {!reduceMotion ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
      <div className="media-overlay media-overlay-hero absolute inset-0" />
    </div>
  );
}
