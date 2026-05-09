import Link from "next/link";
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

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeifCxZg3TOYUceGHvoYSTDsk3ItvOZG5Ll-TJWFEEQynBu-w/viewform";
const INSTAGRAM_URL = "https://www.instagram.com/daria_karpuk.psy";

type IconKey =
  | "refresh"
  | "rocket"
  | "balance"
  | "target"
  | "tools"
  | "sparkle"
  | "play"
  | "speaker"
  | "doc"
  | "chat"
  | "puzzle"
  | "trophy"
  | "handshake"
  | "arc"
  | "calendar"
  | "instagram";

function Icon({ name }: { name: IconKey }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6",
    "aria-hidden": true,
  };

  switch (name) {
    case "refresh":
      return (
        <svg {...common} className="h-6 w-6 [.icon-bubble:hover_&]:animate-[icon-spin_0.9s_ease-in-out]">
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-1 [.icon-bubble:hover_&]:rotate-[-12deg]">
          <path d="M9 14l-2.5 2.5a2 2 0 1 0 1 1L10 15" />
          <path d="M13 16l-3-3a16 16 0 0 1 1.7-4A12 12 0 0 1 21 3c0 2.4-.7 6.7-5 9.7A16 16 0 0 1 13 16z" />
          <path d="M9 11H5s.4-2.7 1.7-3.6c1.4-.9 4.3 0 4.3 0" />
          <path d="M13 15v4s2.7-.4 3.6-1.7c.9-1.4 0-4.3 0-4.3" />
          <circle cx="15.5" cy="8.5" r="1.4" />
        </svg>
      );
    case "balance":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-110">
          <path d="M12 21c4.5-2.6 7-6.3 7-10.7 0-2.6-1.6-5-2.5-6-1.7.9-4.5 3.5-4.5 8 0-4.5-2.8-7.1-4.5-8C6.6 5.3 5 7.7 5 10.3 5 14.7 7.5 18.4 12 21z" />
          <circle cx="12" cy="11" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "target":
      return (
        <svg {...common} className="h-6 w-6">
          <circle cx="12" cy="12" r="9" className="origin-center transition-transform duration-500 [.icon-bubble:hover_&]:scale-105" />
          <circle cx="12" cy="12" r="5.5" className="origin-center transition-transform duration-500 [.icon-bubble:hover_&]:scale-90" />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tools":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[-15deg]">
          <path d="M14.7 6.3a4.5 4.5 0 1 0 5.6 5.6L13 19.5l-2.5-2.5z" />
          <path d="M3 21l4-4" />
          <circle cx="6.2" cy="17.8" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common} className="h-6 w-6 [.icon-bubble:hover_&]:animate-[icon-pulse_1.2s_ease-in-out_infinite]">
          <path d="M12 3l1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8z" />
          <path d="M19 4l.5 1.6L21 6l-1.5.4L19 8l-.5-1.6L17 6l1.5-.4z" />
          <path d="M5 16l.4 1.4L7 18l-1.6.4L5 20l-.4-1.6L3 18l1.6-.4z" />
        </svg>
      );
    case "play":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-110">
          <rect x="3" y="6" width="13" height="12" rx="2" />
          <path d="M16 9.5l5-2.5v10l-5-2.5z" />
        </svg>
      );
    case "speaker":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-110">
          <circle cx="12" cy="8" r="3.4" />
          <path d="M5 21v-1a7 7 0 0 1 14 0v1" />
          <path d="M3 10l1.5-1.5M21 10l-1.5-1.5" className="opacity-60" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[-4deg]">
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
          <path d="M8 13h8M8 17h5" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-110">
          <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.4-4.6A8 8 0 1 1 21 12z" />
          <circle cx="9" cy="12" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="13" cy="12" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="17" cy="12" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "puzzle":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[8deg]">
          <path d="M10 3.5a1.8 1.8 0 1 1 3.6 0c0 .4-.2.9-.4 1.1H17a1 1 0 0 1 1 1v3.6c.3-.2.7-.4 1.1-.4a1.8 1.8 0 1 1 0 3.6c-.4 0-.9-.2-1.1-.4V15a1 1 0 0 1-1 1h-3.6c.2.3.4.7.4 1.1a1.8 1.8 0 1 1-3.6 0c0-.4.2-.9.4-1.1H7a1 1 0 0 1-1-1v-3.6c-.3.2-.7.4-1.1.4a1.8 1.8 0 1 1 0-3.6c.4 0 .9.2 1.1.4V5.5a1 1 0 0 1 1-1h3.4c-.2-.3-.4-.7-.4-1z" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-0.5">
          <path d="M7 4h10v4a5 5 0 0 1-10 0z" />
          <path d="M17 4h3v2.5a3 3 0 0 1-3 3" />
          <path d="M7 4H4v2.5a3 3 0 0 0 3 3" />
          <path d="M12 13v4" />
          <path d="M9 21h6l-1-3h-4z" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-105">
          <path d="M3 12l4-4 3 3 2-2 4 4-2 2-4-4z" />
          <path d="M11 9l3-3 6 6-3 3" />
          <path d="M14 14l-3 3-2-2" />
        </svg>
      );
    case "arc":
      return (
        <svg {...common} className="h-6 w-6 origin-bottom transition-transform duration-500 [.icon-bubble:hover_&]:scale-110">
          <path d="M3 18a9 9 0 0 1 18 0" />
          <path d="M6 18a6 6 0 0 1 12 0" opacity="0.7" />
          <path d="M9 18a3 3 0 0 1 6 0" opacity="0.45" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common} className="h-4 w-4">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" />
          <circle cx="8" cy="14" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} className="h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

const PAINS = [
  "Вы снова и снова проходите обучения, вкладываете время, деньги и силы… но в жизни почти ничего не меняется",
  "Вы стараетесь изо всех сил, делаете «как надо», но результат всё равно не тот, на который рассчитывали",
  "Внутри растёт ощущение, что вы делаете очень много… а будто топчетесь на месте",
  "С каждым днём всё больше усталости, апатии и нехватки энергии даже на простые вещи",
  "В отношениях — напряжение, ссоры и ощущение, что вас не понимают",
  "Работа не приносит ни радости, ни реализации… как будто вы не на своём месте",
  "А когда смотрите на себя в зеркало — нет ощущения удовлетворения, гордости и внутреннего «это я, и мне нравится моя жизнь»",
];

type Item = { icon: IconKey; text: string };

const BENEFITS: Item[] = [
  {
    icon: "refresh",
    text: "Перепишете ограничивающие сценарии и освободитесь от установок, которые тормозили ваш рост годами",
  },
  {
    icon: "rocket",
    text: "Выйдете на новый уровень результатов — в реализации, доходе и достижении своих целей",
  },
  {
    icon: "balance",
    text: "Обретёте внутреннюю опору, спокойствие и энергию, из которой хочется жить, создавать и действовать",
  },
  {
    icon: "target",
    text: "Начнёте ясно понимать, чего вы хотите, и как к этому прийти без хаоса и перегрузки",
  },
  {
    icon: "tools",
    text: "Освоите работающие инструменты, которые сможете применять в любой жизненной ситуации",
  },
  {
    icon: "sparkle",
    text: "Почувствуете себя человеком, который управляет своей жизнью, а не плывёт по течению",
  },
];

const FEATURES: Item[] = [
  {
    icon: "play",
    text: "Еженедельные уроки и задания в записи — можно проходить в удобное время",
  },
  {
    icon: "speaker",
    text: "Еженедельные живые встречи со мной",
  },
  {
    icon: "doc",
    text: "Персональные задания для каждого",
  },
  {
    icon: "chat",
    text: "Поддержка и общение в общем чате с единомышленниками",
  },
];

const AFTER: Item[] = [
  {
    icon: "puzzle",
    text: "Глубоко выявить и навсегда убрать установки, которые тормозили вас и не давали выйти на новый уровень",
  },
  {
    icon: "trophy",
    text: "Овладеть сильными инструментами и практиками, которые дают стабильные результаты, внутреннюю опору и удовольствие от жизни",
  },
  {
    icon: "handshake",
    text: "Оказаться в окружении людей, которые поддерживают, усиливают и двигаются к росту вместе с вами",
  },
  {
    icon: "arc",
    text: "Наполниться энергией, вдохновением и состоянием, из которого легко создавать желаемую реальность",
  },
  {
    icon: "sparkle",
    text: "Раскрыть свою интуицию и почувствовать внутреннюю силу — состояние человека, который управляет своей жизнью",
  },
];

export const metadata: Metadata = {
  title: "Базовые законы жизни — курс Дарьи Карпук",
  description:
    "4-недельный курс для тех, кто хочет навести порядок в жизни, обрести ясность и начать двигаться по пути своего предназначения.",
};

export default function BasicLawsPage() {
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
      <PainSection />
      <BridgeSection />
      <BenefitsSection />
      <FormatSection />
      <AfterSection />
      <VideoSection />
      <Footer />
      <style>{`
        @keyframes icon-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes icon-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        @keyframes card-rise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbit-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-rotate-rev {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .card-rise {
          animation: card-rise 0.6s ease-out both;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .card-rise:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -24px rgba(12, 23, 84, 0.35);
          border-color: ${COLORS.brandElectric};
        }
        @media (prefers-reduced-motion: reduce) {
          .card-rise,
          .card-rise:hover,
          .icon-bubble *,
          .icon-bubble {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  );
}

function VideoSection() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: COLORS.lightCoolGray }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
        <SectionHeader
          number="05 — Видео"
          title="Подробнее"
          italic="о курсе"
        />
        <div className="relative mx-auto mt-12 w-full max-w-[760px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 md:-inset-6"
            style={{
              border: `1px dashed ${COLORS.lilacAccent}`,
              borderRadius: "24px",
            }}
          />
          <div
            className="relative overflow-hidden"
            style={{
              border: `1px solid ${COLORS.lilacAccent}`,
              borderRadius: "16px",
              backgroundColor: COLORS.softOffWhite,
              boxShadow: `0 24px 60px -32px rgba(12, 23, 84, 0.35)`,
            }}
          >
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/xSdiTFKsjK4"
                title="Базовые законы жизни — видео"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-16px_rgba(37,69,255,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: COLORS.brandElectric,
              color: COLORS.pureWhite,
              borderRadius: "100px",
              padding: "16px 32px",
              fontFamily: FONT_BODY,
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: 1.4,
              ["--tw-ring-color" as string]: COLORS.brandElectric,
              ["--tw-ring-offset-color" as string]: COLORS.lightCoolGray,
            }}
          >
            Пройти бесплатный диагностический разбор
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
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
          className="group inline-flex items-center gap-3 rounded-full px-1 py-1 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="Дарья Карпук — на главную"
          style={{
            ["--tw-ring-color" as string]: COLORS.boardroomNavy,
            ["--tw-ring-offset-color" as string]: COLORS.softOffWhite,
          }}
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
          className="group inline-flex items-center gap-2 rounded-full px-1 py-1 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            fontFamily: FONT_BODY,
            fontSize: "14px",
            color: COLORS.mediumGray,
            ["--tw-ring-color" as string]: COLORS.boardroomNavy,
            ["--tw-ring-offset-color" as string]: COLORS.softOffWhite,
          }}
        >
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          >
            ←
          </span>
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

      <div className="relative mx-auto w-full max-w-[1400px] grid grid-cols-1 items-center gap-12 px-6 pt-10 pb-14 md:grid-cols-12 md:gap-16 md:px-12 md:pt-16 md:pb-20">
        <div className="md:col-span-7 flex flex-col gap-7">
          <div className="flex flex-wrap items-center gap-3">
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
              Курс · 4 недели + 1
            </span>
            <span
              className="inline-flex w-fit items-center gap-2"
              style={{
                backgroundColor: COLORS.feedbackYellow,
                color: COLORS.boardroomNavy,
                borderRadius: "16px",
                padding: "4px 12px",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: 1.43,
              }}
            >
              <Icon name="calendar" />
              Старт: дата уточняется
            </span>
          </div>

          <h1
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 500,
              fontSize: "clamp(40px, 7vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.05em",
              color: COLORS.pitchBlack,
            }}
          >
            Базовые{" "}
            <em
              className="italic"
              style={{
                fontFamily: FONT_ACCENT,
                fontWeight: 400,
                letterSpacing: "-0.04em",
                color: COLORS.brandElectric,
              }}
            >
              законы
            </em>
            <br />
            жизни
          </h1>

          <p
            className="max-w-xl"
            style={{
              fontFamily: FONT_BODY,
              fontSize: "18px",
              lineHeight: 1.6,
              color: COLORS.pitchBlack,
            }}
          >
            Курс для тех, кто хочет навести порядок в своей жизни, обрести
            ясность и начать двигаться по пути своего предназначения.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-16px_rgba(37,69,255,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: COLORS.brandElectric,
                color: COLORS.pureWhite,
                borderRadius: "100px",
                padding: "16px 32px",
                fontFamily: FONT_BODY,
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: 1.4,
                ["--tw-ring-color" as string]: COLORS.brandElectric,
                ["--tw-ring-offset-color" as string]: COLORS.softOffWhite,
              }}
            >
              Записаться на курс
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <a
              href="#format"
              className="group inline-flex items-center gap-2 rounded-full px-1 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                color: COLORS.boardroomNavy,
                fontFamily: FONT_BODY,
                fontSize: "15px",
                fontWeight: 500,
                ["--tw-ring-color" as string]: COLORS.boardroomNavy,
                ["--tw-ring-offset-color" as string]: COLORS.softOffWhite,
              }}
            >
              <span
                className="border-b transition-colors group-hover:border-current"
                style={{ borderColor: "rgba(12,23,84,0.25)" }}
              >
                Узнать формат
              </span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
          </div>
        </div>

        <div className="md:col-span-5 relative">
          <HeroDecor />
        </div>
      </div>
    </section>
  );
}

function HeroDecor() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <div
        aria-hidden
        className="absolute inset-0 animate-[orbit-rotate_42s_linear_infinite]"
      >
        <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
          <circle
            cx="200"
            cy="200"
            r="190"
            stroke={COLORS.lilacAccent}
            strokeWidth="1"
            strokeDasharray="2 6"
          />
          <circle
            cx="200"
            cy="200"
            r="150"
            stroke={COLORS.brandElectric}
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>
      </div>

      <div
        aria-hidden
        className="absolute inset-0 animate-[orbit-rotate-rev_28s_linear_infinite]"
      >
        <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
          <circle cx="200" cy="200" r="110" stroke={COLORS.brandElectric} strokeWidth="1" opacity="0.3" />
          <circle cx="200" cy="10" r="6" fill={COLORS.feedbackYellow} />
          <circle cx="200" cy="50" r="4" fill={COLORS.brandElectric} opacity="0.7" />
          <circle cx="395" cy="200" r="3" fill={COLORS.brandElectric} opacity="0.5" />
        </svg>
      </div>

      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="relative flex h-[58%] w-[58%] items-center justify-center rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 25%, ${COLORS.lilacAccent}, ${COLORS.lightCoolGray} 70%)`,
            boxShadow: `inset 0 0 0 1px ${COLORS.lilacAccent}`,
          }}
        >
          <div
            className="flex h-[68%] w-[68%] items-center justify-center rounded-full"
            style={{
              backgroundColor: COLORS.boardroomNavy,
              boxShadow: `0 24px 60px -28px ${COLORS.brandElectric}`,
              color: COLORS.feedbackYellow,
            }}
          >
            <span className="animate-[icon-pulse_3.6s_ease-in-out_infinite]">
              <Icon name="sparkle" />
            </span>
          </div>
        </div>
      </div>

      <span
        aria-hidden
        className="absolute left-[6%] top-[12%] flex h-12 w-12 items-center justify-center rounded-full animate-[float-y_5s_ease-in-out_infinite]"
        style={{
          backgroundColor: COLORS.pureWhite,
          boxShadow: `0 12px 24px -12px rgba(12,23,84,0.25)`,
          color: COLORS.brandElectric,
        }}
      >
        <Icon name="target" />
      </span>
      <span
        aria-hidden
        className="absolute right-[4%] top-[34%] flex h-12 w-12 items-center justify-center rounded-full animate-[float-y_4.4s_ease-in-out_infinite] [animation-delay:0.7s]"
        style={{
          backgroundColor: COLORS.pureWhite,
          boxShadow: `0 12px 24px -12px rgba(12,23,84,0.25)`,
          color: COLORS.brandElectric,
        }}
      >
        <Icon name="balance" />
      </span>
      <span
        aria-hidden
        className="absolute bottom-[10%] left-[14%] flex h-12 w-12 items-center justify-center rounded-full animate-[float-y_5.4s_ease-in-out_infinite] [animation-delay:1.2s]"
        style={{
          backgroundColor: COLORS.pureWhite,
          boxShadow: `0 12px 24px -12px rgba(12,23,84,0.25)`,
          color: COLORS.brandElectric,
        }}
      >
        <Icon name="rocket" />
      </span>
    </div>
  );
}

function SectionHeader({
  number,
  title,
  italic,
}: {
  number: string;
  title: string;
  italic: string;
}) {
  return (
    <div className="flex flex-col gap-4">
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
          fontSize: "clamp(32px, 5vw, 56px)",
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

function PainSection() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: COLORS.lightCoolGray }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
        <SectionHeader number="01 — Знакомо?" title="Вам это" italic="знакомо?" />

        <ul className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4">
          {PAINS.map((item, i) => (
            <li
              key={item}
              className="card-rise group flex items-start gap-4 p-6 md:p-7"
              style={{
                backgroundColor: COLORS.pureWhite,
                border: `1px solid ${COLORS.lilacAccent}`,
                borderRadius: "16px",
                animationDelay: `${i * 60}ms`,
              }}
            >
              <span
                aria-hidden
                className="shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110"
                style={{
                  fontFamily: FONT_ACCENT,
                  fontWeight: 400,
                  fontSize: "32px",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: COLORS.brandElectric,
                  fontStyle: "italic",
                }}
              >
                0{i + 1}
              </span>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: COLORS.pitchBlack,
                }}
              >
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BridgeSection() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 md:px-12 md:py-20">
        <div className="relative grid items-start gap-5 md:grid-cols-[auto_1fr] md:gap-10 max-w-[980px]">
          <span
            aria-hidden
            className="hidden md:block leading-none"
            style={{
              fontFamily: FONT_ACCENT,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(96px, 11vw, 144px)",
              color: COLORS.brandElectric,
              letterSpacing: "-0.06em",
              marginTop: "-0.22em",
            }}
          >
            “
          </span>
          <p
            className="pl-5 md:pl-0"
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 500,
              fontSize: "clamp(24px, 3.5vw, 42px)",
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              color: COLORS.pitchBlack,
              borderLeft: `3px solid ${COLORS.brandElectric}`,
              paddingLeft: "20px",
            }}
          >
            Настало время{" "}
            <em
              className="italic"
              style={{
                fontFamily: FONT_ACCENT,
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: COLORS.brandElectric,
              }}
            >
              изменить это
            </em>
            , увидеть новые возможности и начать двигаться к лучшей жизни на
            курсе «Базовые законы жизни».
          </p>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
        <SectionHeader
          number="02 — Что внутри"
          title="Благодаря курсу"
          italic="вы…"
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {BENEFITS.map((item, i) => (
            <li
              key={item.text}
              className="card-rise group flex flex-col gap-4 p-6 md:p-7"
              style={{
                backgroundColor: COLORS.pureWhite,
                border: `1px solid ${COLORS.lilacAccent}`,
                borderRadius: "16px",
                animationDelay: `${i * 70}ms`,
              }}
            >
              <span
                aria-hidden
                className="icon-bubble flex h-12 w-12 items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3"
                style={{
                  backgroundColor: COLORS.lilacAccent,
                  color: COLORS.brandElectric,
                  borderRadius: "100px",
                }}
              >
                <Icon name={item.icon} />
              </span>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: COLORS.pitchBlack,
                }}
              >
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FormatSection() {
  return (
    <section
      id="format"
      className="w-full scroll-mt-20"
      style={{ backgroundColor: COLORS.lightCoolGray }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
        <SectionHeader
          number="03 — Формат"
          title="Когда и как"
          italic="проходит курс"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
          <article
            className="flex flex-col gap-3 p-7 md:p-9"
            style={{
              backgroundColor: COLORS.boardroomNavy,
              color: COLORS.pureWhite,
              borderRadius: "16px",
            }}
          >
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
              <Icon name="calendar" />
              Старт
            </div>
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 500,
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: COLORS.pureWhite,
              }}
            >
              Дата уточняется
            </div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: "16px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.78)",
              }}
            >
              Оставьте заявку — сообщу о старте потока первым.
            </p>
          </article>

          <article
            className="flex flex-col gap-3 p-7 md:p-9"
            style={{
              backgroundColor: COLORS.pureWhite,
              border: `1px solid ${COLORS.lilacAccent}`,
              borderRadius: "16px",
            }}
          >
            <div
              style={{
                fontFamily: FONT_BODY,
                fontSize: "12px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: COLORS.mediumGray,
              }}
            >
              Длительность
            </div>
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 500,
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: COLORS.boardroomNavy,
              }}
            >
              4 недели
            </div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: "16px",
                lineHeight: 1.6,
                color: COLORS.mediumGray,
              }}
            >
              Плюс одна дополнительная неделя сопровождения.
            </p>
          </article>
        </div>

        <div className="mt-10">
          <h3
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 500,
              fontSize: "clamp(24px, 3vw, 32px)",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: COLORS.pitchBlack,
            }}
          >
            На курсе вас{" "}
            <em
              className="italic"
              style={{
                fontFamily: FONT_ACCENT,
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: COLORS.brandElectric,
              }}
            >
              ждёт
            </em>
          </h3>

          <ul className="mt-6 grid gap-3 md:grid-cols-2 md:gap-4">
            {FEATURES.map((item, i) => (
              <li
                key={item.text}
                className="card-rise group flex items-start gap-4 p-5 md:p-6"
                style={{
                  backgroundColor: COLORS.pureWhite,
                  border: `1px solid ${COLORS.lilacAccent}`,
                  borderRadius: "16px",
                  animationDelay: `${i * 70}ms`,
                }}
              >
                <span
                  aria-hidden
                  className="icon-bubble flex h-10 w-10 shrink-0 items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3"
                  style={{
                    backgroundColor: COLORS.lilacAccent,
                    color: COLORS.brandElectric,
                    borderRadius: "100px",
                  }}
                >
                  <Icon name={item.icon} />
                </span>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: "16px",
                    lineHeight: 1.6,
                    color: COLORS.pitchBlack,
                  }}
                >
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function AfterSection() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
        <SectionHeader
          number="04 — После"
          title="После курса вы"
          italic="сможете"
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {AFTER.map((item, i) => {
            const isHighlight = i === AFTER.length - 1;
            return (
            <li
              key={item.text}
              className="card-rise group relative flex flex-col gap-4 overflow-hidden p-6 md:p-7"
              style={{
                backgroundColor: isHighlight ? COLORS.boardroomNavy : COLORS.pureWhite,
                color: isHighlight ? COLORS.pureWhite : COLORS.pitchBlack,
                border: `1px solid ${isHighlight ? COLORS.boardroomNavy : COLORS.lilacAccent}`,
                borderRadius: "16px",
                animationDelay: `${i * 70}ms`,
              }}
            >
              {isHighlight && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full"
                  style={{ border: `1px solid rgba(255,255,255,0.08)` }}
                />
              )}
              <span
                aria-hidden
                className="icon-bubble flex h-12 w-12 items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3"
                style={{
                  backgroundColor: isHighlight ? "rgba(255,255,255,0.08)" : COLORS.lilacAccent,
                  color: isHighlight ? COLORS.feedbackYellow : COLORS.brandElectric,
                  borderRadius: "100px",
                  border: isHighlight ? `1px solid rgba(255,193,58,0.3)` : "none",
                }}
              >
                <Icon name={item.icon} />
              </span>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: isHighlight ? "rgba(255,255,255,0.88)" : COLORS.pitchBlack,
                }}
              >
                {item.text}
              </p>
            </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-16px_rgba(255,193,58,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: COLORS.feedbackYellow,
              color: COLORS.boardroomNavy,
              borderRadius: "100px",
              padding: "16px 32px",
              fontFamily: FONT_BODY,
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: 1.4,
              ["--tw-ring-color" as string]: COLORS.feedbackYellow,
              ["--tw-ring-offset-color" as string]: COLORS.softOffWhite,
            }}
          >
            <Icon name="instagram" />
            Пишите «Хочу на базовые законы жизни»
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: "12px",
              color: COLORS.mediumGray,
            }}
          >
            В директ Instagram — отвечу лично
          </span>
        </div>

      </div>
    </section>
  );
}

