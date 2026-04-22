type Review = {
  src: string;
  alt: string;
  ratio: string;
};

const REVIEWS: Review[] = [
  { src: "/assets/Reviews/IMG_0307.PNG", alt: "Отзыв клиента", ratio: "1206/722" },
  { src: "/assets/Reviews/IMG_1259.PNG", alt: "Отзыв клиента", ratio: "1051/1575" },
  { src: "/assets/Reviews/IMG_1632.PNG", alt: "Отзыв клиента", ratio: "925/561" },
  { src: "/assets/Reviews/IMG_1700.PNG", alt: "Отзыв клиента", ratio: "981/707" },
  { src: "/assets/Reviews/IMG_3110.PNG", alt: "Отзыв клиента", ratio: "1163/521" },
  { src: "/assets/Reviews/IMG_3740.PNG", alt: "Отзыв клиента", ratio: "1041/542" },
  { src: "/assets/Reviews/IMG_4334.PNG", alt: "Отзыв клиента", ratio: "1012/850" },
  { src: "/assets/Reviews/IMG_4338.PNG", alt: "Отзыв клиента", ratio: "1026/679" },
  { src: "/assets/Reviews/IMG_4339.PNG", alt: "Отзыв клиента", ratio: "1056/538" },
  { src: "/assets/Reviews/IMG_5036.PNG", alt: "Отзыв клиента", ratio: "1016/523" },
  { src: "/assets/Reviews/IMG_5482.PNG", alt: "Отзыв клиента", ratio: "1054/614" },
  { src: "/assets/Reviews/IMG_5599.PNG", alt: "Отзыв клиента", ratio: "1026/1097" },
  { src: "/assets/Reviews/IMG_5635.PNG", alt: "Отзыв клиента", ratio: "909/867" },
  { src: "/assets/Reviews/IMG_6601.PNG", alt: "Отзыв клиента", ratio: "1090/568" },
  { src: "/assets/Reviews/IMG_6636.PNG", alt: "Отзыв клиента", ratio: "1062/661" },
  { src: "/assets/Reviews/IMG_7118.JPG", alt: "Отзыв клиента", ratio: "1010/442" },
  { src: "/assets/Reviews/IMG_1196.PNG", alt: "Отзыв клиента", ratio: "1023/373" },
  { src: "/assets/Reviews/IMG_5262.PNG", alt: "Отзыв клиента", ratio: "203/320" },
  { src: "/assets/Reviews/IMG_5507.PNG", alt: "Отзыв клиента", ratio: "932/370" },
];

function splitCols<T>(arr: T[], n: number): T[][] {
  return Array.from({ length: n }, (_, i) => arr.filter((_, j) => j % n === i));
}

const COLUMNS = splitCols(REVIEWS, 3);

export default function Testimonials() {
  return (
    <section
      className="mx-auto w-full max-w-[1480px] px-6 py-16 md:px-10 md:py-24"
      aria-label="Отзывы клиентов"
    >
      <div className="mb-10 flex flex-col items-start justify-between gap-6 border-b border-[#C9D1DC] pb-6 md:mb-12 md:flex-row md:items-end">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-[#6B7280] uppercase">
            <span aria-hidden className="h-px w-8 bg-[#C9D1DC]" />
            Отзывы · {REVIEWS.length} сообщений
          </p>
          <h2 className="mt-4 max-w-xl font-[family-name:var(--font-editorial)] text-4xl font-medium leading-[0.98] tracking-[-0.01em] text-[#151922] md:text-6xl">
            Что говорят
            <br />
            <span className="italic text-[#0A62D0]">клиенты.</span>
          </h2>
        </div>
        <p className="max-w-sm text-base leading-relaxed text-[#6B7280]">
          Скриншоты из мессенджеров и почты — без редактирования.
          Именно так они и пришли.
        </p>
      </div>

      <div className="relative h-[620px] overflow-hidden md:h-[760px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#F4F6F9] via-[#F4F6F9]/85 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#F4F6F9] via-[#F4F6F9]/85 to-transparent"
        />

        <div className="grid h-full grid-cols-1 gap-4 sm:hidden">
          <ScrollColumn items={REVIEWS} speed={60} reverse={false} />
        </div>

        <div className="hidden h-full gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          <ScrollColumn items={COLUMNS[0]} speed={46} reverse={false} />
          <ScrollColumn items={COLUMNS[1]} speed={54} reverse />
          <ScrollColumn
            items={COLUMNS[2]}
            speed={40}
            reverse={false}
            className="hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
}

function ScrollColumn({
  items,
  speed,
  reverse,
  className = "",
}: {
  items: Review[];
  speed: number;
  reverse?: boolean;
  className?: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="testimonials-track flex flex-col gap-4"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          animationDuration: `${speed}s`,
        }}
      >
        {doubled.map((review, i) => (
          <ReviewTile key={i} review={review} />
        ))}
      </div>
    </div>
  );
}

function ReviewTile({ review }: { review: Review }) {
  return (
    <figure className="group relative block overflow-hidden rounded-xl border border-[#C9D1DC] bg-[#E8ECF2]">
      <div
        className="relative w-full"
        style={{ aspectRatio: review.ratio }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={review.src}
          alt={review.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#151922]/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
    </figure>
  );
}
