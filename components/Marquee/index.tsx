const NBSP = "\u00A0";

function PrimarySegment() {
  return (
    <span className="flex shrink-0 items-center whitespace-nowrap px-8">
      <span>Бережно, уважительно{NBSP}—{NBSP}</span>
      <em
        className="italic text-[#0A62D0]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        о{NBSP}самом важном
      </em>
      <span
        aria-hidden="true"
        className="mx-[0.7em] text-[0.7em] text-[#5491E0]"
      >
        ✦
      </span>
      <span>в{NBSP}своём темпе,{NBSP}</span>
      <em
        className="italic text-[#151922]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        без оценок и{NBSP}советов
      </em>
      <span
        aria-hidden="true"
        className="mx-[0.7em] text-[0.7em] text-[#5491E0]"
      >
        ✦
      </span>
    </span>
  );
}

function SecondarySegment() {
  return (
    <span className="flex shrink-0 items-center whitespace-nowrap px-10">
      <span>Психолог · Дарья Карпук · практика с{NBSP}2014</span>
      <span aria-hidden="true" className="mx-6 opacity-60">
        {NBSP}—{NBSP}
      </span>
      <span>индивидуальные консультации, курсы, интенсивы</span>
      <span aria-hidden="true" className="mx-6 opacity-60">
        {NBSP}—{NBSP}
      </span>
    </span>
  );
}

const MANIFESTO_TEXT =
  "Бережно, уважительно — о самом важном. В своём темпе, без оценок и советов. Психолог Дарья Карпук — индивидуальные консультации, курсы и интенсивы.";

export default function Marquee() {
  return (
    <section
      className="relative overflow-hidden bg-[#F4F6F9] py-10 select-none md:py-14"
      aria-label="Манифест практики"
    >
      <p className="sr-only">{MANIFESTO_TEXT}</p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#F4F6F9] via-[#F4F6F9]/80 to-transparent md:w-48"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#F4F6F9] via-[#F4F6F9]/80 to-transparent md:w-48"
      />

      <div
        aria-hidden="true"
        className="flex w-max marquee-track font-semibold tracking-tight text-[#151922]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.75rem, 4.5vw, 4rem)",
          lineHeight: 1.05,
        }}
      >
        <PrimarySegment />
        <PrimarySegment />
      </div>

      <div
        aria-hidden="true"
        className="mt-5 flex w-max marquee-track font-medium uppercase tracking-[0.2em]"
        style={{
          animationDirection: "reverse",
          animationDuration: "52s",
          fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(20, 20, 22, 0.45)",
        }}
      >
        <SecondarySegment />
        <SecondarySegment />
      </div>
    </section>
  );
}
