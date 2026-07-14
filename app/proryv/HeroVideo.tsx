"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.playbackRate = 0.5;
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/hero_banner.png"
      onLoadedMetadata={(e) => {
        e.currentTarget.playbackRate = 0.5;
      }}
      className="absolute inset-0 h-full w-full object-cover object-right"
    >
      <source src="/hero3.mp4" type="video/mp4" />
    </video>
  );
}
