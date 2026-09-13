This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Страницы

| Маршрут       | Что это                                            |
| ------------- | -------------------------------------------------- |
| `/`           | Главная: обложка, направления, отзывы, диагностика  |
| `/leader`     | «Я ЛИДЕР» — 7-недельная программа                   |
| `/individual` | Индивидуальные консультации                         |
| `/basic-laws` | Курс «Базовые законы жизни»                         |
| `/proryv`     | Проект «ПРОРЫВ»                                     |

## Дизайн-система

Палитра, типографика и каркас на сайте одни. Источники правды — ровно два:

| Файл | Что держит |
| ---- | ---------- |
| `app/globals.css` | цветовые токены, тени, кривая, анимации |
| `lib/design.ts` | те же цвета через `var()` + шкала `TYPE`, сетка, радиусы |

Плюс `lib/site.ts` — данные, одинаковые на всех страницах: автор, реквизиты,
соцсети, меню программ (`PROGRAM_LINKS`) и кнопка шапки (`DIAGNOSTIC_CTA`).

### Каркас

Один на весь сайт, задаётся компонентом `Section` (`components/ui`):

| Токен | Значение | Где |
| ----- | -------- | --- |
| `CONTAINER` | `max-w-[1400px]` | колонка всех страниц, шапки и подвала |
| `GUTTER` | `px-6 md:px-12` | горизонтальные поля |
| `SECTION_Y` | `py-16 md:py-24` | вертикальный ритм секции |
| `HERO_Y` | `pt-12 pb-16 md:pt-16 md:pb-24` | ритм первого экрана |
| `MEASURE` | `max-w-[68ch]` | колонка сплошного текста |

Своих отступов и своей ширины колонки у страницы быть не должно: раньше их
было три набора (`/leader` — `max-w-6xl px-5`, подстраницы — `py-10 md:py-14`,
главная — `py-20 md:py-28`), и при переходе между страницами разъезжались поля.

### Типографика

Все заголовки и подписи берут ступень из `TYPE`, а не свой `clamp()`:
`hero → display → section → subsection → cardTitle` для заголовков,
`quote` для врезок, `numeral` / `numeralLarge` для цен и счётчиков,
`eyebrow → lead → body → caption` для текста. Ключевое слово в заголовке
всегда одно и то же: курсив Playfair электриком (`ItalicAccent`).

Палитра «редакционная»: бумага `#f9f8f6`, чернила `#171417`, электрик `#2545ff`,
лиловый `#d9d4ff` на границах, жёлтый `#ffc13a` на бейджах, navy `#0c1754` —
тёмный контрапункт. Все пары проходят WCAG AA для обычного текста.

**В классах Tailwind пользуйтесь токенами** (`bg-background`, `text-accent`,
`border-surface-strong`), а не хардкодом hex. `lib/design.ts` — только там, где
без inline-стиля не обойтись: градиенты, SVG-заливки, переменные колец фокуса.
В `lib/design.ts` лежат не цвета, а `var(--…)`: hex попал бы в DOM литералом
и не отозвался бы на смену темы.

### Две темы

Светлая по умолчанию, тёмная — по кнопке в шапке; выбор запоминается в
`localStorage`. Системную настройку не читаем: первое впечатление от сайта
всегда одно. Скрипт в `<head>` (`app/layout.tsx`) проставляет тему до первого
кадра, иначе страница мигала бы белым.

Тёмная тема — палитра «Linear / Modern», на которой раньше жила `/leader`.
Значения взяты из `../dariacushnerova/tailwind.config.ts` буквально, не на глаз:

| Токен | Исходник | |
| ----- | -------- | - |
| `--background` | `linear-base` | `#050506` |
| `--card` | `linear-elevated` | `#0a0a0c` |
| `--surface` | `linear-input` | `#0f0f12` |
| `--foreground` | `linear-fg` | `#ededef` |
| `--muted` | `linear-fg-muted` | `#8a8f98` |
| `--accent` | `linear-accent-bright` | `#6872d9` |
| `--accent-fill` | `linear-accent` | `#5e6ad2` |

Переопределяются **только значения переменных** в `:root[data-theme="dark"]`;
правил для компонентов там нет, поэтому вёрстка о теме не знает.

Три вещи, о которые легко споткнуться:

- **Не всё переворачивается.** Жёлтый бейдж одинаково читается на бумаге и на
  чёрном, поэтому `--accent-soft` и текст на нём (`--on-accent-soft`) в обеих
  темах одни и те же. Так же `--on-accent` — белый текст на заливке.
- **Акцент раздвоен, и так было в исходнике.** На `#050506` один синий не может
  быть и читаемым текстом, и заливкой под белой надписью: `#6872d9` даёт 4.85
  как текст, но 4.20 под белым; у `#5e6ad2` наоборот — 4.33 и 4.70. Окно
  значений, проходящих AA в обеих ролях, пусто, поэтому цветов и было два.
- **Тёмная плашка — это `bg-navy`, а не `bg-foreground`.** Второе честно
  инвертируется в светлое, и белые надписи на нём пропадают.

Своих значений в исходнике не было только у двух ролей, и обе выведены из его
же величин: `--surface-strong` = `border-white/10` поверх base, `--navy` =
accent 14% поверх elevated (верхняя точка градиента accent-карточки).

Составные слои (шторки над фото, ambient-фон, тени) тоже вынесены в переменные
— см. `--hero-curtain`, `--text-scrim`, `--ambient-*` в `globals.css`.

### Компоненты

Всё повторяющееся живёт в `components/ui/` и берётся оттуда:

| Компонент | Роль |
| --------- | ---- |
| `SiteHeader` | шапка: липкая полоса с размытием, меню программ, кнопка |
| `Section` | секция: колонка, поля, ритм, тон подложки (`paper`/`cool`/`navy`) |
| `SectionHeading`, `Eyebrow` | надзаголовок + заголовок с курсивной вставкой |
| `Button`, `QuietLink` | кнопка-капсула (`primary`/`secondary`/`ghost`/`onDark`/`soft`) и ссылка-действие |
| `Badge`, `IconBubble` | пилюля-подпись и кружок с иконкой |
| `Card` | карточка: контур `.card-frame`, три тона заливки |
| `Display`, `Lead`, `Body`, `CardTitle`, `Numeral`, `Quote`, `ItalicAccent` | ступени типографики |

Подвал один (`components/Footer`) — страница передаёт ему свой призыв и свои
колонки ссылок, но не свою вёрстку. Новую страницу собирайте из этого набора:
рукописная копия кнопки или секции неизбежно разъедется с остальными.

### `/leader`

Перенесена из отдельного Vite-проекта (`../dariacushnerova`) и до объединения
жила на своей тёмной гамме, своей сетке и своём наборе компонентов. Сейчас на
общей палитре, общем каркасе и общих примитивах — `components/leader/linear/`
остался тонкой пересылкой в `components/ui`. Своего у страницы два:

- `components/leader/course.ts` — константы потока (номер, даты, скидка, ссылка
  на анкету). При запуске нового потока правится только он;
- у страницы якорная навигация, поэтому плавный скролл включён адресно —
  правилом `html:has(.leader-root)` в `globals.css`.

Исходник был на Tailwind v3, здесь v4 — это не только новый конфиг. **В
произвольных значениях разделяйте части подчёркиванием, а не запятой:**
`grid-cols-[1fr_auto]`, не `grid-cols-[1fr,auto]`. v3 сам менял запятые на
пробелы, v4 отдаёт значение как есть — получается `grid-template-columns:
1fr,auto`, браузер молча выбрасывает всё объявление, и сетка схлопывается в
одну колонку. Ошибка бесшумная: сборка проходит, типы проходят, линтер
молчит. Проверять — в браузере: правило с селектором и нулём объявлений
(`rule.style.length === 0`) и есть выброшенное.

Ещё две вещи оттуда же: под SSR `motion.div` c MotionValue в `style` не
совпадает с серверной разметкой, поэтому `ParallaxHero` включает параллакс
только после гидрации, а `useScroll({ target })` живёт в отдельном
компоненте — рядом со своим ref. И `fetchPriority` пишется camelCase:
обходной приём из исходника был под React 18.3, в 19-м всё наоборот.

Вёрстка — в `components/leader/`, арт — в `public/leader/`.

## Контент в базе

Даты, сроки, цифры и цены живут в Postgres, а не в коде: они менялись
каждый поток, и каждая правка была коммитом с деплоем. Редактируются на
`/admin` — одна страница с формами, вход по логину и паролю.

В базе только **значения**: номер потока, дата старта, длительность,
количество мест и встреч, выпускники, скидка, цены пакетов и адреса
анкет. Тексты, фото, иконки и порядок секций остались в коде — их длина
завязана на вёрстку карточек, и правка через форму ломала бы раскладку
молча.

### Устройство

| Файл | Роль |
| --- | --- |
| [`lib/db/schema.sql`](lib/db/schema.sql) | Таблицы: `programs`, `packages`, `settings` |
| [`lib/db/seed.sql`](lib/db/seed.sql) | Начальные значения — те же, что были в коде |
| [`lib/db/client.ts`](lib/db/client.ts) | Подключение; мягкий отказ вместо пятисотки |
| [`lib/content.ts`](lib/content.ts) | Типы, чтение, кэш и значения по умолчанию |
| [`lib/format.ts`](lib/format.ts) | Даты по-русски, цены, склонения при числах |
| [`app/admin/`](app/admin/) | Формы редактирования и Server Actions |
| [`lib/auth/`](lib/auth/) | Сессия в куке, проверка пароля |
| [`proxy.ts`](proxy.ts) | Оптимистичный редирект гостя с `/admin` |

Лендинги остаются статикой: в базу ходит сборка, а не посетитель. После
сохранения админка гасит кэш (`updateTag` + `revalidatePath`), и Next
пересобирает затронутые страницы.

**Без базы сайт работает.** `POSTGRES_URL` не задан или запрос упал —
страницы берут значения из `DEFAULTS` в `lib/content.ts`, сборка
проходит, админка честно предупреждает, что сохранять некуда. Это
сделано ради разработки и аварии, а не как основной режим: ошибка
подключения пишется в логи.

### Настройка

**1. База.** В Vercel → Storage → Create Database выберите **Neon**
(Serverless Postgres). Переменные подключения интеграция заведёт сама —
код читает `DATABASE_URL`, а если её нет, то `POSTGRES_URL`.

Затем примените схему и начальные данные (строку подключения возьмите
в дашборде Neon или через `vercel env pull`):

```bash
psql "$DATABASE_URL" -f lib/db/schema.sql
psql "$DATABASE_URL" -f lib/db/seed.sql   # повторный запуск ничего не затирает
```

Подойдёт любой Postgres, не только Neon: драйвер обычный, а не
neon-специфичный. Мимо проходит только Prisma Postgres — он отдаёт
адрес вида `prisma+postgres://` для своего прокси, и обычным клиентом
он не открывается.

**2. Доступ.** Три переменные: логин, хэш пароля и ключ подписи сессии.

```bash
openssl rand -base64 32                              # → SESSION_SECRET
node lib/auth/hash-password.mjs 'ваш-длинный-пароль' # → ADMIN_PASSWORD_HASH
```

Логин — любой, какой удобно. Пароль нигде не хранится, только его хэш;
сменить пароль значит заменить хэш и передеплоить.

В Vercel → Settings → Environment Variables значения вставляются как
есть. Отметьте все три окружения (Production, Preview, Development) и
**передеплойте** — переменные подхватываются только новой сборкой.

> **Доллары в хэше.** В `.env`-файле каждый `$` нужно экранировать
> обратным слэшем: `ADMIN_PASSWORD_HASH=\$2b\$12\$…`. Next разворачивает
> `$ИМЯ` как ссылку на другую переменную, и от неэкранированного хэша
> остаётся хвост после последнего `$` — верный пароль отвергается как
> неверный. Кавычки не помогают, только обратный слэш. В интерфейсе
> Vercel экранировать не нужно. Скрипт печатает обе записи, а форма
> входа распознаёт обрезанный хэш и говорит об этом прямо.

**3. Локально.** Скопируйте [`.env.example`](.env.example) в
`.env.local` и заполните те же ключи (с экранированием). Подойдёт и
обычный Postgres на машине — драйвер не привязан к Neon.

После этого `/admin` открывается по логину, а `/login` — форма входа.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
