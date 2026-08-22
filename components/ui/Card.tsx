import type { ReactNode } from "react";

type Tone = "paper" | "navy" | "cool";

/* Только заливка и цвет текста: контур у всех тонов один — `.card-frame`.
   Раньше `navy` красил рамку в цвет собственного фона, то есть по факту
   оставался без контура, и в ряду со светлыми карточками это читалось
   как другой тип поверхности. */
const TONES: Record<Tone, string> = {
  /** Белая карточка на off-white фоне — основной вариант. */
  paper: "bg-card text-foreground",
  /** Тёмный контрапункт: им выделяют одну карточку из ряда. */
  navy: "bg-navy text-white",
  /** Холодная подложка — для второстепенных блоков. */
  cool: "bg-surface text-foreground",
};

/**
 * Карточка: один радиус, одна граница, один отклик на наведение.
 *
 * До этого каждая страница задавала свои: радиусы гуляли от 12 до 24px,
 * а тени были то мягкие, то резкие. Граница и её анимация теперь целиком
 * в `.card-frame` — том же, что несут карточки /leader.
 */
export function Card({
  children,
  tone = "paper",
  className = "",
  ...rest
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      /* Отклик на наведение целиком в `.card-frame`: рамка в акцент, тень
         и бегущий по контуру блик. Подъёма нет — блок под курсором на
         сайте не двигается, почему именно так, написано в globals.css.
         Проп `hover` убран вместе с ним: включать ему больше нечего. */
      className={`card-frame p-6 md:p-8 ${TONES[tone]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
