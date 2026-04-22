export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#D6D0C0] bg-[#F2EFE9]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-12">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#141416] font-[family-name:var(--font-display)] text-sm font-bold text-white">
            S
          </span>
          <div>
            <p className="font-[family-name:var(--font-display)] text-base font-semibold text-[#141416]">
              Студия Ковалёва
            </p>
            <p className="text-xs text-[#78746D]">
              Креативная студия · Москва / Берлин
            </p>
          </div>
        </div>

        <nav
          aria-label="Дополнительно"
          className="flex flex-wrap items-center gap-8 text-sm text-[#78746D]"
        >
          <a
            href="#work"
            className="transition-colors duration-300 hover:text-[#0A62D0]"
          >
            Проекты
          </a>
          <a
            href="#contact"
            className="transition-colors duration-300 hover:text-[#0A62D0]"
          >
            Связаться
          </a>
          <a
            href="#instagram"
            className="transition-colors duration-300 hover:text-[#0A62D0]"
          >
            Instagram
          </a>
        </nav>

        <p className="text-xs text-[#78746D]">
          © {year} Студия Ковалёва. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
