const COLORS = {
  softOffWhite: "#f9f8f6",
  boardroomNavy: "#0c1754",
  brandElectric: "#2545ff",
  lilacAccent: "#d9d4ff",
  feedbackYellow: "#ffc13a",
} as const;

const FONT_HEADING = "var(--font-manrope), Arial, sans-serif";
const FONT_ACCENT = "var(--font-editorial), cursive";

const MANIFESTO_TEXT =
  "Нужные нам события уже случились. Мы лишь поворачиваем свою жизнь в их сторону.";

function PhraseSegment() {
  const italicStyle: React.CSSProperties = {
    fontFamily: FONT_ACCENT,
    fontWeight: 400,
    letterSpacing: "-0.005em",
    color: COLORS.brandElectric,
    padding: "0 0.08em",
  };

  return (
    <span
      className="shrink-0 whitespace-nowrap px-4"
      style={{
        fontFamily: FONT_HEADING,
        fontWeight: 500,
        letterSpacing: "-0.015em",
        color: COLORS.boardroomNavy,
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
        style={{ color: COLORS.feedbackYellow }}
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
      style={{
        backgroundColor: COLORS.softOffWhite,
        paddingTop: "32px",
        paddingBottom: "32px",
      }}
    >
      <p className="sr-only">{MANIFESTO_TEXT}</p>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ backgroundColor: COLORS.lilacAccent }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ backgroundColor: COLORS.lilacAccent }}
      />

      <div className="relative overflow-hidden py-3 md:py-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-24"
          style={{
            background: `linear-gradient(to right, ${COLORS.softOffWhite} 0%, ${COLORS.softOffWhite}d9 60%, transparent 100%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-24"
          style={{
            background: `linear-gradient(to left, ${COLORS.softOffWhite} 0%, ${COLORS.softOffWhite}d9 60%, transparent 100%)`,
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
