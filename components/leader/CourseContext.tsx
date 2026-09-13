"use client";

import { createContext, useContext } from "react";
import type { Course } from "./course-data";

/**
 * Раздача данных потока секциям `/leader`.
 *
 * Через контекст, а не пропсами: страница клиентская и собрана из
 * двенадцати секций — номер потока нужен трём из них, скидка четырём,
 * адрес анкеты шести. Пропсами это была бы сигнатура `LeaderDarkPage`
 * из десятка полей, к порядку секций отношения не имеющих.
 *
 * Сами значения собирает `buildCourse` в `course-data.ts` — на сервере,
 * до передачи сюда.
 */

export type { Course } from "./course-data";

const CourseContext = createContext<Course | null>(null);

export function CourseProvider({
  course,
  children,
}: {
  course: Course;
  children: React.ReactNode;
}) {
  return <CourseContext.Provider value={course}>{children}</CourseContext.Provider>;
}

export function useCourse(): Course {
  const course = useContext(CourseContext);

  if (!course) {
    /* Секция вне провайдера — это опечатка в сборке страницы, а не
       ситуация, которую надо переживать пустыми строками на лендинге. */
    throw new Error("useCourse вызван вне <CourseProvider>");
  }

  return course;
}
