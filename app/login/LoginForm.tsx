"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "./actions";

/**
 * Форма входа.
 *
 * Клиентская ровно из-за `useActionState`: ошибка должна появиться под
 * полями, не уводя со страницы и не теряя введённый логин.
 */
export function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />

      <Field label="Логин">
        <input
          name="login"
          type="text"
          autoComplete="username"
          required
          autoFocus
          className={INPUT}
        />
      </Field>

      <Field label="Пароль">
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={INPUT}
        />
      </Field>

      {state.error ? (
        /* `role="alert"` — чтобы скринридер прочёл ошибку сразу, а не
           только когда пользователь доберётся до неё табом. */
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  /* `useFormStatus` читает состояние ближайшей формы сверху — поэтому
     кнопка вынесена в отдельный компонент: внутри `LoginForm` хук
     вернул бы `pending: false` навсегда. */
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 rounded-xl bg-accent-fill px-5 py-3 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {pending ? "Проверяем…" : "Войти"}
    </button>
  );
}

const INPUT =
  "w-full rounded-xl border border-surface-strong bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
      {children}
    </label>
  );
}
