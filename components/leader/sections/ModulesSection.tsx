import { Badge } from "@/components/ui";
import { Target } from "lucide-react";
import {
  SpotlightCard,
  SectionHeading,
  CardTitle,
  Label,
  Lead,
  Body,
  Reveal,
  Stagger,
  StaggerItem,
} from "../linear";
import { Section } from "../primitives";
import { modules } from "../content";

/** Индекс бонусного модуля: он занимает всю ширину и получает акцентный вариант. */
const BONUS_INDEX = 6;

/**
 * Модули курса — квадратная эмблема-«метка главы» рядом с заголовком.
 *
 * Сетка карточек переезжает в две колонки только с `lg`. На планшете (768px)
 * двухколоночная сетка оставляла тексту 288px — уже, чем на телефоне: колонка
 * забирает половину ширины, а `p-7` съедает 56px. Плюс `h-full` выравнивал
 * пары карточек по самой высокой, и под короткими оставалось до 190px пустоты.
 */
export function ModulesSection() {
  return (
    <Section id="moduli">
      <Reveal>
        <Label>Программа</Label>
        <SectionHeading className="mt-4 max-w-2xl">Модули курса</SectionHeading>
        <Lead className="mt-6">10 модулей — от основ до продвинутых инструментов</Lead>
      </Reveal>

      <Stagger className="mt-12 grid gap-4 lg:grid-cols-2" as="ul">
        {modules.map((module, index) => {
          const isBonus = index === BONUS_INDEX;
          return (
            <StaggerItem key={module.title} as="li" className={isBonus ? "lg:col-span-2" : ""}>
              <SpotlightCard
                variant={isBonus ? "accent" : "default"}
                /* Двигается только метка главы: карточки высокие и выровнены
                   парами по `h-full`. */
                className="h-full p-5 sm:p-7"
                /* Сетка, а не флексы: описание меняет место, оставаясь одним узлом.
                   На телефоне эмблема и заголовок делят первый ряд, описание идёт
                   через всю ширину вторым — в колонке рядом с эмблемой ему
                   оставалось 196px, это ~24 знака в строке, вдвое меньше
                   комфортных 45–75. Строк выходило до десяти.
                   С `md` эмблема занимает оба ряда, описание встаёт справа. */
                contentClassName="grid grid-cols-[72px_1fr] items-center gap-x-4 gap-y-3.5 md:grid-cols-[96px_1fr] md:items-start md:gap-x-5 md:gap-y-2.5 lg:grid-cols-[112px_1fr]"
              >
                {/* Метка главы 1:1. Без картинки — тот же квадрат-заглушка,
                    чтобы карточки не разъезжались по высоте. */}
                <div className="relative aspect-square overflow-hidden rounded-xl border border-surface-strong md:row-span-2">
                  {module.image ? (
                    <img
                      src={module.image}
                      srcSet={module.imageSm ? `${module.imageSm} 160w, ${module.image} 320w` : undefined}
                      sizes="(min-width: 1024px) 112px, (min-width: 768px) 96px, 72px"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-brand group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="h-full bg-gradient-to-br from-foreground/[0.03] via-transparent to-accent/[0.08]"
                      aria-hidden
                    />
                  )}
                </div>

                <div className="min-w-0">
                  {isBonus && (
                    <Badge tone="accentOutline" className="mb-2.5">
                      Бонус
                    </Badge>
                  )}
                  <CardTitle className="text-base">{module.title}</CardTitle>
                </div>

                <Body className="col-span-2 md:col-span-1 md:col-start-2">{module.description}</Body>

                {/* Результат — не блок в блоке, а врезка после волосяной линии.
                    Рамка с фоном стоила 57px служебной высоты на карточку
                    (24 внутренних отступа + строка подписи + отбивка) — на семи
                    карточках это 400px, и «коробка в коробке» всё равно спорна.
                    Подпись ушла в строку: акцентный моно-зачин читается как
                    метка, а текст начинается на той же строке. */}
                <p className="col-span-2 mt-1.5 border-t border-surface-strong pt-4 text-sm leading-relaxed text-foreground">
                  <Target
                    className="mr-2 inline-block h-3.5 w-3.5 align-[-2px] text-accent"
                    aria-hidden
                  />
                  <span className="text-[12px] uppercase tracking-[0.28em] text-accent">
                    Результат
                  </span>
                  {" — "}
                  {module.result}
                </p>
              </SpotlightCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
