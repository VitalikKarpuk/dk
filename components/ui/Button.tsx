import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "soft";
type Size = "sm" | "md" | "lg";

/**
 * Зона нажатия добирается там, где указатель — палец, а не мышь.
 * Условие по типу указателя, а не по ширине: телефон боком (844×390)
 * проходит порог `md` и получал бы десктопные 36–40px.
 */
const TOUCH_MIN = "[@media(pointer:coarse)]:min-h-[44px]";

const SIZES: Record<Size, string> = {
  sm: `px-4 py-2 text-[13px] ${TOUCH_MIN}`,
  md: `px-6 py-3 text-[15px] ${TOUCH_MIN}`,
  /* На узком экране отступы уже: `АНКЕТА ПРЕДЗАПИСИ в 11 поток` на 375px
     разваливалась на три строки, из которых третья — одно слово. */
  lg: "min-h-[56px] px-6 py-4 text-base sm:px-8",
};

const VARIANTS: Record<Variant, string> = {
  /** Основной CTA: электрик с белым текстом. */
  primary:
    "bg-accent-fill text-on-accent shadow-accent hover:-translate-y-0.5 hover:shadow-accent-hover",
  /** Второстепенное действие на светлом фоне. */
  secondary:
    "border border-surface-strong bg-card text-foreground hover:border-accent hover:text-accent",
  /** Третьестепенное: только текст. */
  ghost: "text-muted hover:bg-surface hover:text-foreground",
  /**
   * CTA внутри тёмной секции или карточки-контрапункта — там электрик
   * теряется. Цвета фиксированные: подложка тёмная в обеих темах, значит
   * и кнопка на ней в обеих темах светлая с тёмным текстом.
   */
  onDark:
    "bg-on-accent text-on-accent-soft hover:-translate-y-0.5 hover:opacity-90",
  /**
   * Жёлтый CTA — только для срочного: бронь, последние места, дедлайн.
   * Цвета фиксированные в обеих темах, как и сам жёлтый бейдж.
   */
  soft: "bg-accent-soft text-on-accent-soft hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-16px_var(--accent-soft)]",
};

/**
 * Кнопка сайта. Одна на все страницы.
 *
 * Раньше их было три: `Button` (не использовалась ни разу), `LinearButton`
 * на /leader и шесть рукописных `<a>` с инлайновым `padding: 16px 32px`
 * на подстраницах. Отличались они всем — радиусом, кеглем, ховером,
 * кольцом фокуса; часть внешних ссылок открывалась в том же табе.
 *
 * Силуэт один: капсула, Inter 500, стрелка справа, которая уезжает на
 * ховере. Внешние ссылки идут обычным `<a>` в новую вкладку, внутренние
 * и якорные — через `next/link`.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  /* Стрелка и иконка — одна роль: показать направление действия. Кнопка
     со своей иконкой слева стрелку не получает, иначе их будет две. */
  arrow = !icon,
  className = "",
  ...rest
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Стрелка справа. Снимается там, где кнопка стоит в плотном ряду. */
  arrow?: boolean;
  /** Иконка слева от текста. */
  icon?: ReactNode;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const cls = [
    "group/btn relative inline-flex cursor-pointer items-center justify-center gap-2",
    "overflow-hidden rounded-full font-medium leading-[1.4]",
    /* `press` — общесайтовое нажатие (globals.css). Своим
       `active:scale-[0.98]` кнопка была единственным элементом сайта,
       который отвечал на клик; теперь тем же жестом отвечают ссылки,
       переключатель темы и кнопка меню. */
    "press transition-all duration-300 ease-brand",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    SIZES[size],
    VARIANTS[variant],
    className,
  ].join(" ");

  const inner = (
    <>
      {/* Блик: узкая полоса света проходит по кнопке на ховере. Заметен
          только на залитых вариантах — на обведённых просто не виден. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 ease-brand group-hover/btn:translate-x-full motion-reduce:hidden"
      />
      {/* `text-center` и `text-balance` работают только когда подпись
          всё-таки перенеслась: длинный CTA на телефоне тогда разбивается
          на строки примерно равной длины и стоит по центру капсулы, а не
          прижатым к левому краю. На однострочных кнопках — без эффекта. */}
      <span className="relative inline-flex items-center gap-2 text-center text-balance">
        {icon}
        {children}
        {arrow && (
          <span
            aria-hidden
            className="transition-transform duration-300 ease-brand group-hover/btn:translate-x-1"
          >
            →
          </span>
        )}
      </span>
    </>
  );

  if (!href) {
    return (
      <button type="button" className={cls} {...(rest as object)}>
        {inner}
      </button>
    );
  }

  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      {...rest}
    >
      {inner}
    </a>
  );
}

/**
 * Ссылка-действие рядом с основной кнопкой: подчёркивание и стрелка.
 *
 * Была на каждой подстранице своей — где-то серым по бумаге, где-то
 * белым по navy, с разной толщиной подчёркивания и своим кольцом фокуса.
 * Тон берётся из контекста (`currentColor`), поэтому вариантов не нужно:
 * на тёмной секции она белая, на светлой — цвета текста.
 */
export function QuietLink({
  href,
  children,
  direction = "right",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  /** `down` — для ссылок-якорей вниз по странице. */
  direction?: "right" | "down";
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  /* `transition-all`, а не `transition-colors`: под `press` в переход
     должно попадать и сжатие при нажатии, а `transition-colors` сузила бы
     список до цвета — нажатие снова стало бы мгновенным. */
  const cls = `press group/quiet inline-flex min-h-[44px] items-center gap-2 rounded-full px-1 text-[15px] font-medium transition-all duration-300 ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`;

  const inner = (
    <>
      <span className="border-b border-current/40 transition-colors group-hover/quiet:border-current">
        {children}
      </span>
      <span
        aria-hidden
        className={`transition-transform duration-300 ease-brand ${
          direction === "down"
            ? "group-hover/quiet:translate-y-0.5"
            : "group-hover/quiet:translate-x-1"
        }`}
      >
        {direction === "down" ? "↓" : "→"}
      </span>
    </>
  );

  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      {...rest}
    >
      {inner}
    </a>
  );
}
