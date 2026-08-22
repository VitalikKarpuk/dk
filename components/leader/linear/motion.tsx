/**
 * Движение /leader — то же, что у всего сайта.
 *
 * Эти примитивы здесь и родились, и до объединения обслуживали одну
 * страницу. Теперь по ним живёт весь сайт, поэтому сам код переехал в
 * `components/ui/motion.tsx`, а здесь остался реэкспорт — как у кнопки
 * (`LinearButton`) и подложки (`AmbientBackdrop`): секции /leader
 * продолжают брать их из привычного места.
 *
 * `EXPO` — прежнее имя общей кривой. Она же `EASE` в `lib/design.ts`
 * и `--ease-brand` в CSS; значение одно, имён исторически три.
 */
export { Reveal, Stagger, StaggerItem, ScrollReveal, ParallaxHero } from "@/components/ui/motion";
export { EASE as EXPO } from "@/lib/design";
