"use client";

import Image from "next/image";
import { Button, Reveal, Stagger, StaggerItem } from "@/components/ui";
import { COLORS, MEASURE, SECTION_INNER, TYPE } from "@/lib/design";

type Tone = "light" | "accent" | "canvas";

type Product = {
  title: string;
  description: string;
  cta: string;
  tone: Tone;
  span: string;
  count: string;
  decor: React.ReactNode;
  href?: string;
  photo?: {
    src: string;
    alt: string;
    /**
     * Точка кропа, если середина кадра — не то, что нужно показать.
     * Класс целиком, а не число: Tailwind ищет готовые имена классов в
     * исходниках и собранной из кусков строки не увидит.
     */
    position?: string;
  };
  photoLayout?: "top" | "side";
};

const PRODUCTS: Product[] = [
  {
    title: "Я ЛИДЕР",
    description:
      "7-недельная программа для экспертов, желающих вырасти профессионально и финансово",
    cta: "Подробнее",
    tone: "canvas",
    span: "md:col-span-4",
    count: "",
    decor: <DecorOrbit />,
    /* Тот же кадр, что на самой /leader (`OutcomesSection`): плитка и
       страница, куда она ведёт, показывают одну фотографию. Берётся
       webp из `public/leader/photos/`, а не исходный `groupPeople.JPG`:
       тот же снимок, но 1535×1024 и 114 КБ против 5875×3917 и 5,5 МБ. */
    photo: {
      src: "/leader/photos/group.webp",
      alt: "Группа участников программы «Я Лидер»",
      /* Кадр 3:2, люди стоят в верхней трети, а плитка режет его полосой
         21:9 — по центру в неё попадали ноги, а головы уходили за верхний
         край. 12% отсчитываются не от снимка, а от того, насколько окно
         кропа может по нему ездить, поэтому на десктопе видно 7–50%
         высоты кадра, на мобильной 16:9 — 5–62%: лица целиком в обоих. */
      position: "object-[center_12%]",
    },
    href: "/leader",
  },
  {
    title: "Индивидуальные консультации",
    description:
      "Формат работы полностью ориентированный на вас и ваши запросы. Такой подход позволяет убрать все мешающие аспекты вашему движению и получить ощутимые результаты",
    cta: "Подробнее",
    tone: "accent",
    span: "md:col-span-2",
    count: "",
    decor: <DecorDual />,
    href: "/individual",
    photo: {
      src: "/individ.JPG",
      alt: "Индивидуальные консультации",
    },
  },
  // {
  //   title: "Интенсив «Новая я»",
  //   description:
  //     "Короткий интенсивный формат для перезапуска: концентрированная работа над состоянием, опорой и новыми решениями за сжатый срок.",
  //   cta: "Узнать подробнее",
  //   tone: "light",
  //   span: "md:col-span-2",
  //   count: "интенсив",
  //   decor: <DecorSunrise />,
  // },
  {
    title: "Базовые законы жизни",
    description: "Курс для тех, кто хочет навести порядок в своей жизни, обрести ясность и начать двигаться по пути своего предназначения.",
    cta: "Подробнее",
    tone: "light",
    span: "md:col-span-2",
    count: "",
    decor: <DecorFoundation />,
    href: '/basic-laws',
    photo: {
      src: "/baseLife.JPG",
      alt: "Иллюстрация курса «Базовые законы жизни»",
    },
  },
];

export default function BentoGrid() {
  return (
    <section
      className={SECTION_INNER}
      aria-label="Направления практики"
    >
      <Reveal className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <h2 style={{ ...TYPE.display, color: COLORS.ink }}>
            Три программы —<br />
            три пути к{" "}
            <span className="text-accent italic" style={TYPE.italic}>
              результату.
            </span>
          </h2>
        </div>
      </Reveal>

      {/* Каскад тот же, что у карточек /leader: заголовок появляется
          первым, плитки — следом с общим шагом. Раньше каждая плитка
          несла собственный `whileInView` со своей кривой, длительностью
          0.7s и полем -80px, и ряд въезжал иначе, чем такой же ряд на
          соседней странице. */}
      <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5">
        {PRODUCTS.map((p, i) => (
          <BentoCard
            key={p.title}
            product={p}
            index={i}
            total={PRODUCTS.length}
          />
        ))}
      </Stagger>

    </section>
  );
}

function BentoCard({
  product,
  index,
  total,
}: {
  product: Product;
  index: number;
  total: number;
}) {
  const isAccent = product.tone === "accent";
  const isCanvas = product.tone === "canvas";

  /* Контур и тень сняты в `.card-frame` — общий для всего сайта. Здесь
     остаётся только заливка: тёмная плитка красила рамку в свой же navy,
     а на ховере вся сетка уходила в жёлтый, хотя на /leader тот же жест
     сделан акцентом. */
  const surfaceClass = isAccent
    ? "bg-navy text-on-accent"
    : isCanvas
      ? "bg-surface text-foreground"
      : "bg-card text-foreground";

  const mutedTextClass = isAccent ? "text-on-accent-muted" : "text-muted";
  const indexColorClass = isAccent ? "text-on-accent-muted" : "text-muted";
  const dividerClass = isAccent ? "bg-on-accent-line" : "bg-surface-strong";
  const countClass = isAccent ? "text-on-accent-muted" : "text-foreground/80";

  const fadeBgClass = isAccent
    ? "from-navy via-navy/70"
    : isCanvas
      ? "from-surface via-surface/70"
      : "from-card via-card/70";

  const photoAspectClass = isCanvas
    ? "aspect-[16/9] md:aspect-[21/9]"
    : "aspect-[16/9] md:aspect-[4/3]";

  return (
    /* Плитка под курсором не двигается: отклик дают рамка, тень и
       жёлтая подсветка ниже, а сдвиг на 4px в плотной сетке читался
       как рассыпающийся ряд. Появление — общий каскад
       `Stagger`/`StaggerItem`, поэтому своего `whileInView` здесь нет. */
    <StaggerItem
      as="article"
      className={`card-frame group flex flex-col overflow-hidden ${product.span} ${surfaceClass} focus-within:ring-2 focus-within:ring-accent/40 focus-within:ring-offset-2 focus-within:ring-offset-background`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: isAccent
            ? `radial-gradient(80% 60% at 80% 20%, color-mix(in srgb, ${COLORS.yellow} 32%, transparent) 0%, transparent 70%)`
            : `radial-gradient(60% 50% at 100% 0%, color-mix(in srgb, ${COLORS.yellow} 22%, transparent) 0%, transparent 70%)`,
        }}
      />

      {product.photo ? (
        <div
          className={`relative w-full overflow-hidden ${photoAspectClass}`}
        >
          <Image
            src={product.photo.src}
            alt={product.photo.alt}
            fill
            sizes={
              isCanvas
                ? "(min-width: 1280px) 1280px, 100vw"
                : "(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw"
            }
            className={`zoom-img object-cover ${
              product.photo.position ?? "object-center"
            }`}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t ${fadeBgClass} to-transparent`}
          />
        </div>
      ) : (
        <div
          aria-hidden
          className="zoom-img pointer-events-none relative hidden h-40 items-center justify-end pr-4 opacity-70 sm:flex md:pr-6"
        >
          {product.decor}
        </div>
      )}

      <div className="relative z-[2] flex flex-1 flex-col gap-4 p-6 md:p-8">
        <div className="flex items-start justify-between gap-3">
          <span
            className={`font-[family-name:var(--font-display)] text-[10px] tracking-[0.3em] uppercase ${countClass}`}
          >
            {product.count}
          </span>
          <span
            className={`font-[family-name:var(--font-display)] text-xs tabular-nums ${indexColorClass}`}
          >
            0{index + 1}
            <span className="mx-1 opacity-50">/</span>
            <span className="opacity-50">0{total}</span>
          </span>
        </div>

        {/* Крупная плитка идёт ступенью `section`, обычная — `subsection`:
            обе из общей шкалы, а не собственными text-2xl…text-5xl. */}
        <h3 style={isCanvas ? TYPE.section : TYPE.subsection}>
          {product.title}
        </h3>
        <p className={`${MEASURE} ${mutedTextClass}`} style={TYPE.body}>
          {product.description}
        </p>

        <div className={`mt-auto h-px w-full ${dividerClass}`} />

        <div className="flex items-center justify-between gap-3">
          {/* Кнопка та же, что и на остальном сайте: капсула, Inter 500,
              уезжающая стрелка. Своя копия жила здесь ровно потому, что
              общей кнопки никто не использовал. */}
          <Button
            href={product.href}
            variant={isAccent ? "onDark" : "secondary"}
            aria-label={`${product.cta} — ${product.title}`}
          >
            {product.cta}
          </Button>
        </div>
      </div>
    </StaggerItem>
  );
}

function DecorOrbit() {
  return (
    <svg
      viewBox="0 0 240 240"
      className="h-56 w-56 text-surface-strong transition-colors duration-500 group-hover:text-accent-soft md:h-72 md:w-72"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
    >
      <circle cx="120" cy="170" r="30" />
      <circle cx="120" cy="170" r="60" opacity="0.7" />
      <circle cx="120" cy="170" r="90" opacity="0.45" />
      <circle cx="120" cy="170" r="120" opacity="0.25" />
      <circle
        cx="120"
        cy="170"
        r="5"
        fill="currentColor"
        stroke="none"
        className="text-accent"
      />
    </svg>
  );
}

function DecorDual() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="h-28 w-44 text-white/25 transition-colors duration-500 group-hover:text-white/45"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <circle cx="70" cy="60" r="30" />
      <circle cx="130" cy="60" r="30" />
      <path d="M70 60 Q100 30 130 60" opacity="0.7" strokeDasharray="2 4" />
      <circle cx="70" cy="60" r="3" fill="currentColor" stroke="none" />
      <circle cx="130" cy="60" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function DecorSunrise() {
  return (
    <svg
      viewBox="0 0 180 100"
      className="h-24 w-40 text-surface-strong transition-colors duration-500 group-hover:text-accent-soft"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M10 85 Q90 15 170 85" />
      <path d="M10 85 Q90 35 170 85" opacity="0.5" />
      <line x1="10" y1="88" x2="170" y2="88" opacity="0.6" />
      <circle
        cx="90"
        cy="25"
        r="5"
        fill="currentColor"
        stroke="none"
        className="text-accent"
      />
    </svg>
  );
}

function DecorFoundation() {
  return (
    <svg
      viewBox="0 0 240 120"
      className="h-24 w-48 text-surface-strong transition-colors duration-500 group-hover:text-accent-soft md:h-28 md:w-64"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <line x1="0" y1="20" x2="240" y2="20" strokeWidth="1" opacity="0.25" />
      <line x1="0" y1="40" x2="240" y2="40" strokeWidth="1" opacity="0.4" />
      <line x1="0" y1="60" x2="240" y2="60" strokeWidth="1" opacity="0.6" />
      <line x1="0" y1="80" x2="240" y2="80" strokeWidth="1" opacity="0.8" />
      <line
        x1="0"
        y1="100"
        x2="240"
        y2="100"
        strokeWidth="2"
        className="text-accent"
      />
    </svg>
  );
}
