import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import HeroVideo from "./HeroVideo";
import ScrollReveal from "./ScrollReveal";
import { LogoLockup } from "@/components/Logo/variants";

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

const FORM_URL = "https://forms.gle/4iHzX8ZwvCpiS62h8";

type IconKey =
  | "growth"
  | "loop"
  | "compass"
  | "camera"
  | "spark"
  | "people"
  | "magnet"
  | "rocket"
  | "target"
  | "star"
  | "shield"
  | "balance"
  | "trophy"
  | "chat"
  | "doc"
  | "handshake"
  | "map"
  | "clock"
  | "heart"
  | "medal"
  | "flame"
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
    case "growth":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-1">
          <path d="M4 19h16" />
          <path d="M4 15l4-4 3 3 5-6" />
          <path d="M16 8h4v4" />
        </svg>
      );
    case "loop":
      return (
        <svg {...common} className="h-6 w-6 [.icon-bubble:hover_&]:animate-[icon-spin_0.9s_ease-in-out]">
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[18deg]">
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5l-2 5-5 2 2-5z" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "camera":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-110">
          <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
          <circle cx="12" cy="13" r="3.4" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common} className="h-6 w-6 [.icon-bubble:hover_&]:animate-[icon-pulse_1.2s_ease-in-out_infinite]">
          <path d="M12 3l1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8z" />
          <path d="M19 4l.5 1.6L21 6l-1.5.4L19 8l-.5-1.6L17 6l1.5-.4z" />
        </svg>
      );
    case "people":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-105">
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20v-1a6 6 0 0 1 12 0v1" />
          <path d="M16 6.5a3 3 0 0 1 0 6" opacity="0.7" />
          <path d="M18 20v-1a6 6 0 0 0-3-5.2" opacity="0.7" />
        </svg>
      );
    case "magnet":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-110">
          <path d="M6 3v8a6 6 0 0 0 12 0V3" />
          <path d="M6 3h4v8a2 2 0 0 0 4 0V3h4" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-1 [.icon-bubble:hover_&]:rotate-[-12deg]">
          <path d="M9 14l-2.5 2.5a2 2 0 1 0 1 1L10 15" />
          <path d="M13 16l-3-3a16 16 0 0 1 1.7-4A12 12 0 0 1 21 3c0 2.4-.7 6.7-5 9.7A16 16 0 0 1 13 16z" />
          <circle cx="15.5" cy="8.5" r="1.4" />
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
    case "star":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[12deg]">
          <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-105">
          <path d="M12 3l7 3v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "balance":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[6deg]">
          <path d="M12 4v16" />
          <path d="M6 8h12" />
          <path d="M6 8l-3 6h6z" />
          <path d="M18 8l-3 6h6z" />
          <path d="M8 20h8" />
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
    case "chat":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-110">
          <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.4-4.6A8 8 0 1 1 21 12z" />
          <circle cx="9" cy="12" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="13" cy="12" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="17" cy="12" r="0.9" fill="currentColor" stroke="none" />
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
    case "handshake":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-105">
          <path d="M3 12l4-4 3 3 2-2 4 4-2 2-4-4z" />
          <path d="M11 9l3-3 6 6-3 3" />
          <path d="M14 14l-3 3-2-2" />
        </svg>
      );
    case "map":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-105">
          <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z" />
          <path d="M9 4v14M15 6v14" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[18deg]">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common} className="h-6 w-6 [.icon-bubble:hover_&]:animate-[icon-pulse_1.2s_ease-in-out_infinite]">
          <path d="M12 20s-7-4.4-9.2-9A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 9.2 5c-2.2 4.6-9.2 9-9.2 9z" />
        </svg>
      );
    case "medal":
      return (
        <svg {...common} className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-0.5">
          <path d="M8 3l4 6 4-6" />
          <circle cx="12" cy="15" r="6" />
          <path d="M12 12.5l1 2 2 .2-1.5 1.4.4 2-1.9-1-1.9 1 .4-2L9 14.7l2-.2z" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common} className="h-6 w-6 [.icon-bubble:hover_&]:animate-[icon-pulse_1.2s_ease-in-out_infinite]">
          <path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-1.6.8-3 1.5-3.8C9 10 9 11.5 10 12c0-2 1-4.5 2-9z" />
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

type Item = { icon: IconKey; text: string };

type Pain = { image: string; title: string; text: string };

// Порядок подобран под бенто: длинные тексты — в широких (горизонтальных)
// слотах 0,1,6,7; короткие — в узких 2,3,4,5.
const PAINS: Pain[] = [
  {
    image: "/pain-2.png",
    title: "Усилий много — отдачи нет",
    text: "Постоянно учитесь, пробуете новые подходы и инструменты, но результат не соответствует вложенным усилиям.",
  },
  {
    image: "/pain-4.png",
    title: "Информационный шум",
    text: "Вокруг слишком много информации и рекомендаций — сложно выбрать то, что действительно сработает именно для вас.",
  },
  {
    image: "/pain-1.png",
    title: "Работы много, роста нет",
    text: "Вы много делаете, но доход и количество клиентов не растут.",
  },
  {
    image: "/pain-3.png",
    title: "Нет ясности в действиях",
    text: "Не понимаете, какие именно действия приведут к результату.",
  },
  {
    image: "/pain-5.png",
    title: "Сложно вести Instagram",
    text: "Сложно проявляться в Instagram и вести его регулярно.",
  },
  {
    image: "/pain-7.png",
    title: "Мало сил и веры в себя",
    text: "Не хватает энергии, поддержки и веры в себя.",
  },
  {
    image: "/pain-6.png",
    title: "Нет системы в контенте",
    text: "Не хватает системы, идей и уверенности, чтобы создавать контент, который вызывает отклик и привлекает клиентов.",
  },
  {
    image: "/pain-8.png",
    title: "Путь в одиночку",
    text: "Появляются сомнения, откладывание и ощущение, что вы идёте к цели в одиночку — без поддержки и окружения единомышленников.",
  },
];

const DESIRES: Item[] = [
  {
    icon: "growth",
    text: "Увеличить доход и выйти на новый финансовый уровень без постоянной гонки и переработок.",
  },
  {
    icon: "magnet",
    text: "Привлекать больше клиентов и создать стабильный, предсказуемый поток заявок.",
  },
  {
    icon: "rocket",
    text: "Создавать и успешно запускать свои проекты, продукты и программы, которые приносят прибыль.",
  },
  {
    icon: "target",
    text: "Понимать, какие действия действительно приводят к результату, а не распыляться на всё подряд.",
  },
  {
    icon: "camera",
    text: "Регулярно и уверенно вести Instagram, чтобы он привлекал клиентов и укреплял доверие.",
  },
  {
    icon: "star",
    text: "Построить личный бренд, который выделяет вас среди конкурентов и помогает продавать легче.",
  },
  {
    icon: "shield",
    text: "Перестать сомневаться в себе и действовать уверенно, без страха проявляться.",
  },
  {
    icon: "people",
    text: "Найти поддерживающее окружение единомышленников, которое вдохновляет на рост и развитие.",
  },
  {
    icon: "balance",
    text: "Работать в удовольствие, сохраняя баланс между бизнесом, доходом и личной жизнью.",
  },
  {
    icon: "compass",
    text: "Чувствовать ясность и уверенность в своих целях, стратегии и следующих шагах.",
  },
  {
    icon: "trophy",
    text: "Получать признание своей экспертности, чтобы клиенты сами рекомендовали вас и возвращались снова.",
  },
];

const INCLUDED: Item[] = [
  {
    icon: "chat",
    text: "Регулярные мастермайнды, на которых вы получите персональные решения именно для своих задач и найдёте ответы на вопросы, которые тормозят ваш рост.",
  },
  {
    icon: "handshake",
    text: "Поддержка и обратная связь от меня и участников сообщества, чтобы вы не оставались один на один со своими сложностями.",
  },
  {
    icon: "map",
    text: "Индивидуальная стратегия развития на основе ваших целей, сильных сторон и текущей ситуации — только те действия, которые действительно ведут к результату.",
  },
  {
    icon: "doc",
    text: "Практическая рабочая тетрадь с упражнениями, техниками и заданиями, которые помогут внедрить изменения и усилить ваши результаты.",
  },
  {
    icon: "people",
    text: "Сильное окружение единомышленников, с которым рождаются новые идеи, совместные проекты, партнёрства и возможности для роста.",
  },
  {
    icon: "rocket",
    text: "Рост уверенности в себе и своих действиях, чтобы смело проявляться, принимать решения и масштабировать свою экспертность.",
  },
  {
    icon: "target",
    text: "Фокус на результате, а не на бесконечном потреблении информации. Каждый этап программы направлен на реальные изменения в вашем бизнесе.",
  },
  {
    icon: "loop",
    text: "Мотивация и дисциплина, которые помогают не останавливаться на полпути и регулярно двигаться к своим целям.",
  },
];

type Stat = { image: string; stat: string; unit?: string; title: string; text: string };

const WHY: Stat[] = [
  {
    image: "/why-1.png",
    stat: "7",
    unit: "участников",
    title: "Небольшая группа",
    text: "Всего 7 мест — чтобы каждый получил максимум внимания, обратной связи и реальных результатов.",
  },
  {
    image: "/why-2.png",
    stat: "6",
    unit: "недель",
    title: "Глубокая совместная работа",
    text: "За это время мы выстроим стратегию, внедрим ключевые изменения и сфокусируемся на действиях, которые приводят к росту.",
  },
  {
    image: "/why-3.png",
    stat: "100%",
    title: "Полное погружение в каждого",
    text: "Я лично работаю с каждым участником: помогаю находить решения, даю обратную связь и сопровождаю на всём пути к результату.",
  },
  {
    image: "/why-4.png",
    stat: "8",
    unit: "лет опыта",
    title: "Практический опыт",
    text: "Передам весь опыт работы с экспертами: продвижение, привлечение клиентов, создание сильного личного бренда и увеличение дохода.",
  },
  {
    image: "/why-5.png",
    stat: "1",
    unit: "поток",
    title: "Этот поток — единственный",
    text: "Повтор программы не планируется — это возможность попасть в проект именно сейчас.",
  },
];

const OG_TITLE = "ПРОРЫВ — проект для экспертов · Дарья Карпук";
const OG_DESCRIPTION =
  "«ПРОРЫВ» — проект для экспертов: понятная стратегия, поддержка, окружение сильных единомышленников и обратная связь, чтобы увеличить доход, привлекать клиентов и уверенно развивать свой проект.";

export const metadata: Metadata = {
  title: OG_TITLE,
  description: OG_DESCRIPTION,
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/og-proryv2.png",
        width: 1200,
        height: 630,
        alt: "ПРОРЫВ — проект для экспертов",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: ["/og-proryv2.png"],
  },
};

export default function ProryvPage() {
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
      <QuickFacts />
      <PainSection />
      <DesireSection />
      <RevealSection />
      <IncludedSection />
      <ResultSection />
      <WhySection />
      <PricingSection />
      <ScrollReveal />
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
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .card-rise:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -24px rgba(12, 23, 84, 0.35);
          border-color: ${COLORS.brandElectric};
        }
        [data-reveal] {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
          transition-delay: var(--rd, 0ms);
          will-change: opacity, transform;
        }
        [data-reveal].is-visible {
          opacity: 1;
          transform: none;
        }
        .zoom-img {
          transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .group:hover .zoom-img {
          transform: scale(1.05);
        }
        @media (prefers-reduced-motion: reduce) {
          .card-rise,
          .card-rise:hover,
          .zoom-img,
          .group:hover .zoom-img,
          [data-reveal],
          [data-reveal].is-visible,
          .icon-bubble *,
          .icon-bubble {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
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
          className="group inline-flex items-center gap-3 rounded-full px-1 py-1 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="Дарья Карпук — на главную"
          style={{
            ["--tw-ring-color" as string]: COLORS.boardroomNavy,
            ["--tw-ring-offset-color" as string]: COLORS.softOffWhite,
          }}
        >
          <LogoLockup className="h-9 w-auto" />
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
    <section
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: COLORS.boardroomNavy }}
    >
      <HeroVideo />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(90deg, rgba(12,23,84,0.62) 0%, rgba(12,23,84,0.34) 42%, rgba(12,23,84,0.08) 72%, rgba(12,23,84,0) 100%)`,
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col justify-center px-6 pt-14 pb-16 md:min-h-[600px] md:px-12 md:pt-20 md:pb-24">
        <div className="flex max-w-2xl flex-col gap-7">
          <span
            className="inline-flex w-fit items-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              color: COLORS.pureWhite,
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "16px",
              padding: "4px 12px",
              fontSize: "14px",
              lineHeight: 1.43,
            }}
          >
            Новый проект для экспертов
          </span>

          <h1
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 500,
              fontSize: "clamp(56px, 12vw, 148px)",
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              color: COLORS.pureWhite,
              textShadow: "0 2px 24px rgba(12,23,84,0.45)",
            }}
          >
            ПРО
            <em
              className="italic"
              style={{
                fontFamily: FONT_ACCENT,
                fontWeight: 400,
                letterSpacing: "-0.04em",
                color: COLORS.feedbackYellow,
              }}
            >
              РЫВ
            </em>
          </h1>

          <p
            className="max-w-xl"
            style={{
              fontFamily: FONT_BODY,
              fontSize: "18px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.92)",
              textShadow: "0 1px 12px rgba(12,23,84,0.5)",
            }}
          >
            Пространство, где вам больше не придётся идти к своим целям в
            одиночку. Понятная стратегия, поддержка и сильное окружение, чтобы
            расти в доходе, клиентах и своём проекте — уверенно и с удовольствием.
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
                ["--tw-ring-offset-color" as string]: COLORS.boardroomNavy,
              }}
            >
              Хочу в «ПРОРЫВ»
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <a
              href="#included"
              className="group inline-flex items-center gap-2 rounded-full px-1 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                color: COLORS.pureWhite,
                fontFamily: FONT_BODY,
                fontSize: "15px",
                fontWeight: 500,
                ["--tw-ring-color" as string]: COLORS.pureWhite,
                ["--tw-ring-offset-color" as string]: COLORS.boardroomNavy,
              }}
            >
              <span
                className="border-b transition-colors group-hover:border-current"
                style={{ borderColor: "rgba(255,255,255,0.4)" }}
              >
                Что внутри
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
      </div>
    </section>
  );
}

const QUICK_FACTS: { icon: IconKey; value: string; label: string }[] = [
  { icon: "clock", value: "6 недель", label: "глубокой работы" },
  { icon: "people", value: "7 мест", label: "камерная группа" },
  { icon: "flame", value: "1 поток", label: "повтора не будет" },
  { icon: "growth", value: "175 $", label: "цена до старта" },
];

function QuickFacts() {
  return (
    <section className="relative z-20 -mt-10 w-full md:-mt-12">
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-10 md:px-12 md:pb-14">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {QUICK_FACTS.map((f) => (
            <li
              key={f.value}
              className="card-rise group flex items-center gap-3 p-5 md:p-6"
              style={{
                backgroundColor: COLORS.pureWhite,
                border: `1px solid ${COLORS.lilacAccent}`,
                borderRadius: "16px",
                boxShadow: "0 20px 50px -24px rgba(12, 23, 84, 0.55)",
              }}
            >
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundColor: COLORS.lilacAccent,
                  color: COLORS.brandElectric,
                  borderRadius: "100px",
                }}
              >
                <Icon name={f.icon} />
              </span>
              <div className="flex flex-col">
                <span
                  style={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 500,
                    fontSize: "clamp(20px, 2.4vw, 26px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    color: COLORS.boardroomNavy,
                  }}
                >
                  {f.value}
                </span>
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: "13px",
                    lineHeight: 1.4,
                    color: COLORS.mediumGray,
                  }}
                >
                  {f.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SectionHeader({
  title,
  italic,
}: {
  title: string;
  italic: string;
}) {
  return (
    <h2
      data-reveal
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
  );
}

function PainSection() {
  return (
    <section
      id="pains"
      className="w-full scroll-mt-20"
      style={{ backgroundColor: COLORS.lightCoolGray }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
        <SectionHeader
          title="Возможно, вы узнаёте себя"
          italic="в этом"
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {PAINS.map((item, i) => {
            const wide = i === 0 || i === 1 || i === 6 || i === 7;
            return (
              <li
                key={item.text}
                data-reveal
                className={`card-rise group flex overflow-hidden ${
                  wide ? "flex-col lg:col-span-2 lg:flex-row" : "flex-col"
                }`}
                style={{
                  backgroundColor: COLORS.pureWhite,
                  border: `1px solid ${COLORS.lilacAccent}`,
                  borderRadius: "16px",
                  ["--rd" as string]: `${i * 60}ms`,
                }}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    wide
                      ? "aspect-[16/10] lg:aspect-auto lg:w-[44%] lg:self-stretch"
                      : "aspect-[16/10]"
                  }`}
                  style={{ backgroundColor: COLORS.softOffWhite }}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 26vw, (min-width: 640px) 46vw, 90vw"
                    className="zoom-img object-cover"
                  />
                </div>
                <div
                  className={`flex flex-col gap-2 p-6 md:p-7 ${
                    wide ? "lg:flex-1 lg:justify-center" : ""
                  }`}
                >
                  <h3
                    style={{
                      fontFamily: FONT_HEADING,
                      fontWeight: 500,
                      fontSize: "20px",
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                      color: COLORS.boardroomNavy,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: "15px",
                      lineHeight: 1.6,
                      color: COLORS.pitchBlack,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function DesireSection() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
        <SectionHeader
          title="Но при этом вы"
          italic="хотите"
        />

        <ul className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4">
          {DESIRES.map((item, i) => (
            <li
              key={item.text}
              data-reveal
              className="relative flex items-start gap-3 overflow-hidden p-4 md:p-5"
              style={{
                backgroundColor: COLORS.lightCoolGray,
                borderRadius: "14px",
                ["--rd" as string]: `${i * 45}ms`,
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-5 -right-3 z-0 [&_svg]:h-24 [&_svg]:w-24"
                style={{ color: COLORS.brandElectric, opacity: 0.1 }}
              >
                <Icon name={item.icon} />
              </span>
              <span
                aria-hidden
                className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: COLORS.brandElectric,
                  color: COLORS.pureWhite,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                >
                  <path d="M5 12.5l4 4 10-10" />
                </svg>
              </span>
              <p
                className="relative z-10"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "16px",
                  lineHeight: 1.55,
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

function RevealSection() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
        <article
          data-reveal
          className="relative overflow-hidden p-8 md:p-14"
          style={{
            backgroundColor: COLORS.boardroomNavy,
            color: COLORS.pureWhite,
            borderRadius: "16px",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full animate-[orbit-rotate_60s_linear_infinite]"
            style={{ border: `1px dashed rgba(217,212,255,0.18)` }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-6 top-16 h-40 w-40 rounded-full"
            style={{ border: `1px solid rgba(255,255,255,0.06)` }}
          />

          <div className="relative flex flex-col gap-6 md:max-w-[80%]">
            <span
              className="inline-flex w-fit items-center gap-2"
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
              Приглашение
            </span>

            <h2
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 500,
                fontSize: "clamp(28px, 4.5vw, 52px)",
                lineHeight: 1.08,
                letterSpacing: "-0.04em",
                color: COLORS.pureWhite,
              }}
            >
              Тогда я приглашаю вас в новый проект для экспертов —{" "}
              <em
                className="italic"
                style={{
                  fontFamily: FONT_ACCENT,
                  fontWeight: 400,
                  color: COLORS.feedbackYellow,
                }}
              >
                «ПРОРЫВ»
              </em>
            </h2>

            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: "18px",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.82)",
              }}
            >
              «ПРОРЫВ» — это пространство, где вам больше не придётся идти к
              своим целям в одиночку. Здесь вы получите не только знания, но и
              понятную стратегию, поддержку, окружение сильных единомышленников
              и регулярную обратную связь, которые помогут быстрее прийти к
              результату.
            </p>

            <p
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 500,
                fontSize: "clamp(20px, 2.6vw, 30px)",
                lineHeight: 1.25,
                letterSpacing: "-0.03em",
                color: COLORS.pureWhite,
              }}
            >
              Мы будем двигаться вместе — шаг за шагом, превращая идеи в
              действия, а действия — в{" "}
              <em
                className="italic"
                style={{
                  fontFamily: FONT_ACCENT,
                  fontWeight: 400,
                  color: COLORS.feedbackYellow,
                }}
              >
                рост дохода, клиентов и вашего проекта
              </em>
              .
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function IncludedSection() {
  return (
    <section
      id="included"
      className="relative isolate w-full scroll-mt-20 overflow-hidden"
    >
      <Image
        src="/included-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: "rgba(249,248,246,0.55)" }}
      />
      <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
        <SectionHeader
          title="Что вас ждёт"
          italic="в проекте"
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {INCLUDED.map((item, i) => (
            <li
              key={item.text}
              data-reveal
              className="card-rise group flex flex-row items-start gap-4 p-6 md:flex-col md:p-7"
              style={{
                backgroundColor: "rgba(255,255,255,0.9)",
                border: `1px solid ${COLORS.lilacAccent}`,
                borderRadius: "16px",
                boxShadow: "0 18px 40px -26px rgba(12, 23, 84, 0.4)",
                backdropFilter: "blur(4px)",
                ["--rd" as string]: `${i * 60}ms`,
              }}
            >
              <span
                aria-hidden
                className="icon-bubble flex h-12 w-12 shrink-0 items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3"
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

function ResultSection() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: COLORS.lightCoolGray }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
        <SectionHeader
          title="Результат, к которому"
          italic="вы придёте"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
          <article
            data-reveal
            className="flex flex-col gap-4 p-8 md:p-10"
            style={{
              backgroundColor: COLORS.pureWhite,
              border: `1px solid ${COLORS.lilacAccent}`,
              borderRadius: "16px",
            }}
          >
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center"
              style={{
                backgroundColor: COLORS.lilacAccent,
                color: COLORS.brandElectric,
                borderRadius: "100px",
              }}
            >
              <Icon name="map" />
            </span>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: "17px",
                lineHeight: 1.65,
                color: COLORS.pitchBlack,
              }}
            >
              Вы перестанете действовать хаотично и начнёте двигаться по
              понятному плану. Получите поддержку, окружение и инструменты,
              которые помогут привлекать больше клиентов, увеличивать доход,
              запускать новые проекты и развивать свою экспертность —{" "}
              <em
                className="italic"
                style={{
                  fontFamily: FONT_ACCENT,
                  fontWeight: 400,
                  color: COLORS.brandElectric,
                }}
              >
                уверенно и с удовольствием
              </em>
              .
            </p>
          </article>

          <article
            data-reveal
            className="relative flex flex-col justify-center gap-4 overflow-hidden p-8 md:p-10"
            style={{
              backgroundColor: COLORS.brandElectric,
              color: COLORS.pureWhite,
              borderRadius: "16px",
              ["--rd" as string]: "120ms",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full"
              style={{ border: `1px solid rgba(255,255,255,0.15)` }}
            />
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.14)",
                color: COLORS.feedbackYellow,
                borderRadius: "100px",
              }}
            >
              <Icon name="people" />
            </span>
            <p
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 500,
                fontSize: "clamp(22px, 2.8vw, 32px)",
                lineHeight: 1.25,
                letterSpacing: "-0.03em",
                color: COLORS.pureWhite,
              }}
            >
              «ПРОРЫВ» — это не просто обучение. Это{" "}
              <em
                className="italic"
                style={{
                  fontFamily: FONT_ACCENT,
                  fontWeight: 400,
                  color: COLORS.feedbackYellow,
                }}
              >
                сообщество
              </em>
              , где каждый растёт быстрее благодаря сильному окружению,
              совместной работе и поддержке на каждом этапе.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
        <SectionHeader
          title="Почему этот поток"
          italic="особенный"
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {WHY.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              className="card-rise group flex flex-col overflow-hidden"
              style={{
                backgroundColor: COLORS.pureWhite,
                border: `1px solid ${COLORS.lilacAccent}`,
                borderRadius: "16px",
                ["--rd" as string]: `${i * 70}ms`,
              }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden" style={{ backgroundColor: COLORS.softOffWhite }}>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 768px) 46vw, 90vw"
                  className="zoom-img object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(249,248,246,0.96) 0%, rgba(249,248,246,0.7) 34%, rgba(249,248,246,0) 100%)",
                  }}
                />
                <div className="absolute bottom-3 left-5 flex items-baseline gap-2">
                  <span
                    style={{
                      fontFamily: FONT_HEADING,
                      fontWeight: 600,
                      fontSize: "clamp(50px, 5.5vw, 70px)",
                      lineHeight: 1,
                      letterSpacing: "-0.05em",
                      color: COLORS.boardroomNavy,
                    }}
                  >
                    {item.stat}
                  </span>
                  {item.unit && (
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: "14px",
                        fontWeight: 600,
                        color: COLORS.brandElectric,
                      }}
                    >
                      {item.unit}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 p-6 md:p-7">
                <h3
                  style={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 500,
                    fontSize: "20px",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    color: COLORS.boardroomNavy,
                  }}
                >
                  {item.title}
                </h3>
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
      <article
        data-reveal
        className="relative overflow-hidden p-8 md:p-14"
        style={{
          backgroundColor: COLORS.boardroomNavy,
          color: COLORS.pureWhite,
          borderRadius: "16px",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full animate-[orbit-rotate_60s_linear_infinite]"
          style={{ border: `1px dashed rgba(217,212,255,0.18)` }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 top-16 h-40 w-40 rounded-full"
          style={{ border: `1px solid rgba(255,255,255,0.06)` }}
        />

        <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7 flex flex-col gap-5">
            <span
              className="inline-flex w-fit items-center gap-2"
              style={{
                backgroundColor: COLORS.feedbackYellow,
                color: COLORS.boardroomNavy,
                borderRadius: "999px",
                padding: "6px 14px",
                fontFamily: FONT_BODY,
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              <Icon name="flame" />
              Раннее бронирование
            </span>

            <div className="flex items-baseline gap-4">
              <span
                style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 500,
                  fontSize: "clamp(56px, 8vw, 104px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em",
                  color: COLORS.pureWhite,
                }}
              >
                175&nbsp;$
              </span>
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "clamp(22px, 3vw, 32px)",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "line-through",
                }}
              >
                350&nbsp;$
              </span>
            </div>

            <p
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 500,
                fontSize: "clamp(18px, 2.2vw, 24px)",
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                color: COLORS.pureWhite,
              }}
            >
              Специальная цена{" "}
              <em
                className="italic"
                style={{
                  fontFamily: FONT_ACCENT,
                  fontWeight: 400,
                  color: COLORS.feedbackYellow,
                }}
              >
                до старта
              </em>{" "}
              программы.
            </p>

            <p
              className="max-w-md"
              style={{
                fontFamily: FONT_BODY,
                fontSize: "15px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.78)",
              }}
            >
              Количество мест ограничено — всего 7 участников. После заполнения
              группы регистрация будет закрыта.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col items-start gap-4 md:items-end md:text-right">
            <a
              href={FORM_URL}
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
                ["--tw-ring-offset-color" as string]: COLORS.boardroomNavy,
              }}
            >
              <Icon name="doc" />
              Забронировать место
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
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Регистрация через короткую анкету — займёт пару минут
            </span>
          </div>
        </div>
      </article>
    </section>
  );
}
