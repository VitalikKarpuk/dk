/**
 * Единый файл констант курса «Я ЛИДЕР».
 * При запуске нового потока — меняйте значения ТОЛЬКО здесь.
 */

// ─── Поток ───────────────────────────────────────────────
export const STREAM_NUMBER = 11;
export const STREAM_START_DATE = "1 июля";

// ─── Программа ───────────────────────────────────────────
export const COURSE_NAME = "Я ЛИДЕР";
export const DURATION_WEEKS = 7;
export const INDIVIDUAL_MEETINGS = 6;
export const GROUP_MEETINGS = 2;
export const GRADUATES_COUNT = "100+";

// ─── Цены и скидки ──────────────────────────────────────
export const DISCOUNT_PERCENT = 40;

// ─── Ссылки ─────────────────────────────────────────────
export const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfHR3ux5r_w8wioGZPSX-timJ9i9sAoceCy6CGscDVF9Fklqw/viewform?usp=sharing";

export const YOUTUBE_INTRO_VIDEO = "https://youtu.be/HQ0z6Ca4XL8";
export const YOUTUBE_GIFT_VIDEO = "https://youtu.be/ZuXCSTLNDT4";

/* Соцсети и реквизиты — общесайтовые: они одинаковы на всех страницах и
   живут в `lib/site.ts`. Здесь только пересылка, чтобы вёрстка /leader
   продолжала брать их из привычного места. */
export {
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  AUTHOR_NAME,
  AUTHOR_NAME_GENITIVE,
  AUTHOR_ROLE,
  AUTHOR_COMPANY,
  AUTHOR_TAX_ID,
  COPYRIGHT_YEARS,
} from "@/lib/site";

export const INSTAGRAM_CASES = [
  { href: "https://www.instagram.com/stories/highlights/18064679738091622/", label: "Кейс массажиста Людмилы" },
  { href: "https://www.instagram.com/stories/highlights/18100495129531605/", label: "Кейс аквагрим Татьна" },
  { href: "https://www.instagram.com/stories/highlights/18012491281572009/", label: "Кейс кондитера Виктории" },
  { href: "https://www.instagram.com/stories/highlights/18025281815118866/", label: "Кейс парфюмера Юлии" },
  { href: "https://www.instagram.com/stories/highlights/18158851036318733/", label: "Кейс тренера по созданию семьи Миланы" },
] as const;

// ─── Производные строки (для удобства) ──────────────────
export const STREAM_BADGE = `${STREAM_NUMBER}-й поток`;
export const STREAM_BADGE_WITH_DATE = `${STREAM_NUMBER}-й поток · дата старта 8 октября`;
export const CTA_PREORDER = `АНКЕТА ПРЕДЗАПИСИ в ${STREAM_NUMBER} поток`;
export const CTA_DISCOUNT = `Записаться со скидкой ${DISCOUNT_PERCENT}%`;
export const CTA_BOOK_DISCOUNT = `Забронировать место на обучение с ${DISCOUNT_PERCENT}% скидкой`;
export const DURATION_LABEL = `${DURATION_WEEKS} недель`;
export const DURATION_LABEL_ADJ = `${DURATION_WEEKS}-недельная`;
