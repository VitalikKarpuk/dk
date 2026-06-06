type LogoProps = {
  className?: string;
  title?: string;
};

const TITLE = "Daria Karpuk";

/**
 * Вариант 1 — Wordmark «dk.»
 * Строчная геометрика (Manrope) с акцентной точкой. Лёгкий, современный,
 * «студийный» вид.
 */
export function LogoWordmark({ className, title = TITLE }: LogoProps) {
  return (
    <svg viewBox="0 0 72 40" role="img" aria-label={title} className={className}>
      <text
        x="0"
        y="30"
        fontFamily="var(--font-manrope), system-ui, sans-serif"
        fontSize="38"
        fontWeight={800}
        letterSpacing="-0.04em"
        fill="currentColor"
      >
        dk
      </text>
      <circle cx="60" cy="28" r="4.5" fill="var(--accent)" />
    </svg>
  );
}

/**
 * Вариант 2 — Tile «DK»
 * App-icon: скруглённый квадрат с акцентным фоном, инициалы вывернуты белым.
 */
export function LogoTile({ className, title = TITLE }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label={title} className={className}>
      <rect width="48" height="48" rx="14" fill="var(--accent)" />
      <text
        x="24"
        y="25"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-manrope), system-ui, sans-serif"
        fontSize="22"
        fontWeight={700}
        letterSpacing="-0.01em"
        fill="#ffffff"
      >
        DK
      </text>
    </svg>
  );
}

/**
 * Вариант 3 — Seal
 * Тонкое кольцо-печать с инициалами; «K» акцентный. Премиальный минимализм.
 */
export function LogoSeal({ className, title = TITLE }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label={title} className={className}>
      <circle
        cx="24"
        cy="24"
        r="22.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text
        x="24"
        y="25"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-manrope), system-ui, sans-serif"
        fontSize="19"
        fontWeight={600}
        letterSpacing="0.02em"
      >
        <tspan fill="currentColor">D</tspan>
        <tspan fill="var(--accent)">K</tspan>
      </text>
    </svg>
  );
}

/**
 * Вариант 4 — Bold monogram
 * Плотная геометрика (Manrope 800). Цвета букв настраиваются через пропсы
 * dColor / kColor (по умолчанию «D» foreground, «K» акцент).
 */
type BoldProps = LogoProps & { dColor?: string; kColor?: string };

export function LogoBold({
  className,
  title = TITLE,
  dColor = "currentColor",
  kColor = "var(--accent)",
}: BoldProps) {
  return (
    <svg viewBox="0 0 56 40" role="img" aria-label={title} className={className}>
      <text
        x="0"
        y="31"
        fontFamily="var(--font-manrope), system-ui, sans-serif"
        fontSize="40"
        fontWeight={800}
        letterSpacing="-0.05em"
      >
        <tspan fill={dColor}>D</tspan>
        <tspan fill={kColor}>K</tspan>
      </text>
    </svg>
  );
}

/**
 * Вариант 5 — Abstract bloom
 * Абстрактный символ: непрерывная линия «D», переходящая в луч «K» —
 * метафора роста/трансформации. Подходит коуч-психологии.
 */
export function LogoBloom({ className, title = TITLE }: LogoProps) {
  return (
    <svg
      viewBox="0 0 52 44"
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      {/* D — дуга */}
      <path
        d="M10 6v32M10 6c12 0 19 6 19 16s-7 16-19 16"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* K — луч, вырастающий из дуги */}
      <path
        d="M30 22c8-2 12-8 14-16M30 22c7 3 10 9 11 17"
        stroke="var(--accent)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="44" cy="6" r="3" fill="var(--accent)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Доп. концепции в палитре «золото (D) + navy (K)»
 * GOLD = var(--accent-soft), NAVY = var(--foreground)
 * ───────────────────────────────────────────────────────────── */

const GOLD = "var(--accent-soft)";
const NAVY = "var(--foreground)";
const MANROPE = "var(--font-manrope), system-ui, sans-serif";

/** A — Монограмма с золотой точкой */
export function LogoDot({ className, title = TITLE }: LogoProps) {
  return (
    <svg viewBox="0 0 70 40" role="img" aria-label={title} className={className}>
      <text x="0" y="31" fontFamily={MANROPE} fontSize="40" fontWeight={800} letterSpacing="-0.05em">
        <tspan fill={GOLD}>D</tspan>
        <tspan fill={NAVY}>K</tspan>
      </text>
      <circle cx="61" cy="28" r="4" fill={GOLD} />
    </svg>
  );
}

/** B — Монограмма с золотой подчёркивающей линией */
export function LogoUnderline({ className, title = TITLE }: LogoProps) {
  return (
    <svg viewBox="0 0 58 46" role="img" aria-label={title} className={className}>
      <text x="0" y="30" fontFamily={MANROPE} fontSize="38" fontWeight={800} letterSpacing="-0.05em">
        <tspan fill={GOLD}>D</tspan>
        <tspan fill={NAVY}>K</tspan>
      </text>
      <rect x="0" y="39" width="54" height="3.4" rx="1.7" fill={GOLD} />
    </svg>
  );
}

/** C — Монограмма в золотой рамке */
export function LogoFrame({ className, title = TITLE }: LogoProps) {
  return (
    <svg viewBox="0 0 66 46" role="img" aria-label={title} className={className}>
      <rect x="1.2" y="1.2" width="63.6" height="43.6" rx="11" fill="none" stroke={GOLD} strokeWidth="2" />
      <text x="33" y="24" textAnchor="middle" dominantBaseline="central" fontFamily={MANROPE} fontSize="20" fontWeight={800} letterSpacing="-0.03em">
        <tspan fill={NAVY}>D</tspan>
        <tspan fill={GOLD}>K</tspan>
      </text>
    </svg>
  );
}

/** D — Плитка navy с золотыми инициалами */
export function LogoTileNavy({ className, title = TITLE }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label={title} className={className}>
      <rect width="48" height="48" rx="14" fill={NAVY} />
      <text x="24" y="25" textAnchor="middle" dominantBaseline="central" fontFamily={MANROPE} fontSize="21" fontWeight={700} letterSpacing="-0.01em" fill={GOLD}>
        DK
      </text>
    </svg>
  );
}

/** E — Плитка золотая с navy-инициалами */
export function LogoTileGold({ className, title = TITLE }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label={title} className={className}>
      <rect width="48" height="48" rx="14" fill={GOLD} />
      <text x="24" y="25" textAnchor="middle" dominantBaseline="central" fontFamily={MANROPE} fontSize="21" fontWeight={700} letterSpacing="-0.01em" fill={NAVY}>
        DK
      </text>
    </svg>
  );
}

/** F — Печать: золотое кольцо, navy/gold инициалы */
export function LogoSealGold({ className, title = TITLE }: LogoProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label={title} className={className}>
      <circle cx="24" cy="24" r="22.25" fill="none" stroke={GOLD} strokeWidth="1.5" />
      <text x="24" y="25" textAnchor="middle" dominantBaseline="central" fontFamily={MANROPE} fontSize="19" fontWeight={600} letterSpacing="0.01em">
        <tspan fill={GOLD}>D</tspan>
        <tspan fill={NAVY}>K</tspan>
      </text>
    </svg>
  );
}

/** G — Локап: монограмма + имя в разрядку */
export function LogoLockup({ className, title = TITLE }: LogoProps) {
  return (
    <svg viewBox="0 0 168 44" role="img" aria-label={title} className={className}>
      <text x="0" y="33" fontFamily={MANROPE} fontSize="38" fontWeight={800} letterSpacing="-0.05em">
        <tspan fill={GOLD}>D</tspan>
        <tspan fill={NAVY}>K</tspan>
      </text>
      <rect x="62" y="9" width="2" height="26" rx="1" fill={GOLD} />
      <text x="76" y="19" fontFamily={MANROPE} fontSize="11" fontWeight={700} letterSpacing="0.28em" fill={NAVY}>
        DARIA
      </text>
      <text x="76" y="35" fontFamily={MANROPE} fontSize="11" fontWeight={700} letterSpacing="0.28em" fill={NAVY}>
        KARPUK
      </text>
    </svg>
  );
}

/** H — Монограмма с золотой засечкой-чертой над буквами */
export function LogoBar({ className, title = TITLE }: LogoProps) {
  return (
    <svg viewBox="0 0 58 48" role="img" aria-label={title} className={className}>
      <rect x="0" y="3" width="26" height="3.4" rx="1.7" fill={GOLD} />
      <text x="0" y="40" fontFamily={MANROPE} fontSize="38" fontWeight={800} letterSpacing="-0.05em">
        <tspan fill={NAVY}>D</tspan>
        <tspan fill={GOLD}>K</tspan>
      </text>
    </svg>
  );
}
