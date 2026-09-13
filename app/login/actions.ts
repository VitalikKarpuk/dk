"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, credentialsProblem } from "@/lib/auth/credentials";
import { createSession, deleteSession } from "@/lib/auth/session";

export type LoginState = { error?: string };

/**
 * Вход в админку.
 *
 * Сообщение об ошибке одно на все случаи — «логин или пароль неверны».
 * Разделять («такого логина нет» / «пароль не тот») здесь нечего: это
 * подсказка тому, кто подбирает, а настоящему владельцу она ничего не
 * добавляет — он знает и то, и другое.
 */
export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  /* Сначала — исправна ли настройка вообще. Иначе поломка окружения
     выглядит как неверный пароль, и чинят не то. */
  const problem = credentialsProblem();
  if (problem) return { error: problem };

  const loginValue = String(formData.get("login") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!loginValue || !password) {
    return { error: "Заполните оба поля." };
  }

  const ok = await verifyCredentials(loginValue, password);
  if (!ok) {
    return { error: "Логин или пароль неверны." };
  }

  await createSession(loginValue);

  /* Куда вернуть человека после входа. Принимаем только путь внутри
     сайта: `https://чужой-сайт` в этом параметре превратил бы форму
     входа в открытый редирект — удобную ссылку для фишинга. */
  const next = String(formData.get("next") ?? "");
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/admin";

  redirect(safeNext);
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
