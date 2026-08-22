import type { ReactNode } from "react";
import { CONTAINER, SECTION_PADDING } from "@/lib/design";

/**
 * Тон подложки секции.
 *
 * Чередование `paper` / `cool` — основной ритм страницы; `navy` берут
 * секции-контрапункты (диагностика на главной, «результат» на /proryv).
 * Отдельного класса для каждого случая быть не должно: тон — это выбор
 * из трёх, а не произвольный цвет.
 */
type Tone = "paper" | "cool" | "navy";

const TONES: Record<Tone, string> = {
  paper: "",
  cool: "bg-surface-wash",
  navy: "bg-navy text-on-accent",
};

/**
 * Секция страницы: одна ширина колонки, одни поля, один вертикальный ритм.
 *
 * До этого каркас писался в каждой секции руками, и вариантов было три —
 * `max-w-6xl px-5 md:px-8 py-16 md:py-24 lg:py-32` на /leader,
 * `max-w-[1400px] px-6 py-10 md:px-12 md:py-14` на подстраницах и
 * `py-20 md:py-28` на главной. При переходе между страницами менялись
 * поля и ширина текста — сайт читался как три разных.
 *
 * Заливка лежит на `<section>` во всю ширину экрана, контент — во
 * внутренней колонке: секция с тоном должна доходить до краёв, а текст
 * в ней — стоять по общей сетке.
 */
export function Section({
  id,
  children,
  tone = "paper",
  divider = false,
  backdrop,
  className = "",
  innerClassName = "",
  ...rest
}: {
  id?: string;
  children: ReactNode;
  tone?: Tone;
  /** Линия сверху — там, где соседние секции одного тона. */
  divider?: boolean;
  /** Декор во всю ширину секции: пятна, фото, сетка. Рисуется под контентом. */
  backdrop?: ReactNode;
  className?: string;
  /** Классы внутренней колонки — сетка секции, а не её каркас. */
  innerClassName?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">) {
  return (
    <section
      id={id}
      /* `scroll-mt` — под якорную навигацию: без него шапка накрывает
         заголовок секции, к которой ведёт ссылка. */
      className={`relative w-full scroll-mt-24 ${TONES[tone]} ${
        divider ? "border-t border-surface-strong" : ""
      } ${className}`}
      {...rest}
    >
      {backdrop && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          {backdrop}
        </div>
      )}
      <div className={`relative ${CONTAINER} ${SECTION_PADDING} ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}
