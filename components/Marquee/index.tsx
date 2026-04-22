const NBSP = "\u00A0";

function PrimarySegment() {
  return (
    <span className="flex shrink-0 items-center whitespace-nowrap px-8">
      <span>Создаём бренды,{NBSP}</span>
      <em
        className="italic text-[#0A62D0]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        которые невозможно спутать
      </em>
      <span
        aria-hidden="true"
        className="mx-[0.7em] text-[0.7em] text-[#5491E0]"
      >
        ✦
      </span>
      <span>дизайн с{NBSP}характером,{NBSP}</span>
      <em
        className="italic text-[#141416]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        продуманный до{NBSP}детали
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
      <span>Студия визуального повествования с{NBSP}2018 года</span>
      <span aria-hidden="true" className="mx-6 opacity-60">
        {NBSP}—{NBSP}
      </span>
      <span>для тех, кто выбирает смысл, а{NBSP}не шум</span>
      <span aria-hidden="true" className="mx-6 opacity-60">
        {NBSP}—{NBSP}
      </span>
    </span>
  );
}

const MANIFESTO_TEXT =
  "Создаём бренды, которые невозможно спутать. Дизайн с характером, продуманный до детали. Студия визуального повествования с 2018 года — для тех, кто выбирает смысл, а не шум.";

export default function Marquee() {
  return (
    <section
      className="relative overflow-hidden bg-[#F2EFE9] py-10 select-none md:py-14"
      aria-label="Манифест студии"
    >
      <p className="sr-only">{MANIFESTO_TEXT}</p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#F2EFE9] via-[#F2EFE9]/80 to-transparent md:w-48"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#F2EFE9] via-[#F2EFE9]/80 to-transparent md:w-48"
      />

      <div
        aria-hidden="true"
        className="flex w-max marquee-track font-semibold tracking-tight text-[#141416]"
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
