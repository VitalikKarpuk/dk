/* Подложка переехала на уровень сайта: тёмную тему по образцу /leader
   теперь носят все страницы, а не одна. Реэкспорт оставлен, чтобы секции
   и каркас /leader продолжали брать её из привычного места. */
export { AmbientBackdrop } from "@/components/AmbientBackdrop";
export { SpotlightCard } from "./SpotlightCard";
export { LinearButton, QuietLink } from "./LinearButton";
/* Навигация тоже переехала на уровень сайта: шапка теперь одна на все
   страницы, а якорные ссылки /leader передаются ей параметром. */
export { SiteHeader } from "@/components/ui";
export { Display, SectionHeading, CardTitle, ShimmerText, Label, Lead, Body } from "./Typography";
export { Reveal, Stagger, StaggerItem, ParallaxHero, EXPO } from "./motion";
