import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, readToken } from "@/lib/auth/token";

/**
 * Оптимистичная защита админки.
 *
 * В Next 16 middleware называется `proxy` — это тот же файл в корне
 * проекта, с тем же `config.matcher`.
 *
 * Здесь именно оптимистичная проверка, и только она: документация прямо
 * предупреждает, что proxy не годится как единственный механизм
 * авторизации. Настоящая граница — `requireAdmin()` внутри страницы
 * админки и каждого Server Action, меняющего данные. Задача этого
 * файла скромнее: не показывать форму редактирования тому, у кого куки
 * нет вовсе, и не гонять его через рендер страницы ради редиректа.
 */
export async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await readToken(token);

  if (session) return NextResponse.next();

  const login = new URL("/login", request.url);
  /* Куда человек шёл — чтобы после входа вернуть его туда, а не на
     корень админки. Только путь: полный URL в параметре — это открытый
     редирект, которым уводят на чужой домен. */
  login.searchParams.set("next", request.nextUrl.pathname);

  return NextResponse.redirect(login);
}

export const config = {
  matcher: "/admin/:path*",
};
