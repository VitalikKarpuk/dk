"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  onFinish: () => void;
  duration?: number;
};

export default function IntroVideo({ onFinish, duration = 3000 }: Props) {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    document.body.classList.add("intro-locked");
    return () => {
      document.body.classList.remove("intro-locked");
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => setReady(true);
    video.addEventListener("canplay", markReady, { once: true });
    video.addEventListener("loadeddata", markReady, { once: true });
    video.addEventListener("error", markReady, { once: true });

    const readinessFallback = window.setTimeout(markReady, 800);

    return () => {
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("error", markReady);
      window.clearTimeout(readinessFallback);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setVisible(false), duration);
    return () => window.clearTimeout(timer);
  }, [ready, duration]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 40%, #D9E6F5 0%, #EBE6DC 55%, #FFFFFF 100%)",
            }}
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.video
            aria-hidden
            className="absolute inset-0 z-[5] h-full w-full object-cover scale-125"
            src="/intro.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 0.7 : 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ filter: "blur(40px) saturate(1.1)" }}
          />

          <motion.video
            ref={videoRef}
            className="relative z-10 max-h-[100svh] max-w-[100vw] h-auto w-auto object-contain"
            src="/intro.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: ready ? 1 : 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
