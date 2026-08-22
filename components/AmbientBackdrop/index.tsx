/**
 * Трёхслойный фон страницы. Ни один слой не доминирует — глубина
 * рождается из наложения:
 *   1. мягкий радиальный градиент от верха,
 *   2. зерно (убирает бандинг на больших заливках),
 *   3. дрейфующие ambient-пятна.
 *
 * Ставится один раз на страницу с `fixed`, чтобы пятна не удлиняли
 * документ и не пересчитывались на каждой секции. Содержимое страницы
 * при этом обязано лежать в слое с `relative z-10` — иначе подложка,
 * будучи позиционированной, закроет его собой.
 *
 * Была частью только /leader. Именно она и держала глубину его тёмной
 * темы: остальные страницы на почти-чёрном выглядели плоско, потому что
 * у них весь фон сводился к одной заливке. Токены слоёв всегда были
 * общесайтовыми, так что подложке здесь и место.
 *
 * На тёмной теме это были «лужи света» на почти-чёрном: насыщенный индиго
 * в четверть непрозрачности, фиолетовый и розовый. На бумаге такие же
 * плотности дали бы грязные разводы, поэтому здесь те же слои, но заметно
 * прозрачнее и в цветах палитры — лиловый и электрик по off-white.
 */
export function AmbientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* 1 — база. Сам градиент и плотности пятен заданы переменными в
          globals.css: на бумаге это едва заметная дымка, на тёмной теме —
          исходные «лужи света» на почти-чёрном. */}
      <div className="absolute inset-0" style={{ background: "var(--ambient-base)" }} />

      {/* 2 — зерно. На почти-чёрном оно заметнее при той же
          непрозрачности, поэтому в тёмной теме его меньше. */}
      <div className="grain absolute inset-0" style={{ opacity: "var(--ambient-grain)" }} />

      {/* 3 — ambient-пятна.
          На мобильном радиус размытия вдвое меньше, а два боковых пятна сняты
          совсем: четыре элемента с blur(100–150px) на площади в 1400px — это
          заметная нагрузка на композитор телефона, из-за которой скролл
          подрагивает. Визуально на 390px разница почти незаметна: пятна всё
          равно выходят за пределы вьюпорта. */}
      <div
        className="absolute left-1/2 top-[-30rem] h-[87.5rem] w-[56.25rem] -translate-x-1/2 rounded-full blur-[70px] animate-ambient-drift md:blur-[150px]"
        style={{ background: "var(--ambient-blob-1)" }}
      />
      <div
        className="absolute left-[-12rem] top-[20%] hidden h-[50rem] w-[37.5rem] rounded-full blur-[120px] animate-ambient-drift-alt md:block"
        style={{ background: "var(--ambient-blob-2)" }}
      />
      <div
        className="absolute right-[-10rem] top-[45%] hidden h-[43.75rem] w-[31.25rem] rounded-full blur-[100px] animate-ambient-drift md:block"
        style={{ background: "var(--ambient-blob-3)" }}
      />
      <div
        className="absolute bottom-[-16rem] left-1/3 h-[37.5rem] w-[37.5rem] rounded-full blur-[60px] animate-ambient-pulse md:blur-[130px]"
        style={{ background: "var(--ambient-blob-4)" }}
      />
    </div>
  );
}
