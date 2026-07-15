"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // React can render `muted` unreliably as a DOM property; browsers block
    // autoplay for "unmuted" video and show a play button. Force it here.
    v.muted = true;
    v.defaultMuted = true;
    v.playbackRate = 0.5;

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    tryPlay();

    // Fallbacks: retry once on the first user gesture and whenever the tab
    // becomes visible again (covers iOS Low Power Mode / autoplay blocks).
    const onGesture = () => tryPlay();
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    window.addEventListener("touchstart", onGesture, { once: true, passive: true });
    window.addEventListener("pointerdown", onGesture, { once: true });
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("pointerdown", onGesture);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      controls={false}
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
