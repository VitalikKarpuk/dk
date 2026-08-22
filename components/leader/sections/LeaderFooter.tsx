import Footer from "@/components/Footer";
import {
  FORM_URL,
  CTA_PREORDER,
  STREAM_BADGE_WITH_DATE,
  DISCOUNT_PERCENT,
  INSTAGRAM_URL,
  YOUTUBE_INTRO_VIDEO,
  YOUTUBE_GIFT_VIDEO,
} from "../course";
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
  return (
    <Footer
      cta={{
        title: "Остались сомнения — начните с анкеты",
        note: `${STREAM_BADGE_WITH_DATE} · скидка ${DISCOUNT_PERCENT}% и бесплатная встреча`,
        href: FORM_URL,
        label: CTA_PREORDER,
      }}
      columns={[
        { heading: "Разделы", links: navLinks },
        {
          heading: "Материалы",
          links: [
            { href: YOUTUBE_INTRO_VIDEO, label: "О программе — видео" },
            { href: YOUTUBE_GIFT_VIDEO, label: "Подарок — видео" },
            { href: INSTAGRAM_URL, label: "Кейсы участников" },
            { href: FORM_URL, label: "Анкета предзаписи" },
          ],
        },
      ]}
    />
  );
}
