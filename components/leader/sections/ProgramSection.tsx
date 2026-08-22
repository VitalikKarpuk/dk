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
import { Section } from "../primitives";
import { programFeatures } from "../content";

/** Состав программы — ровная сетка 3×3 с медиа-полосой над текстом. */
export function ProgramSection() {
  return (
    <Section>
      <Reveal>
        <Label>Состав программы</Label>
        <SectionHeading className="mt-4 max-w-2xl">Что вас ждет:</SectionHeading>
      </Reveal>

      {/* Две разные карточки, а не одна адаптивная.
          `sm+`: ровная сетка 3×3, картинка сверху 16:9 — сознательно другой ритм,
          чем асимметричный bento в «Кому подходит».
          Мобильный: строка с миниатюрой слева. Вертикальная карточка занимала
          420 px (196 из них — картинка плюс 52 на иконку-чип), а девять таких
          давали секцию 3790 px — почти пять экранов прокрутки. Иконка на
          мобильном не выводится: её роль уже выполняет фотография. */}
      <Stagger className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3" as="ul">
        {programFeatures.map(({ icon: Icon, title, description, image, imageSm }) => (
          <StaggerItem key={title} as="li">
            <SpotlightCard
              /* Двигается только арт — сетка 3×3 остаётся ровной. */
              className="h-full"
              contentClassName="flex h-full flex-row items-start gap-3.5 p-4 sm:flex-col sm:items-stretch sm:gap-0 sm:p-0"
            >
              {/* Миниатюра 4:3 на мобильном, полоса 16:9 от sm.
                  Без картинки — та же геометрия с иконкой, чтобы сетка
                  не разъезжалась, пока арт не готов. */}
              <div className="relative aspect-[4/3] w-[104px] shrink-0 overflow-hidden rounded-xl border border-surface-strong sm:aspect-video sm:w-full sm:rounded-none sm:border-x-0 sm:border-t-0">
                {image ? (
                  <img
                    src={image}
                    srcSet={imageSm ? `${imageSm} 320w, ${image} 800w` : undefined}
                    sizes="(min-width: 640px) 373px, 104px"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-brand group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center bg-gradient-to-br from-foreground/[0.03] via-transparent to-accent/[0.06]"
                    aria-hidden
                  >
                    <Icon className="h-6 w-6 text-foreground/20 sm:h-7 sm:w-7" />
                  </div>
                )}
                {/* Мягкий стык полосы с текстом — только в вертикальной карточке */}
                <div
                  className="absolute inset-x-0 bottom-0 hidden h-16 bg-gradient-to-t from-card/90 to-transparent sm:block"
                  aria-hidden
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col sm:p-6">
                <span
                  className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-surface-strong bg-foreground/[0.03] text-accent transition-colors duration-300 ease-brand group-hover:border-accent group-hover:bg-accent-fill group-hover:text-on-accent sm:flex"
                  aria-hidden
                >
                  <Icon className="h-4 w-4" />
                </span>
                <CardTitle className="text-[15px] sm:mt-4 sm:text-base">{title}</CardTitle>
                {description && <Body className="mt-1.5 sm:mt-2">{description}</Body>}
              </div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
