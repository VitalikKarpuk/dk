import { type ReactNode } from "react";
import { Section as UiSection, IconBubble } from "@/components/ui";

/**
 * Примитивы страницы `/leader`.
 *
 * Раньше `Section` задавал ритм именно этой страницы — своя колонка
 * `max-w-6xl`, свои поля `px-5 md:px-8` и своя вертикаль
 * `py-16 md:py-24 lg:py-32`. Отдельный ритм под одну страницу и был
 * главной причиной, по которой /leader читался как чужой сайт: при
 * переходе с главной менялись и поля, и ширина текста. Теперь каркас
 * общий, а здесь осталась только поправка на разделительную линию —
 * на /leader секции идут подряд одним тоном, и без линии они слипаются.
 */
export function Section({
  id,
  children,
  divider = true,
  backdrop,
}: {
  id?: string;
  children: ReactNode;
  divider?: boolean;
  /** Фон во всю ширину секции — рисуется под контентом, вне колонки. */
  backdrop?: ReactNode;
}) {
  return (
    <UiSection id={id} divider={divider} backdrop={backdrop}>
      {children}
    </UiSection>
  );
}

/** Кружок с иконкой — тот же, что в карточках остального сайта. */
export { IconBubble as IconBox };
