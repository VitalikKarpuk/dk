"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { EASE, MOTION } from "@/lib/design";

/**
 * Движение сайта — один набор примитивов на все страницы.
 *
 * Раньше он жил в `components/leader/linear/motion.tsx` и обслуживал одну
 * страницу, а остальные писали появление сами: главная — инлайновыми
 * `motion.div` со своей кривой и своими 0.7–1.1s, /proryv — CSS-классом
 * `[data-reveal]` с третьей кривой, /basic-laws — анимацией при монтаже
 * (блоки въезжали разом, ещё до того как их увидят), /individual — ничем.
 * Здесь всё сведено к одному жесту: fade-up на `MOTION.reveal.distance`
 * за `MOTION.reveal.duration` по общей кривой.
 *
 * `Reveal` / `Stagger` — для React-разметки, `ScrollReveal` + атрибут
 * `data-reveal` — для страниц, которые остаются серверными. Числа у обоих
 * общие: у первого отсюда, у второго — из одноимённых CSS-переменных.
 */

const { duration, distance, stagger, amount } = MOTION.reveal;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
};

/**
 * Появление секции: fade-up один раз, при 20% видимости.
 * `once: true` — повторная анимация при обратном скролле выглядит нервно.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Сдвиг старта, с. Шаг каскада — `MOTION.reveal.stagger`. */
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0, transition: { duration, ease: EASE, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Контейнер каскада: дочерние `<StaggerItem>` въезжают друг за другом
 * с шагом `MOTION.reveal.stagger`.
 * `as` позволяет контейнеру самому быть grid'ом и сохранять семантику списка —
 * без обёртки между grid и его элементами, иначе col-span перестаёт работать.
 */
export function Stagger({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul";
}) {
  const reduced = useReducedMotion();
  const Tag = as === "ul" ? motion.ul : motion.div;
  const Plain = as === "ul" ? "ul" : "div";

  if (reduced) return <Plain className={className}>{children}</Plain>;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduced = useReducedMotion();
  const Tag = as === "li" ? motion.li : as === "article" ? motion.article : motion.div;
  const Plain = as === "li" ? "li" : as === "article" ? "article" : "div";

  if (reduced) return <Plain className={className}>{children}</Plain>;

  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  );
}

/**
 * Появление для страниц без клиентской разметки.
 *
 * Вешает `.is-visible` на каждый `[data-reveal]`, когда тот входит в кадр;
 * сами переходы — в `globals.css`, на тех же числах, что и `Reveal` выше.
 * Каскад задаётся переменной `--rd` на элементе.
 *
 * Один наблюдатель на страницу: у появившегося блока подписка снимается —
 * он въезжает один раз, как и при `once: true` в `Reveal`.
 */
export function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (!els.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      /* Порог — та же доля видимости, что у `viewport.amount` в `Reveal`:
         блок трогается, когда виден на пятую часть. Раньше здесь стояло
         0.12 с полем -10%, и на /proryv карточки въезжали заметно раньше,
         чем такие же на главной. */
      { threshold: amount }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

/** `md` из Tailwind. Ниже этой ширины параллакс героя отключён — см. ниже. */
const DESKTOP = "(min-width: 768px)";

/**
 * Прошла ли гидрация. На сервере и в гидратационном кадре — `false`.
 *
 * Через `useSyncExternalStore`, а не `useState` + `useEffect`: во втором
 * варианте это синхронный `setState` внутри эффекта, за который линтер
 * справедливо ругается каскадом рендеров. Подписка пустая — значение
 * меняется ровно один раз, когда React переходит с серверного снимка на
 * клиентский.
 */
const noSubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false,
  );
}

function useDesktop() {
  const [is, setIs] = useState(() =>
    typeof window === "undefined" ? true : window.matchMedia(DESKTOP).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const on = () => setIs(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return is;
}

/**
 * Параллакс героя: по мере скролла контент слегка уменьшается и уходит вниз —
 * будто камера отъезжает.
 *
 * Прогресс считается **по самому герою**, а не по документу. С `useScroll()`
 * без target диапазон [0, 0.18] означал 18% длины всей страницы: на мобильном
 * это ~3500 px, герой уходил с экрана, отъехав всего на 36 px из 100, и эффект
 * менялся сам собой при любой правке длины страницы.
 *
 * Гашения по прозрачности здесь нет намеренно. Оно было, но не работало:
 * `opacity` из scroll-MotionValue в framer-motion 12 записывается один раз при
 * монтировании и на скролл не отвечает, хотя `scale` и `y` из того же прогресса
 * едут нормально. Проверено и на исходной версии, и с выносом на вложенный
 * элемент — поведение то же. Мёртвая строка убрана.
 *
 * Ниже `md` эффект выключен совсем: там контент стоит под портретом, в нижней
 * половине секции, и уезжающий текст мешал бы его читать.
 */
export function ParallaxHero({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const desktop = useDesktop();
  const mounted = useMounted();

  /* До монтирования — обычный div. В исходном проекте (Vite, чистый SPA)
     этого не требовалось, а под SSR `motion.div` разъезжается с разметкой
     сервера: сервер не пишет `transform` вовсе, клиент при гидрации ставит
     `transform: none` — и React роняет в консоль mismatch. Параллакс всё
     равно нужен только со скроллом, так что откладываем его на кадр. */
  if (!mounted || reduced || !desktop)
    return <div className={className}>{children}</div>;

  return <ParallaxHeroMotion className={className}>{children}</ParallaxHeroMotion>;
}

/**
 * Вынесено в отдельный компонент не ради читаемости, а по необходимости:
 * `useScroll({ target })` требует, чтобы ref был привязан к узлу в том же
 * рендере. Пока хук жил в `ParallaxHero`, он вызывался и на «обычной» ветке,
 * где ref никуда не привязан, и framer-motion ругался «target ref is defined
 * but not hydrated». Здесь хук монтируется вместе со своим `motion.div`.
 */
function ParallaxHeroMotion({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.9], [0, 80]);

  return (
    <motion.div ref={ref} className={className} style={{ scale, y }}>
      {children}
    </motion.div>
  );
}
