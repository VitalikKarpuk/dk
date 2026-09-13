-- Схема контент-базы сайта.
--
-- В базу вынесено ровно то, что меняется от потока к потоку: номера,
-- даты, длительности, количество мест, скидки и цены. Тексты, иконки и
-- картинки остались в коде: их длина завязана на вёрстку карточек, и
-- правка через форму ломала бы раскладку молча.
--
-- Применить: psql "$POSTGRES_URL" -f lib/db/schema.sql

-- ─── Программы ───────────────────────────────────────────────────────
-- Один ряд на лендинг. Таблица широкая и почти вся необязательная:
-- рядов три, и отдельные таблицы под «у /leader есть встречи, у /proryv
-- есть годы опыта» дали бы три джойна ради пятнадцати чисел.
create table if not exists programs (
  slug                 text primary key,             -- 'leader' | 'proryv' | 'basic-laws'
  title                text        not null,

  -- Поток
  stream_number        integer,                      -- 11-й поток
  start_date           date,                         -- NULL = дата ещё не назначена
  start_label          text,                         -- что показать вместо даты: «дата уточняется»

  -- Формат
  duration_weeks       integer,
  seats                integer,                      -- мест в группе
  individual_meetings  integer,
  group_meetings       integer,
  graduates_count      text,                         -- «100+» — строка: плюс здесь смысловой
  years_experience     integer,

  -- Деньги
  discount_percent     integer,
  price_old            numeric(10, 2),
  price_new            numeric(10, 2),
  currency             text        not null default 'BYN',
  -- Цена на /proryv то показывается, то прячется — сейчас это правка
  -- закомментированного блока в вёрстке. Здесь это флаг.
  price_visible        boolean     not null default false,

  form_url             text,
  updated_at           timestamptz not null default now()
);

-- ─── Пакеты консультаций (/individual) ───────────────────────────────
-- Список фиксированный: админка правит цены и заметки, но не заводит и
-- не удаляет пакеты — добавление требует правки вёрстки (якорный пакет
-- и три спутника рисуются по-разному).
create table if not exists packages (
  id           serial primary key,
  /* Уникальный, и это не косметика: на него опирается `on conflict` в
     `seed.sql`. Без ограничения повторный запуск сидов не «ничего не
     делает», а заводит второй комплект пакетов — четыре карточки цен
     превращаются в восемь. */
  title        text           not null unique,
  price_old    numeric(10, 2),
  price_new    numeric(10, 2) not null,
  currency     text           not null default 'BYN',
  note         text,
  highlight    boolean        not null default false,  -- якорный пакет
  sort_order   integer        not null default 0,
  is_active    boolean        not null default true,
  updated_at   timestamptz    not null default now()
);

-- ─── Общесайтовое ────────────────────────────────────────────────────
-- Key/value, потому что это разнородные одиночные значения, а не набор
-- полей одной сущности. Типизация — на стороне TypeScript (lib/content.ts).
create table if not exists settings (
  key        text        primary key,
  value      text        not null,
  updated_at timestamptz not null default now()
);
