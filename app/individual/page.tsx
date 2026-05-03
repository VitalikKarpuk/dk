import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

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

// TODO: replace with the real questionnaire URL
const FORM_URL = "https://example.com/anketa";

const LOYALTY = [
  "Доступ к библиотеке, где собрано более 100 книг по психологии",
  "Доступ к моим закрытым мастер-классам и вебинарам по вашей проблематике",
  "В течение периода работы есть возможность писать текстовые и аудио сообщения для получения обратной связи",
  "Персональные рекомендации для самостоятельной работы — литература, фильмы, упражнения",
  "Делюсь при необходимости контактами сторонних проверенных специалистов по вашему запросу",
  "На участие в любом из моих обучений действуют специальные бонусные условия",
];

type Pkg = {
  title: string;
  oldPrice: string;
  newPrice: string;
  note?: string;
  highlight?: boolean;
};

const PACKAGES: Pkg[] = [
      {
    title: "Разовая консультация",
    oldPrice: "250 BYN",
    newPrice: "190 BYN",
    note: "Полуторачасовая встреча + 7 недель сопровождения в чате",
  },
  {
    title: "Пакет из 3 встреч",
    oldPrice: "500 BYN",
    newPrice: "450 BYN",
  },
  {
    title: "Пакет из 5 встреч",
    oldPrice: "850 BYN",
    newPrice: "700 BYN",
    highlight: true,
  },
  {
    title: "Пакет из 10 встреч",
    oldPrice: "1350 BYN",
    newPrice: "1200 BYN",
  },
];

export const metadata: Metadata = {
  title: "Индивидуальные консультации — Дарья Карпук",
  description:
    "Личная работа один на один: формат, условия лояльности, пакеты встреч и текущие цены.",
};

export default function IndividualPage() {
  return (
    <main
      className="flex w-full flex-1 flex-col"
      style={{
        backgroundColor: COLORS.softOffWhite,
        color: COLORS.pitchBlack,
        fontFamily: FONT_BODY,
      }}
    >
      <TopBar />
      <Hero />
      <LoyaltySection />
      <FormatSection />
      <PricingSection />
      <BonusSection />
      <CTASection />
      <Footer />
    </main>
  );
}

function TopBar() {
  return (
    <header
      className="w-full"
      style={{ borderBottom: `1px solid ${COLORS.lilacAccent}` }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-5 md:px-12 md:py-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 transition-opacity hover:opacity-80"
          aria-label="Дарья Карпук — на главную"
        >
          <span
            className="flex h-9 w-9 items-center justify-center"
            style={{
              backgroundColor: COLORS.boardroomNavy,
              color: COLORS.pureWhite,
              borderRadius: "100px",
              fontFamily: FONT_HEADING,
              fontWeight: 500,
              fontSize: "14px",
              letterSpacing: "-0.02em",
            }}
          >
            Д
          </span>
          <span
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 500,
              fontSize: "16px",
              letterSpacing: "-0.02em",
              color: COLORS.pitchBlack,
            }}
          >
            Дарья Карпук
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{
            fontFamily: FONT_BODY,
            fontSize: "14px",
            color: COLORS.mediumGray,
          }}
        >
          <span aria-hidden>←</span>
          <span className="hidden sm:inline">На главную</span>
          <span className="sm:hidden">Назад</span>
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-40 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ backgroundColor: COLORS.lilacAccent, opacity: 0.55 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[10%] h-[260px] w-[260px] rounded-full blur-3xl"
        style={{ backgroundColor: COLORS.lightCoolGray, opacity: 0.6 }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] grid grid-cols-1 items-center gap-10 px-6 pt-8 pb-10 md:grid-cols-12 md:gap-12 md:px-12 md:pt-12 md:pb-14">
        <div className="md:col-span-7 flex flex-col gap-8">
          <span
            className="inline-flex w-fit items-center"
            style={{
              backgroundColor: COLORS.lightCoolGray,
              color: COLORS.boardroomNavy,
              borderRadius: "16px",
              padding: "4px 12px",
              fontSize: "14px",
              lineHeight: 1.43,
            }}
          >
            1:1 · Индивидуальный формат
          </span>

          <h1
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 500,
              fontSize: "clamp(48px, 8vw, 96px)",
              lineHeight: 0.98,
              letterSpacing: "-0.05em",
              color: COLORS.pitchBlack,
            }}
          >
            Индивидуальные{" "}
            <em
              className="italic"
              style={{
                fontFamily: FONT_ACCENT,
                fontWeight: 400,
                letterSpacing: "-0.04em",
                color: COLORS.brandElectric,
              }}
            >
              консультации
            </em>
          </h1>

          <p
            className="max-w-2xl"
            style={{
              fontFamily: FONT_BODY,
              fontSize: "18px",
              lineHeight: 1.6,
              color: COLORS.pitchBlack,
            }}
          >
            Формат работы, полностью ориентированный на вас и ваши запросы.
            Такой подход позволяет убрать всё, что мешает вашему движению,
            и получить ощутимые результаты — в безопасном пространстве, в
            своём темпе.
          </p>
        </div>

        <div className="md:col-span-5 relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-6 hidden h-20 w-20 rounded-full md:block"
            style={{ backgroundColor: COLORS.feedbackYellow }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-6 -bottom-6 hidden h-12 w-12 rounded-full md:block"
            style={{
              border: `1px solid ${COLORS.brandElectric}`,
            }}
          />
          <div
            className="relative aspect-[4/5] w-full overflow-hidden"
            style={{
              borderRadius: "16px",
              backgroundColor: COLORS.lightCoolGray,
            }}
          >
            <Image
              src="/individ.JPG"
              alt="Индивидуальные консультации"
              fill
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  number,
  title,
  italic,
  align = "left",
}: {
  number: string;
  title: string;
  italic: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : ""}`}
    >
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
        <span
          aria-hidden
          className="inline-block h-px w-8"
          style={{ backgroundColor: COLORS.brandElectric }}
        />
        <span>{number}</span>
      </div>
      <h2
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 500,
          fontSize: "clamp(36px, 5vw, 56px)",
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          color: COLORS.pitchBlack,
        }}
      >
        {title}{" "}
        <em
          className="italic"
          style={{
            fontFamily: FONT_ACCENT,
            fontWeight: 400,
            letterSpacing: "-0.03em",
            color: COLORS.brandElectric,
          }}
        >
          {italic}
        </em>
      </h2>
    </div>
  );
}

function LoyaltySection() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
      <SectionHeader number="01 — Условия" title="Что входит в" italic="лояльность" />

      <ul className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
        {LOYALTY.map((item, i) => (
          <li
            key={item}
            className="relative overflow-hidden p-7 md:p-8"
            style={{
              backgroundColor: COLORS.pureWhite,
              border: `1px solid ${COLORS.lilacAccent}`,
              borderRadius: "16px",
            }}
          >
            <span
              aria-hidden
              className="absolute right-6 top-4 italic"
              style={{
                fontFamily: FONT_ACCENT,
                fontWeight: 400,
                fontSize: "clamp(64px, 7vw, 96px)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "transparent",
                WebkitTextStroke: `1px ${COLORS.lilacAccent}`,
              }}
            >
              0{i + 1}
            </span>

            <div className="relative max-w-[88%]">
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "12px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: COLORS.mediumGray,
                }}
              >
                0{i + 1}
              </div>
              <p
                className="mt-4"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: COLORS.pitchBlack,
                }}
              >
                {item}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FormatSection() {
  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: COLORS.lightCoolGray }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
        <SectionHeader number="02 — Формат" title="Как проходят" italic="встречи" />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <article
            className="relative overflow-hidden p-8 md:p-10"
            style={{
              backgroundColor: COLORS.pureWhite,
              border: `1px solid ${COLORS.lilacAccent}`,
              borderRadius: "16px",
            }}
          >
            <DecorScreen />
            <div className="relative">
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "12px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: COLORS.mediumGray,
                }}
              >
                Платформа
              </div>
              <div
                className="mt-4"
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 500,
                  fontSize: "clamp(40px, 5vw, 56px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  color: COLORS.boardroomNavy,
                }}
              >
                Zoom
              </div>
              <p
                className="mt-4 max-w-sm"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: COLORS.mediumGray,
                }}
              >
                Все встречи проходят онлайн, из любой точки мира.
              </p>
            </div>
          </article>

          <article
            className="relative overflow-hidden p-8 md:p-10"
            style={{
              backgroundColor: COLORS.boardroomNavy,
              color: COLORS.pureWhite,
              borderRadius: "16px",
            }}
          >
            <DecorTimer />
            <div className="relative">
              <div
                className="flex items-center gap-2"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "12px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: COLORS.feedbackYellow,
                }}
              >
                <span aria-hidden>❗️</span>
                Важно
              </div>
              <div
                className="mt-4"
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 500,
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.04em",
                  color: COLORS.pureWhite,
                }}
              >
                Первая встреча —{" "}
                <em
                  className="italic"
                  style={{
                    fontFamily: FONT_ACCENT,
                    fontWeight: 400,
                    color: COLORS.feedbackYellow,
                  }}
                >
                  1,5&nbsp;часа
                </em>
                .
              </div>
              <p
                className="mt-4 max-w-sm"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.78)",
                }}
              >
                Все последующие встречи — по 1&nbsp;часу.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const anchor = PACKAGES.find((p) => p.highlight)!;
  const others = PACKAGES.filter((p) => !p.highlight);

  return (
    <section className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
      <SectionHeader number="03 — Пакеты" title="Цены и" italic="условия" />

      <div className="mt-12 flex flex-col gap-5">
        <PriceAnchor pkg={anchor} />

        <ul className="grid gap-5 md:grid-cols-3">
          {others.map((p) => (
            <PriceSatellite key={p.title} pkg={p} />
          ))}
        </ul>
      </div>

      <p
        className="mt-8 max-w-xl"
        style={{
          fontFamily: FONT_BODY,
          fontSize: "14px",
          lineHeight: 1.6,
          color: COLORS.mediumGray,
        }}
      >
        Оплату возможно произвести разовым платежом или разделить на
        несколько частей.
      </p>
    </section>
  );
}

function PriceAnchor({ pkg }: { pkg: Pkg }) {
  return (
    <article
      className="relative overflow-hidden p-8 md:p-12"
      style={{
        backgroundColor: COLORS.lilacAccent,
        borderRadius: "16px",
      }}
    >
      <DecorOrbits />

      <div className="relative grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: "12px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: COLORS.boardroomNavy,
            }}
          >
            ✦ Самый популярный
          </div>
          <h3
            className="mt-4"
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 500,
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: COLORS.boardroomNavy,
            }}
          >
            {pkg.title}
          </h3>
        </div>
        <div className="md:col-span-5 flex flex-col items-start gap-2 md:items-end md:text-right">
          <div className="flex items-baseline gap-3">
            <span
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 500,
                fontSize: "clamp(48px, 6vw, 80px)",
                lineHeight: 1,
                letterSpacing: "-0.05em",
                color: COLORS.brandElectric,
              }}
            >
              {pkg.newPrice}
            </span>
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: "18px",
                color: COLORS.boardroomNavy,
                opacity: 0.55,
                textDecoration: "line-through",
              }}
            >
              {pkg.oldPrice}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function PriceSatellite({ pkg }: { pkg: Pkg }) {
  return (
    <li
      className="flex flex-col gap-5 p-7 md:p-8"
      style={{
        backgroundColor: COLORS.pureWhite,
        border: `1px solid ${COLORS.lilacAccent}`,
        borderRadius: "16px",
      }}
    >
      <h3
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 500,
          fontSize: "24px",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: COLORS.boardroomNavy,
        }}
      >
        {pkg.title}
      </h3>

      <div className="flex items-baseline gap-3">
        <span
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 500,
            fontSize: "32px",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: COLORS.brandElectric,
          }}
        >
          {pkg.newPrice}
        </span>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: "14px",
            color: COLORS.mediumGray,
            textDecoration: "line-through",
          }}
        >
          {pkg.oldPrice}
        </span>
      </div>

      {pkg.note && (
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: "14px",
            lineHeight: 1.5,
            color: COLORS.mediumGray,
          }}
        >
          {pkg.note}
        </p>
      )}

      <div
        className="mt-auto h-px w-full"
        style={{ backgroundColor: COLORS.lilacAccent }}
      />
    </li>
  );
}

function BonusSection() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-6 pb-10 md:px-12 md:pb-14">
      <article
        className="relative overflow-hidden p-8 md:p-12"
        style={{
          backgroundColor: COLORS.feedbackYellow,
          color: COLORS.boardroomNavy,
          borderRadius: "16px",
        }}
      >
        <DecorDots />

        <div className="relative grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <div
              style={{
                fontFamily: FONT_BODY,
                fontSize: "12px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              <span aria-hidden>❤️</span> Бонус
            </div>
          </div>
          <p
            className="md:col-span-9"
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 500,
              fontSize: "clamp(24px, 3vw, 36px)",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            При покупке любого пакета консультаций в&nbsp;сентябре вы
            получаете бесплатно доступ к&nbsp;прохождению интенсива{" "}
            <em
              className="italic"
              style={{
                fontFamily: FONT_ACCENT,
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              «Новая Я»
            </em>
            .
          </p>
        </div>
      </article>
    </section>
  );
}

function CTASection() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-12 md:pb-20">
      <article
        className="relative overflow-hidden p-8 md:p-14"
        style={{
          backgroundColor: COLORS.boardroomNavy,
          color: COLORS.pureWhite,
          borderRadius: "16px",
        }}
      >
        <DecorArrow />
        <DecorPulse />

        <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <div
              className="flex items-center gap-3"
              style={{
                fontFamily: FONT_BODY,
                fontSize: "12px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: COLORS.feedbackYellow,
              }}
            >
              <span
                aria-hidden
                className="inline-block h-px w-8"
                style={{ backgroundColor: COLORS.feedbackYellow }}
              />
              Шаг за шагом
            </div>
            <h2
              className="mt-4"
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 500,
                fontSize: "clamp(32px, 4.5vw, 56px)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: COLORS.pureWhite,
              }}
            >
              Готовы начать или остались{" "}
              <em
                className="italic"
                style={{
                  fontFamily: FONT_ACCENT,
                  fontWeight: 400,
                  color: COLORS.feedbackYellow,
                }}
              >
                вопросы?
              </em>
            </h2>
            <p
              className="mt-5 max-w-md"
              style={{
                fontFamily: FONT_BODY,
                fontSize: "16px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.78)",
              }}
            >
              Заполните короткую анкету — и мы согласуем время и формат
              работы.
            </p>
          </div>

          <div className="md:col-span-5 md:flex md:justify-end">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-90"
              style={{
                backgroundColor: COLORS.brandElectric,
                color: COLORS.pureWhite,
                borderRadius: "100px",
                padding: "16px 36px",
                fontFamily: FONT_BODY,
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: 1.4,
              }}
            >
              Заполнить анкету
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}

function DecorScreen() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 140"
      className="pointer-events-none absolute right-6 top-6 h-24 w-32 md:h-32 md:w-44"
      fill="none"
      stroke={COLORS.lilacAccent}
      strokeWidth="1.4"
    >
      <rect x="10" y="20" width="180" height="100" rx="10" />
      <circle cx="30" cy="35" r="2.5" fill={COLORS.brandElectric} stroke="none" />
      <circle cx="40" cy="35" r="2.5" fill={COLORS.feedbackYellow} stroke="none" />
      <circle cx="50" cy="35" r="2.5" fill={COLORS.lilacAccent} stroke="none" />
      <line x1="20" y1="55" x2="180" y2="55" opacity="0.6" />
      <line x1="20" y1="75" x2="120" y2="75" opacity="0.4" />
      <line x1="20" y1="95" x2="160" y2="95" opacity="0.4" />
    </svg>
  );
}

function DecorTimer() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 160 160"
      className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 md:h-48 md:w-48"
      fill="none"
      stroke="rgba(255,255,255,0.18)"
      strokeWidth="1"
    >
      <circle cx="80" cy="80" r="70" />
      <circle cx="80" cy="80" r="55" opacity="0.7" />
      <circle cx="80" cy="80" r="40" opacity="0.5" />
      <line x1="80" y1="80" x2="80" y2="22" stroke={COLORS.feedbackYellow} strokeWidth="2" />
      <line x1="80" y1="80" x2="120" y2="80" stroke={COLORS.feedbackYellow} strokeWidth="2" opacity="0.7" />
      <circle cx="80" cy="80" r="3" fill={COLORS.feedbackYellow} stroke="none" />
    </svg>
  );
}

function DecorOrbits() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 320"
      className="pointer-events-none absolute -right-16 -bottom-16 h-72 w-72 md:h-96 md:w-96"
      fill="none"
      stroke={COLORS.boardroomNavy}
      strokeWidth="1"
    >
      <circle cx="160" cy="160" r="40" opacity="0.18" />
      <circle cx="160" cy="160" r="80" opacity="0.14" />
      <circle cx="160" cy="160" r="120" opacity="0.1" />
      <circle cx="160" cy="160" r="160" opacity="0.07" />
      <circle cx="160" cy="160" r="6" fill={COLORS.brandElectric} stroke="none" />
    </svg>
  );
}

function DecorDots() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 100"
      className="pointer-events-none absolute right-6 top-6 h-16 w-32 md:h-20 md:w-40"
      fill={COLORS.boardroomNavy}
      opacity="0.18"
    >
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={10 + col * 16}
            cy={10 + row * 16}
            r="2"
          />
        ))
      )}
    </svg>
  );
}

function DecorArrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 200"
      className="pointer-events-none absolute right-0 bottom-0 h-40 w-[60%] md:h-56"
      fill="none"
      stroke="rgba(255,255,255,0.08)"
      strokeWidth="1"
    >
      <path d="M0 100 Q150 40 300 100 T600 100" />
      <path d="M0 130 Q150 70 300 130 T600 130" opacity="0.7" />
      <path d="M0 160 Q150 100 300 160 T600 160" opacity="0.5" />
      <path
        d="M520 80 L580 100 L520 120"
        stroke={COLORS.feedbackYellow}
        strokeWidth="2"
        opacity="0.4"
      />
    </svg>
  );
}

function DecorPulse() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 md:h-40 md:w-40"
      fill="none"
      stroke={COLORS.brandElectric}
      strokeWidth="1"
      opacity="0.5"
    >
      <circle cx="50" cy="50" r="20" />
      <circle cx="50" cy="50" r="35" opacity="0.7" />
      <circle cx="50" cy="50" r="48" opacity="0.4" />
    </svg>
  );
}
