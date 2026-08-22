# Промпты для перегенерации арта под светлую тему

Весь иллюстративный арт `/leader` рисовался под тёмную тему: золотая гравюра
по чёрному, кинематографичные рендеры в тумане, тёмная вуаль. На бумажном
`#f9f8f6` он читается инородно. Здесь промпты, чтобы перерисовать его под
текущую палитру.

Промпты на английском — так их лучше понимают все генераторы. Подписи и
пояснения на русском.

---

## 1. Стилевой блок

**Вставляйте его в каждый промпт целиком.** Он и есть «наша тема» —
без него картинки снова разъедутся.

```
STYLE: editorial minimalism on warm off-white paper background #f9f8f6.
Soft diffused north-window daylight from upper left, long gentle shadows,
no harsh speculars, no rim light. Restrained palette — warm off-white,
paper white, soft lilac #d9d4ff, deep navy #0c1754 for the darkest values,
and a single electric blue #2545ff accent used sparingly on one element only.
Airy composition with generous negative space. Calm, precise, expensive,
quiet confidence. Subtle fine film grain. High key, low contrast.
```

**Негативный промпт — тоже в каждый:**

```
NEGATIVE: dark background, black background, night scene, moody, dramatic
lighting, neon, glow, bloom, volumetric fog, smoke, haze, gold, bronze,
copper, sepia, teal and orange, heavy vignette, cluttered, busy, text,
letters, words, watermark, logo, signature, oversaturated, HDR, 3D render
look, plastic
```

**Почему так.** Палитра — из `lib/design.ts`. Электрик `#2545ff` на сайте
несёт роль единственного акцента, поэтому в кадре он должен быть один: если
подсветить им три предмета, картинка начнёт спорить с кнопками и ссылками.
Золото исключено намеренно — жёлтый `#ffc13a` в системе занят бейджами, и
золотая заливка на картинке уводит внимание с них.

---

## 2. Что перегенерировать нельзя

`public/leader/photos/` — настоящие фотографии Дарьи и групп:
`hero-banner`, `dk-group`, `group`, `dk-next-step`, `gift-portrait`.
Их не генерируют, а пересобирают. Два пути:

**Цветокоррекция (быстро, без съёмки).** Сейчас кадры сняты в холодном
синем контровом свете на чёрном — на бумажной странице это тёмное пятно.
Задача колористу: поднять тени до `#e8e6e4`, убрать синий контур, свести
общий тон в тёплый нейтральный, целевая точка чёрного — не ниже `#2a2730`.
Фон за героиней вытянуть до светло-серого.

**Пересъёмка (правильно).** Референс — фото на главной и `/individual`:
дневной свет, светлый интерьер, спокойные тёплые тона. Тогда `/leader`
перестанет быть единственной страницей с тёмными портретами.

До этого страница выглядит связно: тёмный портрет на первом экране читается
как драматичный редакционный кадр, а не как ошибка. Но это единственное
место, где старая тема ещё чувствуется.

---

## 3. Эмблемы модулей — 7 штук

**Слот:** `public/leader/modules/module-<имя>.webp` — 320×320, плюс
`-160.webp` 160×160.
**Было:** золотая геральдическая гравюра с короной и монограммой по чёрному.
**Стало:** гравюра синими чернилами по бумаге — язык антикварного
сертификата, а не масонской печати.

Общая часть для всех семи:

```
Antique engraved emblem, fine line intaglio etching in electric blue ink
#2545ff on warm off-white paper #f9f8f6. Centered symmetrical heraldic
composition, thin hairline double border frame, delicate cross-hatching.
Letterpress feel with faint plate impression. Flat, no perspective,
no shading beyond hatch lines. Perfect square 1:1.
+ STYLE + NEGATIVE
```

Дальше подставляйте сюжет — имя файла и есть сюжет:

| Файл | Модуль | Сюжет в промпт |
| ---- | ------ | -------------- |
| `module-square` | 1 — стратегия и план | `SUBJECT: an architect's set square and drafting compass crossed over a gridded plan` |
| `module-column` | 2 — внутренняя опора | `SUBJECT: a single classical Doric column standing upright on a stepped base` |
| `module-cage` | 3 — ограничивающие установки | `SUBJECT: an open birdcage with its door swung wide and one bird flying out` |
| `module-scales` | 4 — деньги и чек | `SUBJECT: a balance scale in equilibrium, one pan holding coins, the other a small laurel` |
| `module-seal` | 5 — личный бренд | `SUBJECT: a wax seal stamp and its pressed impression, with a quill laid across` |
| `module-target` | 6 — маркетинг и продажи | `SUBJECT: a concentric archery target with a single arrow in the bullseye` |
| `module-funnel` | доп. модули — воронка | `SUBJECT: an alchemical glass funnel with droplets collecting into a vessel below` |

Семь эмблем идут подряд в самой длинной секции страницы, поэтому важнее
всего, чтобы они были **одинаковой плотности штриха**. Генерируйте их одной
пачкой в одну сессию и с одним seed — вразнобой они рассыпают ряд.

---

## 4. Цели — 6 штук

**Слот:** `public/leader/goals/goal-<имя>.webp`.
Три кадра 1200×800, три — 900×508, плюс варианты по 700 px ширины.
Соотношение сторон разное — смотрите таблицу, оно зашито в вёрстку.
**Было:** тёмные CGI-сцены в тумане со светящимися элементами.
**Стало:** светлая предметная сцена, почти макет из матового стекла и бумаги.

Общая часть:

```
Minimal still-life scene, matte frosted acrylic and paper objects arranged
on a seamless warm off-white surface #f9f8f6. Shot from a low three-quarter
angle, shallow depth of field, soft daylight, long soft shadows falling to
the right. Photographic, medium format, 85mm, f/4 — not a 3D render.
Wide horizontal composition with empty space on the left third for text.
+ STYLE + NEGATIVE
```

| Файл | Размер | Сюжет в промпт |
| ---- | ------ | -------------- |
| `goal-system` | 1200×800 | `SUBJECT: a set of nested modular blocks assembling into one clean structure` |
| `goal-income` | 1200×800 | `SUBJECT: a row of frosted glass bars rising in even ascending steps, the tallest one tinted electric blue` |
| `goal-team` | 1200×800 | `SUBJECT: five smooth spheres of slightly different sizes gathered in a loose circle, one tinted electric blue` |
| `goal-leader` | 900×508 | `SUBJECT: a single tall paper form standing ahead of a soft row of shorter ones` |
| `goal-course` | 900×508 | `SUBJECT: an open book with clean blank pages and paper cards fanned beside it` |
| `goal-flow` | 900×508 | `SUBJECT: a ribbon of paper curving smoothly through space in one continuous unbroken line` |

У `goal-income` вёрстка ставит `object-bottom`, у `goal-flow` —
`object-right`. Держите главный объект соответственно у нижнего и правого
края, иначе кроп его срежет.

---

## 5. Состав программы — 9 штук

**Слот:** `public/leader/program/program-<имя>.webp` — 800×452 (16:9), плюс
`-320.webp` 320×181.
**Было:** тёмная предметка в тёплом контровом свете.
**Стало:** та же предметка, но дневная и светлая.

Общая часть:

```
Overhead-to-45-degree product still-life on a warm off-white surface
#f9f8f6, soft daylight from upper left, natural soft shadows. Real objects,
tactile materials — paper, matte ceramic, linen, light wood. One object may
carry a small electric blue #2545ff detail. Cinematic 16:9 crop, centered
subject, calm and uncluttered.
+ STYLE + NEGATIVE
```

| Файл | Пункт программы | Сюжет в промпт |
| ---- | --------------- | -------------- |
| `program-weeks` | 7 недель обучения | `SUBJECT: an open planner with seven marked week spreads, a pencil resting across it` |
| `program-meetings` | 6 индивидуальных встреч | `SUBJECT: two ceramic cups facing each other across a light table, one notebook open beside them` |
| `program-speaking` | ораторское мастерство | `SUBJECT: a clean modern microphone on a light stand, matte white body` |
| `program-group` | 2 групповых встречи | `SUBJECT: several cups and notebooks arranged around a round light table, seen from above` |
| `program-homework` | домашние задания | `SUBJECT: a stack of handwritten pages with a fountain pen laid across the top sheet` |
| `program-chat` | чат поддержки | `SUBJECT: a phone lying face up on light linen, blank screen with a soft blue tint` |
| `program-collab` | коллаборации | `SUBJECT: two hands from opposite sides placing puzzle-like paper shapes together` |
| `program-clients` | новые клиенты | `SUBJECT: a fan of blank business cards spread on a light surface, one card tinted electric blue` |
| `program-immersion` | полное погружение | `SUBJECT: a magnifying glass resting over an open notebook page` |

Девять кадров стоят сеткой три на три — снимайте их **с одной высоты и с
одним направлением света**. Разнобой ракурсов в сетке заметнее, чем разнобой
сюжетов.

---

## 6. Фон секции «Но при этом» — 1 штука

**Слот:** `public/leader/sections/difficulties-veils.webp` — 1200×2125
(вертикаль), плюс `-800.webp` 800×1417.
**Было:** тёмная вуаль по краям вокруг чёрной пустоты.
**Стало:** то же построение, но светлое.

```
SUBJECT: layers of sheer translucent white and pale lilac #d9d4ff fabric
gauze, gathered along the left and right edges of a tall vertical frame,
leaving the entire centre of the image completely empty and clean.
Backlit by soft daylight so the fabric glows. Extremely airy and light.
Tall vertical 9:16 composition.
+ STYLE + NEGATIVE
```

Два требования важнее красоты:

1. **Центр должен быть пустым.** Поверх него идёт колонка с текстом; любой
   объект в середине полезет под буквы.
2. **Ткань — светлее середины, а не темнее.** Картинка ставится на
   `opacity: 0.38`, поэтому тёмные складки на бумажном фоне читаются грязью.

---

## 7. Картинка для соцсетей

**Слот:** `public/leader/og-image.jpg` — 1200×630.

Её собирали скриптом: фон из арта секций плюс наложенный текст, отрендеренный
в браузере — чтобы шрифты совпадали с сайтом. Перегенерируйте сначала арт
секций, потом соберите OG заново тем же способом: текст в макете не рисуют
генератором, иначе получите нечитаемые псевдобуквы.

Если собираете вручную: фон `#f9f8f6`, заголовок «Я ЛИДЕР» — Manrope 500,
чернила `#171417`, подзаголовок — электрик `#2545ff` курсивом Playfair.

---

## 8. Что делать с готовыми файлами

Генератор отдаёт PNG или JPEG — в репозиторий кладут WebP двух размеров.

```bash
# Полный размер (пример для целей 1200×800)
cwebp -q 82 goal-system.png -o goal-system.webp

# Мелкий вариант: сначала ресайз, потом кодирование —
# кодировать из уже сжатого webp нельзя, наберёте потери второго поколения
sips -Z 700 goal-system.png --out /tmp/goal-system-700.png
cwebp -q 82 /tmp/goal-system-700.png -o goal-system-700.webp
```

Ширины по группам — те же, что сейчас, они выведены из реального размера
слота при DPR 2 и просто так не меняются:

| Группа | Полный | Мелкий | Качество |
| ------ | ------ | ------ | -------- |
| `goals/` | 1200 или 900 | 700 | `-q 82` |
| `program/` | 800 | 320 | `-q 82` |
| `modules/` | 320 | 160 | `-q 85` |
| `sections/` | 1200 | 800 | `-q 60` |

У фона секции качество ниже сознательно: он идёт под `opacity: 0.38` и ещё
под двумя слоями, видимая ошибка выходит около одного уровня из 255.

Имена файлов менять нельзя — они прописаны в `components/leader/content.ts`
и в секциях. Кладите новые файлы поверх старых, под теми же именами.

После замены прогоните `npm run build` и откройте `/leader`: если файл не
подхватился, на его месте останется пустая карточка, а не ошибка.
