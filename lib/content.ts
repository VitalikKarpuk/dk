import "server-only";
import { unstable_cache } from "next/cache";
import { tryQuery } from "./db/client";

/**
 * Контент, который меняется от потока к потоку: номера, даты, сроки,
 * количество мест, скидки и цены.
 *
 * Тексты, иконки и картинки сюда не входят и остаются в коде. Граница
 * ровно эта: в базе лежит то, у чего есть значение, а не формулировка.
 * Длина заголовка карточки — решение вёрстки; «7 мест» — факт, который
 * в следующем потоке станет другим.
 *
 * Каждое поле необязательное, и у всего есть значение из `DEFAULTS` —
 * ровно то, что было зашито в коде до перехода на базу. Сборка и
 * локальная разработка проходят без базы вовсе, а упавший запрос
 * отдаёт прошлые цифры вместо пятисотки (см. `tryQuery`).
 */

export type ProgramSlug = "leader" | "proryv" | "basic-laws";

export type Program = {
  slug: ProgramSlug;
  title: string;
  /** Номер потока: «11-й поток». */
  streamNumber: number | null;
  /** Дата старта, `YYYY-MM-DD`. `null` — ещё не назначена. */
  startDate: string | null;
  /** Что писать вместо даты, пока её нет: «Дата уточняется». */
  startLabel: string | null;
  durationWeeks: number | null;
  /** Мест в группе. */
  seats: number | null;
  individualMeetings: number | null;
  groupMeetings: number | null;
  /** Строкой, а не числом: плюс в «100+» — часть смысла. */
  graduatesCount: string | null;
  yearsExperience: number | null;
  discountPercent: number | null;
  priceOld: number | null;
  priceNew: number | null;
  currency: string;
  /** Показывать ли цену. На /proryv её то прячут, то возвращают. */
  priceVisible: boolean;
  formUrl: string | null;
};

export type Package = {
  id: number;
  title: string;
  priceOld: number | null;
  priceNew: number;
  currency: string;
  note: string | null;
  /** Якорный пакет — рисуется крупной карточкой. */
  highlight: boolean;
  /** Снятый флаг прячет пакет с лендинга, но оставляет его в админке. */
  isActive: boolean;
};

export type SiteContent = {
  programs: Record<ProgramSlug, Program>;
  packages: Package[];
  settings: Record<string, string>;
};

/* ─── Значения по умолчанию ──────────────────────────────────────────
   Снимок того, что было зашито в коде. Не «заглушки»: это рабочие
   значения, с которыми сайт выглядит корректно, если базы нет. */

const DEFAULTS: SiteContent = {
  programs: {
    leader: {
      slug: "leader",
      title: "Я ЛИДЕР",
      streamNumber: 11,
      startDate: "2026-10-08",
      startLabel: null,
      durationWeeks: 7,
      seats: null,
      individualMeetings: 6,
      groupMeetings: 2,
      graduatesCount: "100+",
      yearsExperience: null,
      discountPercent: 40,
      priceOld: null,
      priceNew: null,
      currency: "BYN",
      priceVisible: false,
      formUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSfHR3ux5r_w8wioGZPSX-timJ9i9sAoceCy6CGscDVF9Fklqw/viewform?usp=sharing",
    },
    proryv: {
      slug: "proryv",
      title: "ПРОРЫВ",
      streamNumber: 1,
      startDate: null,
      startLabel: "Старт по мере набора группы",
      durationWeeks: 6,
      seats: 7,
      individualMeetings: null,
      groupMeetings: null,
      graduatesCount: null,
      yearsExperience: 8,
      discountPercent: null,
      priceOld: 350,
      priceNew: 175,
      currency: "USD",
      priceVisible: false,
      formUrl: "https://forms.gle/4iHzX8ZwvCpiS62h8",
    },
    "basic-laws": {
      slug: "basic-laws",
      title: "Базовые законы",
      streamNumber: null,
      startDate: null,
      startLabel: "Дата уточняется",
      durationWeeks: 4,
      seats: null,
      individualMeetings: null,
      groupMeetings: null,
      graduatesCount: null,
      yearsExperience: null,
      discountPercent: null,
      priceOld: null,
      priceNew: null,
      currency: "BYN",
      priceVisible: false,
      formUrl: null,
    },
  },
  packages: [
    {
      id: 1,
      title: "Разовая консультация",
      priceOld: 250,
      priceNew: 190,
      currency: "BYN",
      note: "Полуторачасовая встреча + 7 недель сопровождения в чате",
      highlight: false,
      isActive: true,
    },
    { id: 2, title: "Пакет из 3 встреч", priceOld: 500, priceNew: 450, currency: "BYN", note: null, highlight: false, isActive: true },
    { id: 3, title: "Пакет из 5 встреч", priceOld: 850, priceNew: 700, currency: "BYN", note: null, highlight: true, isActive: true },
    { id: 4, title: "Пакет из 10 встреч", priceOld: 1350, priceNew: 1200, currency: "BYN", note: null, highlight: false, isActive: true },
  ],
  settings: {
    copyright_years: "2020–2026",
    diagnostic_form_url:
      "https://docs.google.com/forms/d/e/1FAIpQLSeifCxZg3TOYUceGHvoYSTDsk3ItvOZG5Ll-TJWFEEQynBu-w/viewform",
    individual_form_url:
      "https://docs.google.com/forms/d/e/1FAIpQLSfRdfLMjzVz8-JkYcIDimeecOXU0Gnlr80m8T5VsfBZZP9u0Q/viewform?usp=publish-editor",
  },
};

/* ─── Чтение ─────────────────────────────────────────────────────────── */

/** Тег кэша. Его же гасит админка после сохранения. */
export const CONTENT_TAG = "site-content";

/* `numeric` Postgres приезжает строкой — иначе на больших числах терялась
   бы точность. Цены у нас в пределах тысяч, так что переводим в number. */
function num(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/* `date` приезжает объектом Date или строкой в зависимости от драйвера.
   Приводим к `YYYY-MM-DD`: дальше по коду дата только форматируется, и
   часовой пояс сервера не должен сдвигать её на день назад. */
function isoDate(value: unknown): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

type ProgramRow = Record<string, unknown>;

function toProgram(row: ProgramRow, fallback: Program): Program {
  return {
    slug: fallback.slug,
    title: (row.title as string) ?? fallback.title,
    streamNumber: num(row.stream_number),
    startDate: isoDate(row.start_date),
    startLabel: (row.start_label as string | null) ?? null,
    durationWeeks: num(row.duration_weeks),
    seats: num(row.seats),
    individualMeetings: num(row.individual_meetings),
    groupMeetings: num(row.group_meetings),
    graduatesCount: (row.graduates_count as string | null) ?? null,
    yearsExperience: num(row.years_experience),
    discountPercent: num(row.discount_percent),
    priceOld: num(row.price_old),
    priceNew: num(row.price_new),
    currency: (row.currency as string) ?? fallback.currency,
    priceVisible: row.price_visible === true,
    formUrl: (row.form_url as string | null) ?? null,
  };
}

async function load(includeHidden = false): Promise<SiteContent> {
  const data = await tryQuery(async (db) => {
    const [programRows, packageRows, settingRows] = await Promise.all([
      db`select * from programs`,
      includeHidden
        ? db`select * from packages order by sort_order, id`
        : db`select * from packages where is_active order by sort_order, id`,
      db`select key, value from settings`,
    ]);
    return { programRows, packageRows, settingRows };
  });

  if (!data) return DEFAULTS;

  const programs = { ...DEFAULTS.programs };
  for (const row of data.programRows as ProgramRow[]) {
    const slug = row.slug as ProgramSlug;
    if (!(slug in programs)) continue; // ряд под маршрут, которого нет
    programs[slug] = toProgram(row, DEFAULTS.programs[slug]);
  }

  const packages = (data.packageRows as ProgramRow[]).map((row) => ({
    id: Number(row.id),
    title: row.title as string,
    priceOld: num(row.price_old),
    priceNew: num(row.price_new) ?? 0,
    currency: (row.currency as string) ?? "BYN",
    note: (row.note as string | null) ?? null,
    highlight: row.highlight === true,
    isActive: row.is_active !== false,
  }));

  const settings = { ...DEFAULTS.settings };
  for (const row of data.settingRows as ProgramRow[]) {
    settings[row.key as string] = row.value as string;
  }

  return {
    programs,
    /* Пустая таблица — не повод показать страницу без цен: скорее всего
       миграция прошла, а сид нет. */
    packages: packages.length > 0 ? packages : DEFAULTS.packages,
    settings,
  };
}

/**
 * Контент сайта. Кэш без срока жизни: значения меняются только из
 * админки, и она гасит тег сама. Страницы остаются статикой — посетитель
 * в базу не ходит.
 */
export const getContent = unstable_cache(load, ["site-content"], {
  tags: [CONTENT_TAG],
  revalidate: false,
});

/** Контент одной программы — самый частый вызов на лендинге. */
export async function getProgram(slug: ProgramSlug): Promise<Program> {
  const content = await getContent();
  return content.programs[slug];
}

/**
 * То же самое для админки — мимо кэша и вместе со спрятанными пакетами.
 *
 * Кэш здесь был бы вреден дважды: форма показывала бы не то, что лежит в
 * базе, а спрятанный пакет пропал бы из неё навсегда — лендинг его не
 * запрашивает, и вернуть галочку было бы негде.
 */
export async function getContentForAdmin(): Promise<SiteContent> {
  return load(true);
}
