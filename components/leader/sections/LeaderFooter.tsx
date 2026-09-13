import Footer from "@/components/Footer";
import {
  INSTAGRAM_URL,
  YOUTUBE_INTRO_VIDEO,
  YOUTUBE_GIFT_VIDEO,
} from "../course";
import { useCourse } from "../CourseContext";
import { navLinks } from "../content";

/**
 * Подвал /leader — общий подвал сайта с двумя своими колонками.
 *
 * Здесь была собственная вёрстка на 190 строк: три полосы, своя колонка
 * `max-w-6xl`, свои отступы и заголовки колонок моноширинным шрифтом.
 * Каркас теперь общий; страница добавляет к нему только то, что у неё
 * своё, — последний призыв и карту разделов.
 */
export function LeaderFooter() {
  /* Номер потока, дата, скидка и адрес анкеты — из базы. */
  const course = useCourse();

  return (
    <Footer
      cta={{
        title: "Остались сомнения — начните с анкеты",
        note: `${course.streamBadgeWithDate} · скидка ${course.discountPercent}% и бесплатная встреча`,
        href: course.formUrl,
        label: course.ctaPreorder,
      }}
      columns={[
        { heading: "Разделы", links: navLinks },
        {
          heading: "Материалы",
          links: [
            { href: YOUTUBE_INTRO_VIDEO, label: "О программе — видео" },
            { href: YOUTUBE_GIFT_VIDEO, label: "Подарок — видео" },
            { href: INSTAGRAM_URL, label: "Кейсы участников" },
            { href: course.formUrl, label: "Анкета предзаписи" },
          ],
        },
      ]}
    />
  );
}
