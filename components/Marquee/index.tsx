import { COLORS, FONT_HEADING, FONT_ACCENT } from "@/lib/design";

const MANIFESTO_TEXT =
  "Нужные нам события уже случились. Мы лишь поворачиваем свою жизнь в их сторону.";

function PhraseSegment() {
  const italicStyle: React.CSSProperties = {
    fontFamily: FONT_ACCENT,
    fontWeight: 400,
    letterSpacing: "-0.005em",
    color: COLORS.electric,
    padding: "0 0.08em",
  };

  return (
    <span
      className="shrink-0 whitespace-nowrap px-4"
      style={{
        fontFamily: FONT_HEADING,
        fontWeight: 500,
        letterSpacing: "-0.015em",
        color: COLORS.ink,
      }}
    >
      Нужные нам события{" "}
      <em className="italic" style={italicStyle}>
        уже случились
      </em>
      . Мы лишь поворачиваем свою жизнь{" "}
      <em className="italic" style={italicStyle}>
        в их сторону
      </em>
      .
      <span
        aria-hidden="true"
        className="ml-[0.5em] inline-block text-[0.6em] leading-none align-middle"
        style={{ color: COLORS.yellow }}
      >
        ✦
      </span>
    </span>
  );
}

export default function Marquee() {
  return (
    <section
      className="relative w-full select-none"
      aria-label="Манифест практики"
      /* Без заливки: она повторяла фон страницы, а в тёмной теме резала
         ambient-подложку поперёк ровной полосой. Полоску по-прежнему
         очерчивают линии сверху и снизу. */
      style={{ paddingTop: "32px", paddingBottom: "32px" }}
    >
      <p className="sr-only">{MANIFESTO_TEXT}</p>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ backgroundColor: COLORS.lilac }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ backgroundColor: COLORS.lilac }}
      />

      <div className="relative overflow-hidden py-3 md:py-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-24"
          style={{
            /* Промежуточная точка через color-mix, а не суффиксом `d9` к hex:
               цвет приходит из var(--background) и склеивать с ним альфу
               строкой нельзя — на смене темы это давало бы мусор. */
            background: `linear-gradient(to right, ${COLORS.paper} 0%, color-mix(in srgb, ${COLORS.paper} 85%, transparent) 60%, transparent 100%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-24"
          style={{
            background: `linear-gradient(to left, ${COLORS.paper} 0%, color-mix(in srgb, ${COLORS.paper} 85%, transparent) 60%, transparent 100%)`,
          }}
        />

        <div
          aria-hidden="true"
          className="flex w-max marquee-track"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.5rem)",
            lineHeight: 1.2,
          }}
        >
          <PhraseSegment />
          <PhraseSegment />
        </div>
      </div>
    </section>
  );
}
