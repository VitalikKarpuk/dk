"use client";

import { AmbientBackdrop, SiteHeader } from "./linear";
import {
  HeroSection,
  GoalsSection,
  IssuesSection,
  NextStepSection,
  ProgramSection,
  OutcomesSection,
  PreorderSection,
  ModulesSection,
  UniquenessSection,
  PricingSection,
  GiftSection,
  LeaderFooter,
} from "./sections";

/**
 * Страница `/leader` — дизайн-система «Linear / Modern».
 *
 * Здесь только каркас и порядок секций: фон, навигация, последовательность.
 * Вся вёрстка — в `./sections`, по файлу на секцию; тексты и данные — в
 * `./content.ts`. Порядок ниже — единственное место, где он задан.
 *
 * `AmbientBackdrop` стоит `fixed` под всей страницей, поэтому контент едет
 * в отдельном слое с `z-10`.
 *
 * Это граница клиента для всей страницы: секции держатся на framer-motion,
 * состоянии навигации и обработчиках мыши, поэтому серверными они быть не могут.
 * Заголовок и OG-теги задаёт `app/leader/page.tsx` через `metadata`.
 */
export function LeaderDarkPage() {
  // `leader-root` — не для стилей самой страницы: по нему globals.css
  // перекрашивает `html` в тёмный, иначе при overscroll видна светлая
  // подложка остального сайта.
  return (
    <div className="leader-root relative min-h-screen bg-background font-sans text-foreground antialiased">
      <AmbientBackdrop />

      <div className="relative z-10">
        {/* Без параметров — тот же набор ссылок и та же кнопка, что на
            остальных страницах. Своя навигация по секциям здесь была и
            соблазн оставить её велик: страница длинная, якоря удобны. Но
            тогда единственная страница, с которой нельзя уйти на соседнюю
            программу, — самая посещаемая, а шапка меняется от страницы к
            странице и перестаёт быть общей.

            Якоря никуда не делись: они в подвале страницы (`LeaderFooter`,
            «Разделы», тот же `navLinks`), а кнопка записи — в теле, в
            `PreorderSection` и `PricingSection`. */}
        <SiteHeader />

        <HeroSection />
        <GoalsSection />
        <IssuesSection />
        <NextStepSection />
        <ProgramSection />
        <OutcomesSection />
        <PreorderSection />
        <ModulesSection />
        <UniquenessSection />
        <PricingSection />
        <GiftSection />
        <LeaderFooter />
      </div>
    </div>
  );
}
