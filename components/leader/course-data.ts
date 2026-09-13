import type { Program } from "@/lib/content";
import { formatStartDate, meetingsLabel, weeksLabel } from "@/lib/format";

/**
 * Данные потока «Я ЛИДЕР» для секций страницы.
 *
 * Готовые строки («11-й поток · дата старта 8 октября») собираются здесь
 * один раз, а не в каждой секции: раньше они были константами в
 * `course.ts`, и в одной из них дата оказалась вписана вручную — при
 * живой, но никем не используемой константе `STREAM_START_DATE`.
 *
 * Файл намеренно без `"use client"`: `buildCourse` зовут и с сервера —
 * из `generateMetadata` страницы. Функция из клиентского модуля с
 * сервера не вызывается, её можно только отрендерить компонентом.
 * Раздачу этих данных секциям делает `CourseContext.tsx`.
 */
export type Course = {
  streamNumber: number;
  /** «8 октября» или подпись-заглушка. */
  startLabel: string;
  /** «11-й поток». */
  streamBadge: string;
  /** «11-й поток · дата старта 8 октября». */
  streamBadgeWithDate: string;
  durationLabel: string;
  /** «7-недельная» — для заголовков и OG-описания. */
  durationLabelAdj: string;
  individualMeetingsLabel: string;
  groupMeetingsLabel: string;
  graduatesCount: string;
  discountPercent: number;
  formUrl: string;
  ctaPreorder: string;
  ctaDiscount: string;
  ctaBookDiscount: string;
};

/** Значения на случай пустых полей в базе — те же, что были в коде. */
const FALLBACK = {
  streamNumber: 11,
  durationWeeks: 7,
  individualMeetings: 6,
  groupMeetings: 2,
  graduatesCount: "100+",
  discountPercent: 40,
} as const;

export function buildCourse(program: Program): Course {
  const streamNumber = program.streamNumber ?? FALLBACK.streamNumber;
  const weeks = program.durationWeeks ?? FALLBACK.durationWeeks;
  const discountPercent = program.discountPercent ?? FALLBACK.discountPercent;

  const startLabel =
    formatStartDate(program.startDate) ?? program.startLabel ?? "дата уточняется";
  const streamBadge = `${streamNumber}-й поток`;

  return {
    streamNumber,
    startLabel,
    streamBadge,
    streamBadgeWithDate: `${streamBadge} · дата старта ${startLabel}`,
    durationLabel: weeksLabel(weeks),
    durationLabelAdj: `${weeks}-недельная`,
    individualMeetingsLabel: meetingsLabel(
      program.individualMeetings ?? FALLBACK.individualMeetings,
      "индивидуальн",
    ),
    groupMeetingsLabel: meetingsLabel(
      program.groupMeetings ?? FALLBACK.groupMeetings,
      "группов",
    ),
    graduatesCount: program.graduatesCount ?? FALLBACK.graduatesCount,
    discountPercent,
    formUrl: program.formUrl ?? "#",
    ctaPreorder: `АНКЕТА ПРЕДЗАПИСИ в ${streamNumber} поток`,
    ctaDiscount: `Записаться со скидкой ${discountPercent}%`,
    ctaBookDiscount: `Забронировать место на обучение с ${discountPercent}% скидкой`,
  };
}
