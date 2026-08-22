import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import { COLORS, CONTAINER, FONT_BODY, GUTTER, HERO_Y, SECTION_INNER, TYPE } from "@/lib/design";
import {
  Badge,
  Button,
  IconBubble,
  QuietLink,
  ScrollReveal,
  SectionHeading,
  SiteHeader,
} from "@/components/ui";


const COURSE_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd9F2Ok_39QOcEJRmBajkkNhtPEs5zbTAhU6xbSxg8guSDOAA/viewform?usp=sharing&ouid=116070228497920182644";
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
        <PainSection />
        <BridgeSection />
        <BenefitsSection />
        <FormatSection />
        <AfterSection />
        <VideoSection />
        <ScrollReveal />
        <Footer />
      </div>
    </main>
  );
}

function VideoSection() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: COLORS.coolWash }}
    >
      <div className={SECTION_INNER}>
        <SectionHeading
          data-reveal
          title="Подробнее"
          italic="о курсе"
        />
        <div data-reveal className="relative mx-auto mt-12 w-full max-w-[760px]">
          <div
            aria-hidden
            /* Радиус = радиус карточки (16) + отступ рамки: только тогда
               пунктир идёт параллельно её контуру. Классами, а не inline —
               отступ меняется на md, радиус обязан меняться вместе с ним. */
            className="pointer-events-none absolute -inset-4 rounded-[32px] md:-inset-6 md:rounded-[40px]"
            style={{ border: `1px dashed ${COLORS.lilac}` }}
          />
          <div
            className="card-frame overflow-hidden"
            style={{ backgroundColor: COLORS.paper }}
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
          <Button href={COURSE_URL} size="lg">
            Записаться на курс
          </Button>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section
      className="relative w-full min-h-[560px] overflow-hidden md:min-h-[680px] lg:min-h-[760px]"
      style={{ backgroundColor: COLORS.paper }}
    >
      {/* Баннер — единственное место на сайте, где вёрстка знает про тему.
          Обычно её не знает никто: компонент ссылается на роль («фон»,
          «акцент»), а значение подставляется из `globals.css`. Но здесь
          различаются не цвета, а сам материал в кадре: хлопковая бумага
          при мягком дневном свете против чёрного бархата под контровым
          лучом. Одной картинкой это не выражается, переменной — тоже,
          поэтому файлов два, и выбирает между ними CSS по `data-theme`.

          Именно CSS, а не React: тему на <html> проставляет синхронный
          скрипт в <head> до первого кадра, и если бы выбор картинки жил
          в состоянии, он случился бы только после гидрации — на тёмной
          теме первым кадром мигнула бы светлая бумага.

          `loading` и `preload` здесь трогать нельзя: оба заставят
          браузер тянуть обе картинки. Скрытая `display:none` при
          ленивой загрузке не грузится вообще, а приоритет видимой
          поднимается через `fetchPriority` — так это и описано в
          документации next/image для пары тем. */}
      <Image
        src="/basic-laws/hero-light.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={90}
        fetchPriority="high"
        className="z-0 object-cover object-[58%_center] md:object-center [[data-theme=dark]_&]:hidden"
      />
      <Image
        src="/basic-laws/hero-dark.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={90}
        fetchPriority="high"
        className="z-0 hidden object-cover object-[58%_center] md:object-center [[data-theme=dark]_&]:block"
      />

      {/* Шторка слева — общий токен, тот же, что держит текст на первом
          экране главной. Она глухая до 26% и растворяется к 72%: узел
          волокон остаётся под словами про «топчетесь на месте», а чистый
          веер выходит в свободную правую часть, где стоит кнопка. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "var(--hero-curtain)" }}
      />

      {/* Мобильная шторка. `--hero-curtain` растворяется к 72% ширины —
          это расчёт на десктоп, где текст занимает 58% и в прозрачную
          часть не заходит. На узком экране текст идёт во всю ширину и
          правым краем ложится на светлый веер волокон, где заголовку не
          хватает контраста (на тёмной теме особенно: #ededef поверх
          подсвеченных нитей). `--text-scrim` — готовый токен ровно для
          текста поверх фото, эллипсом по центру и с растворением к краям. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 md:hidden"
        style={{ background: "var(--text-scrim)" }}
      />

      {/* Нижний фейд в фон страницы. Картинка непрозрачная, а под всей
          страницей лежит `fixed` AmbientBackdrop — без этого градиента
          баннер вырезал бы в нём прямоугольник, и на тёмной теме «лужи
          света» обрывались бы резкой полосой по границе секции. На
          бархате перепад заметнее, чем на бумаге, поэтому фейд выше. */}
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
            бейджи, заголовок, лид, кнопки — по 80ms друг за другом. */}
        <div className="flex flex-col gap-7 md:max-w-[58%] lg:max-w-[54%]">
          <div data-reveal className="flex flex-wrap items-center gap-3">
            <Badge>Курс · 4 недели + 1</Badge>
            <Badge tone="soft" icon={<Icon name="calendar" />}>
              Старт: дата уточняется
            </Badge>
          </div>

          <h1
            data-reveal
            style={{ ...TYPE.hero, color: COLORS.ink, ["--rd" as string]: "80ms" }}
          >
            Базовые{" "}
            <em
              className="italic"
              style={{ ...TYPE.italic, color: COLORS.electric }}
            >
              законы
            </em>
            <br />
            жизни
          </h1>

          <p
            data-reveal
            className="max-w-xl"
            style={{ ...TYPE.lead, color: COLORS.ink, ["--rd" as string]: "160ms" }}
          >
            Курс для тех, кто хочет навести порядок в своей жизни, обрести
            ясность и начать двигаться по пути своего предназначения.
          </p>

          <div
            data-reveal
            className="flex flex-wrap items-center gap-4 pt-2"
            style={{ ["--rd" as string]: "240ms" }}
          >
            <Button href={COURSE_URL} size="lg">
              Записаться на курс
            </Button>
            <QuietLink href="#format" direction="down">
              Узнать формат
            </QuietLink>
          </div>
        </div>
      </div>
    </section>
  );
}


function PainSection() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: COLORS.coolWash }}
    >
      <div className={SECTION_INNER}>
        <SectionHeading
          data-reveal
          title="Вам это"
          italic="знакомо?"
        />

        <ul className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4">
          {PAINS.map((item, i) => (
            <li
              key={item}
              data-reveal
              className="card-frame group flex items-start gap-4 p-6 md:p-7"
              style={{
                backgroundColor: COLORS.white,
                ["--rd" as string]: `${i * 80}ms`,
              }}
            >
              <span
                aria-hidden
                className="shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110"
                style={{ ...TYPE.italic, color: COLORS.electric }}
              >
                0{i + 1}
              </span>
              <p
                style={{ ...TYPE.body, color: COLORS.ink }}
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
      <div className={SECTION_INNER}>
        <div
          data-reveal
          className="relative grid items-start gap-5 md:grid-cols-[auto_1fr] md:gap-10 max-w-[980px]"
        >
          <span
            aria-hidden
            className="hidden md:block leading-none"
            style={{ ...TYPE.italic, color: COLORS.electric, marginTop: "-0.22em" }}
          >
            “
          </span>
          <p
            className="pl-5 md:pl-0"
            style={{ ...TYPE.quote, color: COLORS.ink, borderLeft: `3px solid ${COLORS.electric}`, paddingLeft: "20px" }}
          >
            Настало время{" "}
            <em
              className="italic"
              style={{ ...TYPE.italic, color: COLORS.electric }}
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
      <div className={SECTION_INNER}>
        <SectionHeading
          data-reveal
          title="Благодаря курсу"
          italic="вы…"
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {BENEFITS.map((item, i) => (
            <li
              key={item.text}
              data-reveal
              className="card-frame group flex flex-col gap-4 p-6 md:p-7"
              style={{
                backgroundColor: COLORS.white,
                ["--rd" as string]: `${i * 80}ms`,
              }}
            >
              <IconBubble>
                <Icon name={item.icon} />
              </IconBubble>
              <p
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

function FormatSection() {
  return (
    <section
      id="format"
      className="w-full scroll-mt-20"
      style={{ backgroundColor: COLORS.coolWash }}
    >
      <div className={SECTION_INNER}>
        <SectionHeading
          data-reveal
          title="Когда и как"
          italic="проходит курс"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
          <article
            data-reveal
            className="card-frame flex flex-col gap-3 p-7 md:p-9"
            style={{
              backgroundColor: COLORS.navy,
              color: COLORS.onAccent,
            }}
          >
            <div
              className="flex items-center gap-2"
              style={{ ...TYPE.eyebrow, color: COLORS.yellow }}
            >
              <Icon name="calendar" />
              Старт
            </div>
            <div
              style={{ ...TYPE.display, color: COLORS.onAccent }}
            >
              Дата уточняется
            </div>
            <p
              style={{ ...TYPE.body, color: COLORS.onAccentMuted }}
            >
              Оставьте заявку — сообщу о старте потока первым.
            </p>
          </article>

          <article
            data-reveal
            className="card-frame flex flex-col gap-3 p-7 md:p-9"
            style={{ backgroundColor: COLORS.white, ["--rd" as string]: "80ms" }}
          >
            <div
              style={{ ...TYPE.eyebrow, color: COLORS.inkStrong }}
            >
              Длительность
            </div>
            <div
              style={{ ...TYPE.display, color: COLORS.ink }}
            >
              4 недели
            </div>
            <p
              style={{ ...TYPE.body, color: COLORS.inkStrong }}
            >
              Плюс одна дополнительная неделя сопровождения.
            </p>
          </article>
        </div>

        <div className="mt-10">
          <h3
            style={{ ...TYPE.subsection, color: COLORS.ink }}
          >
            На курсе вас{" "}
            <em
              className="italic"
              style={{ ...TYPE.italic, color: COLORS.electric }}
            >
              ждёт
            </em>
          </h3>

          <ul className="mt-6 grid gap-3 md:grid-cols-2 md:gap-4">
            {FEATURES.map((item, i) => (
              <li
                key={item.text}
                data-reveal
              className="card-frame group flex items-start gap-4 p-5 md:p-6"
                style={{
                  backgroundColor: COLORS.white,
                  ["--rd" as string]: `${i * 80}ms`,
                }}
              >
                <IconBubble>
                  <Icon name={item.icon} />
                </IconBubble>
                <p
                  style={{ ...TYPE.body, color: COLORS.ink }}
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
      <div className={SECTION_INNER}>
        <SectionHeading
          data-reveal
          title="После курса вы"
          italic="сможете"
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {AFTER.map((item, i) => {
            const isHighlight = i === AFTER.length - 1;
            return (
            <li
              key={item.text}
              data-reveal
              className="card-frame group flex flex-col gap-4 overflow-hidden p-6 md:p-7"
              style={{
                backgroundColor: isHighlight ? COLORS.navy : COLORS.white,
                color: isHighlight ? COLORS.onAccent : COLORS.ink,
                ["--rd" as string]: `${i * 80}ms`,
              }}
            >
              {isHighlight && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full"
                  style={{ border: `1px solid ${COLORS.onAccentLine}` }}
                />
              )}
              <IconBubble tone={isHighlight ? "glass" : "cool"}>
                <Icon name={item.icon} />
              </IconBubble>
              <p
                style={{ ...TYPE.body, color: isHighlight ? COLORS.onAccent : COLORS.ink }}
              >
                {item.text}
              </p>
            </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <Button
            href={INSTAGRAM_URL}
            variant="soft"
            size="lg"
            icon={<Icon name="instagram" />}
          >
            Пишите «Хочу на базовые законы жизни»
          </Button>
          <span
            style={{ ...TYPE.caption, color: COLORS.inkStrong }}
          >
            В директ Instagram — отвечу лично
          </span>
        </div>

      </div>
    </section>
  );
}

