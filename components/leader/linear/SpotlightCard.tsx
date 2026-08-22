import { type ReactNode, type MouseEvent, useCallback, useRef, useState } from "react";

type Variant = "default" | "glass" | "gradient" | "accent";

/**
 * На тёмной теме поверхности строились из белых накладок в 4–8% —
 * «стекло» поверх почти-чёрного. На бумаге тот же приём даёт серую грязь,
 * поэтому поверхности здесь плотные: белая карточка на off-white фоне,
 * а различает варианты холодный или лиловый подмес.
 */
const VARIANTS: Record<Variant, string> = {
  default: "bg-card",
  glass: "bg-card/70 backdrop-blur-xl",
  gradient: "bg-gradient-to-br from-surface via-card to-card",
  /* Только заливка: контур у всех вариантов общий — `.card-frame`. */
  accent: "bg-gradient-to-b from-accent/[0.06] to-card",
};

interface SpotlightCardProps {
  children: ReactNode;
  /** Оформление и размеры самой поверхности: отступы, height, overflow. */
  className?: string;
  /**
   * Раскладка содержимого (flex/grid/justify/items).
   * Отдельный проп нужен потому, что контент лежит во внутренней обёртке —
   * если положить `flex justify-between` в `className`, оно распределит
   * служебные слои (блик, прожектор), а не сам контент.
   */
  contentClassName?: string;
  variant?: Variant;
  /**
   * Декоративная подложка (картинка + затемняющая шторка).
   * Лежит самым нижним слоем — под бликом, прожектором и контентом,
   * поэтому текст остаётся читаемым, а прожектор работает поверх картинки.
   */
  media?: ReactNode;
  /** Курсорный прожектор. Отключайте для чисто декоративных поверхностей (например, картинок). */
  spotlight?: boolean;
}

/**
 * Базовая поверхность системы: стеклянный фон, общесайтовая рамка
 * `.card-frame` (цвет, тень и бегущий по контуру блик — в globals.css),
 * блик по верхней кромке и радиальный прожектор, следящий за курсором.
 *
 * Координаты курсора пишутся в CSS-переменные, а не в state, — так
 * mousemove не вызывает ре-рендер поддерева на каждый кадр.
 */
export function SpotlightCard({
  children,
  className = "",
  contentClassName = "",
  variant = "default",
  media,
  spotlight = true,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const { left, top } = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${e.clientX - left}px`);
      el.style.setProperty("--spot-y", `${e.clientY - top}px`);
    },
    []
  );

  return (
    <div
      ref={ref}
      onMouseMove={spotlight ? onMove : undefined}
      onMouseEnter={spotlight ? () => setActive(true) : undefined}
      onMouseLeave={spotlight ? () => setActive(false) : undefined}
      /* Подъёма под курсором нет — ни здесь, ни где-либо на сайте: блок
         под курсором стоит на месте, отклик дают рамка, тень, бегущий по
         контуру блик и прожектор ниже. Почему так — в globals.css.
         Проп `lift` убран вместе с ним: двадцать две карточки из двадцати
         пяти на этой же странице и так гасили его вручную. */
      className={`card-frame group relative overflow-hidden ${VARIANTS[variant]} ${className}`}
    >
      {media && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {media}
        </div>
      )}

      {/* Светлая кромка сверху. На тёмной теме это был белый блик —
          отражение света на стекле; на бумаге ту же роль играет лиловая
          линия, иначе тёмная полоса читалась бы как лишняя рамка. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-surface-strong to-transparent"
        aria-hidden
      />

      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-brand"
          style={{
            opacity: active ? 1 : 0,
            background:
              "radial-gradient(300px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--accent) 15%, transparent), transparent 70%)",
          }}
          aria-hidden
        />
      )}

      <div className={`relative h-full ${contentClassName}`}>{children}</div>
    </div>
  );
}
