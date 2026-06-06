type LogoProps = {
  className?: string;
  title?: string;
};

/**
 * Логотип «DK» — Daria Karpuk.
 * Современная геометрическая монограмма, нарисованная вектором
 * (не зависит от шрифтов). «D» — цвет foreground (currentColor),
 * «K» — акцентный, как фамилия «Карпук» в Hero.
 * Размер задаётся через className (например h-9).
 */
export default function Logo({ className, title = "Daria Karpuk" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 50 40"
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* D */}
        <path d="M8 8v24" />
        <path d="M8 8c11.5 0 17 5 17 12s-5.5 12-17 12" />
      </g>
      <g
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* K */}
        <path d="M33 8v24" />
        <path d="M33 21 44 8" />
        <path d="M36 18.5 45 32" />
      </g>
    </svg>
  );
}
