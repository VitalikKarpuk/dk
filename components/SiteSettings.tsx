"use client";

import { createContext, useContext } from "react";

/**
 * Общесайтовые значения из базы — те, что стоят в шапке и подвале
 * каждой страницы: годы в копирайте и адрес анкеты на диагностику.
 *
 * Через контекст из корневого layout, а не пропсами: подвал и секция
 * диагностики оказываются внутри клиентской границы (на /leader подвал
 * вложен в клиентскую `LeaderFooter`), поэтому сами читать базу они не
 * могут, а протаскивать два поля через пять страниц ради этого — цена
 * выше пользы.
 *
 * Здесь только то, что действительно общее. Реквизиты, соцсети и меню
 * остались константами в `lib/site.ts`: они не меняются от потока к
 * потоку, и их правка — это правка вёрстки рядом.
 */
export type SiteSettings = {
  /** «2020–2026». */
  copyrightYears: string;
  /** Анкета, куда ведёт кнопка «Записаться». */
  diagnosticFormUrl: string;
};

const SiteSettingsContext = createContext<SiteSettings | null>(null);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>
  );
}

/**
 * Значения для вёрстки.
 *
 * В отличие от `useCourse`, отсутствие провайдера здесь не бросает
 * исключение: подвал стоит на каждой странице, включая служебные
 * `/login` и `/admin`, и валить их из-за копирайта незачем. Запасные
 * значения — те же, что лежат в `DEFAULTS`.
 */
export function useSiteSettings(): SiteSettings {
  return (
    useContext(SiteSettingsContext) ?? {
      copyrightYears: "2020–2026",
      diagnosticFormUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSeifCxZg3TOYUceGHvoYSTDsk3ItvOZG5Ll-TJWFEEQynBu-w/viewform",
    }
  );
}
