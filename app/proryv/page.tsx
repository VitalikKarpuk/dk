import Image from "next/image";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import HeroVideo from "./HeroVideo";
import {
  COLORS,
  CONTAINER,
  FONT_BODY,
  GUTTER,
  HERO_Y,
  SECTION_INNER,
  TYPE,
} from "@/lib/design";
import {
  Badge,
  Button,
  IconBubble,
  QuietLink,
  ScrollReveal,
  SectionHeading,
  SiteHeader,
} from "@/components/ui";

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
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-1"
        >
          <path d="M4 19h16" />
          <path d="M4 15l4-4 3 3 5-6" />
          <path d="M16 8h4v4" />
        </svg>
      );
    case "loop":
      return (
        <svg
          {...common}
          className="h-6 w-6 [.icon-bubble:hover_&]:animate-[icon-spin_0.9s_ease-in-out]"
        >
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      );
    case "compass":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[18deg]"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5l-2 5-5 2 2-5z" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "camera":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-110"
        >
          <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
          <circle cx="12" cy="13" r="3.4" />
        </svg>
      );
    case "spark":
      return (
        <svg
          {...common}
          className="h-6 w-6 [.icon-bubble:hover_&]:animate-[icon-pulse_1.2s_ease-in-out_infinite]"
        >
          <path d="M12 3l1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8z" />
          <path d="M19 4l.5 1.6L21 6l-1.5.4L19 8l-.5-1.6L17 6l1.5-.4z" />
        </svg>
      );
    case "people":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-105"
        >
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20v-1a6 6 0 0 1 12 0v1" />
          <path d="M16 6.5a3 3 0 0 1 0 6" opacity="0.7" />
          <path d="M18 20v-1a6 6 0 0 0-3-5.2" opacity="0.7" />
        </svg>
      );
    case "magnet":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-110"
        >
          <path d="M6 3v8a6 6 0 0 0 12 0V3" />
          <path d="M6 3h4v8a2 2 0 0 0 4 0V3h4" />
        </svg>
      );
    case "rocket":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-1 [.icon-bubble:hover_&]:rotate-[-12deg]"
        >
          <path d="M9 14l-2.5 2.5a2 2 0 1 0 1 1L10 15" />
          <path d="M13 16l-3-3a16 16 0 0 1 1.7-4A12 12 0 0 1 21 3c0 2.4-.7 6.7-5 9.7A16 16 0 0 1 13 16z" />
          <circle cx="15.5" cy="8.5" r="1.4" />
        </svg>
      );
    case "target":
      return (
        <svg {...common} className="h-6 w-6">
          <circle
            cx="12"
            cy="12"
            r="9"
            className="origin-center transition-transform duration-500 [.icon-bubble:hover_&]:scale-105"
          />
          <circle
            cx="12"
            cy="12"
            r="5.5"
            className="origin-center transition-transform duration-500 [.icon-bubble:hover_&]:scale-90"
          />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "star":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[12deg]"
        >
          <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9z" />
        </svg>
      );
    case "shield":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-105"
        >
          <path d="M12 3l7 3v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "balance":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[6deg]"
        >
          <path d="M12 4v16" />
          <path d="M6 8h12" />
          <path d="M6 8l-3 6h6z" />
          <path d="M18 8l-3 6h6z" />
          <path d="M8 20h8" />
        </svg>
      );
    case "trophy":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-0.5"
        >
          <path d="M7 4h10v4a5 5 0 0 1-10 0z" />
          <path d="M17 4h3v2.5a3 3 0 0 1-3 3" />
          <path d="M7 4H4v2.5a3 3 0 0 0 3 3" />
          <path d="M12 13v4" />
          <path d="M9 21h6l-1-3h-4z" />
        </svg>
      );
    case "chat":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-110"
        >
          <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.4-4.6A8 8 0 1 1 21 12z" />
          <circle cx="9" cy="12" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="13" cy="12" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="17" cy="12" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "doc":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[-4deg]"
        >
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
          <path d="M8 13h8M8 17h5" />
        </svg>
      );
    case "handshake":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-105"
        >
          <path d="M3 12l4-4 3 3 2-2 4 4-2 2-4-4z" />
          <path d="M11 9l3-3 6 6-3 3" />
          <path d="M14 14l-3 3-2-2" />
        </svg>
      );
    case "map":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:scale-105"
        >
          <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z" />
          <path d="M9 4v14M15 6v14" />
        </svg>
      );
    case "clock":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[18deg]"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
    case "heart":
      return (
        <svg
          {...common}
          className="h-6 w-6 [.icon-bubble:hover_&]:animate-[icon-pulse_1.2s_ease-in-out_infinite]"
        >
          <path d="M12 20s-7-4.4-9.2-9A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 9.2 5c-2.2 4.6-9.2 9-9.2 9z" />
        </svg>
      );
    case "medal":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-0.5"
        >
          <path d="M8 3l4 6 4-6" />
          <circle cx="12" cy="15" r="6" />
          <path d="M12 12.5l1 2 2 .2-1.5 1.4.4 2-1.9-1-1.9 1 .4-2L9 14.7l2-.2z" />
        </svg>
      );
    case "flame":
      return (
        <svg
          {...common}
          className="h-6 w-6 [.icon-bubble:hover_&]:animate-[icon-pulse_1.2s_ease-in-out_infinite]"
        >
          <path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-1.6.8-3 1.5-3.8C9 10 9 11.5 10 12c0-2 1-4.5 2-9z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          {...common}
          className="h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="0.9"
            fill="currentColor"
            stroke="none"
          />
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

type Stat = {
  image: string;
  stat: string;
  unit?: string;
  title: string;
  text: string;
};

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
      className="relative flex w-full flex-1 flex-col"
      style={{
        backgroundColor: COLORS.paper,
        color: COLORS.ink,
        fontFamily: FONT_BODY,
      }}
    >
      {/* Тот же каркас, что у /leader: подложка лежит `fixed` под всей
          страницей, содержимое едет отдельным слоем поверх неё. */}
      <AmbientBackdrop />

      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader />
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
      </div>
    </main>
  );
}

function Hero() {
  return (
    <section
      className="relative w-full min-h-[560px] overflow-hidden md:min-h-[640px]"
      style={{ backgroundColor: COLORS.paper }}
    >
      {/* Первый экран собран по тому же рецепту, что на /basic-laws — и по
          той же причине: кадр здесь не портрет, а абстракция, и держать её
          нужно так же, как веер волокон там.

          До этого секция была залита `navy`, текст шёл белым с тенью, а
          курсив в заголовке — золотом. Это был единственный тёмный первый
          экран на сайте: на главной, /leader, /basic-laws и /individual он
          светлый, текст набран чернилами, а курсив — электриком. Кадр
          остался, поменялась его роль: не тёмная подложка во всю секцию, а
          фон справа под бумажной шторкой. */}
      <HeroVideo />

      {/* Шторка слева — общий токен, тот же, что держит текст на первом
          экране главной и /basic-laws. Глухая до 26% ширины и растворяется
          к 72%: под словами остаётся бумага, а золотая воронка выходит в
          свободную правую часть. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "var(--hero-curtain)" }}
      />

      {/* Мобильная шторка. `--hero-curtain` растворяется к 72% ширины —
          это расчёт на десктоп, где текст занимает половину и в прозрачную
          часть не заходит. На узком экране текст идёт во всю ширину и
          правым краем ложится на воронку, где чернилам не хватает
          контраста. `--text-scrim` — готовый токен ровно для текста поверх
          фото: эллипс по центру с растворением к краям. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 md:hidden"
        style={{ background: "var(--text-scrim)" }}
      />

      {/* Нижний фейд в фон страницы. Кадр непрозрачный, а под всей
          страницей лежит `fixed` AmbientBackdrop — без градиента баннер
          вырезал бы в нём прямоугольник, и на тёмной теме «лужи света»
          обрывались бы резкой полосой по границе секции. На тёмной перепад
          заметнее, поэтому фейд выше. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 [[data-theme=dark]_&]:h-48"
        style={{
          backgroundImage: `linear-gradient(to top, ${COLORS.paper}, transparent)`,
        }}
      />

      <div
        className={`relative z-10 flex min-h-[inherit] flex-col justify-center ${CONTAINER} ${GUTTER} ${HERO_Y}`}
      >
        {/* Первый экран въезжает тем же каскадом, что и на /leader:
            бейдж, заголовок, лид, кнопки — по 80ms друг за другом. */}
        <div className="flex max-w-2xl flex-col gap-7">
          <div data-reveal>
            <Badge>Новый проект для экспертов</Badge>
          </div>

          {/* Кегль и начертание — общая ступень `hero`: заголовок первого
              экрана на всех страницах сайта один. Тени под текстом больше
              нет — она была нужна, пока набор лежал поверх видео. */}
          <h1
            data-reveal
            style={{
              ...TYPE.hero,
              color: COLORS.ink,
              ["--rd" as string]: "80ms",
            }}
          >
            ПРО
            <em
              className="italic"
              style={{ ...TYPE.italic, color: COLORS.electric }}
            >
              РЫВ
            </em>
          </h1>

          <p
            data-reveal
            className="max-w-xl"
            style={{
              ...TYPE.lead,
              color: COLORS.ink,
              ["--rd" as string]: "160ms",
            }}
          >
            Пространство, где вам больше не придётся идти к своим целям в
            одиночку. Понятная стратегия, поддержка и сильное окружение, чтобы
            расти в доходе, клиентах и своём проекте — уверенно и с
            удовольствием.
          </p>

          <div
            data-reveal
            className="flex flex-wrap items-center gap-4 pt-2"
            style={{ ["--rd" as string]: "240ms" }}
          >
            <Button href={FORM_URL} size="lg">
              Хочу в «ПРОРЫВ»
            </Button>
            <QuietLink href="#included" direction="down">
              Что внутри
            </QuietLink>
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
  // { icon: "growth", value: "175 $", label: "цена до старта" },
];

function QuickFacts() {
  return (
    <section className="relative z-20 -mt-10 w-full md:-mt-12">
      <div className={`${CONTAINER} ${GUTTER} pb-16 md:pb-24`}>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {QUICK_FACTS.map((f, i) => (
            <li
              key={f.value}
              data-reveal
              className="card-frame group flex items-center gap-3 p-5 md:p-6"
              style={{
                backgroundColor: COLORS.white,
                ["--rd" as string]: `${i * 80}ms`,
              }}
            >
              <IconBubble>
                <Icon name={f.icon} />
              </IconBubble>
              <div className="flex flex-col">
                <span style={{ ...TYPE.cardTitle, color: COLORS.ink }}>
                  {f.value}
                </span>
                <span style={{ ...TYPE.caption, color: COLORS.inkStrong }}>
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

function PainSection() {
  return (
    <section
      id="pains"
      className="w-full scroll-mt-20"
      style={{ backgroundColor: COLORS.coolWash }}
    >
      <div className={SECTION_INNER}>
        <SectionHeading
          data-reveal
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
                className={`card-frame group flex overflow-hidden ${
                  wide ? "flex-col lg:col-span-2 lg:flex-row" : "flex-col"
                }`}
                style={{
                  backgroundColor: COLORS.white,
                  ["--rd" as string]: `${i * 80}ms`,
                }}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    wide
                      ? "aspect-[16/10] lg:aspect-auto lg:w-[44%] lg:self-stretch"
                      : "aspect-[16/10]"
                  }`}
                  style={{ backgroundColor: COLORS.paper }}
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
                  <h3 style={{ ...TYPE.cardTitle, color: COLORS.ink }}>
                    {item.title}
                  </h3>
                  <p style={{ ...TYPE.body, color: COLORS.ink }}>{item.text}</p>
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
      <div className={SECTION_INNER}>
        <SectionHeading data-reveal title="Но при этом вы" italic="хотите" />

        <ul className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4">
          {DESIRES.map((item, i) => (
            <li
              key={item.text}
              data-reveal
              className="card-frame flex items-start gap-3 overflow-hidden p-4 md:p-5"
              style={{
                backgroundColor: COLORS.cool,
                ["--rd" as string]: `${i * 80}ms`,
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-5 -right-3 z-0 [&_svg]:h-24 [&_svg]:w-24"
                style={{ color: COLORS.electric, opacity: 0.1 }}
              >
                <Icon name={item.icon} />
              </span>
              <span
                aria-hidden
                className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: COLORS.electricFill,
                  color: COLORS.onAccent,
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
                style={{ ...TYPE.body, color: COLORS.ink }}
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
      <div className={SECTION_INNER}>
        <article
          data-reveal
          className="card-frame overflow-hidden p-8 md:p-14"
          style={{
            backgroundColor: COLORS.navy,
            color: COLORS.onAccent,
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full animate-[orbit-rotate_60s_linear_infinite]"
            style={{
              border: `1px dashed color-mix(in srgb, var(--surface-strong) 18%, transparent)`,
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-6 top-16 h-40 w-40 rounded-full"
            style={{ border: `1px solid ${COLORS.onAccentLine}` }}
          />

          <div className="relative flex flex-col gap-6 md:max-w-[80%]">
            {/* Надзаголовок с чертой — тот же приём, что в `Eyebrow`,
                но жёлтым: на тёмной плашке электрик не читается. */}
            <span
              className="inline-flex w-fit items-center gap-3"
              style={{ ...TYPE.eyebrow, color: COLORS.yellow }}
            >
              <span
                aria-hidden
                className="inline-block h-px w-8"
                style={{ backgroundColor: COLORS.yellow }}
              />
              Приглашение
            </span>

            <h2 style={{ ...TYPE.section, color: COLORS.onAccent }}>
              Тогда я приглашаю вас в новый проект для экспертов —{" "}
              <em
                className="italic"
                style={{ ...TYPE.italic, color: COLORS.yellow }}
              >
                «ПРОРЫВ»
              </em>
            </h2>

            <p style={{ ...TYPE.lead, color: COLORS.onAccentMuted }}>
              «ПРОРЫВ» — это пространство, где вам больше не придётся идти к
              своим целям в одиночку. Здесь вы получите не только знания, но и
              понятную стратегию, поддержку, окружение сильных единомышленников
              и регулярную обратную связь, которые помогут быстрее прийти к
              результату.
            </p>

            <p style={{ ...TYPE.subsection, color: COLORS.onAccent }}>
              Мы будем двигаться вместе — шаг за шагом, превращая идеи в
              действия, а действия — в{" "}
              <em
                className="italic"
                style={{ ...TYPE.italic, color: COLORS.yellow }}
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
      /* `overflow-clip`, а не `hidden`: цель якоря не должна быть
         контейнером прокрутки, иначе `scroll-mt` не действует и секция
         приезжает под липкую шапку впритык. Обрезка та же. */
      className="relative isolate w-full scroll-mt-20 overflow-clip"
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
        style={{ backgroundColor: "var(--photo-scrim)" }}
      />
      <div className={SECTION_INNER}>
        <SectionHeading data-reveal title="Что вас ждёт" italic="в проекте" />

        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {INCLUDED.map((item, i) => (
            <li
              key={item.text}
              data-reveal
              className="card-frame group flex flex-row items-start gap-4 p-6 md:flex-col md:p-7"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--card) 90%, transparent)",
                backdropFilter: "blur(4px)",
                ["--rd" as string]: `${i * 80}ms`,
              }}
            >
              <IconBubble>
                <Icon name={item.icon} />
              </IconBubble>
              <p style={{ ...TYPE.body, color: COLORS.ink }}>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ResultSection() {
  return (
    <section className="w-full" style={{ backgroundColor: COLORS.coolWash }}>
      <div className={SECTION_INNER}>
        <SectionHeading
          data-reveal
          title="Результат, к которому"
          italic="вы придёте"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
          <article
            data-reveal
            className="card-frame flex flex-col gap-4 p-8 md:p-10"
            style={{ backgroundColor: COLORS.white }}
          >
            <IconBubble>
              <Icon name="map" />
            </IconBubble>
            <p style={{ ...TYPE.body, color: COLORS.ink }}>
              Вы перестанете действовать хаотично и начнёте двигаться по
              понятному плану. Получите поддержку, окружение и инструменты,
              которые помогут привлекать больше клиентов, увеличивать доход,
              запускать новые проекты и развивать свою экспертность —{" "}
              <em
                className="italic"
                style={{ ...TYPE.italic, color: COLORS.electric }}
              >
                уверенно и с удовольствием
              </em>
              .
            </p>
          </article>

          <article
            data-reveal
            className="card-frame flex flex-col justify-center gap-4 overflow-hidden p-8 md:p-10"
            style={{
              backgroundColor: COLORS.electricFill,
              color: COLORS.onAccent,
              ["--rd" as string]: "80ms",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full"
              style={{ border: `1px solid ${COLORS.onAccentLine}` }}
            />
            <IconBubble tone="glass">
              <Icon name="people" />
            </IconBubble>
            <p style={{ ...TYPE.subsection, color: COLORS.onAccent }}>
              «ПРОРЫВ» — это не просто обучение. Это{" "}
              {/* Не жёлтым: единственное место, где бренд-золото ложится на
                  синюю заливку, и контраста не хватает ни там, ни там —
                  на светлой 3.84 (а кегль по clamp падает до 22px, где нужно
                  уже 4.5), на тёмной 2.90. Выделение и без цвета держится
                  курсивной антиквой. */}
              <em
                className="italic"
                style={{ ...TYPE.italic, color: COLORS.onAccent }}
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
      <div className={SECTION_INNER}>
        <SectionHeading
          data-reveal
          title="Почему этот поток"
          italic="особенный"
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {WHY.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              className="card-frame group flex flex-col overflow-hidden"
              style={{
                backgroundColor: COLORS.white,
                ["--rd" as string]: `${i * 80}ms`,
              }}
            >
              <div
                className="relative aspect-[16/10] w-full overflow-hidden"
                style={{ backgroundColor: COLORS.paper }}
              >
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
                    /* Через color-mix, а не rgba с фиксированным цветом:
                       подпись лежит поверх фото, и подложка под ней должна
                       гаснуть в фон текущей темы. */
                    background: `linear-gradient(0deg, color-mix(in srgb, ${COLORS.paper} 96%, transparent) 0%, color-mix(in srgb, ${COLORS.paper} 70%, transparent) 34%, transparent 100%)`,
                  }}
                />
                <div className="absolute bottom-3 left-5 flex items-baseline gap-2">
                  <span style={{ ...TYPE.numeral, color: COLORS.ink }}>
                    {item.stat}
                  </span>
                  {item.unit && (
                    <span
                      style={{
                        ...TYPE.caption,
                        color: COLORS.electric,
                        fontWeight: 600,
                      }}
                    >
                      {item.unit}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 p-6 md:p-7">
                <h3 style={{ ...TYPE.cardTitle, color: COLORS.ink }}>
                  {item.title}
                </h3>
                <p style={{ ...TYPE.body, color: COLORS.ink }}>{item.text}</p>
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
    <section className={SECTION_INNER}>
      <article
        data-reveal
        className="card-frame overflow-hidden p-8 md:p-14"
        style={{
          backgroundColor: COLORS.navy,
          color: COLORS.onAccent,
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full animate-[orbit-rotate_60s_linear_infinite]"
          style={{
            border: `1px dashed color-mix(in srgb, var(--surface-strong) 18%, transparent)`,
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 top-16 h-40 w-40 rounded-full"
          style={{ border: `1px solid ${COLORS.onAccentLine}` }}
        />

        <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7 flex flex-col gap-5">
            <Badge tone="soft" icon={<Icon name="flame" />}>
              Раннее бронирование
            </Badge>

            {/* <div className="flex items-baseline gap-4">
              <span
                style={{ ...TYPE.numeralLarge, color: COLORS.onAccent }}
              >
                175&nbsp;$
              </span>
              <span
                style={{ ...TYPE.subsection, color: COLORS.onAccentMuted, textDecoration: "line-through" }}
              >
                350&nbsp;$
              </span>
            </div> */}

            <p style={{ ...TYPE.subsection, color: COLORS.onAccent }}>
              Специальная цена{" "}
              <em
                className="italic"
                style={{ ...TYPE.italic, color: COLORS.yellow }}
              >
                до старта
              </em>{" "}
              программы.
            </p>

            <p
              className="max-w-md"
              style={{ ...TYPE.body, color: COLORS.onAccentMuted }}
            >
              Количество мест ограничено — всего 7 участников. После заполнения
              группы регистрация будет закрыта.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col items-start gap-4 md:items-end md:text-right">
            <Button
              href={FORM_URL}
              variant="soft"
              size="lg"
              icon={<Icon name="doc" />}
            >
              Забронировать место
            </Button>
            <span className="text-xs" style={{ color: COLORS.onAccentMuted }}>
              Регистрация через короткую анкету — займёт пару минут
            </span>
          </div>
        </div>
      </article>
    </section>
  );
}
