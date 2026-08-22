import type { ReactNode } from "react";
import { COLORS, TYPE } from "@/lib/design";

/**
 * Типографика сайта — одна на все страницы.
 *
 * Раньше набор жил в двух местах: полный на /leader (`linear/Typography`)
 * и «по месту» на подстраницах, где каждый заголовок задавался инлайном
 * собственным `clamp()`. Таких размеров набралось двадцать пять на три
 * страницы — от 24 до 148px, — и одинаковые по рангу заголовки выходили
 * разного кегля. Здесь ступеней семь, все из шкалы `TYPE`.
 *
 * Компоненты не принимают ни цвета, ни кегля: ступень выбирается
 * компонентом, а не параметром. Иначе шкала снова расползётся.
 */

/** Заголовок первого экрана — самый крупный кегль на сайте. */
export function Display({
  children,
  className = "",
  ...rest
}: {
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 style={{ ...TYPE.hero, color: COLORS.ink }} className={className} {...rest}>
      {children}
    </h1>
  );
}

/** Заголовок карточки. */
export function CardTitle({
  children,
  as: Tag = "h3",
  className = "",
}: {
  children: ReactNode;
  as?: "h3" | "h4";
  className?: string;
}) {
  return (
    <Tag className={`text-foreground ${className}`} style={TYPE.cardTitle}>
      {children}
    </Tag>
  );
}

/**
 * Акцентная фраза внутри заголовка: курсив Playfair электриком.
 * Единственный способ выделить слово в заголовке на этом сайте.
 */
export function ItalicAccent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <em className={`text-accent italic ${className}`} style={TYPE.italic}>
      {children}
    </em>
  );
}

/**
 * Вводный абзац под заголовком.
 *
 * Ширину задаёт вызывающая сторона: у Tailwind обе утилиты ширины —
 * и `max-w-2xl` из вёрстки, и `MEASURE` отсюда — одного веса, и какая
 * победит, решает порядок в CSS, а не порядок в классе. Поэтому ширина
 * здесь не назначается вовсе; для сплошного текста берите `MEASURE`.
 */
export function Lead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-ink-strong ${className}`} style={TYPE.lead}>
      {children}
    </p>
  );
}

/** Основной текст. */
export function Body({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-muted ${className}`} style={TYPE.body}>
      {children}
    </p>
  );
}

/**
 * Крупное число: цена, срок, счёт. `size="lg"` — плакатный кегль
 * на первом экране блока.
 */
export function Numeral({
  children,
  size = "md",
  className = "",
}: {
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <span
      className={`block ${className}`}
      style={size === "lg" ? TYPE.numeralLarge : TYPE.numeral}
    >
      {children}
    </span>
  );
}

/**
 * Врезка-цитата: заголовочный кегль с чертой слева.
 * Черта — часть приёма, поэтому здесь, а не в вёрстке.
 */
export function Quote({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`border-l-[3px] border-accent pl-5 text-foreground ${className}`}
      style={TYPE.quote}
    >
      {children}
    </p>
  );
}
