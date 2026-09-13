"use client";

import { useFormStatus } from "react-dom";

/**
 * Общие примитивы форм админки.
 *
 * Своя мелкая система вместо компонентов из `components/ui`: те
 * настроены на лендинг — крупный кегль, анимации появления, брендовые
 * тени. В форме на двадцать полей это мешает, здесь нужна плотность.
 */

const INPUT =
  "w-full rounded-lg border border-surface-strong bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      {children}
      {hint ? <span className="text-xs text-muted opacity-75">{hint}</span> : null}
    </label>
  );
}

export function TextInput({
  name,
  defaultValue,
  type = "text",
  placeholder,
  step,
}: {
  name: string;
  defaultValue?: string | number | null;
  type?: "text" | "number" | "date" | "url";
  placeholder?: string;
  step?: string;
}) {
  return (
    <input
      name={name}
      type={type}
      step={step}
      placeholder={placeholder}
      /* `?? ""` осознанно: `defaultValue={null}` делает поле
         неуправляемым в одном рендере и управляемым в другом, и React
         ругается в консоли на каждое пустое значение из базы. */
      defaultValue={defaultValue ?? ""}
      className={INPUT}
    />
  );
}

export function Select({
  name,
  defaultValue,
  options,
}: {
  name: string;
  defaultValue: string;
  options: { value: string; label: string }[];
}) {
  return (
    <select name={name} defaultValue={defaultValue} className={INPUT}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function Checkbox({
  name,
  label,
  defaultChecked,
  hint,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
  hint?: string;
}) {
  return (
    <label className="flex items-start gap-2.5 py-1">
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-0.5 h-4 w-4 accent-[var(--accent-fill)]"
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-sm text-foreground">{label}</span>
        {hint ? <span className="text-xs text-muted">{hint}</span> : null}
      </span>
    </label>
  );
}

/**
 * Кнопка сохранения вместе со строкой результата.
 *
 * Кнопка отдельным компонентом, потому что `useFormStatus` читает
 * ближайшую форму сверху: вызванный в самой форме, хук всегда вернул бы
 * `pending: false`.
 */
export function SubmitBar({ state }: { state: { ok?: string; error?: string } }) {
  const { pending } = useFormStatus();

  return (
    <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-surface-strong pt-5">
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-accent-fill px-5 py-2.5 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Сохраняем…" : "Сохранить"}
      </button>

      {state.error ? (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      ) : null}
      {state.ok && !pending ? (
        <p role="status" className="text-sm text-emerald-600 dark:text-emerald-400">
          {state.ok}
        </p>
      ) : null}
    </div>
  );
}

export function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">{children}</div>;
}
