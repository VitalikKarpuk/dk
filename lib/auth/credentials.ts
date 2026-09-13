import "server-only";
import { compare } from "bcryptjs";

/**
 * Проверка логина и пароля администратора.
 *
 * Отдельно от `session.ts`, потому что `bcryptjs` тянет за собой Node —
 * в `proxy.ts`, который живёт на edge-рантайме, этот модуль не должен
 * попасть даже транзитивно. Туда импортируется только `readToken`.
 */

/**
 * Форма bcrypt-хэша: версия, цена и 53 символа base64-подобного алфавита.
 *
 * Нужна не для красоты. В `.env`-файлах Next разворачивает `$ИМЯ` как
 * ссылку на другую переменную, а хэш начинается с `$2b$12$` — без
 * экранирования от него остаётся хвост после последнего `$`. Пароль
 * тогда верный, а вход отвечает «пароль неверен», и искать причину
 * можно долго: на Vercel те же переменные задаются напрямую и работают.
 *
 * Поэтому обрезанный хэш ловится по форме и объясняется словами.
 */
const BCRYPT_HASH = /^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{53}$/;

/**
 * Что мешает войти, человеческим языком. `null` — всё настроено.
 *
 * Возвращает текст, а не `false`: каждая из этих поломок чинится
 * по-своему, и «доступ не настроен» на все случаи отправляло бы
 * перечитывать документацию целиком.
 */
export function credentialsProblem(): string | null {
  const login = process.env.ADMIN_LOGIN;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const secret = process.env.SESSION_SECRET;

  if (!login || !hash || !secret) {
    return "Доступ не настроен: задайте ADMIN_LOGIN, ADMIN_PASSWORD_HASH и SESSION_SECRET в переменных окружения.";
  }

  if (!BCRYPT_HASH.test(hash)) {
    return "ADMIN_PASSWORD_HASH не похож на bcrypt-хэш. Если он в .env-файле — экранируйте каждый знак доллара: \\$2b\\$12\\$… Иначе Next подставит вместо них пустые строки.";
  }

  if (secret.length < 32) {
    return "SESSION_SECRET короче 32 символов. Сгенерируйте новый: openssl rand -base64 32";
  }

  return null;
}

/**
 * Сравнение постоянного времени для логина.
 *
 * Обычное `===` на строках выходит на первом же несовпавшем символе, и
 * по времени ответа логин перебирается посимвольно. Пароль от такого
 * защищает сам bcrypt, а логин — нет.
 */
function equalConstantTime(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function verifyCredentials(login: string, password: string): Promise<boolean> {
  const expectedLogin = process.env.ADMIN_LOGIN;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedLogin || !expectedHash) return false;

  /* Хэш сверяем всегда, даже когда логин уже не сошёлся: иначе неверный
     логин отвечает мгновенно, а верный — через сотню миллисекунд bcrypt,
     и по этой разнице логин угадывается без единой попытки пароля. */
  const loginOk = equalConstantTime(login, expectedLogin);
  const passwordOk = await compare(password, expectedHash);

  return loginOk && passwordOk;
}
