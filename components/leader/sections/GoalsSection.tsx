import {
  SpotlightCard,
  SectionHeading,
  CardTitle,
  Label,
  Body,
  Reveal,
  Stagger,
  StaggerItem,
} from "../linear";
import { Section, IconBox } from "../primitives";
import { goalsForYou } from "../content";

/** Bento: неравные пролёты по 6-колоночной сетке. Первая карточка — «герой». */
const GOAL_SPANS = [
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

/**
 * Ширины замерены, а не выведены из сетки: 566 CSS px у пролёта в 3 колонки,
 * 371 у пролёта в 2, и 342–348 пока карточки идут в одну-две колонки.
 * Порядок соответствует GOAL_SPANS — у первых трёх карточек пролёт шире,
 * поэтому одна общая строка `sizes` завышала бы запрос последним трём вдвое.
 */
const GOAL_SIZES = [
  "(min-width: 1024px) 566px, (min-width: 640px) 342px, calc(100vw - 40px)",
  "(min-width: 1024px) 371px, (min-width: 640px) 342px, calc(100vw - 40px)",
];

/** Кому подходит — bento с артом под текстом. */
export function GoalsSection() {
  return (
    <Section id="komu">
      <Reveal>
        <Label>Кому подходит</Label>
        <SectionHeading className="mt-4 max-w-2xl">Вам точно сюда, если вы:</SectionHeading>
      </Reveal>

      <Stagger
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[180px]"
        as="ul"
      >
        {goalsForYou.map(
          ({ title, description, icon: Icon, image, imageSm, imageW, imagePosition }, index) => (
          <StaggerItem key={title} as="li" className={GOAL_SPANS[index]}>
            <SpotlightCard
              variant={index === 0 ? "gradient" : "default"}
              className="h-full p-6"
              contentClassName="flex flex-col justify-between"
              /* Отклик карточки — наезд арта внутри; рамка при этом стоит
                 на месте, как и везде на сайте (см. globals.css). */
              media={
                image && (
                  <>
                    <img
                      src={image}
                      srcSet={imageSm && imageW ? `${imageSm} 700w, ${image} ${imageW}w` : undefined}
                      sizes={GOAL_SIZES[index < 3 ? 0 : 1]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      /* Наезд идёт медленнее отклика рамки — 0.5s против 0.3s:
                         быстрый зум читается рывком.
                         Масштабируется только арт — шторки под текстом стоят
                         на месте, поэтому контраст подписи не плавает.
                         Сам жест — общесайтовый `.zoom-img` (globals.css):
                         тот же наезд теперь и в плитках главной, и в отзывах. */
                      className={`zoom-img absolute inset-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 ${
                        imagePosition ?? "object-center"
                      }`}
                    />
                    {/* Диагональная шторка — вписывает арт в карточку, оставляя верх-право открытым */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-card/95 via-card/35 to-transparent" />
                    {/* Нижняя шторка — площадка под текст: держит контраст 4.5:1 независимо от арта */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/35 via-45% to-transparent" />
                  </>
                )
              }
            >
              <IconBox>
                <Icon className="h-5 w-5" aria-hidden />
              </IconBox>
              <div className="mt-5">
                <CardTitle className={index === 0 ? "text-xl md:text-2xl" : ""}>{title}</CardTitle>
                {/* Над артом лежит шторка цвета карточки, поэтому и текст берёт
                    тему: раньше здесь стоял светло-серый литерал, подобранный
                    под тёмную тему, и на бумаге он пропадал. `ink-strong`
                    вместо `muted` — над картинкой muted не добирает 4.5:1. */}
                <p
                  className={`mt-2 text-sm leading-relaxed md:text-base ${
                    image ? "text-ink-strong" : "text-muted"
                  }`}
                >
                  {description}
                </p>
              </div>
            </SpotlightCard>
          </StaggerItem>
          )
        )}
      </Stagger>

      <Reveal className="mt-8">
        <Body>Если это про вас — вам точно к нам.</Body>
      </Reveal>
    </Section>
  );
}
