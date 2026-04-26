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
            aria-label="Контакты и формы"
            className="flex flex-wrap items-center gap-8 text-sm text-muted"
          >
            <a
              href="https://www.instagram.com/daria_karpuk.psy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center transition-colors duration-300 hover:text-accent"
            >
              Instagram
            </a>
            <a
              href="https://docs.google.com/forms/d/1IGPKJW1L88uJpZK8hkIiJwrn3VvRQv60zWTKneoW9aM/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center transition-colors duration-300 hover:text-accent"
            >
              Анкета
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
