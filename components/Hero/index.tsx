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
      className="relative w-full overflow-hidden bg-background"
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

      <aside
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-10 hidden h-full w-8 md:block"
      >
        <div className="absolute top-0 left-4 h-full w-px bg-surface-strong" />
        <span className="absolute top-1/2 left-[6px] origin-left -translate-y-1/2 rotate-[-90deg] font-[family-name:var(--font-display)] text-[10px] tracking-[0.45em] whitespace-nowrap text-muted uppercase">
          Психолог · Практика 2026 · Москва
        </span>
      </aside>

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-6 pt-14 pb-12 md:px-14 md:pt-20 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-surface-strong pb-5 text-[11px] font-medium tracking-[0.28em] text-muted uppercase"
        >
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Принимаю запись · Q2 2026
          </span>
          <span className="hidden md:inline">
            КПТ <Dot /> Схема-терапия <Dot /> EMDR
          </span>
          <span className="flex items-center gap-3">
            <span className="hidden h-px w-6 bg-surface-strong md:inline-block" />
            Практика № 01 / 2026
          </span>
        </motion.div>

        <div className="relative mt-10 flex flex-col gap-10 md:mt-16 md:max-w-[58%] md:gap-12 lg:max-w-[54%]">
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
            className="pointer-events-none absolute -top-8 -left-2 z-0 hidden font-[family-name:var(--font-editorial)] text-[clamp(160px,22vw,320px)] leading-none font-medium tracking-tighter select-none md:block"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(120, 116, 109, 0.18)",
            }}
          >
            01
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
            className="relative z-10 font-[family-name:var(--font-editorial)] leading-[0.92] font-medium tracking-[-0.015em] text-foreground"
          >
            <span className="mb-2 flex items-center gap-3 font-[family-name:var(--font-display)] text-[10px] font-medium tracking-[0.35em] text-muted uppercase">
              <span className="h-px w-8 bg-foreground" />
              Daria Karpuk
            </span>
            <span className="block text-[clamp(56px,9.5vw,124px)]">Дарья</span>
            <span className="-mt-[0.04em] flex items-end gap-4 pl-[0.12em] text-[clamp(56px,9.5vw,124px)] leading-none">
              <span className="font-normal text-accent italic">
                Карпук
                <span className="ml-[0.04em] align-baseline">.</span>
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
            className="relative z-10 max-w-xl text-lg leading-[1.55] text-pretty text-[#2A2824] md:text-xl"
          >
            <span
              aria-hidden
              className="absolute -left-14 hidden font-[family-name:var(--font-display)] text-[10px] tracking-[0.3em] text-muted md:inline-block"
              style={{ top: "0.55em" }}
            >
              §01
            </span>
            <span
              aria-hidden
              className="mr-3 inline-block h-[3px] w-10 -translate-y-[6px] bg-foreground align-middle"
            />
            <span className="font-semibold text-foreground">
              Клинический психолог и психотерапевт.
            </span>{" "}
            <span className="text-muted">
              Помогаю проходить через тревогу, кризис и сложные периоды в
              отношениях — без оценок, бережно и в своём темпе.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="relative z-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <a
              href="https://docs.google.com/forms/d/1IGPKJW1L88uJpZK8hkIiJwrn3VvRQv60zWTKneoW9aM/viewform"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Заполнить анкету"
              className="group relative inline-flex min-h-[56px] items-center gap-3 overflow-hidden rounded-sm bg-foreground px-8 py-4 text-sm font-medium tracking-wide text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-white/70 transition-colors duration-300 group-hover:bg-white" />
                Заполнить анкету
              </span>
              <span
                aria-hidden
                className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 motion-reduce:transform-none"
              >
                →
              </span>
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 motion-reduce:transform-none"
              />
            </a>

            <a
              href="https://www.instagram.com/daria_karpuk.psy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Связаться через Instagram"
              className="group relative inline-flex min-h-[44px] items-center py-1 text-sm font-medium tracking-wide text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              <span>Связаться</span>
              <span
                aria-hidden
                className="absolute bottom-2 left-0 h-px w-full origin-right bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-0 motion-reduce:transform-none"
              />
              <span
                aria-hidden
                className="absolute bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform delay-200 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:transform-none"
              />
            </a>

            <div className="hidden items-center gap-2 pl-4 font-[family-name:var(--font-display)] text-[10px] tracking-[0.3em] text-muted uppercase md:flex">
              <span className="h-px w-8 bg-surface-strong" />
              Отклик 24 ч
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="relative z-10 flex divide-x divide-surface-strong border-y border-surface-strong"
          >
            <Stat value="1200+" label="Сессий" trend="+120/год" />
            <Stat value="12 лет" label="Практики" trend="2014" />
            <Stat value="4" label="Направления" trend="РФ · EU" />
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          aria-hidden
          className="mt-12 hidden items-center gap-4 overflow-hidden border-t border-surface-strong pt-4 font-[family-name:var(--font-display)] text-[11px] tracking-[0.35em] text-muted uppercase md:flex"
        >
          <span className="shrink-0 text-foreground">Фокус</span>
          <span className="shrink-0 h-px w-8 bg-surface-strong" />
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-6 gap-y-2">
            {FOCUS_TICKER.map((item, i) => (
              <span key={item} className="flex items-center gap-6">
                <span className={i === 0 ? "text-foreground" : undefined}>
                  {item}
                </span>
                {i < FOCUS_TICKER.length - 1 && (
                  <span className="h-1 w-1 rounded-full bg-surface-strong" />
                )}
              </span>
            ))}
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-3">
            <span>Листать</span>
            <span className="relative h-8 w-px overflow-hidden bg-surface-strong">
              <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-foreground" />
            </span>
          </div>
        </motion.div>
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

function Dot() {
  return (
    <span
      aria-hidden
      className="mx-2 inline-block h-1 w-1 rounded-full bg-surface-strong align-middle"
    />
  );
}
