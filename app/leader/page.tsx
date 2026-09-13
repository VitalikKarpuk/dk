import type { Metadata } from "next";
import { LeaderDarkPage } from "@/components/leader/LeaderDarkPage";
import { buildCourse } from "@/components/leader/course-data";
import { getProgram } from "@/lib/content";
import {
  COURSE_NAME,
  AUTHOR_NAME_GENITIVE,
  AUTHOR_ROLE,
} from "@/components/leader/course";

/* Заголовок и описание собираются из тех же данных, что и тексты страницы:
   длительность приезжает из базы, и OG-теги едут вместе с ней. Поэтому
   `generateMetadata`, а не статическая `metadata`: константы на этапе
   импорта модуля здесь больше нет. */
export async function generateMetadata(): Promise<Metadata> {
  const course = buildCourse(await getProgram("leader"));

  const title = `${COURSE_NAME} — ${course.durationLabelAdj} программа для экспертов`;
  const description = `${course.durationLabelAdj} программа для экспертов, желающих вырасти профессионально и финансово. С ${AUTHOR_NAME_GENITIVE} — ${AUTHOR_ROLE}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ru_RU",
      images: [
        {
          url: "/leader/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${COURSE_NAME} — программа для экспертов с Дарьей Карпук`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/leader/og-image.jpg"],
    },
  };
}

/* Своего `themeColor` у страницы больше нет. Он появился, когда /leader была
   единственной тёмной страницей сайта, и прибивал рамку браузера к почти-чёрному.
   Теперь тему выбирает посетитель, и на светлой рамка вокруг страницы уходила
   в чёрный — ровно та несогласованность, ради борьбы с которой её и ставили. */

export default async function LeaderRoute() {
  /* Данные потока читаются здесь, на сервере, и уезжают в клиентскую
     страницу одним объектом: `LeaderDarkPage` и все её секции держатся
     на framer-motion и обработчиках мыши, серверными им не быть. */
  const course = buildCourse(await getProgram("leader"));

  return <LeaderDarkPage course={course} />;
}
