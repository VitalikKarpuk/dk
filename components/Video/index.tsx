"use client";

import { useRef, useState } from "react";
import { Button, Reveal } from "@/components/ui";
import { COLORS, CONTAINER, SECTION_PADDING, TYPE } from "@/lib/design";


const VIDEO_SRC = "/videoFinal.mp4";
// TODO: replace with the real questionnaire URL
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfRdfLMjzVz8-JkYcIDimeecOXU0Gnlr80m8T5VsfBZZP9u0Q/viewform?usp=publish-editor";

export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null);
  /* `started`, а не `playing`, и разница не в имени. С `playing` шторка
     возвращалась на каждую паузу: человек останавливал кадр, поверх него
     тут же вставала кнопка «воспроизвести», а нативные `controls`
     исчезали — продолжить с той же секунды было нечем. Первый пуск
     необратим: шторка уходит один раз и дальше не мешает. */
  const [started, setStarted] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setStarted(true);
  };

  return (
    /* Без собственной заливки: она повторяла фон страницы и ничего не
       добавляла, зато в тёмной теме глушила ambient-подложку — секции
       на /leader по той же причине прозрачны. */
    <section className="relative w-full overflow-hidden" aria-label="Видео">
      {/* Одно мягкое свечение по центру — под самим плеером.

          Было два цветных пятна по углам секции, лиловое сверху слева и
          голубое снизу справа, оба в blur-3xl и почти в полную силу. Они
          читались не светом, а двумя кляксами: источник у каждого свой,
          ни один не совпадал с плеером, а поверх ambient-подложки
          страницы (та уже несёт цветные пятна) секция выходила
          замусоренной. Здесь свет один и идёт из-под карточки — она
          стоит в нём, а не рядом с ним. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] md:h-[720px] md:w-[720px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 20%, transparent) 0%, color-mix(in srgb, var(--surface-strong) 28%, transparent) 45%, transparent 70%)",
        }}
      />

      <div className={`relative flex flex-col items-center gap-10 md:gap-12 ${CONTAINER} ${SECTION_PADDING}`}>
        {/* Секция въезжает тем же жестом, что и остальные: до этого
            плеер с кнопкой просто стоял на месте. */}
        <Reveal className="relative">
          {/* `group` на обёртке, а не на самой карточке: паспарту лежит
              снаружи `card-frame` и её собственного `:hover` не видит —
              без общей группы линия на курсор не отвечала и отклик
              распадался на два несогласованных контура. */}
          <div className="video-mount group relative">
            <div
              aria-hidden
              /* Радиус = радиус карточки (16) + отступ рамки, иначе внешний
                 контур не параллелен внутреннему и углы расходятся. Отступ
                 меняется на md, значит и радиус должен — потому классами,
                 а не inline-стилем: тот не знает про брейкпоинты.

                 Цвет и переход — в классе `.video-mat` ниже: линия уходит
                 в акцент вместе с рамкой карточки (`.card-frame:hover`,
                 globals.css), а это состояние группы, которое inline-стиль
                 тоже не выражает. */
              className="video-mat pointer-events-none absolute -inset-5 rounded-[36px] md:-inset-7 md:rounded-[44px]"
            />

            <div
              className="card-frame aspect-square w-[80vw] max-w-[480px] overflow-hidden"
              style={{ backgroundColor: COLORS.navy }}
            >
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                className="absolute inset-0 h-full w-full object-contain"
                controls={started}
                playsInline
                preload="metadata"
                /* Пуск идёт не только с нашей кнопки: после первого
                   запуска работают нативные `controls`, и состояние
                   обязано сходиться с ними, а не только с обработчиком
                   клика по шторке. */
                onPlay={() => setStarted(true)}
              />

              {!started && (
                <button
                  type="button"
                  onClick={play}
                  aria-label="Воспроизвести видео"
                  /* Сжатие при нажатии — то же, что у кнопок и ссылок
                     сайта, но не классом `press`: тот сжимает элемент,
                     на котором стоит, а здесь это шторка во весь кадр.
                     На 0.98 её края отходили от рамки и по краям кадра
                     на мгновение проступала щель. Жмётся диск — см.
                     `.video-play:active .video-disc` ниже.

                     `cursor-pointer` явно: Tailwind сбрасывает курсор у
                     `<button>`, поэтому его прописывает и `ui/Button`. */
                  className="video-play absolute inset-0 z-[1] flex cursor-pointer items-center justify-center"
                >
                  {/* Шторка держит только основание кадра.

                      Был градиент во всю высоту, от 0.18 до 0.5 навахо:
                      кадр под ним гас целиком и до нажатия читался не
                      видео, а тёмной плашкой с кнопкой. Здесь верх
                      открыт, затемнение идёт снизу — ровно чтобы диск не
                      всплывал на светлом пятне, — и на наведении
                      отступает ещё. */}
                  <span
                    aria-hidden
                    className="video-scrim absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 35%, color-mix(in srgb, var(--navy) 45%, transparent) 100%)",
                    }}
                  />

                  {/* Пульс — одно расходящееся кольцо в 1px.

                      Было два залитых круга акцентом в полсилы, друг за
                      другом через 1.2s: на кадре 480px это давало
                      мигающее синее пятно шириной в треть плеера. Контур
                      расходится тем же жестом, но кадр сквозь него виден. */}
                  <span
                    aria-hidden
                    className="video-halo absolute h-16 w-16 rounded-full md:h-[72px] md:w-[72px]"
                  />

                  {/* Диск — стекло, а не заливка.

                      Была кнопка 80/96px, залитая акцентом, в жёстком
                      кольце `0 0 0 4px paper`: белый обод врезался в
                      кадр, а сам круг занимал пятую часть плеера. Здесь
                      диск полупрозрачный с размытием — кадр под ним
                      читается, — и в акцент он заливается только под
                      курсором, когда это уже отклик, а не декорация.

                      Цвета фиксированные (`on-accent`), потому что диск
                      лежит не на теме, а на кадре: тот в обеих темах
                      один и тот же. С `--card` в тёмной теме вышло бы
                      почти-чёрное стекло на тёмном видео. */}
                  <span
                    className="video-disc relative flex h-16 w-16 items-center justify-center rounded-full md:h-[72px] md:w-[72px]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                      aria-hidden
                      className="ml-0.5"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col items-center gap-3">
          <Button href={FORM_URL} size="lg">
            Записаться на консультацию
          </Button>
          <span style={{ ...TYPE.caption, color: COLORS.muted }}>
            Анкета — 1 минута
          </span>
        </Reveal>
      </div>

      <style>{`
        .video-mat {
          border: 1px solid color-mix(in srgb, var(--surface-strong) 60%, transparent);
          transition: border-color var(--dur-hover) var(--ease-brand);
        }
        /* Паспарту и рамка карточки отвечают на курсор одним цветом и за
           одно время — иначе на ховере видно, как один контур догоняет
           другой. Значение то же, что у .card-frame:hover в globals.css. */
        .video-mount:hover .video-mat,
        .video-mount:focus-within .video-mat {
          border-color: color-mix(in srgb, var(--accent) 40%, transparent);
        }

        .video-scrim {
          transition: opacity var(--dur-hover) var(--ease-brand);
        }
        .video-play:hover .video-scrim {
          opacity: 0.6;
        }

        .video-disc {
          background: color-mix(in srgb, var(--on-accent) 82%, transparent);
          -webkit-backdrop-filter: blur(10px) saturate(1.3);
          backdrop-filter: blur(10px) saturate(1.3);
          color: var(--accent-fill);
          box-shadow: 0 14px 34px -14px rgba(0, 0, 0, 0.55);
          transition: background-color var(--dur-hover) var(--ease-brand),
            color var(--dur-hover) var(--ease-brand),
            scale var(--dur-hover) var(--ease-brand);
        }
        .video-play:hover .video-disc,
        .video-play:focus-visible .video-disc {
          background: var(--accent-fill);
          color: var(--on-accent);
          scale: 1.06;
        }
        .video-play:active .video-disc {
          scale: 0.98;
        }
        /* Кольцо фокуса рисуется на диске, а не на кнопке: та растянута
           во весь кадр, и обводка по её краю совпала бы с рамкой
           карточки — с клавиатуры было не понять, что фокус здесь. */
        .video-play:focus-visible {
          outline: none;
        }
        .video-play:focus-visible .video-disc {
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 55%, transparent),
            0 14px 34px -14px rgba(0, 0, 0, 0.55);
        }

        /* Единственное место на сайте, где кривая не брендовая, и это
           намеренно. --ease-brand — expo-out: почти весь путь она
           проходит в первые 15% времени. Для отклика на курсор это и
           нужно (интерфейс отвечает мгновенно), но в бесконечной петле
           кольцо выстреливало наружу за полсекунды и потом висело
           невидимым до конца цикла — читалось рывком, а не дыханием.
           Здесь ровное ease-out: скорость падает плавно по всему пути. */
        .video-halo {
          border: 1px solid color-mix(in srgb, var(--on-accent) 55%, transparent);
          animation: video-pulse 4s cubic-bezier(0.33, 0, 0.3, 1) infinite;
        }
        /* Вход через прозрачность, а не с полной силы: на стыке циклов
           кольцо возвращалось в исходный размер уже видимым, и каждый
           повтор начинался вспышкой у самого диска. */
        @keyframes video-pulse {
          0% { transform: scale(0.94); opacity: 0; }
          18% { opacity: 0.42; }
          72% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .video-halo { animation: none; opacity: 0.3; }
          /* То же, что globals.css делает для .press: масштаб снят,
             отклик остаётся заливкой и цветом. */
          .video-play:hover .video-disc,
          .video-play:focus-visible .video-disc,
          .video-play:active .video-disc { scale: none; }
        }
      `}</style>
    </section>
  );
}
