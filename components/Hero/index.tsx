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
      className="relative w-full overflow-hidden"
      aria-label="Обложка практики"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-background" />

      <video
        aria-hidden
        autoPlay
        muted
        playsInline
        preload="metadata"
        className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full object-cover opacity-70 sm:block motion-reduce:hidden"
        src="/intro.mp4"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-background/35"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-50 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-48"
        style={{
          background:
            "linear-gradient(0deg, var(--background) 0%, rgba(244,246,249,0) 100%)",
        }}
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

      <div className="relative mx-auto w-full max-w-[1480px] px-6 pt-14 pb-8 md:px-14 md:pt-20 md:pb-10">
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

        <div className="relative mt-8 grid grid-cols-1 items-start gap-y-8 md:mt-14 md:grid-cols-12 md:gap-x-8 md:gap-y-10">
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
            className="pointer-events-none absolute -top-6 -left-2 z-0 hidden font-[family-name:var(--font-editorial)] text-[clamp(200px,32vw,440px)] leading-none font-medium tracking-tighter select-none md:block"
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
            className="relative z-10 order-1 font-[family-name:var(--font-editorial)] leading-[0.92] font-medium tracking-[-0.015em] text-foreground md:col-span-7"
          >
            <span className="mb-2 flex items-center gap-3 font-[family-name:var(--font-display)] text-[10px] font-medium tracking-[0.35em] text-muted uppercase">
              <span className="h-px w-8 bg-foreground" />
              Daria Karpuk
            </span>
            <span className="block text-[clamp(60px,15.5vw,164px)]">Дарья</span>
            <span className="-mt-[0.04em] flex items-end gap-4 pl-[0.12em] text-[clamp(60px,15.5vw,164px)] leading-none">
              <span className="font-normal text-accent italic">
                Карпук
                <span className="ml-[0.04em] align-baseline">.</span>
              </span>
              <span
                aria-hidden
                className="mb-[0.28em] hidden font-[family-name:var(--font-display)] text-[11px] leading-tight font-medium tracking-[0.3em] text-muted uppercase md:flex md:flex-col md:gap-1"
              >
                <span>Клин.</span>
                <span>Психолог</span>
                <span className="text-foreground">—</span>
                <span>Психо-</span>
                <span>терапевт</span>
              </span>
            </span>
          </motion.h1>

          <motion.figure
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative z-10 order-2 md:col-span-5"
          >
            <div className="group relative aspect-[4/5] w-full overflow-hidden bg-surface-strong">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.12, filter: "blur(18px)", opacity: 0 }}
                animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 1.5, ease: EASE }}
              >
                <Image
                  src="/DariaImg.jpg"
                  alt="Портрет Дарьи Карпук, клинического психолога"
                  fill
                  priority
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transform-none"
                />
              </motion.div>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(20,20,22,0) 45%, rgba(20,20,22,0.55) 100%)",
                }}
              />

              <CornerMarks />

              <span className="absolute top-4 left-4 font-[family-name:var(--font-display)] text-[10px] tracking-[0.3em] text-white/80 uppercase">
                Сессия 001 <span className="mx-1 opacity-50">/</span>{" "}
                <span className="opacity-70">50 мин</span>
              </span>

              <span className="absolute top-4 right-4 flex h-9 items-center gap-2 rounded-full bg-foreground/70 px-3 font-[family-name:var(--font-display)] text-[10px] tracking-[0.25em] text-white uppercase backdrop-blur-md">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Очно · Онлайн
              </span>

              <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3">
                <div className="flex flex-col gap-1 font-[family-name:var(--font-display)] text-white">
                  <span className="text-[9px] tracking-[0.3em] text-white/60 uppercase">
                    Сейчас
                  </span>
                  <span className="text-[13px] leading-tight font-semibold tracking-[0.02em]">
                    Принимаю запись на Q2
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-white/70 uppercase">
                    КПТ <Dot tone="light" /> Схема <Dot tone="light" /> EMDR
                  </span>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-md transition-all duration-500 group-hover:border-accent group-hover:bg-accent motion-reduce:transform-none">
                  <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </div>

            <figcaption className="mt-4 flex items-center justify-between gap-4 border-t border-surface-strong pt-3 font-[family-name:var(--font-display)] text-[10px] tracking-[0.28em] text-muted uppercase md:grid md:grid-cols-3">
              <span>Кабинет · Москва</span>
              <span className="hidden text-center tabular-nums md:inline">
                55.75° N / 37.61° E
              </span>
              <span className="flex items-center justify-end gap-2 text-foreground">
                Принимаю
                <span
                  aria-hidden
                  className="inline-block h-px w-6 bg-foreground"
                />
              </span>
            </figcaption>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="relative z-10 order-3 flex flex-col gap-8 md:col-span-7"
          >
            <p className="relative max-w-xl text-lg leading-[1.55] text-pretty text-[#2A2824] md:text-xl">
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
              <span className="text-[#6B7280]">
                Помогаю проходить через тревогу, кризис и сложные периоды в
                отношениях — без оценок, бережно и в своём темпе.
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <button
                type="button"
                aria-label="Записаться на консультацию"
                className="group relative inline-flex min-h-[56px] items-center gap-3 overflow-hidden rounded-sm bg-foreground px-8 py-4 text-sm font-medium tracking-wide text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-white/70 transition-colors duration-300 group-hover:bg-white" />
                  Записаться на сессию
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
              </button>

              <button
                type="button"
                aria-label="Связаться с психологом"
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
              </button>

              <div className="hidden items-center gap-2 pl-4 font-[family-name:var(--font-display)] text-[10px] tracking-[0.3em] text-muted uppercase md:flex">
                <span className="h-px w-8 bg-surface-strong" />
                Отклик 24 ч
              </div>
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
            className="relative z-10 order-4 flex divide-x divide-surface-strong border-y border-surface-strong md:col-span-5"
          >
            <Stat value="1200+" label="Сессий" trend="+120/год" />
            <Stat value="12 лет" label="Практики" trend="2014" />
            <Stat value="4" label="Направления" trend="РФ · EU" />
          </motion.dl>

        </div>

        <div className="mt-10 sm:hidden">
          <div className="mb-3 flex items-center justify-between font-[family-name:var(--font-display)] text-[10px] tracking-[0.3em] text-muted uppercase">
            <span className="flex items-center gap-2 text-foreground">
              <span className="h-px w-6 bg-foreground" />
              Короткое видео
            </span>
            <span>Нажмите, чтобы посмотреть</span>
          </div>
          <div className="relative mx-auto aspect-[832/1104] w-full max-w-[420px] overflow-hidden rounded-lg border border-surface-strong bg-surface-strong/40">
            <video
              controls
              playsInline
              preload="none"
              poster="/DariaImg.jpg"
              className="h-full w-full object-cover"
              src="/intro.mp4"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          aria-hidden
          className="mt-10 hidden items-center gap-4 overflow-hidden border-t border-surface-strong pt-4 font-[family-name:var(--font-display)] text-[11px] tracking-[0.35em] text-muted uppercase md:flex"
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

function Dot({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span
      aria-hidden
      className={`mx-2 inline-block h-1 w-1 rounded-full align-middle ${
        tone === "light" ? "bg-white/50" : "bg-surface-strong"
      }`}
    />
  );
}

function CornerMarks() {
  const base =
    "absolute h-4 w-4 border-white/60 transition-colors duration-500 group-hover:border-accent";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-3">
      <span className={`${base} top-0 left-0 border-t border-l`} />
      <span className={`${base} top-0 right-0 border-t border-r`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} right-0 bottom-0 border-r border-b`} />
    </div>
  );
}
