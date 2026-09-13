import { jwtVerify, SignJWT } from "jose";

/**
 * Подпись и разбор токена сессии — без обращения к кукам.
 *
 * Вынесено из `session.ts` ради `proxy.ts`: тот живёт на edge-рантайме,
 * и `next/headers` с `server-only` ему не годятся. `jose` на edge
 * работает, поэтому проверка подписи общая для обоих мест, а способ
 * добыть токен у каждого свой.
 */

export const SESSION_COOKIE = "dk_admin";

/** Неделя. Дольше держать сессию для правки цен незачем. */
export const MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

export type SessionPayload = {
  /** Логин администратора. Больше в токен класть нечего. */
  sub: string;
};

function secretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    /* Падаем громко и на входе, а не молча выпускаем всех желающих:
       без ключа подпись куки не проверить, и админка оказалась бы
       открытой. Ключ генерится `openssl rand -base64 32`. */
    throw new Error(
      "SESSION_SECRET не задан или короче 32 символов. Сгенерируйте: openssl rand -base64 32",
    );
  }

  return new TextEncoder().encode(secret);
}

export async function signToken(login: string, expiresAt: Date): Promise<string> {
  return new SignJWT({ sub: login })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(secretKey());
}

/** Разбор токена. `null` — подписи нет, она чужая или срок вышел. */
export async function readToken(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    return typeof payload.sub === "string" ? { sub: payload.sub } : null;
  } catch {
    return null;
  }
}
