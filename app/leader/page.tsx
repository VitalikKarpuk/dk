import type { Metadata } from "next";
import { LeaderDarkPage } from "@/components/leader/LeaderDarkPage";
import {
  COURSE_NAME,
  DURATION_LABEL_ADJ,
  AUTHOR_NAME_GENITIVE,
  AUTHOR_ROLE,
} from "@/components/leader/course";

/* Заголовок и описание собираются из тех же констант, что и тексты страницы:
   при смене длительности программы правка остаётся в одном файле. */
const OG_TITLE = `${COURSE_NAME} — ${DURATION_LABEL_ADJ} программа для экспертов`;
const OG_DESCRIPTION = `${DURATION_LABEL_ADJ} программа для экспертов, желающих вырасти профессионально и финансово. С ${AUTHOR_NAME_GENITIVE} — ${AUTHOR_ROLE}.`;

export const metadata: Metadata = {
  title: OG_TITLE,
  description: OG_DESCRIPTION,
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
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
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: ["/leader/og-image.jpg"],
  },
};

/* Своего `themeColor` у страницы больше нет. Он появился, когда /leader была
   единственной тёмной страницей сайта, и прибивал рамку браузера к почти-чёрному.
   Теперь тему выбирает посетитель, и на светлой рамка вокруг страницы уходила
   в чёрный — ровно та несогласованность, ради борьбы с которой её и ставили. */

export default function LeaderRoute() {
  return <LeaderDarkPage />;
}
