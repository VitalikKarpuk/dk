import { ArrowRight } from "lucide-react";
import {
  FORM_URL,
  STREAM_BADGE_WITH_DATE,
  CTA_DISCOUNT,
  DURATION_LABEL_ADJ,
  AUTHOR_NAME,
  AUTHOR_ROLE,
  COURSE_NAME,
} from "../course";
import {
  SpotlightCard,
  LinearButton,
  QuietLink,
  Display,
  ShimmerText,
  Lead,
  Reveal,
  Stagger,
  StaggerItem,
  ParallaxHero,
} from "../linear";
import { heroProof } from "../content";
import { Badge } from "@/components/ui";
import { CONTAINER, GUTTER, COLORS, HERO_LONG_FACE } from "@/lib/design";

/**
 * Фигура героя: 1672×941, кадрировка прежняя (героиня с 56% по 92%
 * ширины), но фон вырезан — в файле альфа.
 *
 * Отсюда файл один на обе темы, хотя раньше их было два. Различались они
 * не цветами, которые подставились бы из `globals.css`, а самим фоном
 * кадра: жакет на песочной студии против жакета на чёрном. Без фона
 * различать нечего — фигура ложится на фон страницы, какой бы он ни был.
 *
 * Вырезка убрала заодно и всю обвязку, которая этот фон прятала: угловую
 * растушёвку по силуэту, овал вокруг фигуры и «шторку» под текстом на
 * десктопе. Прятать больше нечего.
 */
const heroFigure = "/leader/photos/hero-figure.webp";
const heroFigure900 = "/leader/photos/hero-figure-900.webp";

/**
 * Полоса кадра в узком окне: своя коробка вокруг <img>.
 *
 * Растушёвка одна и та же по смыслу в обоих окнах — нижняя: у файла
 * фигура срезана по нижнему краю, и без неё жакет обрывался ровной
 * горизонталью — в узком окне прямо над кнопкой, в широком по границе
 * секции. Длина разная на каждой ступени: чем уже окно, тем раньше под
 * кадром начинается текст, и тем раньше приходится гасить.
 * Маской, а не градиентом поверх: под кадром лежит переливающийся
 * `AmbientBackdrop`, и градиент пришлось бы гасить в один конкретный
 * цвет — стык читался бы линией.
 *
 * Значение маски стоит в классе целиком, буквой: Tailwind читает исходник
 * как текст, и собранный в шаблоне градиент до сборки не доезжает —
 * правило просто не рождается, а маска молча не применяется.
 *
 * Верх полосы начинается под бейджем (`top-24`, на `md` — `top-32`):
 * бейдж лежит во всю ширину над раскладкой, и фигура из-под него выходит,
 * а не проезжает по нему.
 *
 * Размер задан по ширине (`w-[175vw]`), а не через `object-cover`: секция
 * в узком окне заметно выше, чем шире, и cover подгонял бы кадр 16:9 по
 * высоте — масштаб вырастал бы втрое, и в окно попадала бы одна половина
 * лица. Ширина в vw держит масштаб таким, что героиня видна крупно — по
 * грудь; правый край при этом уходит за границу окна (`right-[-25vw]`).
 *
 * Ниже 390 px фигура отодвинута правее (`-31vw`): текстовая колонка там
 * та же доля ширины, но в абсолютных пикселях уже, и строки подзаголовка
 * доходили героине до волос. У вырезки такой заход виден сразу — синий
 * курсив ложился прямо на тёмную прядь. Ценой ушло за край окна плечо.
 */
const PHOTO_BAND_CLASS =
  "absolute top-24 right-[-25vw] w-[175vw] max-[389px]:right-[-31vw] [-webkit-mask-image:linear-gradient(to_bottom,#000_46%,transparent_78%)] [mask-image:linear-gradient(to_bottom,#000_46%,transparent_78%)] md:top-32 md:right-[-14vw] md:w-[120vw] md:[-webkit-mask-image:linear-gradient(to_bottom,#000_58%,transparent_88%)] md:[mask-image:linear-gradient(to_bottom,#000_58%,transparent_88%)] hero-wide:inset-0 hero-wide:w-auto hero-wide:[-webkit-mask-image:linear-gradient(to_bottom,#000_74%,transparent_99%)] hero-wide:[mask-image:linear-gradient(to_bottom,#000_74%,transparent_99%)]";

/**
 * Классы кадра.
 *
 * В узком окне кадр занимает свою коробку по ширине, высота идёт от
 * пропорции файла.
 *
 * В широком — по высоте секции (`h-full w-auto`), а не `object-cover`:
 * cover в широком и низком окне (1920×800) резал кадр по вертикали и
 * срезал макушку. У фигуры без фона такой обрез виден сразу, у прежнего
 * баннера его прятала студия. Прижим вправо — `ml-auto`, а отрицательный
 * `mr` уводит за край окна пустое поле файла за её плечом.
 */
const HERO_IMG_CLASS =
  "w-full hero-wide:h-full hero-wide:w-auto hero-wide:max-w-none hero-wide:ml-auto hero-wide:mr-[-4%]";

/**
 * Кегль названия. В узком окне он едет от ширины окна: колонка рядом с
 * фигурой уже, чем полка `TYPE.hero` в 48px, и «Я ЛИДЕР» ломалось на две
 * строки. В широком окне возвращается прежняя шкала — там текст лежит в
 * «окне» шторки во всю колонку, и сужать его нечем.
 */
const HERO_TITLE_SIZE =
  "text-[length:clamp(30px,9.5vw,96px)] hero-wide:text-[length:clamp(48px,7.5vw,96px)]";

/**
 * Hero. Одна композиция на все окна: кадр лежит фоном, героиня стоит
 * справа, текст — слева от неё.
 *
 * Порядок такой. Бейдж потока — сверху, во всю ширину колонки: строка
 * длинная, и в сужённой колонке она ломалась на две. Ниже — раскладка
 * «текст слева, героиня справа»: заголовок и подзаголовок обтекают
 * распорку под фигуру, а кнопка и плитки идут под кадром и потому во всю
 * ширину.
 *
 * Обтекание — настоящий `float`, а не колонка фиксированной ширины: у
 * абзаца тогда сужаются только те строки, что идут рядом с фигурой, а
 * доехавшие ниже кадра занимают всю ширину. Колонкой пришлось бы сузить
 * весь абзац целиком, и на телефоне он вытягивался бы лентой в двадцать
 * знаков.
 *
 * Полосой сверху кадр стоял до этого — и тогда первый экран телефона был
 * поделён надвое: фото и стена набора под ним. Героиня теперь именно фон,
 * как и в широком окне; порядок чтения (человек справа, текст слева) один
 * на все размеры.
 *
 * Развилка идёт по `hero-wide` (ширина И пропорция окна), а не по `md`:
 * в высоком окне кадр по высоте секции раздувался бы до неузнаваемости —
 * см. комментарий к варианту в `globals.css`. Ступени размеров и отступов
 * внутри текста остались на `md`, они от композиции не зависят.
 */
export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex items-center overflow-hidden hero-wide:min-h-[88vh]"
    >
      {/* Кадр — фоновый слой во всю секцию на любом размере окна.
          `pointer-events-none`: слой перекрывает текстовую колонку по
          площади, и без этого правая половина первого экрана переставала
          отдавать нажатия кнопке под ней. */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden hero-wide:overflow-visible">
        <div className={PHOTO_BAND_CLASS}>
          <img
            src={heroFigure}
            srcSet={`${heroFigure900} 900w, ${heroFigure} 1672w`}
            sizes="100vw"
            alt={AUTHOR_NAME}
            /* Это LCP-элемент страницы. camelCase, не строчными: обходной
               приём из исходного проекта был написан под React 18.3, а с 19-м
               всё ровно наоборот — он понимает `fetchPriority` и ругается на
               строчный вариант. */
            fetchPriority="high"
            className={HERO_IMG_CLASS}
            /* Нет файла — прячем <img>, под ним остаётся AmbientBackdrop.
               Иначе браузер рисует иконку битой картинки поверх героя. */
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>

      {/* Колонка и поля — общие, как у шапки и остальных секций: раньше
          здесь была своя пара `max-w-6xl px-5 md:px-8`, и текст героя стоял
          с другим отступом, чем логотип прямо над ним. */}
      <ParallaxHero
        className={`relative z-10 ${CONTAINER} ${GUTTER} py-12 md:py-16 hero-wide:pb-24`}
      >
        {/* В широком окне колонка ограничена ещё и долей ширины: фигура
              без фона стоит справа без «шторки», которая раньше вымывала её
              под текстом, и на 1024 px плитки доходили ей до рукава.
              `min()` оставляет прежние 672 px на больших экранах. */}
        <div className="max-w-xl lg:max-w-2xl hero-wide:max-w-[min(672px,52%)]">
          {/* Бейдж — во всю ширину колонки и над раскладкой «текст слева,
              фигура справа»: строка в нём длинная, и в сужённой колонке
              она ломалась на две. */}
          <Reveal>
            <Badge
              tone="accentOutline"
              className="backdrop-blur-sm"
              icon={
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden
                />
              }
            >
              {STREAM_BADGE_WITH_DATE}
            </Badge>
          </Reveal>

          <div className="mt-5 md:mt-7">
            {/* Распорка под фигуру. Пустой `float` — единственный способ
                отдать героине правую часть только на высоту кадра:
                заголовок и первые строки подзаголовка обтекают её, а
                строки ниже кадра сами возвращаются на всю ширину. Высота
                подобрана по плотной части полосы — ниже кадр уже уходит
                в прозрачность, и текст ложится на пустой фон.

                Ширина 40%: строки заходят на фигуру левым краем — там
                у кадра уже растушёвка, а не плотная подложка. */}
            <div
              aria-hidden
              className="float-right h-[220px] w-[40%] md:h-[300px] md:w-[40%] hero-wide:hidden"
            />

            <Reveal delay={0.08}>
              {/* Кегль классом, а не inline-стилем из `TYPE.hero`: рядом с
                  фигурой колонка сужена, и полка в 48px в неё не влезает —
                  название ломалось на «Я» и «ЛИДЕР». Здесь кегль едет от
                  ширины окна, а в широком окне возвращается прежний. */}
              <Display
                className={HERO_TITLE_SIZE}
                style={{ ...HERO_LONG_FACE, color: COLORS.ink }}
              >
                {COURSE_NAME}
              </Display>
            </Reveal>

            <Reveal delay={0.16} className="mt-4 md:mt-6">
              <Lead className="max-w-xl">
                {DURATION_LABEL_ADJ} программа для экспертов, желающих{" "}
                <ShimmerText className="font-medium">
                  вырасти профессионально и финансово
                </ShimmerText>
              </Lead>
              <p className="mt-3 text-sm text-muted">
                с{" "}
                <span className="font-medium text-foreground">
                  {AUTHOR_NAME}
                </span>{" "}
                — {AUTHOR_ROLE}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.24} className="clear-both mt-7 md:mt-9">
            {/* Кнопка на всю ширину до sm: на телефоне это и зона нажатия
                побольше, и понятный якорь в конце текстового блока. */}
            <div className="flex flex-col items-stretch gap-3 sm:items-start">
              {/* Пара действий, как на /proryv и /individual: анкета и
                  тихая ссылка вниз для тех, кто ещё смотрит. Ссылка на
                  «Программу», а не на «Тариф»: кнопка рядом уже говорит
                  про скидку, и цена без содержания курса ничего не
                  решает.

                  До sm пара разложена в столбец: `lg`-кнопка занимает там
                  всю ширину, и ссылке рядом с ней места нет. Она
                  центрируется под кнопкой (`justify-center`), потому что
                  сама кнопка на телефоне растянута и её подпись стоит по
                  центру.

                  `flex-wrap` и `shrink-0` — не перестраховка: в широком
                  окне колонка ограничена долей ширины (52%), и на 1024 px
                  это 532 px. Без них flex сжимал обоих, и подписи ломались
                  на две строки каждая — «Записаться со скидкой» / «40%».
                  Теперь элементы держат свою ширину, а если пара в строку
                  не влезает, ссылка переносится под кнопку целиком. */}
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                <LinearButton
                  href={FORM_URL}
                  size="lg"
                  className="w-full sm:w-auto sm:shrink-0"
                  icon={<ArrowRight className="h-4 w-4" aria-hidden />}
                >
                  {CTA_DISCOUNT}
                </LinearButton>
                <QuietLink
                  href="#programma"
                  direction="down"
                  className="justify-center whitespace-nowrap sm:justify-start"
                >
                  Программа курса
                </QuietLink>
              </div>
              <p className="flex items-center gap-2 text-[13px] text-muted">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden
                />
                Бесплатная встреча после заполнения анкеты
              </p>
            </div>
          </Reveal>

          {/* Плитки уплотнены: при p-4/gap-3 на 360 px оставалось 99 px ширины,
              и «выпускников» переносилось само на себя. */}
          <Stagger
            className="mt-8 grid grid-cols-3 gap-2.5 md:mt-12 md:gap-3"
            as="ul"
          >
            {heroProof.map(({ icon: Icon, label }) => (
              <StaggerItem key={label} as="li">
                <SpotlightCard className="h-full p-3 md:p-4">
                  <Icon className="h-4 w-4 text-accent" aria-hidden />
                  <p className="mt-2 text-[11px] font-medium leading-tight text-muted md:mt-2.5 md:text-xs md:leading-snug">
                    {label}
                  </p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </ParallaxHero>
    </section>
  );
}
