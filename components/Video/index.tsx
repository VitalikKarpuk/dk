"use client";

import { useRef, useState } from "react";

const COLORS = {
  softOffWhite: "#f9f8f6",
  pureWhite: "#ffffff",
  pitchBlack: "#171417",
  boardroomNavy: "#0c1754",
  brandElectric: "#2545ff",
  lilacAccent: "#d9d4ff",
  feedbackYellow: "#ffc13a",
  lightCoolGray: "#eaebf8",
  mediumGray: "#222222",
} as const;

const FONT_HEADING = "var(--font-manrope), Arial, sans-serif";
const FONT_ACCENT = "var(--font-editorial), cursive";
const FONT_BODY = "var(--font-inter), system-ui, sans-serif";

const VIDEO_SRC = "/videoFinal.mp4";
// TODO: replace with the real questionnaire URL
const FORM_URL = "https://example.com/anketa";

export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setPlaying(true);
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Видео"
      style={{ backgroundColor: COLORS.softOffWhite }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-[8%] h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: COLORS.lilacAccent, opacity: 0.55 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 right-[10%] h-72 w-72 rounded-full blur-3xl"
        style={{ backgroundColor: COLORS.lightCoolGray, opacity: 0.7 }}
      />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center gap-10 px-6 py-20 md:gap-12 md:px-12 md:py-28">
        <div className="flex flex-col items-center gap-5 text-center">
          <div
            className="flex items-center gap-3"
            style={{
              fontFamily: FONT_BODY,
              fontSize: "12px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: COLORS.brandElectric,
            }}
          >

          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-5 md:-inset-7"
            style={{
              border: `1px solid ${COLORS.lilacAccent}`,
              borderRadius: "24px",
            }}
          />

          <div
            className="relative aspect-square w-[80vw] max-w-[480px] overflow-hidden"
            style={{
              borderRadius: "16px",
              border: `1px solid ${COLORS.lilacAccent}`,
              backgroundColor: COLORS.boardroomNavy,
            }}
          >
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              className="absolute inset-0 h-full w-full object-contain"
              controls={playing}
              playsInline
              preload="metadata"
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />

            {!playing && (
              <button
                type="button"
                onClick={play}
                aria-label="Воспроизвести видео"
                className="group absolute inset-0 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(12,23,84,0.18) 0%, rgba(12,23,84,0.5) 100%)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute h-20 w-20 rounded-full opacity-50 md:h-24 md:w-24"
                  style={{
                    backgroundColor: COLORS.brandElectric,
                    animation: "video-pulse 2.4s ease-out infinite",
                  }}
                />
                <span
                  aria-hidden
                  className="absolute h-20 w-20 rounded-full opacity-30 md:h-24 md:w-24"
                  style={{
                    backgroundColor: COLORS.brandElectric,
                    animation: "video-pulse 2.4s ease-out infinite",
                    animationDelay: "1.2s",
                  }}
                />

                <span
                  className="relative flex h-20 w-20 items-center justify-center transition-transform duration-300 group-hover:scale-105 md:h-24 md:w-24"
                  style={{
                    backgroundColor: COLORS.brandElectric,
                    color: COLORS.pureWhite,
                    borderRadius: "100px",
                    boxShadow: `0 0 0 4px ${COLORS.softOffWhite}`,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    fill="currentColor"
                    aria-hidden
                    className="ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-90"
            style={{
              backgroundColor: COLORS.brandElectric,
              color: COLORS.pureWhite,
              borderRadius: "100px",
              padding: "14px 32px",
              fontFamily: FONT_BODY,
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: 1.4,
            }}
          >
            Записаться на консультацию
            <span aria-hidden>→</span>
          </a>
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: "12px",
              color: COLORS.mediumGray,
            }}
          >
            Анкета — 1 минута
          </span>
        </div>
      </div>

      <style>{`
        @keyframes video-pulse {
          0% { transform: scale(1); opacity: 0.5; }
          80% { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="video-pulse"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
