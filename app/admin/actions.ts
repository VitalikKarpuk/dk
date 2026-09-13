"use server";

import { revalidatePath, updateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { sql } from "@/lib/db/client";
import { CONTENT_TAG, type ProgramSlug } from "@/lib/content";

/**
 * Сохранение контента из админки.
 *
 * Здесь — настоящая проверка доступа. `proxy.ts` до Server Action не
 * доходит: действие вызывается POST-запросом на текущий маршрут, и
 * matcher `/admin/:path*` его прикрывает, но полагаться на это нельзя —
 * документация прямо говорит, что proxy не механизм авторизации.
 * Поэтому `requireAdmin()` стоит первой строкой в каждом действии.
 */

export type SaveState = { ok?: string; error?: string };

/* ─── Разбор полей формы ────────────────────────────────────────────
   Пустое поле — это `null` в базе, а не ноль и не пустая строка:
   «мест не указано» и «мест ноль» на странице выглядят по-разному. */

function optionalText(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value === "" ? null : value;
}

function optionalInt(formData: FormData, key: string, label: string): number | null {
  const value = optionalText(formData, key);
  if (value === null) return null;

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`«${label}»: нужно целое число не меньше нуля.`);
  }
  return parsed;
}

function optionalMoney(formData: FormData, key: string, label: string): number | null {
  const value = optionalText(formData, key);
  if (value === null) return null;

  /* Запятая как разделитель — то, что набирают на русской раскладке. */
  const parsed = Number(value.replace(",", "."));
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`«${label}»: нужна сумма не меньше нуля.`);
  }
  return Math.round(parsed * 100) / 100;
}

function optionalDate(formData: FormData, key: string, label: string): string | null {
  const value = optionalText(formData, key);
  if (value === null) return null;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`«${label}»: дата должна быть в формате ГГГГ-ММ-ДД.`);
  }
  return value;
}

function checkbox(formData: FormData, key: string): boolean {
  /* Невыставленный чекбокс браузер не отправляет вовсе — отсутствие
     ключа и есть «нет». */
  return formData.get(key) !== null;
}

/* ─── Сброс кэша ────────────────────────────────────────────────────── */

/** Какие маршруты показывают данные какой программы. */
const PATHS: Record<ProgramSlug, string[]> = {
  leader: ["/leader"],
  proryv: ["/proryv"],
  "basic-laws": ["/basic-laws"],
};

/**
 * Погасить кэш после записи.
 *
 * Двумя приёмами, и оба нужны. `updateTag` выбрасывает результат запроса
 * к базе из `unstable_cache`; `revalidatePath` заставляет Next пересобрать
 * саму статическую страницу — без него посетитель ещё долго получал бы
 * отрендеренный HTML с прежними цифрами.
 *
 * Именно `updateTag`, а не `revalidateTag`: второй помечает данные
 * устаревшими и отдаёт прошлую версию, пока свежая печётся в фоне. Здесь
 * это ровно тот случай, против которого `updateTag` и сделан, — человек
 * сохранил цену и тут же открывает страницу проверить. Односоставная
 * форма `revalidateTag(tag)` вдобавок объявлена устаревшей.
 */
function refresh(paths: string[]): void {
  updateTag(CONTENT_TAG);
  for (const path of paths) revalidatePath(path);
}

/* ─── Действия ──────────────────────────────────────────────────────── */

export async function saveProgram(
  _state: SaveState,
  formData: FormData,
): Promise<SaveState> {
  await requireAdmin();

  try {
    /* Какую программу правим — скрытым полем формы, а не привязанным
       аргументом: `action.bind(null, slug)` в теле клиентского
       компонента подвешивал ответ на сабмит без JS.

       Безопасности это не убавляет: значение из формы сверяется с
       закрытым списком маршрутов, а не подставляется в запрос как
       есть. Чужой slug — ошибка, а не правка неизвестной строки; да и
       сюда попадают только те, кто уже прошёл `requireAdmin`. */
    const slug = String(formData.get("slug") ?? "");
    if (!(slug in PATHS)) {
      return { error: "Неизвестная программа — обновите страницу админки." };
    }

    const db = sql();

    await db`
      update programs set
        stream_number       = ${optionalInt(formData, "stream_number", "Номер потока")},
        start_date          = ${optionalDate(formData, "start_date", "Дата старта")},
        start_label         = ${optionalText(formData, "start_label")},
        duration_weeks      = ${optionalInt(formData, "duration_weeks", "Длительность")},
        seats               = ${optionalInt(formData, "seats", "Мест в группе")},
        individual_meetings = ${optionalInt(formData, "individual_meetings", "Индивидуальных встреч")},
        group_meetings      = ${optionalInt(formData, "group_meetings", "Групповых встреч")},
        graduates_count     = ${optionalText(formData, "graduates_count")},
        years_experience    = ${optionalInt(formData, "years_experience", "Лет опыта")},
        discount_percent    = ${optionalInt(formData, "discount_percent", "Скидка")},
        price_old           = ${optionalMoney(formData, "price_old", "Старая цена")},
        price_new           = ${optionalMoney(formData, "price_new", "Новая цена")},
        currency            = ${String(formData.get("currency") ?? "BYN")},
        price_visible       = ${checkbox(formData, "price_visible")},
        form_url            = ${optionalText(formData, "form_url")},
        updated_at          = now()
      where slug = ${slug}
    `;

    refresh(PATHS[slug as ProgramSlug]);
    return { ok: "Сохранено. Страница обновится в течение минуты." };
  } catch (error) {
    return { error: message(error) };
  }
}

export async function savePackages(_state: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdmin();

  try {
    const db = sql();

    /* Список пакетов фиксирован: правим цены существующих строк, а не
       пересобираем таблицу. Какие именно строки пришли — говорит скрытое
       поле `ids`, чтобы форма не зависела от порядка полей в FormData. */
    const ids = String(formData.get("ids") ?? "")
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isInteger(value) && value > 0);

    if (ids.length === 0) {
      return { error: "Нечего сохранять: форма пришла пустой." };
    }

    for (const id of ids) {
      const priceNew = optionalMoney(formData, `price_new_${id}`, "Цена");
      if (priceNew === null) {
        throw new Error("Текущая цена обязательна для каждого пакета.");
      }

      await db`
        update packages set
          price_old  = ${optionalMoney(formData, `price_old_${id}`, "Старая цена")},
          price_new  = ${priceNew},
          note       = ${optionalText(formData, `note_${id}`)},
          is_active  = ${checkbox(formData, `is_active_${id}`)},
          updated_at = now()
        where id = ${id}
      `;
    }

    refresh(["/individual"]);
    return { ok: "Цены сохранены." };
  } catch (error) {
    return { error: message(error) };
  }
}

export async function saveSettings(_state: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdmin();

  try {
    const db = sql();
    const keys = String(formData.get("keys") ?? "").split(",").filter(Boolean);

    for (const key of keys) {
      const value = String(formData.get(`setting_${key}`) ?? "").trim();
      await db`
        insert into settings (key, value, updated_at) values (${key}, ${value}, now())
        on conflict (key) do update set value = excluded.value, updated_at = now()
      `;
    }

    /* Общесайтовое стоит в подвале каждой страницы — гасим всё дерево
       от корневого layout. */
    updateTag(CONTENT_TAG);
    revalidatePath("/", "layout");
    return { ok: "Сохранено." };
  } catch (error) {
    return { error: message(error) };
  }
}

/* Наружу отдаём текст ошибки как есть: все броски здесь наши
   собственные и написаны для человека. Ошибку драйвера показываем
   короткой строкой — стек в форме не нужен, он уже в логах Vercel. */
function message(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Не удалось сохранить. Попробуйте ещё раз.";
}
