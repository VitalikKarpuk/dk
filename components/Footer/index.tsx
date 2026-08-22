import { LogoLockup } from "../Logo/variants";
import { Button } from "@/components/ui";
import { CONTAINER, GUTTER, TYPE } from "@/lib/design";
import {
  AUTHOR_BLURB,
  AUTHOR_COMPANY,
  AUTHOR_TAX_ID,
  COPYRIGHT_YEARS,
  INSTAGRAM_HANDLE,
  LEGAL_NOTE,
  PROGRAM_LINKS,
  RULES_LINK,
  SITE_CREDIT,
  SOCIAL_LINKS,
} from "@/lib/site";

type FooterLink = { href: string; label: string };

/**
 * Ширина колонок под число ссылочных столбцов. Классы перечислены
 * литералами: Tailwind собирает CSS по тексту исходника, и класс,
 * склеенный в рантайме, в сборку не попадёт.
 */
const COLUMN_GRID = [
  "",
  "lg:grid-cols-[1.5fr_1fr]",
  "lg:grid-cols-[1.5fr_1fr_1fr]",
  "lg:grid-cols-[1.5fr_1fr_1fr_1fr]",
] as const;

/**
 * Подвал сайта — один на все страницы.
 *
 * Их было два: короткий на главной и подстраницах (логотип, две иконки,
 * копирайт) и трёхполосный на /leader (CTA, карта ссылок, правовая
 * полоса) — со своей колонкой `max-w-6xl`, своими отступами и заголовками
 * колонок моноширинным шрифтом, которого больше нигде на сайте нет.
 * Внизу страницы разница читалась особенно грубо: сайт заканчивался
 * по-разному в зависимости от того, куда посетитель зашёл.
 *
 * Здесь один каркас: полоса CTA (по желанию), карта ссылок с колонкой
 * бренда, правовая полоса. Страница добавляет к нему свои колонки и свой
 * призыв — но не свою вёрстку.
 */
export default function Footer({
  cta,
  columns = [],
}: {
  /** Последний призыв над картой ссылок. */
  cta?: { title: string; note?: string; href: string; label: string };
  /** Колонки ссылок рядом с брендом: разделы страницы, материалы. */
  columns?: { heading: string; links: FooterLink[] }[];
}) {
  /* Программы стоят в подвале каждой страницы — как и в шапке. Со дна
     длинной страницы иначе не выбраться никуда, кроме главной. */
  const allColumns = [
    { heading: "Программы", links: [...PROGRAM_LINKS] },
    ...columns,
  ];

  return (
    <footer className="border-t border-surface-strong bg-surface-wash">
      {cta && (
        <div className={`${CONTAINER} ${GUTTER} py-12 md:py-14`}>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p
                className="text-foreground"
                style={TYPE.subsection}
              >
                {cta.title}
              </p>
              {cta.note && (
                <p className="mt-2 text-sm text-muted">{cta.note}</p>
              )}
            </div>
            <Button href={cta.href} size="lg" className="shrink-0">
              {cta.label}
            </Button>
          </div>
        </div>
      )}

      <div className={cta ? "border-t border-surface-strong" : ""}>
        <div
          className={`${CONTAINER} ${GUTTER} grid gap-10 py-14 sm:grid-cols-2 lg:gap-12 ${
            COLUMN_GRID[Math.min(allColumns.length, COLUMN_GRID.length - 1)]
          }`}
        >
          <div>
            <LogoLockup className="h-9 w-auto text-foreground" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {AUTHOR_BLURB}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map(({ kind, href, handle }) => (
                <li key={kind}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    /* Текст `ink-strong`, а не `muted`: подложка
                       `foreground/[0.03]` в светлой теме затемняет фон, и
                       приглушённый текст на ней давал 4.49:1 — на волос
                       ниже AA. */
                    className="press group/soc inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-surface-strong bg-foreground/[0.03] px-4 py-2 text-sm text-ink-strong transition-all duration-300 ease-brand hover:border-accent/30 hover:bg-foreground/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <SocialIcon kind={kind} />
                    <span className="sr-only">{kind}: </span>
                    {handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {allColumns.map(({ heading, links }) => (
            <nav key={heading} aria-label={heading}>
              {/* Заголовок колонки — тот же надзаголовок, что и в секциях:
                  разрядка в капитель. На /leader он был моноширинным —
                  четвёртой гарнитурой, не встречающейся больше нигде. */}
              <p className="text-foreground" style={TYPE.eyebrow}>
                {heading}
              </p>
              <ul className="mt-2">
                {links.map(({ href, label }) => {
                  const external = !href.startsWith("/") && !href.startsWith("#");
                  return (
                    <li key={href}>
                      <a
                        href={href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        /* `py-3` добирает зону нажатия до 44px по WCAG 2.5.8:
                           сама строка занимает 20. `-mx-1.5 px-1.5` добирает
                           горизонталь, а отрицательный margin гасит padding,
                           чтобы текст остался по левому краю колонки. */
                        className="press -mx-1.5 inline-flex items-center gap-1.5 rounded px-1.5 py-3 text-sm text-muted transition-all duration-300 ease-brand hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        {label}
                        {external && (
                          <span aria-hidden className="opacity-40">
                            ↗
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-surface-strong">
        <div
          className={`${CONTAINER} ${GUTTER} flex flex-col gap-6 py-8 md:flex-row md:items-start md:justify-between`}
        >
          {/* Без прозрачности: 12px приглушённого текста в 80% давали на
              тёмной теме 4.28:1 — ниже AA. Иерархию держит кегль. */}
          <div className="space-y-2 text-xs leading-relaxed text-muted">
            <p>
              © {COPYRIGHT_YEARS}{" "}
              <span className="font-medium text-accent">{INSTAGRAM_HANDLE}</span>{" "}
              · Все права защищены
            </p>
            <p>
              {AUTHOR_COMPANY} ·{" "}
              <span className="tabular-nums">{AUTHOR_TAX_ID}</span>
            </p>
            <p className="max-w-2xl">{LEGAL_NOTE}</p>
            <p>
              {/* Ссылками подвал ходит обычным `<a>` — как и колонки выше;
                  смешивать в одном файле два способа перехода хуже, чем
                  дать документу полную перезагрузку. */}
              <a
                href={RULES_LINK.href}
                /* `py-3`, как у ссылок в колонках выше: строка занимает 20px,
                   и вертикаль добирается до 44 по WCAG 2.5.8. Ссылка стоит
                   отдельным абзацем, поэтому послабление для ссылок внутри
                   текста на неё не распространяется. */
                className="press -mx-1.5 inline-flex items-center rounded px-1.5 py-3 underline decoration-current/40 underline-offset-4 transition-all duration-300 ease-brand hover:text-foreground hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {RULES_LINK.label}
              </a>
            </p>
            {/* Ниже правовой полосы, а не рядом с логотипом: строка
                обращена к читателю, а не к владельцу сайта, и в блоке
                реквизитов не должна спорить с ними за внимание. Кегль и
                цвет — те же, что у оговорки выше. */}
            <p>
              {SITE_CREDIT.note}{" "}
              {SITE_CREDIT.contacts.map(({ label, href }, i) => (
                <span key={label}>
                  {/* «или» между контактами, а не запятая: выбор из двух,
                      а не перечисление. Разделитель внутри `<span>` с
                      ссылкой — иначе он оторвался бы от неё переносом. */}
                  {i > 0 && " или "}
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press -mx-1.5 inline-flex items-center gap-1.5 rounded px-1.5 py-2 underline decoration-current/40 underline-offset-4 transition-all duration-300 ease-brand hover:text-foreground hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {label}
                    <span aria-hidden className="opacity-40">
                      ↗
                    </span>
                  </a>
                </span>
              ))}
            </p>
          </div>

          <a
            href="#top"
            className="press inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start rounded-full border border-surface-strong px-4 py-2 text-muted transition-all duration-300 ease-brand hover:bg-foreground/[0.05] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={TYPE.eyebrow}
          >
            <span aria-hidden>↑</span>
            Наверх
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ kind }: { kind: (typeof SOCIAL_LINKS)[number]["kind"] }) {
  if (kind === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.6 4.6 12 4.6 12 4.6s-7.6 0-9.4.5A3 3 0 0 0 .5 7.2C0 9 0 12 0 12s0 3 .5 4.8a3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
