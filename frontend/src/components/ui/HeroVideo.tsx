"use client";

import { useEffect, useRef } from "react";

// Muted, looping background video. It's started from JS rather than the
// autoplay attribute, so visitors who ask for reduced motion only ever see
// the still poster frame.
export function HeroVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduceMotion.matches) {
        video.pause();
      } else {
        video.muted = true; // browsers only allow muted videos to play on their own
        video.play().catch(() => {}); // e.g. battery saver blocks it — the poster stays
      }
    };
    sync();
    reduceMotion.addEventListener("change", sync);
    return () => reduceMotion.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      className={className}
    />
  );
}
