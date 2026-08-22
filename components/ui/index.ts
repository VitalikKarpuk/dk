/**
 * Дизайн-система сайта.
 *
 * Единственный источник кнопок, бейджей, карточек, секций и типографики.
 * Если элемент встречается больше одного раза — он живёт здесь, а не
 * переписывается на месте: именно рукописные копии развели страницы по
 * трём разным каркасам и двадцати пяти кеглям заголовков.
 */
export { SiteHeader } from "./SiteHeader";
export {
  Reveal,
  Stagger,
  StaggerItem,
  ScrollReveal,
  ParallaxHero,
} from "./motion";
export { Section } from "./Section";
export { SectionHeading, Eyebrow } from "./SectionHeading";
export { Button, QuietLink } from "./Button";
export { Badge, IconBubble } from "./Badge";
export { Card } from "./Card";
export {
  Display,
  CardTitle,
  ItalicAccent,
  Lead,
  Body,
  Numeral,
  Quote,
} from "./Typography";
