import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import {
  COLORS,
  CONTAINER,
  FONT_BODY,
  GUTTER,
  HERO_Y,
  MEASURE,
  SECTION_INNER,
  TYPE,
} from "@/lib/design";
import {
  Badge,
  Button,
  IconBubble,
  ScrollReveal,
  SiteHeader,
} from "@/components/ui";
import { RULES, RULES_INTRO, RULES_OUTRO, ruleNumber } from "@/lib/rules";

export const metadata: Metadata = {
  title: "Правила работы — Дарья Карпук",
  description:
    "Правила индивидуальной работы с психологом: регулярность встреч, перенос и отмена, оплата, конфиденциальность, возврат за неиспользованные консультации.",
};

/**
 * Правила работы — документ, а не лендинг.
 *
 * Отсюда и единственное на сайте отступление в вёрстке: пункты идут не
 * карточками, а полосами с левой колонкой. Карточка — единица показа,
 * её читают по диагонали; здесь текст читают подряд и возвращаются к
 * нужному абзацу по ссылке с якорем. Каркас, шкала, движение и подвал —
 * общие, страница остаётся частью сайта.
 */
export default function RulesPage() {
  return (
    <main
      className="relative flex w-full flex-1 flex-col"
      style={{
        backgroundColor: COLORS.paper,
        color: COLORS.ink,
        fontFamily: FONT_BODY,
      }}
    >
      <AmbientBackdrop />

      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader />
        <Hero />
        <RulesList />
        <OutroSection />
        <ScrollReveal />
        <Footer />
      </div>
    </main>
  );
}

function Hero() {
  return (
    <section className="relative w-full">
      <div className={`relative z-10 ${CONTAINER} ${GUTTER} ${HERO_Y}`}>
        <div className="flex flex-col gap-8">
          <div data-reveal>
            <Badge>Индивидуальная работа</Badge>
          </div>

          <h1
            data-reveal
            style={{
              ...TYPE.hero,
              color: COLORS.ink,
              ["--rd" as string]: "80ms",
            }}
          >
            Правила{" "}
            <em
              className="italic"
              style={{ ...TYPE.italic, color: COLORS.electric }}
            >
              работы
            </em>
          </h1>

          <p
            data-reveal
            className={MEASURE}
            style={{
              ...TYPE.lead,
              color: COLORS.inkStrong,
              ["--rd" as string]: "160ms",
            }}
          >
            {RULES_INTRO}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Пункты. Нумерованный список разметкой (`<ol>`), а не рисованными
 * цифрами: номер здесь — часть смысла, по нему на правило ссылаются.
 *
 * Каскада `--rd` у полос нет намеренно. Он ставится там, где блоки
 * входят в кадр разом — ряд карточек, сетка цен; полосы приходят по
 * одной, и задержка читалась бы уже не каскадом, а торможением.
 */
function RulesList() {
  return (
    <section className={SECTION_INNER}>
      <ol className="flex flex-col">
        {RULES.map((rule, i) => (
          <li
            key={rule.id}
            id={rule.id}
            data-reveal
            /* `scroll-mt-24` — общесайтовый отступ под липкую шапку: без
               него ссылка с якорем приводит к пункту, заголовок которого
               накрыт шапкой. */
            className="group grid scroll-mt-24 gap-6 border-t border-surface-strong py-10 md:grid-cols-12 md:gap-10 md:py-12"
          >
            <div className="flex flex-col gap-5 md:col-span-4">
              <IconBubble>
                <Icon name={RULE_ICONS[i]} />
              </IconBubble>

              <div>
                <div
                  style={{ ...TYPE.eyebrow, color: COLORS.electric }}
                  className="tabular-nums"
                >
                  Правило {ruleNumber(rule)}
                </div>
                <h2
                  className="mt-3"
                  style={{ ...TYPE.subsection, color: COLORS.ink }}
                >
                  {rule.title}
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:col-span-8">
              {rule.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className={MEASURE}
                  style={{ ...TYPE.body, color: COLORS.inkStrong }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * Заключение. Тёмная панель — тот же приём, которым сайт закрывает
 * /individual и /proryv: последний экран страницы всегда контрапункт.
 */
function OutroSection() {
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
              Спасибо
            </div>

            <p
              className="mt-4"
              style={{ ...TYPE.quote, color: COLORS.onAccent }}
            >
              <em
                className="italic"
                style={{ ...TYPE.italic, color: COLORS.yellow }}
              >
                {RULES_OUTRO.lead}
              </em>{" "}
              {RULES_OUTRO.note}
            </p>
          </div>

          <div className="md:col-span-5 md:flex md:justify-end">
            <Button href="/individual" variant="soft" size="lg">
              Консультации и цены
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Декор страницы.

   `Icon` и `Rings` — копии тех, что лежат в `app/individual/page.tsx`
   и `app/basic-laws/page.tsx`. Общего набора иконок в `components/ui`
   пока нет, и заводить его стоит один раз на все страницы разом, а не
   вытаскивать половину под новую: до тех пор копия честнее половинного
   набора. См. тот же комментарий у `Icon` на /individual.
   ═══════════════════════════════════════════════════════════════════ */

type IconKey =
  | "calendar"
  | "ban"
  | "reschedule"
  | "lock"
  | "card"
  | "clock"
  | "doc"
  | "chat"
  | "heart"
  | "user";

/* Иконка на пункт — по смыслу пункта, порядок тот же, что в `RULES`.
   Списком, а не полем в данных: данные — текст правил, иконка — решение
   вёрстки, и на /individual те же пункты подписаны иначе. */
const RULE_ICONS: IconKey[] = [
  "calendar",
  "ban",
  "reschedule",
  "lock",
  "card",
  "clock",
  "doc",
  "chat",
  "heart",
  "user",
];

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
    case "calendar":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-0.5"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" />
          <circle cx="8" cy="14" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "ban":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:rotate-[-12deg]"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 12h7" />
        </svg>
      );
    case "reschedule":
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
    case "card":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:translate-x-0.5"
        >
          <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
          <path d="M2.5 10h19" />
          <path d="M6.5 15h4" />
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
    case "heart":
      return (
        <svg
          {...common}
          className="h-6 w-6 [.icon-bubble:hover_&]:animate-[icon-pulse_1.2s_ease-in-out_infinite]"
        >
          <path d="M12 19.6l-6.3-5.9a3.9 3.9 0 0 1 5.5-5.5l.8.8.8-.8a3.9 3.9 0 0 1 5.5 5.5z" />
        </svg>
      );
    case "user":
      return (
        <svg
          {...common}
          className="h-6 w-6 transition-transform duration-500 [.icon-bubble:hover_&]:-translate-y-0.5"
        >
          <circle cx="12" cy="8" r="3.6" />
          <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
        </svg>
      );
  }
}

/**
 * Кольца на тёмной панели — тот же декор, что в блоке цены на /proryv
 * и на панелях /individual: пунктирное кольцо медленно вращается,
 * второе стоит.
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
