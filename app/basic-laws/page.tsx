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

// TODO: replace with the real questionnaire URL
const FORM_URL = "https://example.com/anketa";

const PAINS = [
  "Вы снова и снова проходите обучения, вкладываете время, деньги и силы… но в жизни почти ничего не меняется",
  "Вы стараетесь изо всех сил, делаете «как надо», но результат всё равно не тот, на который рассчитывали",
  "Внутри растёт ощущение, что вы делаете очень много… а будто топчетесь на месте",
  "С каждым днём всё больше усталости, апатии и нехватки энергии даже на простые вещи",
  "В отношениях — напряжение, ссоры и ощущение, что вас не понимают",
  "Работа не приносит ни радости, ни реализации… как будто вы не на своём месте",
  "А когда смотрите на себя в зеркало — нет ощущения удовлетворения, гордости и внутреннего «это я, и мне нравится моя жизнь»",
];

type Item = { emoji: string; text: string };

const BENEFITS: Item[] = [
  {
    emoji: "🔄",
    text: "Перепишете ограничивающие сценарии и освободитесь от установок, которые тормозили ваш рост годами",
  },
  {
    emoji: "🚀",
    text: "Выйдете на новый уровень результатов — в реализации, доходе и достижении своих целей",
  },
  {
    emoji: "🧘",
    text: "Обретёте внутреннюю опору, спокойствие и энергию, из которой хочется жить, создавать и действовать",
  },
  {
    emoji: "🎯",
    text: "Начнёте ясно понимать, чего вы хотите, и как к этому прийти без хаоса и перегрузки",
  },
  {
    emoji: "🛠️",
    text: "Освоите работающие инструменты, которые сможете применять в любой жизненной ситуации",
  },
  {
    emoji: "✨",
    text: "Почувствуете себя человеком, который управляет своей жизнью, а не плывёт по течению",
  },
];

const FEATURES: Item[] = [
  {
    emoji: "🎥",
    text: "Еженедельные уроки и задания в записи — можно проходить в удобное время",
  },
  {
    emoji: "👩‍🏫",
    text: "Еженедельные живые встречи со мной",
  },
  {
    emoji: "📄",
    text: "Персональные задания для каждого",
  },
  {
    emoji: "💬",
    text: "Поддержка и общение в общем чате с единомышленниками",
  },
];

const AFTER: Item[] = [
  {
    emoji: "🧩",
    text: "Глубоко выявить и навсегда убрать установки, которые тормозили вас и не давали выйти на новый уровень",
  },
  {
    emoji: "🏆",
    text: "Овладеть сильными инструментами и практиками, которые дают стабильные результаты, внутреннюю опору и удовольствие от жизни",
  },
  {
    emoji: "🤝",
    text: "Оказаться в окружении людей, которые поддерживают, усиливают и двигаются к росту вместе с вами",
  },
  {
    emoji: "🌈",
    text: "Наполниться энергией, вдохновением и состоянием, из которого легко создавать желаемую реальность",
  },
  {
    emoji: "✨",
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

      <div className="relative mx-auto w-full max-w-[1400px] flex flex-col gap-8 px-6 pt-8 pb-10 md:px-12 md:pt-12 md:pb-14">
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
            Курс · 4 недели
          </span>
          <span
            className="inline-flex w-fit items-center gap-1.5"
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
            <span aria-hidden>📅</span>
            Старт 30 апреля
          </span>
        </div>

        <h1
          className="max-w-4xl"
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
          className="max-w-2xl"
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
      </div>
    </section>
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
              className="flex items-start gap-4 p-6 md:p-7"
              style={{
                backgroundColor: COLORS.pureWhite,
                border: `1px solid ${COLORS.lilacAccent}`,
                borderRadius: "16px",
              }}
            >
              <span
                aria-hidden
                className="shrink-0"
                style={{
                  fontFamily: FONT_ACCENT,
                  fontWeight: 400,
                  fontSize: "28px",
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
      <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-14">
        <p
          className="max-w-3xl"
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 500,
            fontSize: "clamp(24px, 3.5vw, 40px)",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: COLORS.pitchBlack,
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
          , увидеть новые возможности и начать двигаться к лучшей жизни.
        </p>
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
          {BENEFITS.map((item) => (
            <li
              key={item.text}
              className="flex flex-col gap-4 p-6 md:p-7"
              style={{
                backgroundColor: COLORS.pureWhite,
                border: `1px solid ${COLORS.lilacAccent}`,
                borderRadius: "16px",
              }}
            >
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center text-2xl"
                style={{
                  backgroundColor: COLORS.lightCoolGray,
                  borderRadius: "100px",
                }}
              >
                {item.emoji}
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
      className="w-full"
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
              style={{
                fontFamily: FONT_BODY,
                fontSize: "12px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: COLORS.feedbackYellow,
              }}
            >
              <span aria-hidden>📅</span> Старт
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
              30 апреля
            </div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: "16px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.78)",
              }}
            >
              Зафиксируйте дату и подключитесь к потоку.
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
            {FEATURES.map((item) => (
              <li
                key={item.text}
                className="flex items-start gap-4 p-5 md:p-6"
                style={{
                  backgroundColor: COLORS.pureWhite,
                  border: `1px solid ${COLORS.lilacAccent}`,
                  borderRadius: "16px",
                }}
              >
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center text-xl"
                  style={{
                    backgroundColor: COLORS.lightCoolGray,
                    borderRadius: "100px",
                  }}
                >
                  {item.emoji}
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
          {AFTER.map((item, i) => (
            <li
              key={item.text}
              className="relative flex flex-col gap-4 overflow-hidden p-6 md:p-7"
              style={{
                backgroundColor:
                  i === 0 ? COLORS.lilacAccent : COLORS.pureWhite,
                border: `1px solid ${COLORS.lilacAccent}`,
                borderRadius: "16px",
              }}
            >
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center text-2xl"
                style={{
                  backgroundColor:
                    i === 0 ? COLORS.pureWhite : COLORS.lightCoolGray,
                  borderRadius: "100px",
                }}
              >
                {item.emoji}
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
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
          style={{
            border: `1px solid rgba(255,255,255,0.08)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full"
          style={{
            border: `1px solid rgba(255,255,255,0.05)`,
          }}
        />

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
              Старт 30 апреля
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
              Готовы изменить{" "}
              <em
                className="italic"
                style={{
                  fontFamily: FONT_ACCENT,
                  fontWeight: 400,
                  color: COLORS.feedbackYellow,
                }}
              >
                жизнь?
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
              Заполните короткую анкету — и я вернусь с подробностями курса.
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
              Записаться на курс
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
