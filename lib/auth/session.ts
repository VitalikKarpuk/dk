import "server-only";
import { cookies } from "next/headers";
import {
  MAX_AGE_SECONDS,
  SESSION_COOKIE,
  signToken,
  readToken,
  type SessionPayload,
} from "./token";

/**
 * Сессия администратора в куке.
 *
 * Редактор один — сама Дарья, — поэтому таблицы пользователей нет:
 * логин и bcrypt-хэш пароля лежат в переменных окружения Vercel.
 * Таблица ради одной строки означала бы ещё и страницу управления
 * доступами, восстановление пароля и приглашения — весь тот код, у
 * которого здесь нет второго пользователя, чтобы окупиться.
 *
 * Сессия stateless: подписанный JWT в httpOnly-куке. Хранить сессии в
 * базе смысла нет по той же причине — отзывать нечего.
 */

export { SESSION_COOKIE } from "./token";
export type { SessionPayload } from "./token";

export async function createSession(login: string): Promise<void> {
  const expiresAt = new Date(Date.now() + MAX_AGE_SECONDS * 1000);
  const token = await signToken(login, expiresAt);

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    /* На проде только по https. В localhost-разработке `secure` не даёт
       браузеру сохранить куку, и войти в админку локально нельзя. */
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function deleteSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/**
 * Проверка доступа для страниц и Server Actions.
 *
 * Именно здесь настоящая граница, а не в `proxy.ts`. Proxy в Next 16
 * годится только для оптимистичного редиректа: он видит куку, но по
 * документации не предназначен для авторизации, и полагаться на него
 * как на единственную проверку нельзя. Поэтому каждое действие,
 * меняющее данные, зовёт `requireAdmin()` у себя.
 */
export async function getAdmin(): Promise<SessionPayload | null> {
  const store = await cookies();
  return readToken(store.get(SESSION_COOKIE)?.value);
}

export async function requireAdmin(): Promise<SessionPayload> {
  const admin = await getAdmin();

  if (!admin) {
    throw new Error("Нет доступа: войдите в админку заново.");
  }

  return admin;
}
