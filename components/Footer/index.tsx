export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#C9D1DC] bg-[#F4F6F9]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-12">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#151922] font-[family-name:var(--font-display)] text-sm font-bold text-white">
            S
          </span>
          <div>
            <p className="font-[family-name:var(--font-display)] text-base font-semibold text-[#151922]">
              Студия Ковалёва
            </p>
            <p className="text-xs text-[#6B7280]">
              Креативная студия · Москва / Берлин
            </p>
          </div>
        </div>

        <nav
          aria-label="Дополнительно"
          className="flex flex-wrap items-center gap-8 text-sm text-[#6B7280]"
        >
          <a
            href="#work"
            className="transition-colors duration-300 hover:text-[#0A62D0]"
          >
            Проекты
          </a>
          <a
            href="https://docs.google.com/forms/d/1IGPKJW1L88uJpZK8hkIiJwrn3VvRQv60zWTKneoW9aM/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-[#0A62D0]"
          >
            Анкета
          </a>
          <a
            href="#instagram"
            className="transition-colors duration-300 hover:text-[#0A62D0]"
          >
            Instagram
          </a>
        </nav>

        <p className="text-xs text-[#6B7280]">
          © {year} Студия Ковалёва. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
