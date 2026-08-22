import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import {
  COLORS,
  CONTAINER,
  FONT_BODY,
  GUTTER,
  HERO_LONG_FACE,
  HERO_LONG_SIZE,
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
import { KEY_RULES } from "@/lib/rules";

// TODO: replace with the real questionnaire URL
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfRdfLMjzVz8-JkYcIDimeecOXU0Gnlr80m8T5VsfBZZP9u0Q/viewform?usp=publish-editor";

const LOYALTY = [
  "На весь период совместной работы вы получаете полное моё сопровождение и погружение в вашу проблематику",
  "В течение периода работы есть возможность писать текстовые и аудио сообщения для получения обратной связи",
  "Персональные рекомендации для самостоятельной работы — литература, фильмы, упражнения",
  "Делюсь при необходимости контактами сторонних проверенных специалистов по вашему запросу",
  "На участие в любом из моих обучений действуют специальные бонусные условия",
  "При покупке любого пакета консультаций в ИЮНЕ вы получаете бесплатно доступ к прохождению мастер-класс «ТРАНСФОРМАЦИЯ САМООЦЕНКИ».",
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
        <LoyaltySection />
        <FormatSection />
        <PricingSection />
        <RulesSection />
        <BonusSection />
        <CTASection />
        <ScrollReveal />
        <Footer />
      </div>
    </main>
  );
}

/**
 * Своей заливки (`backgroundColor: COLORS.paper`) у секции больше нет. Она
 * стояла под непрозрачным баннером: тот вырезал в `AmbientBackdrop`
 * прямоугольник, и заливка сращивала его края с фоном страницы. Вырезка
 * прозрачна, и заливка осталась бы ровным пятном поверх переливов — на
 * тёмной теме первый экран читался плоским чёрным против «луж света» в
 * секции ниже.
 */
function Hero() {
  return (
    <section className="relative w-full overflow-hidden xl:h-[45.4vw] xl:max-h-[880px]">
      <div
        className={`relative z-10 flex flex-col justify-center ${CONTAINER} ${GUTTER} ${HERO_Y} xl:min-h-[inherit]`}
      >
        {/* Первый экран въезжает тем же каскадом, что и на /leader.
            Страница была единственной на сайте вовсе без движения:
            ни появления при скролле, ни подъёма карточек.

            Колонка сужается только на xl, где текст стоит поверх кадра:
            54% — ровно тот предел, за которым самое длинное слово
            заголовка («Индивидуальные», 7.6em при своём трекинге) ещё
            не доезжает до фигур; под эту ширину и подобран кегль в
            `HERO_LONG_SIZE`. Ниже xl сужать нечего: там кадр
            идёт отдельной полосой и текст ничему не мешает. */}
        <div className="flex flex-col gap-8 xl:max-w-[54%]">
          <div data-reveal>
            <Badge>Индивидуальный формат</Badge>
          </div>

          {/* Кегль классом, а не из `TYPE.hero`: см. `HERO_LONG_SIZE`.
              Полка в 48px не вмещала «Индивидуальные» ни в колонку, ни
              даже в экран — на 360px последняя буква уходила под обрез. */}
          <h1
            data-reveal
            className={HERO_LONG_SIZE}
            style={{
              ...HERO_LONG_FACE,
              color: COLORS.ink,
              ["--rd" as string]: "80ms",
            }}
          >
            Индивидуальные{" "}
            <em
              className="italic"
              style={{ ...TYPE.italic, color: COLORS.electric }}
            >
              консультации
            </em>
          </h1>

          <p
            data-reveal
            className="max-w-2xl"
            style={{
              ...TYPE.lead,
              color: COLORS.ink,
              ["--rd" as string]: "160ms",
            }}
          >
            Формат работы, полностью ориентированный на вас и ваши запросы.
            Такой подход позволяет убрать всё, что мешает вашему движению, и
            получить ощутимые результаты — в безопасном пространстве, в своём
            темпе.
          </p>

          {/* Пара действий тем же приёмом, что на /proryv: залитая кнопка
              на анкету плюс тихая ссылка-якорь вниз. Первый экран был
              единственным на сайте без выхода — до анкеты приходилось
              скроллить всю страницу до нижнего блока.

              Ряд стоит внутри текстовой колонки (54% на xl), поэтому на
              широких экранах кнопки не доезжают до фигур; `flex-wrap`
              разводит их в два ряда на узких, где `lg`-кнопка и ссылка
              рядом не встают. */}
          <div
            data-reveal
            className="flex flex-wrap items-center gap-4 pt-2"
            style={{ ["--rd" as string]: "240ms" }}
          >
            <Button href={FORM_URL} size="lg">
              Записаться на консультацию
            </Button>
            <QuietLink href="#pricing" direction="down">
              Цены и пакеты
            </QuietLink>
          </div>
        </div>
      </div>

      {/* Кадр — вырезка: фон в файле прозрачный, фигуры лежат прямо на
          фоне страницы.

          Отсюда файл один, хотя раньше их было два, по одному на тему.
          Различались они не цветами, которые подставились бы из
          `globals.css`, а самим фоном кадра: студийная бумага при мягком
          дневном свете против тёмной циклорамы под контровым лучом. Без
          фона различать нечего.

          Вырезка убрала и всю обвязку, которая этот фон прятала: «шторку»
          под текстом на xl, нижний фейд в цвет страницы и маску снизу у
          полосы. Прятать больше нечего, а маска теперь и мешала бы —
          гасила бы девушкам ноги.

          Раскладка ломается на xl, и не по вкусу, а по геометрии кадра.
          Героини сняты во весь рост и занимают почти всю высоту файла —
          пустого места над ними, куда лёг бы текст, нет. Поэтому:

          • xl и шире — кадр прижат вправо и занимает 86% ширины секции,
            текст стоит слева от фигур. Прежний баннер шёл во всю ширину:
            там героини начинались с 58% ширины файла и до текста не
            доезжали, а в вырезке они с 48% — во всю ширину заголовок лёг
            бы первой из них на волосы. Сужение отодвигает их к 55%
            ширины секции, и колонка с текстом (54%) её не касается на
            всех размерах от 1280 и выше.
          • уже xl — полоса во всю ширину под текстом, последним блоком
            секции. Наложить текст и кадр там нельзя: колонка под
            заголовок кеглем героя шире, чем пустая часть кадра.

            Полосой сверху кадр стоял до этого, и это единственное место,
            которое паре не годится: девушки сидят на полу, и им нужна
            опора. Здесь она есть — низ полосы совпадает с низом секции,
            и они садятся ровно на границу со следующей.

          `loading` и `preload` не трогаем: приоритет видимой картинки
          поднимается через `fetchPriority`, как в документации next/image. */}
      <div className="relative z-0 aspect-[132/100] w-full overflow-hidden md:aspect-[204/100] xl:absolute xl:inset-y-0 xl:right-0 xl:aspect-auto xl:w-[86%] xl:overflow-visible">
        {/* Коробка кадра шире полосы и выведена за её края: полоса
            показывает не файл целиком, а ровно габарит фигур. В файле они
            занимают 41% ширины и 67% высоты (альфа: x 49.1–90.1%,
            y 19.8–86.8%), остальное пусто, и
            без обрезки над головами оставалось 68 px воздуха, а полоса
            читалась отступом, а не картинкой.

            Все три числа — доли, а не пиксели, поэтому кадрировка одна на
            любую ширину экрана. Считаются они друг из друга: при ширине
            коробки k (в долях ширины полосы) высота габарита выходит
            0.377k, отсюда пропорция полосы (132:100 на телефоне, 204:100
            на `md` — там коробка уже, чтобы полоса не разрасталась на
            планшете); сдвиг вверх — всегда −29.6% высоты полосы, он от k
            не зависит; сдвиг влево — 50% − 69.6k, он ставит фигуры по
            центру.

            На xl коробка просто совпадает с секцией, а сдвиг по вертикали
            (`78%`) держит в окне и головы, и ступни — секция там площе
            файла, и `object-cover` режет его сверху и снизу. */}
        <div className="absolute top-[-29.6%] left-[-89.9%] aspect-[1672/941] w-[201%] md:left-[-40.5%] md:w-[130%] xl:inset-0 xl:aspect-auto xl:h-full xl:w-full">
          <Image
            src="/individual/hero-figures.webp"
            alt=""
            fill
            sizes="100vw"
            quality={90}
            fetchPriority="high"
            className="object-cover xl:object-[50%_78%]"
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Иконки страницы — тот же набор и та же спецификация, что на /proryv и
 * /basic-laws: 24×24, штрих 1.6, ховер завязан на `.icon-bubble`, поэтому
 * иконка оживает вместе с кругом, а не сама по себе.
 *
 * Копия здесь ровно потому, что на тех двух страницах она тоже копия:
 * общего набора в `components/ui` пока нет. Заводить его стоит один раз
 * на все три — до тех пор третья копия честнее третьего приёма.
 */
type IconKey =
  | "chat"
  | "doc"
  | "handshake"
  | "medal"
  | "gift"
  | "camera"
  | "clock"
  | "star"
  | "compass"
  | "lock"
  | "refresh";

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
    case "chat":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-0.5"
        >
          <path d="M21 12a8 8 0 0 1-8 8H8l-4 3v-6.5A8 8 0 0 1 12 4h1a8 8 0 0 1 8 8z" />
          <path d="M9 11h7" />
          <path d="M9 15h4" />
        </svg>
      );
    case "doc":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-0.5"
        >
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6" />
          <path d="M9 17h4" />
        </svg>
      );
    case "handshake":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[6deg]"
        >
          <path d="M3 12l4-4 4 3 2-2 4 4" />
          <path d="M21 12l-4 4-3-3" />
          <path d="M7 8L3 12l4 4" />
        </svg>
      );
    case "medal":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-0.5"
        >
          <circle cx="12" cy="15" r="5" />
          <path d="M12 13v4" />
          <path d="M8 3h8l-2.5 6h-3z" />
        </svg>
      );
    case "gift":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-0.5"
        >
          <path d="M20 12v9H4v-9" />
          <path d="M2 7h20v5H2z" />
          <path d="M12 22V7" />
          <path d="M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      );
    case "camera":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:translate-x-0.5"
        >
          <rect x="2" y="6" width="13" height="12" rx="2" />
          <path d="M15 10l7-3v10l-7-3z" />
        </svg>
      );
    case "clock":
      return (
        <svg
          {...common}
          className="h-6 w-6 [.icon-bubble:hover_&]:animate-[icon-spin_0.9s_ease-in-out]"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
    case "star":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[18deg]"
        >
          <path d="M12 3l2.6 5.6 6.1.8-4.4 4.3 1 6.1-5.3-2.9-5.3 2.9 1-6.1L3.3 9.4l6.1-.8z" />
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
    case "lock":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-0.5"
        >
          <rect x="4" y="10" width="16" height="10" rx="2.5" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          <circle cx="12" cy="15" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "refresh":
      return (
        <svg
          {...common}
          className="h-6 w-6 [.icon-bubble:hover_&]:animate-[icon-spin_0.9s_ease-in-out]"
        >
          <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
          <path d="M3 4v4h4" />
          <path d="M12 8.5V12l2.8 1.6" />
        </svg>
      );
  }
}

/**
 * Кольца — единственный декор, который сайт держит на тёмных панелях
 * (тот же приём в блоке цены на /proryv): пунктирное кольцо медленно
 * вращается, второе стоит. Рисованных сюжетов (ноутбук, стрелки, точки),
 * которые были на этой странице, больше нигде нет — они и делали её
 * чужой в общем наборе.
 */
function Rings() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 animate-[orbit-rotate_60s_linear_infinite] rounded-full"
        style={{
          border: `1px dashed color-mix(in srgb, var(--surface-strong) 18%, transparent)`,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-16 h-40 w-40 rounded-full"
        style={{ border: `1px solid ${COLORS.onAccentLine}` }}
      />
    </>
  );
}

/**
 * Водяной знак иконки в углу карточки — та же деталь, что в карточках
 * «хотите» на /proryv: та же иконка, что в круге, но крупная и почти
 * прозрачная. Заменила рисованные SVG-сюжеты.
 */
function Watermark({
  name,
  tone = "light",
}: {
  name: IconKey;
  tone?: "light" | "dark";
}) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -right-3 -bottom-5 z-0 [&_svg]:h-24 [&_svg]:w-24"
      style={{
        color: tone === "dark" ? COLORS.yellow : COLORS.electric,
        opacity: tone === "dark" ? 0.14 : 0.1,
      }}
    >
      <Icon name={name} />
    </span>
  );
}

/** Галочка в круге — маркер списка, как в карточках «хотите» на /proryv. */
function CheckBullet() {
  return (
    <span
      aria-hidden
      className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: COLORS.electricFill, color: COLORS.onAccent }}
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
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

/* Иконка на пункт лояльности — по смыслу пункта, порядок тот же, что в
   `LOYALTY`. Держатся списком, а не полем в данных: данные — это тексты
   с сайта, а иконка — решение вёрстки. */
const LOYALTY_ICONS: IconKey[] = [
  "compass",
  "chat",
  "doc",
  "handshake",
  "medal",
  "gift",
];

function LoyaltySection() {
  const lastIndex = LOYALTY.length - 1;

  return (
    <section className={SECTION_INNER}>
      <SectionHeading
        data-reveal
        eyebrow="01 — Условия"
        title="Что входит в"
        italic="лояльность"
      />

      <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {LOYALTY.map((item, i) => {
          const isLast = i === lastIndex;

          /* Последний пункт — бонус, и он единственный выделен тёмной
             карточкой: так сайт и выделяет одну карточку из ряда, а не
             жёлтой заливкой во всю ширину, как было здесь. */
          if (isLast) {
            return (
              <li
                key={item}
                data-reveal
                className="card-frame group flex items-start gap-3 overflow-hidden p-7 md:p-8"
                style={{
                  backgroundColor: COLORS.navy,
                  color: COLORS.onAccent,
                  ["--rd" as string]: `${i * 80}ms`,
                }}
              >
                <Watermark name={LOYALTY_ICONS[i]} tone="dark" />

                <div className="relative z-10 flex flex-col gap-4">
                  <Badge tone="soft" icon={<Icon name="gift" />}>
                    Бонус
                  </Badge>

                  <p style={{ ...TYPE.body, color: COLORS.onAccent }}>
                    При покупке любого пакета консультаций в ИЮНЕ вы получаете
                    бесплатный доступ к прохождению мастер-класса{" "}
                    <em
                      className="italic"
                      style={{ ...TYPE.italic, color: COLORS.yellow }}
                    >
                      «Трансформация самооценки»
                    </em>
                    .
                  </p>
                </div>
              </li>
            );
          }

          return (
            <li
              key={item}
              data-reveal
              className="card-frame group flex items-start gap-3 overflow-hidden p-7 md:p-8"
              style={{
                backgroundColor: COLORS.white,
                ["--rd" as string]: `${i * 80}ms`,
              }}
            >
              <Watermark name={LOYALTY_ICONS[i]} />
              <CheckBullet />

              <p
                className="relative z-10"
                style={{ ...TYPE.body, color: COLORS.ink }}
              >
                {item}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function FormatSection() {
  return (
    <section
      className="w-full scroll-mt-20"
      style={{ backgroundColor: COLORS.coolWash }}
    >
      <div className={SECTION_INNER}>
        <SectionHeading
          data-reveal
          eyebrow="02 — Формат"
          title="Как проходят"
          italic="встречи"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <article
            data-reveal
            className="card-frame group flex flex-col gap-4 overflow-hidden p-8 md:p-10"
            style={{ backgroundColor: COLORS.white }}
          >
            <Watermark name="camera" />

            <IconBubble>
              <Icon name="camera" />
            </IconBubble>

            <div className="relative z-10">
              <div style={{ ...TYPE.eyebrow, color: COLORS.inkStrong }}>
                Платформа
              </div>
              <div
                className="mt-3"
                style={{ ...TYPE.section, color: COLORS.ink }}
              >
                Zoom
              </div>
              <p
                className="mt-3 max-w-sm"
                style={{ ...TYPE.body, color: COLORS.inkStrong }}
              >
                Все встречи проходят онлайн, из любой точки мира.
              </p>
            </div>
          </article>

          <article
            data-reveal
            className="card-frame group flex flex-col gap-4 overflow-hidden p-8 md:p-10"
            style={{
              backgroundColor: COLORS.navy,
              color: COLORS.onAccent,
              ["--rd" as string]: "80ms",
            }}
          >
            <Rings />

            <IconBubble tone="glass">
              <Icon name="clock" />
            </IconBubble>

            <div className="relative z-10">
              {/* Надзаголовок с чертой — тот же приём, что у `Eyebrow`, но
                  жёлтым: на тёмной подложке акцентный электрик тонет.
                  Восклицательный знак-эмодзи убран, слово осталось: эмодзи
                  в надзаголовках нет ни на одной другой странице. */}
              <div
                className="flex items-center gap-3"
                style={{ ...TYPE.eyebrow, color: COLORS.yellow }}
              >
                <span
                  aria-hidden
                  className="inline-block h-px w-8"
                  style={{ backgroundColor: COLORS.yellow }}
                />
                Важно
              </div>
              <div
                className="mt-3"
                style={{ ...TYPE.quote, color: COLORS.onAccent }}
              >
                Первая встреча —{" "}
                <em
                  className="italic"
                  style={{ ...TYPE.italic, color: COLORS.yellow }}
                >
                  1,5&nbsp;часа
                </em>
                .
              </div>
              <p
                className="mt-3 max-w-sm"
                style={{ ...TYPE.body, color: COLORS.onAccentMuted }}
              >
                Все последующие встречи — по 1&nbsp;часу.
              </p>

              {/* Правило об опоздании стоит здесь, а не в секции правил
                  ниже: оно про продолжительность встречи — ровно про то,
                  о чём карточка. Полностью — на /rules#lateness. */}
              <p
                className="mt-5 max-w-sm border-t pt-5"
                style={{
                  ...TYPE.caption,
                  color: COLORS.onAccentMuted,
                  borderColor: COLORS.onAccentLine,
                }}
              >
                Опоздание не продлевает встречу: она заканчивается
                в&nbsp;первоначально согласованное время.
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
    /* Цель якоря из первого экрана. `scroll-mt-20` — общесайтовый отступ
       под липкую шапку, см. комментарий про `scroll-padding-top` в
       globals.css. */
    <section id="pricing" className={`${SECTION_INNER} scroll-mt-20`}>
      <SectionHeading
        data-reveal
        eyebrow="03 — Пакеты"
        title="Цены и"
        italic="условия"
      />

      <div className="mt-12 flex flex-col gap-5">
        <PriceAnchor pkg={anchor} />

        <ul className="grid gap-5 md:grid-cols-3">
          {others.map((p, i) => (
            <PriceSatellite key={p.title} pkg={p} index={i} />
          ))}
        </ul>
      </div>

      {/* Регулярность — из правила 01: цифры пакетов (3, 5, 10) без неё
          не говорят, за какой срок эти встречи проходят. */}
      <p
        className="mt-8 max-w-xl"
        style={{ ...TYPE.caption, color: COLORS.inkStrong }}
      >
        Встречи в пакете проходят регулярно — 1&nbsp;раз в 7, 10 или 14 дней;
        график согласуем в начале работы. Оплату возможно произвести разовым
        платежом или разделить на несколько частей.
      </p>
    </section>
  );
}

/**
 * Якорный пакет — тёмная карточка, как все выделенные карточки на сайте.
 * Раньше был лиловым: лиловый в палитре — цвет границ и мягких подложек,
 * заливкой во всю карточку он больше нигде не встречается. Цена на тёмном
 * набрана жёлтым, а не электриком: электрик на navy почти не читается.
 */
function PriceAnchor({ pkg }: { pkg: Pkg }) {
  return (
    <article
      data-reveal
      className="card-frame overflow-hidden p-8 md:p-12"
      style={{ backgroundColor: COLORS.navy, color: COLORS.onAccent }}
    >
      <Rings />

      <div className="relative z-10 grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7 flex flex-col gap-4">
          <Badge tone="soft" icon={<Icon name="star" />}>
            Самый популярный
          </Badge>
          <h3 style={{ ...TYPE.display, color: COLORS.onAccent }}>
            {pkg.title}
          </h3>
        </div>
        <div className="flex flex-col items-start gap-2 md:col-span-5 md:items-end md:text-right">
          <div className="flex items-baseline gap-3">
            <span style={{ ...TYPE.numeral, color: COLORS.yellow }}>
              {pkg.newPrice}
            </span>
            <span
              style={{
                ...TYPE.lead,
                color: COLORS.onAccentMuted,
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

function PriceSatellite({ pkg, index }: { pkg: Pkg; index: number }) {
  return (
    <li
      data-reveal
      className="card-frame group flex flex-col gap-5 overflow-hidden p-7 md:p-8"
      style={{
        backgroundColor: COLORS.white,
        ["--rd" as string]: `${index * 80}ms`,
      }}
    >
      <h3 style={{ ...TYPE.cardTitle, color: COLORS.ink }}>{pkg.title}</h3>

      {/* Кегль цены — `subsection`, а не `numeral`: числовой кегль на
          сайте держат короткие показатели («7», «100%»), а «1200 BYN» в
          колонке из трёх карточек им переносится на две строки. */}
      <div className="flex items-baseline gap-3">
        <span style={{ ...TYPE.subsection, color: COLORS.electric }}>
          {pkg.newPrice}
        </span>
        <span
          style={{
            ...TYPE.caption,
            color: COLORS.inkStrong,
            textDecoration: "line-through",
          }}
        >
          {pkg.oldPrice}
        </span>
      </div>

      {pkg.note && (
        <p style={{ ...TYPE.caption, color: COLORS.inkStrong }}>{pkg.note}</p>
      )}
    </li>
  );
}

/* Иконка на пункт правил — по смыслу пункта, как и `LOYALTY_ICONS`.
   Ключами, а не порядком: набор пунктов задан в `lib/rules.ts`, и от
   перестановки там подписи не должны разъезжаться. */
const RULE_ICONS: Record<string, IconKey> = {
  confidentiality: "lock",
  unused: "refresh",
  support: "chat",
  responsibility: "handshake",
};

/**
 * Правила работы — четыре пункта из десяти, те, что снимают сомнения
 * до покупки. Стоят сразу за ценами: вопросы «а если я пропущу», «а
 * вернут ли деньги», «а можно ли писать между встречами» возникают
 * ровно в этот момент.
 *
 * Регламент (перенос, опоздание, порядок оплаты) сюда не вынесен: он
 * нужен уже записавшемуся и рядом с ценой читался бы мелким шрифтом.
 * Полный документ — на /rules, ссылка под сеткой; тексты у страниц
 * общие, см. `lib/rules.ts`.
 */
function RulesSection() {
  return (
    <section
      className="w-full scroll-mt-20"
      style={{ backgroundColor: COLORS.coolWash }}
    >
      <div className={SECTION_INNER}>
        <SectionHeading
          data-reveal
          eyebrow="04 — Правила"
          title="Как устроена"
          italic="наша работа"
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {KEY_RULES.map((rule, i) => (
            <li
              key={rule.id}
              data-reveal
              className="card-frame group flex flex-col gap-4 overflow-hidden p-7 md:p-8"
              style={{
                backgroundColor: COLORS.white,
                ["--rd" as string]: `${i * 80}ms`,
              }}
            >
              <Watermark name={RULE_ICONS[rule.id]} />

              <IconBubble>
                <Icon name={RULE_ICONS[rule.id]} />
              </IconBubble>

              <div className="relative z-10">
                <h3 style={{ ...TYPE.cardTitle, color: COLORS.ink }}>
                  {rule.title}
                </h3>
                <p
                  className="mt-3 max-w-sm"
                  style={{ ...TYPE.body, color: COLORS.inkStrong }}
                >
                  {rule.summary}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-8">
          <QuietLink href="/rules">Все правила работы</QuietLink>
        </div>
      </div>
    </section>
  );
}

/**
 * Бонус. Панель была жёлтой во всю ширину — единственная такая на сайте:
 * жёлтый здесь работает на бейджах, надзаголовках и курсивных вставках, а
 * заливкой берётся только тёмный. Панель стала тёмной, жёлтое осталось
 * там, где оно и работает: бейдж, курсив, иконка.
 */
function BonusSection() {
  return (
    <section className={`${CONTAINER} ${GUTTER} pb-16 md:pb-24`}>
      <article
        data-reveal
        className="card-frame overflow-hidden p-8 md:p-12"
        style={{ backgroundColor: COLORS.navy, color: COLORS.onAccent }}
      >
        <Rings />

        <div className="relative z-10 grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
          <div className="md:col-span-4">
            <div
              className="card-frame group flex flex-col items-start gap-4 p-6 md:p-7"
              style={{
                backgroundColor: COLORS.onAccentWash,
                borderColor: COLORS.onAccentLine,
              }}
            >
              <IconBubble tone="glass">
                <Icon name="gift" />
              </IconBubble>

              <span style={{ ...TYPE.eyebrow, color: COLORS.yellow }}>
                В подарок
              </span>

              <div style={{ ...TYPE.display, color: COLORS.onAccent }}>
                Бо
                <em
                  className="italic"
                  style={{ ...TYPE.italic, color: COLORS.yellow }}
                >
                  нус
                </em>
              </div>

              <div style={{ ...TYPE.caption, color: COLORS.onAccentMuted }}>
                Только при покупке пакета в ИЮНЕ
              </div>
            </div>
          </div>

          <p
            className="md:col-span-8"
            style={{ ...TYPE.subsection, color: COLORS.onAccent }}
          >
            При покупке любого пакета консультаций в&nbsp;ИЮНЕ вы получаете
            бесплатно доступ к&nbsp;прохождению мастер-класс.{" "}
            <em
              className="italic"
              style={{ ...TYPE.italic, color: COLORS.yellow }}
            >
              «ТРАНСФОРМАЦИЯ САМООЦЕНКИ»{" "}
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
    <section className={`${CONTAINER} ${GUTTER} pb-16 md:pb-24`}>
      <article
        data-reveal
        className="card-frame overflow-hidden p-8 md:p-14"
        style={{ backgroundColor: COLORS.navy, color: COLORS.onAccent }}
      >
        <Rings />

        <div className="relative z-10 grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <div
              className="flex items-center gap-3"
              style={{ ...TYPE.eyebrow, color: COLORS.yellow }}
            >
              <span
                aria-hidden
                className="inline-block h-px w-8"
                style={{ backgroundColor: COLORS.yellow }}
              />
              Шаг за шагом
            </div>
            <h2
              className="mt-4"
              style={{ ...TYPE.section, color: COLORS.onAccent }}
            >
              Готовы начать или остались{" "}
              <em
                className="italic"
                style={{ ...TYPE.italic, color: COLORS.yellow }}
              >
                вопросы?
              </em>
            </h2>
            <p
              className="mt-5 max-w-md"
              style={{ ...TYPE.body, color: COLORS.onAccentMuted }}
            >
              Заполните короткую анкету — и мы согласуем время и формат работы.
            </p>

            <p
              className="mt-4 max-w-md"
              style={{ ...TYPE.caption, color: COLORS.onAccentMuted }}
            >
              Записываясь, вы принимаете{" "}
              <Link
                href="/rules"
                className="press rounded border-b border-current/40 transition-all duration-300 ease-brand hover:border-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                style={{ color: COLORS.yellow }}
              >
                правила работы
              </Link>
              .
            </p>
          </div>

          <div className="md:col-span-5 md:flex md:justify-end">
            <Button
              href={FORM_URL}
              variant="soft"
              size="lg"
              icon={<Icon name="doc" />}
            >
              Заполнить анкету
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
}
