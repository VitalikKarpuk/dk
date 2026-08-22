"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui";
import { CONTAINER, GUTTER, HERO_Y, TYPE } from "@/lib/design";

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

      <div className={`relative z-10 flex min-h-[inherit] flex-col justify-center ${CONTAINER} ${GUTTER} ${HERO_Y}`}>
        <div className="relative flex flex-col gap-10 md:max-w-[58%] md:gap-12 lg:max-w-[54%]">
          {/* Имя набрано тем же приёмом, что и заголовки остальных
              страниц: Manrope 500 и курсив Playfair электриком на
              ключевом слове. Раньше здесь была своя пара — обе строки
              Playfair и свой кегль до 124px, — и первый экран сайта
              выглядел набранным другой гарнитурой, чем весь сайт. */}
          {/* Появление — общий `Reveal` с шагом каскада 0.08s, тот же, что
              у первого экрана /leader. Раньше здесь стояли собственные
              `motion.*` с четвёртой на сайте кривой, длительностями
              1.1 / 0.9s и паузами 0.15 / 0.45 / 0.7s: заголовок главной
              въезжал заметно медленнее и вальяжнее, чем такой же
              заголовок соседней страницы. */}
          <Reveal className="relative z-10">
            <h1 className="text-foreground" style={TYPE.hero}>
              <span className="block">Дарья</span>
              <span className="block pl-[0.12em] text-accent italic" style={TYPE.italic}>
                Карпук
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.08} className="relative z-10">
            <p
              className="max-w-xl text-pretty text-foreground"
              style={TYPE.lead}
            >
              <span
                aria-hidden
                className="mr-3 inline-block h-[3px] w-10 -translate-y-[6px] bg-foreground align-middle"
              />
              <span className="font-semibold text-foreground">
                Дипломированный психолог и коуч, создатель и автор программ по профессиональному и финансовому росту, спикер республиканских проектов.
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.16} className="relative z-10">
            <dl className="flex divide-x divide-surface-strong border-y border-surface-strong">
              <Stat value="5000+" label="Сессий" />
              <Stat value="7 лет" label="Практики"  />
              <Stat value="800+" label="Клиентов" />
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Одна цифра из полосы под вводным абзацем.
 *
 * Подпись набрана надзаголовком, а у него разрядка 0.28em: на 375px
 * «КЛИЕНТОВ» с ней требовало 126px при 109 доступных, флексу сжиматься
 * было некуда (`min-width: auto` у текста), и последняя буква уезжала
 * под правый край экрана. Поэтому кегль подписи здесь текучий: 10px на
 * узком экране, штатные 12 — от 462px и шире. Разрядка, гарнитура и
 * капитель остаются токенными, меняется только размер.
 */
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
    <div className="flex flex-1 flex-col gap-2 px-3 py-5 sm:px-4 md:px-5 md:py-6">
      <div className="flex items-baseline justify-between gap-2">
        <span className="tabular-nums text-foreground"
          style={TYPE.cardTitle}>
          {value}
        </span>
        {trend && (
          <span className="font-[family-name:var(--font-display)] text-[9px] tracking-[0.2em] text-accent uppercase tabular-nums">
            {trend}
          </span>
        )}
      </div>
      <span
        className="text-muted"
        style={{ ...TYPE.eyebrow, fontSize: "clamp(10px, 2.6vw, 12px)" }}
      >
        {label}
      </span>
    </div>
  );
}
