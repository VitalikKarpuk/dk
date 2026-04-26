"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const FORM_URL =
  "https://docs.google.com/forms/d/1IGPKJW1L88uJpZK8hkIiJwrn3VvRQv60zWTKneoW9aM/viewform";

const POINTS = [
  "Поговорим о вашем запросе и ситуации",
  "Подберём подходящий формат работы",
  "Без обязательств — просто познакомимся",
];

export default function Diagnostic() {
  return (
    <section
      className="relative w-full overflow-hidden bg-foreground text-white"
      aria-label="Бесплатная диагностическая встреча"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 70% at 80% 0%, rgba(217,179,110,0.28) 0%, transparent 60%), radial-gradient(50% 60% at 0% 100%, rgba(217,179,110,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-start gap-12 px-6 py-20 md:px-12 md:py-28 lg:flex-row lg:items-end lg:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-2xl"
        >
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-soft/40 bg-accent-soft/15 px-3 py-1 font-[family-name:var(--font-display)] text-[11px] font-semibold tracking-[0.28em] text-accent-soft uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent-soft opacity-70" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-accent-soft" />
              </span>
              Бесплатно
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="font-[family-name:var(--font-editorial)] font-medium italic text-accent-soft">
              Бесплатная
            </span>{" "}
            диагностическая встреча
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Короткий разговор, чтобы понять ваш запрос и предложить подходящий формат — программу, индивидуальные сессии или курс.{" "}
            <span className="font-medium text-white">
              Без оплаты и без обязательств.
            </span>
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {POINTS.map((point, i) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm text-white/80 md:text-base"
              >
                <span
                  aria-hidden
                  className="mt-2 h-px w-6 shrink-0 bg-accent-soft"
                />
                <span className="font-[family-name:var(--font-display)] tabular-nums text-[10px] tracking-[0.3em] text-white/40 uppercase">
                  0{i + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="flex w-full flex-col items-start gap-5 lg:w-auto lg:items-end"
        >
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Записаться на бесплатную диагностическую встречу"
            className="group relative inline-flex min-h-[56px] items-center gap-3 overflow-hidden rounded-sm bg-white px-8 py-4 text-sm font-medium tracking-wide text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:outline-none"
          >
            <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-white">
              <span className="h-1 w-1 rounded-full bg-foreground/70 transition-colors duration-500 group-hover:bg-white/80" />
              Записаться бесплатно
            </span>
            <span
              aria-hidden
              className="relative z-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 group-hover:text-white motion-reduce:transform-none"
            >
              →
            </span>
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 motion-reduce:transform-none"
            />
          </a>

          <div className="flex flex-col gap-1.5 lg:items-end">
            <p className="font-[family-name:var(--font-display)] text-[11px] tracking-[0.3em] text-white/60 uppercase">
 онлайн
            </p>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
