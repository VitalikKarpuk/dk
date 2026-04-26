"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

const FOCUS_TICKER = [
  "Тревога",
  "Отношения",
  "Кризис",
  "Самооценка",
  "Травма",
  "Выгорание",
];

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-[560px] overflow-hidden bg-background md:min-h-[680px] lg:min-h-[760px]"
      aria-label="Обложка практики"
    >
      <Image
        src="/HeroBannerBg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover object-[72%_center]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-background via-background/90 to-background/40 md:via-background/82 md:to-transparent"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col justify-center px-6 pt-16 pb-14 md:px-12 md:pt-24 md:pb-20 min-h-[inherit]">
        <div className="relative flex flex-col gap-10 md:max-w-[58%] md:gap-12 lg:max-w-[54%]">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
            className="relative z-10 font-[family-name:var(--font-editorial)] leading-[0.92] font-medium tracking-[-0.015em] text-foreground"
          >
            <span className="block text-[clamp(56px,9.5vw,124px)]">Дарья</span>
            <span className="-mt-[0.04em] flex items-end gap-4 pl-[0.12em] text-[clamp(56px,9.5vw,124px)] leading-none">
              <span className="font-normal text-accent italic">
                Карпук
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
            className="relative z-10 max-w-xl text-lg leading-[1.55] text-pretty text-foreground md:text-xl"
          >
            <span
              aria-hidden
              className="mr-3 inline-block h-[3px] w-10 -translate-y-[6px] bg-foreground align-middle"
            />
            <span className="font-semibold text-foreground">
              Дипломированный психолог и коуч, создатель и автор программ по профессиональному и финансовому росту, спикер республиканских проектов.
            </span>
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="relative z-10 flex divide-x divide-surface-strong border-y border-surface-strong"
          >
            <Stat value="5000+" label="Сессий" />
            <Stat value="7 лет" label="Практики"  />
            <Stat value="800+" label="Клиентов" />
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  trend,
}: {
  value: string;
  label: string;
  trend?: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2 px-4 py-5 md:px-5 md:py-6">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-[family-name:var(--font-display)] text-2xl font-semibold tabular-nums text-foreground md:text-3xl">
          {value}
        </span>
        {trend && (
          <span className="font-[family-name:var(--font-display)] text-[9px] tracking-[0.2em] text-accent uppercase tabular-nums">
            {trend}
          </span>
        )}
      </div>
      <span className="text-[10px] tracking-[0.28em] text-muted uppercase">
        {label}
      </span>
    </div>
  );
}
