export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-strong bg-background">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 py-14 md:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground font-[family-name:var(--font-display)] text-sm font-bold text-white">
              Д
            </span>
            <div>
              <p className="font-[family-name:var(--font-display)] text-base font-semibold text-foreground">
                Дарья Карпук
              </p>
              <p className="text-xs text-muted">
                Психолог · Практика 2026
              </p>
            </div>
          </div>

          <nav
            aria-label="Контакты"
            className="flex flex-wrap items-center gap-0.5 text-muted"
          >
            <a
              href="https://www.instagram.com/daria_karpuk.psy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-11 w-11 items-center justify-center transition-colors duration-300 hover:text-accent"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.youtube.com/@daria_karpuk.psy1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="inline-flex h-11 w-11 items-center justify-center transition-colors duration-300 hover:text-accent"
            >
              <YoutubeIcon />
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-surface-strong pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © 2020–{year} darya_karpuk.psy · Все права защищены
          </p>
          <p>
            ИП Карпук Д.В. · УНП{" "}
            <span className="tabular-nums">291787139</span>
          </p>
        </div>

        <p className="max-w-3xl text-xs leading-relaxed text-muted/80">
          Сайт носит рекламно-информационный характер и не является
          интернет-магазином. Указанные цены не являются публичной офертой.
        </p>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
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

function YoutubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.6 4.6 12 4.6 12 4.6s-7.6 0-9.4.5A3 3 0 0 0 .5 7.2C0 9 0 12 0 12s0 3 .5 4.8a3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
    </svg>
  );
}
