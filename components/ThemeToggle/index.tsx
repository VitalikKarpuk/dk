"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

/** Один ключ на весь сайт — им же оперирует скрипт в `app/layout.tsx`. */
export const THEME_KEY = "dk-theme";

/**
 * Скрипт, который выставляет тему до первой отрисовки.
 *
 * Вставляется в `<head>` синхронно и специально не вынесен в модуль:
 * любой отложенный скрипт отработал бы уже после того, как браузер
 * покажет светлый фон, и при выбранной тёмной теме страница мигала бы
 * белым. Здесь он успевает проставить атрибут раньше первого кадра.
 *
 * Системную настройку не читаем сознательно: по умолчанию сайт светлый,
 * тёмная — осознанный выбор посетителя, и он запоминается.
 */
export const themeInitScript = `
try {
  var t = localStorage.getItem(${JSON.stringify(THEME_KEY)});
  if (t === "dark") document.documentElement.setAttribute("data-theme", "dark");
} catch (e) {}
`.trim();

/**
 * Источник правды о теме — сам атрибут на `<html>`, а не React-состояние.
 * Его же ставит скрипт в `<head>` до гидрации, поэтому дублировать значение
 * в state значило бы держать две правды и синхронизировать их эффектом.
 * Компоненты подписываются на изменения через `useSyncExternalStore`.
 */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/** На сервере темы нет — до гидрации рисуем пустую кнопку тех же размеров. */
function getServerSnapshot(): Theme | null {
  return null;
}

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* приватный режим — тема просто не переживёт перезагрузку */
  }
  listeners.forEach((cb) => cb());
}

/**
 * Переключатель темы. Иконка показывает, что произойдёт по нажатию,
 * а не текущее состояние: так понятнее, чем зеркальный вариант.
 *
 * Кружок 36px, а под пальцем — 44px, как `TOUCH_MIN` у кнопки и зона
 * нажатия у пунктов меню. Условие по типу указателя, а не по ширине:
 * телефон боком проходит порог `md`. Без этого переключатель был
 * единственным элементом шапки меньше 44px — и рядом с кнопкой меню
 * это было видно глазом.
 */
export default function ThemeToggle({
  className = "",
  withLabel = false,
}: {
  className?: string;
  /**
   * Подписать иконку словами. Нужно в выезжающем меню: там переключатель
   * стоит в списке текстовых строк, и одинокий кружок читался бы случайным
   * значком. В полосе шапки подписи нет — там он стоит среди других
   * кружков, и место наперечёт.
   */
  withLabel?: boolean;
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const name = next === "dark" ? "Тёмная тема" : "Светлая тема";

  /* Кружок 36px, а под пальцем — 44px. С подписью кнопка становится
     строкой: те же 44px в высоту, но по ширине — по тексту. */
  const shape = withLabel
    ? "h-11 gap-2.5 rounded-full px-4 text-sm"
    : "h-9 w-9 justify-center [@media(pointer:coarse)]:h-11 [@media(pointer:coarse)]:w-11 rounded-full";

  return (
    <button
      type="button"
      onClick={() => apply(next)}
      className={`press inline-flex shrink-0 cursor-pointer items-center border border-surface-strong text-foreground transition-all duration-300 ease-brand hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${shape} ${className}`}
      /* С подписью имя кнопки — сама подпись: `aria-label` перебил бы её,
         и произнесённое вслух «включить тёмную тему» не совпало бы с
         написанным (WCAG 2.5.3 «Label in Name»). */
      aria-label={
        withLabel
          ? undefined
          : next === "dark"
            ? "Включить тёмную тему"
            : "Включить светлую тему"
      }
      title={name}
    >
      {theme === null ? null : theme === "dark" ? <SunIcon /> : <MoonIcon />}
      {withLabel && <span>{theme === null ? "" : name}</span>}
    </button>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M4.8 12H2.6M18.6 5.4l-1.6 1.6M7 17l-1.6 1.6M18.6 18.6 17 17M7 7 5.4 5.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
