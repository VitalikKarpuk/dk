-- Начальные значения: ровно то, что сейчас зашито в коде.
--
-- После применения сайт обязан выглядеть так же, как до перехода на базу.
-- Идемпотентно: on conflict do nothing, повторный запуск ничего не затрёт.
--
-- Применить: psql "$POSTGRES_URL" -f lib/db/seed.sql

insert into programs (
  slug, title,
  stream_number, start_date, start_label,
  duration_weeks, seats, individual_meetings, group_meetings,
  graduates_count, years_experience,
  discount_percent, price_old, price_new, currency, price_visible,
  form_url
) values
  (
    'leader', 'Я ЛИДЕР',
    -- Дата вшита строкой «8 октября» в STREAM_BADGE_WITH_DATE; год берём
    -- текущий сезон. Константа STREAM_START_DATE («1 июля») была мёртвой
    -- и разъехалась с тем, что видел посетитель, — ради этого база и заводится.
    11, date '2026-10-08', null,
    7, null, 6, 2,
    '100+', null,
    40, null, null, 'BYN', false,
    'https://docs.google.com/forms/d/e/1FAIpQLSfHR3ux5r_w8wioGZPSX-timJ9i9sAoceCy6CGscDVF9Fklqw/viewform?usp=sharing'
  ),
  (
    'proryv', 'ПРОРЫВ',
    1, null, 'Старт по мере набора группы',
    6, 7, null, null,
    null, 8,
    null, 350.00, 175.00, 'USD', false,   -- цена сейчас скрыта (блок закомментирован)
    'https://forms.gle/4iHzX8ZwvCpiS62h8'
  ),
  (
    'basic-laws', 'Базовые законы',
    null, null, 'Дата уточняется',
    4, null, null, null,
    null, null,
    null, null, null, 'BYN', false,
    null
  )
on conflict (slug) do nothing;

insert into packages (title, price_old, price_new, currency, note, highlight, sort_order) values
  ('Разовая консультация', 250.00,  190.00,  'BYN', 'Полуторачасовая встреча + 7 недель сопровождения в чате', false, 1),
  ('Пакет из 3 встреч',    500.00,  450.00,  'BYN', null,                                                      false, 2),
  ('Пакет из 5 встреч',    850.00,  700.00,  'BYN', null,                                                      true,  3),
  ('Пакет из 10 встреч',   1350.00, 1200.00, 'BYN', null,                                                      false, 4)
on conflict (title) do nothing;

insert into settings (key, value) values
  ('copyright_years',      '2020–2026'),
  ('diagnostic_form_url',  'https://docs.google.com/forms/d/e/1FAIpQLSeifCxZg3TOYUceGHvoYSTDsk3ItvOZG5Ll-TJWFEEQynBu-w/viewform'),
  ('individual_form_url',   'https://docs.google.com/forms/d/e/1FAIpQLSfRdfLMjzVz8-JkYcIDimeecOXU0Gnlr80m8T5VsfBZZP9u0Q/viewform?usp=publish-editor')
on conflict (key) do nothing;
