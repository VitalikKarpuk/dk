import type { ReactNode } from "react";

/**
 * Тон бейджа. Пять ролей, и больше не нужно:
 * нейтральный, акцентный, жёлтый (дата/условие), обведённый и стеклянный —
 * последний для тёмных подложек, где заливка тоном не читается.
 */
type Tone = "cool" | "accent" | "accentOutline" | "soft" | "outline" | "glass";

const TONES: Record<Tone, string> = {
  cool: "bg-surface text-foreground",
  accent: "bg-accent-fill text-on-accent shadow-accent",
  /** Обведённый акцентом — для дат и номеров потока рядом с заголовком. */
  accentOutline: "border border-accent/30 bg-accent/10 text-accent",
  soft: "bg-accent-soft text-on-accent-soft",
  outline: "border border-surface-strong text-muted",
  glass: "border border-on-accent-line bg-on-accent-wash text-on-accent",
};

/**
 * Бейдж: короткая подпись у заголовка — «Курс · 4 недели», «7 мест».
 *
 * Раньше собирался инлайном на каждой странице: `borderRadius: "16px",
 * padding: "4px 12px", fontSize: "14px"` — и разъезжался, потому что
 * рядом с ним жили и капсулы `borderRadius: "100px"`, и стеклянные
 * плашки с собственной прозрачностью. Силуэт теперь один — капсула,
 * как у кнопок и чипов.
 */
export function Badge({
  children,
  tone = "cool",
  icon,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  /** Иконка слева — 16×16, из того же набора, что и по сайту. */
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-sm leading-[1.4] font-medium ${TONES[tone]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}

/**
 * Кружок с иконкой рядом с текстом карточки.
 *
 * Было два: лиловый круг 48px на подстраницах и квадрат 44px со скруглением
 * и рамкой на /leader. Остался круг — он же капсула, тот же силуэт, что у
 * кнопок и бейджей. На ховере карточки заливается акцентом: подсветка
 * завязана на `group` родителя, поэтому отдельного состояния не нужно.
 */
export function IconBubble({
  children,
  tone = "cool",
  className = "",
}: {
  children: ReactNode;
  /** `glass` — на тёмной подложке, где лиловый круг сливается с фоном. */
  tone?: "cool" | "glass";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`icon-bubble flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-brand group-hover:scale-105 ${
        tone === "glass"
          ? "border border-on-accent-line bg-on-accent-wash text-on-accent"
          : "bg-surface-strong text-accent group-hover:bg-accent-fill group-hover:text-on-accent"
      } ${className}`}
    >
      {children}
    </span>
  );
}
