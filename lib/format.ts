import type { Program } from "./content";

/**
 * Форматирование значений из базы в строки, которые видит посетитель.
 *
 * Отдельно от `lib/content.ts`: тот помечен `server-only` (в нём ключи
 * от базы), а эти функции нужны и клиентским секциям /leader. Здесь
 * только чистые функции — ни запросов, ни переменных окружения.
 */

const MONTHS_GENITIVE = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
] as const;

/**
 * Дата старта по-русски: `2026-10-08` → «8 октября».
 *
 * Разбираем строку сами, а не через `new Date().toLocaleDateString`:
 * `Date` считает `YYYY-MM-DD` полуночью UTC, и на сервере западнее
 * Гринвича 8 октября превращалось бы в 7-е. Года в строке нет
 * намеренно — на бейдже он лишний, поток всегда ближайший.
 */
export function formatStartDate(iso: string | null): string | null {
  if (!iso) return null;

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;

  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12) return null;

  return `${day} ${MONTHS_GENITIVE[month - 1]}`;
}

/** Дата старта либо подпись-заглушка: «8 октября» / «Дата уточняется». */
export function startLabel(program: Program): string {
  return formatStartDate(program.startDate) ?? program.startLabel ?? "Дата уточняется";
}

/**
 * Строчная первая буква: «Дата уточняется» → «дата уточняется».
 *
 * Подпись из базы набрана с заглавной — она стоит отдельной строкой в
 * карточке «Старт». В бейдже та же подпись идёт после «Старт: », и
 * заглавная посреди фразы читается опечаткой. Дате («8 октября») это
 * ничего не меняет.
 */
export function lowerFirst(value: string): string {
  return value.charAt(0).toLocaleLowerCase("ru") + value.slice(1);
}

const CURRENCY_SUFFIX: Record<string, string> = {
  BYN: " BYN",
  USD: " $",
  EUR: " €",
};

/**
 * Цена с валютой: `190` → «190 BYN».
 *
 * Пробел неразрывный: иначе «190» и «BYN» расходятся по разным строкам
 * в узкой карточке пакета. Дробная часть отбрасывается, когда она
 * нулевая, — «190.00 BYN» на лендинге читается как ошибка вёрстки.
 */
export function formatPrice(value: number | null, currency: string): string | null {
  if (value === null) return null;

  const rounded = Number.isInteger(value) ? String(value) : value.toFixed(2);
  return `${rounded}${CURRENCY_SUFFIX[currency] ?? ` ${currency}`}`;
}

/**
 * Склонение существительного при числе: 1 место, 2 места, 7 мест.
 *
 * Понадобилось ровно там, где число стало редактируемым: раньше «7 мест»
 * было строкой в вёрстке, и падеж был вписан вручную. Теперь админ может
 * поставить 5 или 21, и подпись обязана съехать вместе с числом.
 */
export function plural(count: number, one: string, few: string, many: string): string {
  const mod100 = Math.abs(count) % 100;
  const mod10 = mod100 % 10;

  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

/** «7 недель», «6 недель», «1 неделя». */
export function weeksLabel(weeks: number): string {
  return `${weeks} ${plural(weeks, "неделя", "недели", "недель")}`;
}

/** «7 мест», «1 место», «22 места». */
export function seatsLabel(seats: number): string {
  return `${seats} ${plural(seats, "место", "места", "мест")}`;
}

/** «6 индивидуальных встреч», «2 групповые встречи». */
export function meetingsLabel(count: number, adjective: "индивидуальн" | "группов"): string {
  const ending = plural(count, "ая", "ые", "ых");
  const noun = plural(count, "встреча", "встречи", "встреч");
  return `${count} ${adjective}${ending} ${noun}`;
}
