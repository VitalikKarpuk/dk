"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoLockup } from "@/components/Logo/variants";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "./Button";
import { CONTAINER, EASE, GUTTER, MOTION } from "@/lib/design";
import { DIAGNOSTIC_CTA, PROGRAM_LINKS } from "@/lib/site";

/**
 * Порог, за которым меню перестаёт быть панелью и разворачивается в строку.
 * Тот же `lg` (1024px), что в классах ниже: держатся вместе, иначе панель
 * останется открытой в состоянии, в котором её уже нечем закрыть.
 *
 * Не `md`, хотя раньше было так. Строке нужно 832px ширины окна
 * (замерено: поля 96 + логотип 122 + четыре пункта 331 + зазоры 96 +
 * тема 36 + кнопка 107), а `md` начинается с 768 — и в промежутке
 * 768–831px пункты ломались в две строки: «Я / ЛИДЕР», «Базовые /
 * законы». Ближайший стандартный порог выше замера — `lg`; планшет в
 * портрете (768) теперь получает панель, как телефон.
 */
const DESKTOP_QUERY = "(min-width: 1024px)";

/** Что в шапке и в панели может принять фокус — по этому списку идёт цикл Tab. */
const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* Портал строится только в браузере: `document` на сервере нет, а страницы
   сайта пререндерятся при сборке. Проверка гидрации — тем же приёмом, что
   у `ThemeToggle`: `useSyncExternalStore` вместо `useState` + эффекта, то
   есть без лишнего прохода рендера и без рассинхрона с разметкой сервера. */
const subscribeToNothing = () => () => {};
const inBrowser = () => true;
const onServer = () => false;

/** Видимые точки фокуса внутри узла — в порядке разметки. */
function focusStops(root: HTMLElement | null) {
  if (!root) return [];
  /* Скрытое под `lg:` остаётся в DOM, но фокус ему не достаётся: из
     списка такие узлы убирает отсутствие блоков отрисовки. */
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.getClientRects().length > 0,
  );
}

/**
 * Пункт навигации. Внутренние адреса идут через `next/link`, якорные —
 * обычной ссылкой: `#` на той же странице маршрутизатору не нужен.
 *
 * Зона нажатия добирается там, где указатель — палец: порог `md` проходит
 * и телефон боком (844×390), а там пункт был 20px высотой. Отрицательный
 * margin гасит padding, поэтому шаг между пунктами виден прежним.
 */
function NavLink({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  /* Текущая страница подсвечивается в меню. Иначе меню одинаково на всех
     страницах и не отвечает на вопрос «где я» — а оно теперь общее. */
  const pathname = usePathname();
  const current = !href.startsWith("#") && pathname === href;

  /* 300ms, а не 200: время отклика на сайте одно — `--dur-hover`.
     `press` и `transition-all` — чтобы ссылка меню отвечала на нажатие
     тем же коротким сжатием, что кнопка рядом с ней. */
  const cls = `press rounded text-sm transition-all duration-300 ease-brand hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background [@media(pointer:coarse)]:-mx-1.5 [@media(pointer:coarse)]:px-1.5 [@media(pointer:coarse)]:py-3 ${
    current ? "text-foreground" : "text-muted"
  } ${className}`;

  if (href.startsWith("#")) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cls}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export function SiteHeader({
  links = [...PROGRAM_LINKS],
  cta = DIAGNOSTIC_CTA,
  back = false,
}: {
  /**
   * Меню. По умолчанию — программы: одно и то же на всех страницах.
   * Длинные лендинги передают вместо него якоря по своим разделам.
   * Под 1024px меню уезжает в выезжающую панель.
   */
  links?: { href: string; label: string }[];
  /** Кнопка справа. По умолчанию — общий вход в воронку. */
  cta?: { href: string; label: string };
  /** Ссылка «На главную» — для внутренних страниц. */
  back?: boolean;
}) {
  const [open, setOpen] = useState(false);
  /* Высота полосы: от неё начинаются и панель, и шторка. Замеряется, а не
     вписана числом, — кегль и поля живут в дизайн-системе и однажды
     поменяются. */
  const [barHeight, setBarHeight] = useState(0);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    inBrowser,
    onServer,
  );
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const hasMenu = links.length > 0;
  const showMenu = open && hasMenu;
  /* Панель и шторка едут одним временем — тем же, которым сайт отвечает на
     курсор и нажатие. При `prefers-reduced-motion` состояние наступает
     мгновенно: framer-motion пишет кадры скриптом, и глобальное правило
     `transition-duration: 0.01ms` из globals.css его не гасит. */
  const duration = reduced ? 0 : MOTION.hover;

  const toggle = () => {
    if (!open) setBarHeight(headerRef.current?.offsetHeight ?? 0);
    setOpen(!open);
  };

  /* Возврат фокуса — только для клавиатуры (Esc). После нажатия пальцем
     или мышью фокус не переставляем: браузер показал бы на кнопке кольцо,
     которого при таком закрытии никто не просил. */
  const closeWithFocus = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  /* Переход закрывает панель. Клик по пункту закрывает её и сам, но
     переход бывает и не из меню: «назад» браузера, ссылка из тела
     страницы, редирект. Тогда панель осталась бы висеть над новой
     страницей — с чужой подсветкой текущего пункта.

     Сверкой прошлого адреса в рендере, а не эффектом: `setState` в теле
     эффекта — это второй проход рендера уже после кадра, панель успела бы
     мигнуть на новой странице. Здесь состояние правится до отрисовки. */
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  /* Ширина окна перешла порог — панель закрывается.
     Иначе состояние остаётся `true` под `lg:hidden`: панель и кнопка
     пропадают с экрана, а `aria-expanded` продолжает говорить «открыто»,
     и при повороте телефона обратно меню разворачивается само. */
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia(DESKTOP_QUERY);
    /* Только подписка: открыть панель можно единственной кнопкой, а она
       под `lg:hidden` — в момент подписки порог заведомо не перейдён. */
    const close = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, [open]);

  /* Поворот телефона — полоса меряется заново: панель и шторка привязаны
     к её высоте инлайновым `top`, а он в media-запросы не умеет. */
  useEffect(() => {
    if (!open) return;
    const remeasure = () => setBarHeight(headerRef.current?.offsetHeight ?? 0);
    window.addEventListener("resize", remeasure);
    return () => window.removeEventListener("resize", remeasure);
  }, [open]);

  /* Клавиатура при открытом меню: Esc закрывает, Tab ходит по кругу
     «полоса → панель» — в том же порядке, в каком они видны.

     Слушателем на документе, а не обработчиком на шапке, и это важно.
     Во-первых, после нажатия по шторке фокус остаётся на `body`, и
     обработчик внутри шапки такого нажатия уже не увидит. Во-вторых,
     панель живёт в портале: в DOM она последняя в `<body>`, поэтому
     границ у круга не две, а четыре — начало и конец есть и у полосы, и
     у панели, а между ними лежит вся страница. Поэтому Tab не «ловится
     на краю», а перехватывается всегда: следующая точка считается по
     собственному списку.

     Иначе табуляция уходила бы на невидимые ссылки за шторкой — фокус
     есть, а где он, не видно (проверено: Shift+Tab с первого пункта
     попадал на «Наверх» в подвале).

     `aria-modal` при этом не ставим сознательно: он объявил бы всё за
     пределами панели недоступным, а за её пределами — кнопка закрытия. */
  useEffect(() => {
    if (!showMenu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeWithFocus();
        return;
      }
      if (event.key !== "Tab") return;
      const stops = [
        ...focusStops(headerRef.current),
        ...focusStops(panelRef.current),
      ];
      if (stops.length === 0) return;
      const from = stops.indexOf(document.activeElement as HTMLElement);
      /* Фокуса нет ни там, ни там (нажали по шторке): Tab заводит в
         начало круга, Shift+Tab — в конец. */
      const next = event.shiftKey
        ? stops[(from <= 0 ? stops.length : from) - 1]
        : stops[(from + 1) % stops.length];
      event.preventDefault();
      next.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showMenu, closeWithFocus]);

  /* Фокус на открытии не переставляем, и это не упущение.

     По шаблону disclosure он и должен остаться на кнопке: она же и
     закрывает панель. Дальше Tab уводит в первый пункт — этим занят цикл
     выше, потому что в DOM панель лежит в портале, а не следом за кнопкой.

     Заодно это на один способ меньше сдвинуть прокрутку: доводя до
     фокуса элемент, браузер скроллит страницу, а панель `fixed` — доводить
     её некуда, и в паре с липкой шапкой такие доводки дают ровно те
     прыжки, из-за которых на сайте нет `scroll-padding-top`
     (см. комментарий в globals.css). */

  /* Страница под открытой панелью не скроллится: за шторкой уезжало
     содержимое, и, закрыв меню, человек оказывался не там, где открывал.
     Замок на `<html>`, а не на `<body>` через `position: fixed`: второе
     вынимает из потока и саму шапку — липкая полоса с меню внутри
     ускакала бы к началу документа.

     Компенсация ширины полосы прокрутки нужна не телефону, а окну браузера
     уже́ 768px: там полоса видима, и без padding вся страница дёргалась бы
     на её ширину в момент открытия. */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const gap = window.innerWidth - root.clientWidth;
    const prevOverflow = root.style.overflow;
    const prevPadding = root.style.paddingRight;
    root.style.overflow = "hidden";
    if (gap > 0) root.style.paddingRight = `${gap}px`;
    return () => {
      root.style.overflow = prevOverflow;
      root.style.paddingRight = prevPadding;
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      /* Роль проставлена явно, хотя у `<header>` она и так подразумевается:
         страницы завёрнуты в `<main>` целиком, а внутри него `<header>`
         теряет роль `banner` — ориентира «шапка» в дереве доступности не
         было ни на одной странице. Правильное лечение — вынести шапку и
         подвал из `<main>` на всех пяти страницах; до тех пор роль
         держится здесь. */
      role="banner"
      className="sticky top-0 z-50 border-b border-surface-strong bg-background/80 backdrop-blur-xl"
    >
      <div
        className={`${CONTAINER} ${GUTTER} flex items-center justify-between gap-4 py-3.5`}
      >
        {/* Никакого `tracking-*` на ссылке: унаследованный letter-spacing
            перебивает презентационные атрибуты внутри SVG и разъезжает логотип. */}
        <Link
          href="/"
          aria-label="Дарья Карпук — на главную"
          className="press flex min-h-[44px] shrink-0 items-center rounded text-foreground transition-all duration-300 ease-brand hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <LogoLockup className="h-8 w-auto" />
        </Link>

        {/* Зона нажатия добирается там, где указатель — палец: порог `md`
            проходит и телефон боком (844×390), а там ссылки были 20px
            высотой. Отрицательный margin гасит padding, поэтому шаг между
            пунктами виден прежним. */}
        {hasMenu && (
          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Основная навигация"
          >
            {links.map(({ href, label }) => (
              <NavLink key={href} href={href}>
                {label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {/* Переключатель темы в полосе только на десктопе. На телефоне
              место в полосе отдано кнопке записи: тема — настройка, её
              нажимают один раз, а запись — то, зачем сюда пришли. Ниже
              `lg` переключатель уезжает в панель, к пунктам меню. */}
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>

          {back && (
            <Link
              href="/"
              className="press group inline-flex min-h-[44px] items-center gap-2 rounded-full px-2 text-sm text-muted transition-all duration-300 ease-brand hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span
                aria-hidden
                className="transition-transform duration-300 ease-brand group-hover:-translate-x-0.5"
              >
                ←
              </span>
              {/* На узком экране «На главную» переносилось на вторую строку
                  и ломало высоту шапки — там текст короче. */}
              <span className="hidden sm:inline">На главную</span>
              <span className="sm:hidden">Назад</span>
            </Link>
          )}

          {/* Кнопка записи видна и на телефоне, а не только внутри
              меню: это главное действие сайта, и прятать его за тап по
              «гамбургеру» — прятать воронку.

              Порог 360px, а не `lg`, потому что дальше начинается счёт
              на пиксели: поля 48 + логотип 122 + кнопка меню 44 + зазоры
              оставляют под кнопку 82px на 320px и 122px на 360px, а
              «Записаться» кеглем 13px — это 75px текста плюс 32px полей.
              На экранах уже 360px кнопка остаётся в панели (см. ниже). */}
          {cta && (
            <div className="hidden min-[360px]:block">
              <Button
                href={cta.href}
                size="sm"
                arrow={false}
                className="whitespace-nowrap"
              >
                {cta.label}
              </Button>
            </div>
          )}

          {hasMenu && (
            <button
              ref={triggerRef}
              type="button"
              onClick={toggle}
              aria-expanded={open}
              /* Пока панель закрыта, её в разметке нет: `aria-controls`
                 обязан указывать на существующий узел. */
              aria-controls={showMenu ? "site-menu" : undefined}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              className="press flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-surface-strong text-foreground transition-all duration-300 ease-brand hover:bg-foreground/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          )}
        </div>
      </div>

      {/* ─── Панель и шторка ──────────────────────────────────────────
          Порталом в `<body>`, а не внутри страницы, и это не про удобство.

          Страница на всех маршрутах завёрнута в `relative z-10` — свой
          контекст наложения. Внутри него бегущая строка (`.marquee-track`:
          бесконечная анимация трансформации плюс `will-change`) живёт
          отдельным слоем композитора, и Chromium рисует этот слой поверх
          `fixed`-соседа с `backdrop-filter`, каким бы ни был `z-index`:
          проверено и с 40, и без размытия, и без `will-change` у самой
          строки — сквозь затемнение всё равно проступала резкая полоса
          текста. Из корневого контекста накрывается всё дерево сразу.

          Обе половины — соседи с одинаковым `top`, а не вложенные в общую
          обёртку: так каждой достаётся своя анимация ухода, и `height` у
          панели не мешает `opacity` у шторки.

          Отсчёт от высоты полосы, а не от нуля: логотип, тема и кнопка
          закрытия остаются на своих местах и нажимаемы, а панель не
          двигает содержимое страницы — `sticky` из потока не выходит, и
          растущая шапка сдвигала бы её вниз на высоту меню. */}
      {mounted &&
        createPortal(
          <>
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  /* Нажатие мимо меню закрывает его — на телефоне это
                     первое, что пробует палец, и раньше не работало.
                     Материал ровно тот же, что у полосы: при открытом
                     меню стеклом становится весь экран. Тон токеном, а не
                     литералом, — иначе в тёмной теме шторка светлела бы
                     вместо затемнения. */
                  aria-hidden
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration, ease: EASE }}
                  style={{ top: barHeight }}
                  className="fixed inset-x-0 bottom-0 z-50 bg-background/80 backdrop-blur-xl lg:hidden"
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  id="site-menu"
                  ref={panelRef}
                  /* Высотой, а не сдвигом: панель разворачивается из-под
                     полосы, а не наезжает на страницу целым куском.
                     Сдвиг вверх тут вообще не годится — панель лежит в
                     портале и рисуется поверх полосы, так что на кадр
                     анимации она наехала бы на её нижнюю кромку. */
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration, ease: EASE }}
                  style={{ top: barHeight }}
                  /* Заливка глухая, без размытия: панель — лист поверх
                     стекла, а сквозь `bg-background/95` проступал
                     заголовок первого экрана. */
                  className="fixed inset-x-0 z-50 overflow-hidden border-b border-surface-strong bg-background shadow-card lg:hidden"
                >
                  {/* Высота ограничена: на телефоне боком (390px в высоту)
                      длинное меню упиралось бы в низ экрана. 70dvh при
                      любой реальной высоте экрана оставляют полосу шторки
                      под панелью — по ней и закрывают. */}
                  <div
                    className={`${GUTTER} flex max-h-[70dvh] flex-col overflow-y-auto overscroll-contain py-4`}
                  >
                    <nav
                      className="flex flex-col"
                      aria-label="Мобильная навигация"
                    >
                      {links.map(({ href, label }) => (
                        <NavLink
                          key={href}
                          href={href}
                          onClick={() => setOpen(false)}
                          /* 16px, а не 14: в строке шапки пункт — подпись
                             рядом с логотипом, в панели он сам себе строка
                             меню и набирается основным кеглем сайта. */
                          className="rounded-lg px-2 py-3.5 text-base hover:bg-foreground/[0.04] hover:text-foreground"
                        >
                          {label}
                        </NavLink>
                      ))}
                    </nav>

                    {/* Кнопка записи здесь — только на экранах у́же 360px,
                        где ей не нашлось места в полосе. Выше этого порога
                        она в полосе, и второй копии в панели быть не
                        должно: при открытом меню обе были бы на экране
                        одновременно. */}
                    {cta && (
                      <Button
                        href={cta.href}
                        size="lg"
                        arrow={false}
                        className="mt-3 w-full min-[360px]:hidden"
                        onClick={() => setOpen(false)}
                      >
                        {cta.label}
                      </Button>
                    )}

                    {/* Тема — последней строкой и за разделителем: это не
                        навигация, поэтому и вынесена из `<nav>`. */}
                    <div className="mt-4 border-t border-surface-strong pt-4">
                      <ThemeToggle withLabel />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>,
          document.body,
        )}
    </header>
  );
}
