"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
    span: "md:col-span-4",
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
      className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-12 md:py-28"
      aria-label="Направления практики"
    >
      <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <h2
            style={{
              fontFamily: "var(--font-manrope), Arial, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(40px, 6vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.05em",
              color: "#171417",
            }}
          >
            Три программы —<br />
            три пути к{" "}
            <span
              className="italic"
              style={{
                fontFamily: "var(--font-editorial), cursive",
                fontWeight: 400,
                letterSpacing: "-0.04em",
                color: "#2545ff",
              }}
            >
              результату.
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5">
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

  const fadeBgClass = isAccent
    ? "from-foreground via-foreground/70"
    : isCanvas
      ? "from-surface via-surface/70"
      : "from-card via-card/70";

  const photoAspectClass = isCanvas
    ? "aspect-[16/9] md:aspect-[21/9]"
    : "aspect-[16/9] md:aspect-[4/3]";

  return (
    <motion.article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border ${product.span} ${surfaceClass} transition-all duration-500 hover:-translate-y-1 hover:border-accent-soft focus-within:ring-2 focus-within:ring-accent-soft/40 focus-within:ring-offset-2 focus-within:ring-offset-background motion-reduce:transform-none`}
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
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: isAccent
            ? "radial-gradient(80% 60% at 80% 20%, rgba(217,179,110,0.32) 0%, transparent 70%)"
            : "radial-gradient(60% 50% at 100% 0%, rgba(217,179,110,0.22) 0%, transparent 70%)",
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
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t ${fadeBgClass} to-transparent`}
          />
        </div>
      ) : (
        <div
          aria-hidden
          className="pointer-events-none relative hidden h-40 items-center justify-end pr-4 opacity-70 transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none sm:flex md:pr-6"
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
          className={`max-w-prose text-sm leading-relaxed md:text-base ${mutedTextClass}`}
        >
          {product.description}
        </p>

        <div className={`mt-auto h-px w-full ${dividerClass}`} />

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
            const isInternal = product.href?.startsWith("/");
            return product.href ? (
              isInternal ? (
                <Link
                  href={product.href}
                  aria-label={`${product.cta} — ${product.title}`}
                  className={ctaClass}
                >
                  {ctaInner}
                </Link>
              ) : (
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${product.cta} — ${product.title}`}
                  className={ctaClass}
                >
                  {ctaInner}
                </a>
              )
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
