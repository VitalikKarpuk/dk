import { Badge } from "@/components/ui";
import { ArrowUpRight } from "lucide-react";
/* Арт страницы лежит в public/leader — здесь и ниже это обычные URL, а не импорты. */
const dkGroup = "/leader/photos/dk-group.webp";
const dkGroup800 = "/leader/photos/dk-group-800.webp";
import {
  FORM_URL,
  CTA_BOOK_DISCOUNT,
  DISCOUNT_PERCENT,
  COURSE_NAME,
  INSTAGRAM_CASES,
} from "../course";
import {
  SpotlightCard,
  LinearButton,
  SectionHeading,
  Label,
  Lead,
  Reveal,
  Stagger,
  StaggerItem,
} from "../linear";
import { Section } from "../primitives";

/**
 * Инициал для аватарки кейса. Имя стоит в родительном падеже в конце подписи,
 * поэтому берём его явным списком, а не первым словом — иначе в кружке
 * окажется «К» от слова «Кейс» у всех пяти.
 */
const getInitial = (label: string): string => {
  const match = label.match(/(?:Людмилы|Татьна|Виктории|Юлии|Миланы)/);
  if (match) return match[0][0];
  return label[0];
};

/** Уникальность программы + кейсы участников. */
export function UniquenessSection() {
  return (
    <Section>
      <Reveal>
        <Label>Уникальность</Label>
        <SectionHeading className="mt-4 max-w-3xl">
          Аналогов обучения на Белорусском рынке нету!
        </SectionHeading>
      </Reveal>

      <Reveal className="mt-12">
        <SpotlightCard contentClassName="grid gap-0 md:grid-cols-[1fr_auto]">
          <div className="p-7 md:p-9">
            <Lead className="text-foreground">
              <strong className="font-semibold text-foreground">{COURSE_NAME}</strong> — первый
              онлайн-курс, где вы работаете с внутреними процесами и установками, мешающими вам
              двигаться, и так же создаете внешний путь через стратегические действия
            </Lead>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 border-t border-surface-strong p-7 md:border-l md:border-t-0 md:p-9">
            <Badge tone="accentOutline" className="tabular-nums">
              −{DISCOUNT_PERCENT}%
            </Badge>
            <LinearButton href={FORM_URL} className="text-center">
              {CTA_BOOK_DISCOUNT}
            </LinearButton>
          </div>
        </SpotlightCard>
      </Reveal>

      <Reveal className="mt-6">
        <SpotlightCard spotlight={false} className="overflow-hidden">
          {/* Два варианта: 1537w под десктоп (отрисовка до 1150 CSS px, на DPR 2
              исходника и так не хватает) и 800w под мобильные, где кадр всего
              348 CSS px — иначе телефон тянет втрое больше нужного.
              `sizes` повторяет фактическую ширину колонки: max-w-6xl минус
              горизонтальные отступы секции (px-5 → px-8 с md). */}
          <img
            src={dkGroup}
            srcSet={`${dkGroup800} 800w, ${dkGroup} 1537w`}
            sizes="(min-width: 1216px) 1152px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 40px)"
            width={1537}
            height={1023}
            alt={`Выпускники программы ${COURSE_NAME}`}
            loading="lazy"
            decoding="async"
            className="max-h-[400px] w-full object-cover object-top transition-transform duration-500 ease-brand group-hover:scale-105"
          />
        </SpotlightCard>
      </Reveal>

      <Reveal className="mt-20">
        <Label>Кейсы участников</Label>
        <Lead className="mt-4 max-w-2xl">
          Посмотрите истории учеников и убедитесь, что все ваши желания реальны
        </Lead>
      </Reveal>

      <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" as="ul">
        {INSTAGRAM_CASES.map(({ href, label }) => (
          <StaggerItem key={label} as="li">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {/* Плитка не поднимается; что ссылка внешняя, показывает стрелка —
                  она и уезжает по диагонали на ховере. */}
              <SpotlightCard
                className="h-full p-4"
                contentClassName="flex items-center gap-3.5"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-surface-strong bg-foreground/[0.03] text-[13px] tabular-nums text-accent"
                  aria-hidden
                >
                  {getInitial(label)}
                </span>
                <span className="min-w-0 flex-1 text-sm font-medium text-muted transition-colors duration-300 ease-brand group-hover:text-foreground">
                  {label}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-foreground/25 transition-all duration-300 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  aria-hidden
                />
              </SpotlightCard>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
