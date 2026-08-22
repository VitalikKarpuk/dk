import type { ReactNode } from "react";
import { COLORS, TYPE } from "@/lib/design";

/**
 * Надзаголовок секции: разрядка в капитель, электрик, с чертой слева.
 * Черта — часть приёма, поэтому живёт здесь, а не дублируется по вёрстке.
 */
export function Eyebrow({
  children,
  rule = true,
  className = "",
}: {
  children: ReactNode;
  /** Черта слева. Снимается там, где надзаголовок стоит по центру. */
  rule?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-accent ${className}`}
      style={{ ...TYPE.eyebrow }}
    >
      {rule && (
        <span
          aria-hidden
          className="inline-block h-px w-8 bg-accent"
        />
      )}
      <span>{children}</span>
    </div>
  );
}

/**
 * Заголовок секции: Manrope 500 + курсивная вставка Playfair электриком.
 *
 * Один приём на весь сайт. Раньше был переписан заново на каждой
 * подстранице и разъезжался: где-то clamp начинался с 32px, где-то с 36,
 * а на /proryv надзаголовка не было вовсе.
 */
export function SectionHeading({
  eyebrow,
  title,
  italic,
  children,
  align = "left",
  size = "section",
  className = "",
  ...rest
}: {
  /** Надзаголовок. Без него секция начинается сразу с h2. */
  eyebrow?: string;
  title?: string;
  /** Курсивная вставка после заголовка. */
  italic?: string;
  /** Заголовок разметкой — когда курсив стоит в середине фразы. */
  children?: ReactNode;
  align?: "left" | "center";
  /** `display` — для первого экрана, `section` — для остальных. */
  size?: "display" | "section";
  className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "children">) {
  return (
    <div
      className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : ""} ${className}`}
      {...rest}
    >
      {eyebrow && <Eyebrow rule={align === "left"}>{eyebrow}</Eyebrow>}
      <h2 style={{ ...TYPE[size], color: COLORS.ink }}>
        {children ?? title}
        {italic && (
          <>
            {" "}
            <em className="italic text-accent" style={TYPE.italic}>
              {italic}
            </em>
          </>
        )}
      </h2>
    </div>
  );
}
