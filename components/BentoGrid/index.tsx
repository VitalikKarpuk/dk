"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
  photo?: { src: string; alt: string };
  photoLayout?: "top" | "side";
};

const PRODUCTS: Product[] = [
  {
    title: "Я ЛИДЕР",
    description:
      "7-недельная программа для экспертов, желающих вырасти профессионально и финансово",
    cta: "Подробнее",
    tone: "canvas",
    span: "md:col-span-2 md:row-span-2",
    count: "",
    decor: <DecorOrbit />,
    photo: {
      src: "/groupPeople.JPG",
      alt: "Группа участников программы «Я Лидер»",
    },
    href: 'https://group-7-2025.netlify.app/'
  },
  {
    title: "Индивидуальные консультации",
    description:
      "Личная работа один на один — в безопасном пространстве, в своём темпе, под ваш запрос. Записаться и задать вопрос можно в Instagram.",
    cta: "Записаться в Instagram",
    tone: "accent",
    span: "md:col-span-2",
    count: "1:1",
    decor: <DecorDual />,
    href: "https://www.instagram.com/daria_karpuk.psy",
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
    href: 'https://fate-dewberry-189.notion.site/12d3e4311d7380b5accad405b0592875',
    photo: {
      src: "/baseLife.JPG",
      alt: "Иллюстрация курса «Базовые законы жизни»",
    },
    photoLayout: "side",
  },
];

export default function BentoGrid() {
  return (
    <section
      className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-12 md:py-28"
      aria-label="Направления практики"
    >
      <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="mb-5 inline-flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <p className="text-xs font-medium tracking-[0.3em] text-muted uppercase">
              Как я работаю
            </p>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Три направления —<br />
            одно безопасное{" "}
            <span className="text-accent italic font-[family-name:var(--font-editorial)] font-medium">
              пространство.
            </span>
          </h2>
        </div>
      </div>

      <div className="grid auto-rows-[minmax(220px,1fr)] grid-cols-1 gap-4 md:grid-cols-4 md:gap-5">
        {PRODUCTS.map((p, i) => (
          <BentoCard
            key={p.title}
            product={p}
            index={i}
            total={PRODUCTS.length}
          />
        ))}
      </div>

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

  const surfaceClass = isAccent
    ? "bg-foreground text-white border-foreground"
    : isCanvas
      ? "bg-surface text-foreground border-surface-strong"
      : "bg-card text-foreground border-surface-strong shadow-[0_1px_2px_rgba(14,31,66,0.05),0_8px_24px_-12px_rgba(14,31,66,0.14)]";

  const mutedTextClass = isAccent ? "text-white/70" : "text-muted";
  const indexColorClass = isAccent ? "text-white/50" : "text-muted";
  const dividerClass = isAccent ? "bg-white/15" : "bg-surface-strong";
  const countClass = isAccent ? "text-white/70" : "text-foreground/80";

  const photoLayout = product.photo ? (product.photoLayout ?? "top") : null;
  const isTopPhoto = photoLayout === "top";
  const isSidePhoto = photoLayout === "side";

  const fadeBgClass = isAccent
    ? "from-foreground via-foreground/70"
    : isCanvas
      ? "from-surface via-surface/70"
      : "from-card via-card/70";
  const fadeBgFromClass = isAccent
    ? "from-foreground"
    : isCanvas
      ? "from-surface"
      : "from-card";

  return (
    <motion.article
      className={`group relative flex min-h-[240px] flex-col overflow-hidden rounded-2xl border p-6 md:p-8 ${isTopPhoto ? "gap-5" : "justify-between"} ${product.span} ${surfaceClass} transition-all duration-500 hover:-translate-y-1 hover:border-accent-soft hover:shadow-[0_20px_60px_-20px_rgba(217,179,110,0.35)] focus-within:ring-2 focus-within:ring-accent-soft/40 focus-within:ring-offset-2 focus-within:ring-offset-background motion-reduce:transform-none`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: isAccent
            ? "radial-gradient(80% 60% at 80% 20%, rgba(217,179,110,0.32) 0%, transparent 70%)"
            : "radial-gradient(60% 50% at 100% 0%, rgba(217,179,110,0.22) 0%, transparent 70%)",
        }}
      />

      {!product.photo && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden items-center justify-end pr-4 opacity-70 transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none sm:flex md:pr-6"
        >
          {product.decor}
        </div>
      )}

      {isTopPhoto && product.photo && (
        <div className="relative -mx-6 -mt-6 overflow-hidden md:-mx-8 md:-mt-8">
          <Image
            src={product.photo.src}
            alt={product.photo.alt}
            width={5875}
            height={3917}
            sizes="(min-width: 1280px) 720px, (min-width: 768px) 50vw, 100vw"
            className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${fadeBgClass} to-transparent`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 backdrop-blur-md [mask-image:linear-gradient(to_top,black,transparent)]"
          />
        </div>
      )}

      {isSidePhoto && product.photo && (
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] overflow-hidden md:block lg:w-[40%]">
          <Image
            src={product.photo.src}
            alt={product.photo.alt}
            fill
            sizes="(min-width: 1280px) 320px, (min-width: 768px) 28vw, 0px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
          />
          <div
            aria-hidden
            className={`absolute inset-y-0 left-0 w-16 bg-gradient-to-r ${fadeBgFromClass} to-transparent`}
          />
        </div>
      )}

      {isCanvas && !product.photo && (
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 -bottom-6 font-[family-name:var(--font-editorial)] text-[140px] leading-none font-medium tracking-tighter select-none sm:text-[220px] md:text-[260px]"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(77, 96, 128, 0.28)",
          }}
        >
          0{index + 1}
        </span>
      )}

      <div
        className={`relative z-10 flex items-start justify-between gap-3 ${
          isSidePhoto ? "md:max-w-[55%] lg:max-w-[58%]" : ""
        }`}
      >
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

      <div
        className={`relative z-10 flex flex-col gap-4 ${
          isSidePhoto ? "md:max-w-[55%] lg:max-w-[58%]" : ""
        }`}
      >
        <h3
          className={`font-[family-name:var(--font-display)] font-semibold tracking-tight ${
            isCanvas
              ? "text-3xl md:text-4xl lg:text-5xl"
              : "text-2xl md:text-3xl"
          }`}
        >
          {product.title}
        </h3>
        <p
          className={`max-w-md text-sm leading-relaxed md:text-base ${mutedTextClass}`}
        >
          {product.description}
        </p>

        <div className={`mt-1 h-px w-full ${dividerClass}`} />

        <div className="flex items-center justify-between gap-3">
          {(() => {
            const ctaClass = `inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:outline-none ${
              isAccent
                ? "bg-white text-foreground hover:bg-accent-soft hover:text-white focus-visible:ring-offset-foreground"
                : "border border-surface-strong bg-card text-foreground group-hover:border-accent-soft group-hover:text-accent focus-visible:ring-offset-background"
            }`;
            const ctaInner = (
              <>
                {product.cta}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                >
                  →
                </span>
              </>
            );
            return product.href ? (
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${product.cta} — ${product.title}`}
                className={ctaClass}
              >
                {ctaInner}
              </a>
            ) : (
              <button
                type="button"
                aria-label={`${product.cta} — ${product.title}`}
                className={ctaClass}
              >
                {ctaInner}
              </button>
            );
          })()}
        </div>
      </div>
    </motion.article>
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
