"use client";

import { Badge, Button, Reveal } from "@/components/ui";
import { COLORS, CONTAINER, SECTION_PADDING, TYPE } from "@/lib/design";
import { DIAGNOSTIC_FORM_URL } from "@/lib/site";

const POINTS = [
  "Поговорим о вашем запросе и ситуации",
  "Определим ключевые моменты, которые мешают достичь желаемого",
  "Подберем форматы работы, которые эффективно решат ваш запрос",
];

export default function Diagnostic() {
  return (
    <section
      id="diagnostic"
      /* Цель кнопки в шапке — `DIAGNOSTIC_CTA` ведёт сюда с любой
         страницы. `scroll-mt` того же размера, что у `ui/Section`:
         без него липкая шапка накрывает заголовок секции.

         `overflow-clip`, а не `hidden`, и это обязательное условие:
         `scroll-margin-top` не действует, если сама цель — контейнер
         прокрутки. С `hidden` секция приезжала под шапку впритык (все
         96px отступа пропадали), с `clip` обрезка та же, а контейнера
         прокрутки нет. */
      className="relative w-full scroll-mt-24 overflow-clip bg-navy text-on-accent"
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

      <div className={`relative flex flex-col items-start gap-12 lg:flex-row lg:items-end lg:justify-between ${CONTAINER} ${SECTION_PADDING}`}>
        {/* Тот же `Reveal`, что и на /leader: 0.6s, 24px, общая кривая.
            Своя пара `motion.div` держала здесь 0.8s и поле -80px —
            секция въезжала медленнее и раньше соседних. */}
        <Reveal className="max-w-2xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge
              tone="soft"
              icon={
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-on-accent-soft opacity-70" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-on-accent-soft" />
                </span>
              }
            >
              Бесплатно
            </Badge>
          </div>

          {/* Заголовок набран общей ступенью `section`, а не собственными
              text-4xl/5xl/6xl с `font-bold`: на остальном сайте заголовки
              идут Manrope 500, и жирное начертание здесь читалось чужим. */}
          <h2 style={TYPE.section}>
            <em className="italic text-accent-soft" style={TYPE.italic}>
              Бесплатная
            </em>{" "}
            диагностическая встреча
          </h2>

          <p
            className="mt-6 max-w-xl"
            style={{ ...TYPE.lead, color: COLORS.onAccentMuted }}
          >
            Короткий разговор, чтобы понять ваш запрос и определить подходящий
            формат роста для вас
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {POINTS.map((point, i) => (
              <li
                key={point}
                className="flex items-start gap-3"
                style={{ ...TYPE.body, color: COLORS.onAccentMuted }}
              >
                <span
                  aria-hidden
                  className="mt-2 h-px w-6 shrink-0 bg-accent-soft"
                />
                {/* Не /40: на 10px это давало 3.81 — ниже AA. Иерархию
                    относительно соседнего текста (/80) держит кегль. */}
                <span
                  className="tabular-nums"
                  style={{ ...TYPE.eyebrow, color: COLORS.onAccentMuted }}
                >
                  0{i + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={0.08}
          className="flex w-full flex-col items-start gap-5 lg:w-auto lg:items-end"
        >
          <Button
            href={DIAGNOSTIC_FORM_URL}
            variant="onDark"
            size="lg"
            aria-label="Записаться на бесплатную диагностическую встречу"
          >
            Записаться бесплатно
          </Button>

          <div className="flex flex-col gap-1.5 lg:items-end">
            <p style={{ ...TYPE.eyebrow, color: COLORS.onAccentMuted }}>
              онлайн
            </p>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
