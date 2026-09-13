import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth/session";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Вход",
  /* Служебная страница: в поиске ей делать нечего. */
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  /* Уже вошёл — незачем показывать форму: человек нажал «Войти» в
     закладках, а не разлогинился. */
  if (await getAdmin()) redirect("/admin");

  const { next } = await searchParams;
  const target = next?.startsWith("/") && !next.startsWith("//") ? next : "/admin";

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Редактирование сайта
        </h1>
        <p className="mt-2 mb-8 text-sm text-muted">
          Даты, цены и цифры программ. Тексты и картинки правятся в коде.
        </p>

        <LoginForm next={target} />
      </div>
    </main>
  );
}
