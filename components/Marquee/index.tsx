const NBSP = "\u00A0";

function PrimarySegment() {
  return (
    <span className="flex shrink-0 items-center whitespace-nowrap px-8">
      <span>Бережно{NBSP}—{NBSP}</span>
      <em
        className="italic text-accent"
        style={{ fontFamily: "var(--font-display)" }}
      >
        о{NBSP}росте и{NBSP}опоре
      </em>
      <span
        aria-hidden="true"
        className="mx-[0.7em] text-[0.7em] text-accent-soft"
      >
        ✦
      </span>
      <span>уверенно{NBSP}—{NBSP}</span>
      <em
        className="italic text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        о{NBSP}деньгах и{NBSP}влиянии
      </em>
      <span
        aria-hidden="true"
        className="mx-[0.7em] text-[0.7em] text-accent-soft"
      >
        ✦
      </span>
    </span>
  );
}

function SecondarySegment() {
  return (
    <span className="flex shrink-0 items-center whitespace-nowrap px-10">
      <span>Дарья Карпук · психолог и{NBSP}коуч · 5000+ сессий</span>
      <span aria-hidden="true" className="mx-6 opacity-60">
        {NBSP}—{NBSP}
      </span>
      <span>программа «Я{NBSP}ЛИДЕР», курсы, индивидуальные сессии</span>
      <span aria-hidden="true" className="mx-6 opacity-60">
        {NBSP}—{NBSP}
      </span>
      <span>спикер республиканских проектов</span>
      <span aria-hidden="true" className="mx-6 opacity-60">
        {NBSP}—{NBSP}
      </span>
    </span>
  );
}

const MANIFESTO_TEXT =
  "Бережно — о росте и опоре. Уверенно — о деньгах и влиянии. Дарья Карпук — психолог и коуч, более 5000 сессий и 800 клиентов. Программа «Я ЛИДЕР», курс «Базовые законы жизни», индивидуальные сессии. Спикер республиканских проектов.";

const CAPTION_ITEMS = [
  "Психолог и коуч",
  "5000+ сессий",
  "800+ клиентов",
  "Программа «Я ЛИДЕР»",
  "Спикер республиканских проектов",
];

export default function Marquee() {
  return (
    <section
      className="relative w-full select-none border-y border-surface-strong/60 bg-background"
      aria-label="Манифест практики"
    >
      <p className="sr-only">{MANIFESTO_TEXT}</p>

      <div className="relative overflow-hidden pt-10 pb-8 md:pt-14 md:pb-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background via-background/85 to-transparent md:w-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background via-background/85 to-transparent md:w-40"
        />

        <div
          aria-hidden="true"
          className="flex w-max marquee-track font-semibold tracking-tight text-foreground"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4.5vw, 4rem)",
            lineHeight: 1.05,
          }}
        >
          <PrimarySegment />
          <PrimarySegment />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="border-t border-surface-strong/40"
      >
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-6 py-4 md:gap-x-4 md:px-12 md:py-5">
          {CAPTION_ITEMS.map((item, i) => (
            <span
              key={item}
              className="flex items-center gap-x-3 font-[family-name:var(--font-display)] text-[10px] font-medium tracking-[0.32em] text-muted uppercase md:gap-x-4 md:text-[11px]"
            >
              <span>{item}</span>
              {i < CAPTION_ITEMS.length - 1 && (
                <span className="h-1 w-1 rounded-full bg-accent-soft/70" />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
