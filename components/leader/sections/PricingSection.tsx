import { ExternalLink } from "lucide-react";
import { FORM_URL } from "../course";
import {
  SpotlightCard,
  LinearButton,
  SectionHeading,
  CardTitle,
  Label,
  Reveal,
} from "../linear";
import { Section } from "../primitives";
import { includedGroups } from "../content";

/**
 * Тариф: состав обучения одной широкой карточкой, под ней полоса с анкетой.
 *
 * Раньше список стоял в узкой колонке слева, а карточка анкеты — справа.
 * Список из девяти пунктов вырастал до 1060 px против 420 px у анкеты, то есть
 * справа оставалось ~500 px пустоты, а вся секция занимала 1200 px. Три группы
 * параллельными колонками читаются целиком без прокрутки — для перечня «что
 * входит» это и есть главная задача, — а CTA во всю ширину закрывает секцию
 * сильнее, чем карточка, висящая в пустоте.
 */
export function PricingSection() {
  return (
    <Section id="tarif">
      <Reveal>
        <Label>Тариф</Label>
        <SectionHeading className="mt-4 max-w-2xl">ТАРИФ И СТОИМОСТЬ</SectionHeading>
      </Reveal>

      <Reveal className="mt-12">
        <SpotlightCard className="p-7 md:p-9">
          <CardTitle className="text-xl">Что входит в обучение</CardTitle>

          {/* Многоколоночная раскладка, а не grid: групп три, и в двух колонках
              grid ставит их как [1][2] / [3][—] — снизу справа остаётся дыра.
              CSS columns балансирует колонки по высоте и складывает 2+1,
              а `break-inside-avoid` не даёт разорвать группу между колонками. */}
          <div className="mt-8 gap-x-10 sm:columns-2 lg:columns-3">
            {includedGroups.map((group) => (
              <div key={group.label} className="mb-9 break-inside-avoid last:mb-0">
                {/* h4, а не абзац: заголовок группы стоит под h3 карточки,
                    иначе в структуре страницы после h3 идут просто <p>.
                    И без акцентной точки — она маркирует секцию, не группу. */}
                <h4 className="border-b border-surface-strong pb-3 text-[12px] uppercase tracking-[0.28em] text-foreground">
                  {group.label}
                </h4>
                {/* divide-y вместо border-t у каждого пункта: разделители стоят
                    только между строками и примыкают к ним, а не висят в 4 px. */}
                <ul className="divide-y divide-foreground/[0.08]">
                  {group.items.map(({ text, icon: Icon }) => (
                    <li key={text} className="flex items-start gap-3 py-3.5">
                      <Icon
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1 text-sm leading-relaxed text-muted">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </Reveal>

      <Reveal delay={0.08} className="mt-4">
        <SpotlightCard
          variant="accent"
          className="p-7 md:p-9"
          contentClassName="flex flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-10"
        >
          <div className="max-w-2xl">
            <Label>Анкета</Label>
            <p className="mt-4 text-base font-medium leading-relaxed text-foreground md:text-lg">
              Чтобы получить максимально выгодные условия для участия и первым узнать о старте
              продаж, заполните анкету.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2.5">
            <LinearButton href={FORM_URL} size="lg" className="w-full">
              Заполнить анкету
            </LinearButton>
            <p className="flex items-center gap-2 text-xs text-muted">
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Откроется в новой вкладке
            </p>
          </div>
        </SpotlightCard>
      </Reveal>
    </Section>
  );
}
