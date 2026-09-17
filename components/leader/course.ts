/**
 * Константы курса «Я ЛИДЕР», которые не меняются от потока к потоку.
 *
 * Номер потока, дата старта, длительность, число встреч, выпускники и
 * скидка отсюда уехали в базу: они менялись каждый набор, и правка была
 * коммитом с деплоем. Их место — `lib/content.ts`, а готовые строки
 * («11-й поток · дата старта 8 октября») собирает `buildCourse` в
 * `CourseContext.tsx`; секции берут их через `useCourse()`.
 *
 * Здесь осталось название программы, видео и кейсы — то, что переживает
 * смену потока, и правка чего всё равно требует правки вёрстки рядом.
 *
 * Была тут и константа `STREAM_START_DATE = "1 июля"`, которую никто не
 * читал: настоящая дата была вписана строкой внутрь соседнего бейджа.
 * Ровно это расхождение переезд в базу и закрывает.
 */

export const COURSE_NAME = "Я ЛИДЕР";

// ─── Ссылки ─────────────────────────────────────────────
export const YOUTUBE_INTRO_VIDEO = "https://youtu.be/bQepzVPQJ2M?si=gXL1oBRdKChQyu16";
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

