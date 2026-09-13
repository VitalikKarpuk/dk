import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth/session";
import { hasDatabase } from "@/lib/db/client";
import { getContentForAdmin, type ProgramSlug } from "@/lib/content";
import { logout } from "../login/actions";
import { ProgramForm, type FieldKey } from "./ProgramForm";
import { PackagesForm } from "./PackagesForm";
import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = {
  title: "Редактирование сайта",
  robots: { index: false, follow: false },
};

/**
 * Админка всегда рендерится на запрос: страница показывает содержимое
 * базы, и закэшированная версия показывала бы прошлые значения сразу
 * после сохранения.
 */
export const dynamic = "force-dynamic";

/**
 * Какие поля живут на каком лендинге.
 *
 * Список ровно по инвентарю того, что сейчас нарисовано на странице.
 * «ПРОРЫВ» знает про места и годы опыта, но не про встречи; «Базовые
 * законы» пока показывают только срок и дату старта. Поле, которого
 * нет в этом списке, в базе останется, но в форму не попадёт — иначе
 * админ правил бы число, которое никуда не выводится.
 */
const FIELDS: Record<ProgramSlug, FieldKey[]> = {
  leader: ["stream", "duration", "meetings", "graduates", "discount", "form"],
  proryv: ["stream", "duration", "seats", "experience", "price", "form"],
  "basic-laws": ["duration"],
};

const ORDER: ProgramSlug[] = ["leader", "proryv", "basic-laws"];

const PAGE_PATH: Record<ProgramSlug, string> = {
  leader: "/leader",
  proryv: "/proryv",
  "basic-laws": "/basic-laws",
};

export default async function AdminPage() {
  /* Настоящая проверка доступа. `proxy.ts` до сюда обычно не пускает,
     но полагаться на него одного нельзя — см. комментарий в нём. */
  const admin = await getAdmin();
  if (!admin) redirect("/login?next=/admin");

  const content = await getContentForAdmin();

  return (
    <main className="min-h-screen bg-background px-5 py-10 md:px-8 md:py-14">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-foreground">
              Редактирование сайта
            </h1>
            <p className="mt-1.5 text-sm text-muted">
              Даты, сроки, цифры и цены. Тексты, фото и порядок секций правятся в коде.
            </p>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-lg border border-surface-strong px-3.5 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              Выйти
            </button>
          </form>
        </header>

        {hasDatabase() ? null : (
          /* Без базы формы бесполезны: сохранение упадёт, а значения
             показаны из кода. Сказать об этом лучше сразу, чем дать
             человеку заполнить двадцать полей и получить ошибку. */
          <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-foreground">
            База не подключена: показаны значения из кода, сохранение не сработает.
            Подключите Postgres в Vercel → Storage и примените{" "}
            <code className="text-xs">lib/db/schema.sql</code>.
          </p>
        )}

        {ORDER.map((slug) => (
          <Block
            key={slug}
            title={content.programs[slug].title}
            href={PAGE_PATH[slug]}
          >
            <ProgramForm program={content.programs[slug]} fields={FIELDS[slug]} />
          </Block>
        ))}

        <Block title="Пакеты консультаций" href="/individual">
          <PackagesForm packages={content.packages} />
        </Block>

        <Block title="Общее для всех страниц">
          <SettingsForm settings={content.settings} />
        </Block>
      </div>
    </main>
  );
}

function Block({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-surface-strong bg-card p-5 md:p-7">
      <div className="mb-5 flex items-baseline gap-3">
        <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-accent hover:underline"
          >
            {href} ↗
          </a>
        ) : null}
      </div>
      {children}
    </section>
  );
}
