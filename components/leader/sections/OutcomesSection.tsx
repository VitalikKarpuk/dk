import { Badge } from "@/components/ui";
import { Gift } from "lucide-react";
const groupPhoto = "/leader/photos/group.webp";
const groupPhoto800 = "/leader/photos/group-800.webp";
import { COURSE_NAME } from "../course";
import {
  SpotlightCard,
  SectionHeading,
  CardTitle,
  ShimmerText,
  Label,
  Lead,
  Body,
  Reveal,
  Stagger,
  StaggerItem,
} from "../linear";
import { Section, IconBox } from "../primitives";
import { outcomes } from "../content";

/** Результаты после обучения + эксклюзивный бонус потока. */
export function OutcomesSection() {
  return (
    <Section>
      <Reveal>
        <Label>Результаты</Label>
        <SectionHeading className="mt-4 max-w-2xl">Ваши результаты после обучения</SectionHeading>
        <Lead className="mt-6 max-w-2xl">
          Каждый этап обучения четко продуман, каждое действие ведет к результату
        </Lead>
      </Reveal>

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" as="ul">
        {outcomes.map(({ title, description, icon: Icon }) => (
          <StaggerItem key={title} as="li">
            {/* Отклик несут рамка, тень и прожектор — карточка стоит. */}
            <SpotlightCard className="h-full p-6">
              <IconBox>
                <Icon className="h-5 w-5" aria-hidden />
              </IconBox>
              <CardTitle className="mt-5 text-base">{title}</CardTitle>
              <Body className="mt-2">{description}</Body>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-6">
        <SpotlightCard spotlight={false} className="overflow-hidden">
          <img
            src={groupPhoto}
            srcSet={`${groupPhoto800} 800w, ${groupPhoto} 1535w`}
            sizes="(min-width: 1216px) 1152px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 40px)"
            width={1535}
            height={1024}
            alt={`Участники программы ${COURSE_NAME}`}
            loading="lazy"
            decoding="async"
            className="max-h-[380px] w-full object-cover object-[center_25%] transition-transform duration-500 ease-brand group-hover:scale-105"
          />
        </SpotlightCard>
      </Reveal>

      {/* Бонус подсвечен слабее, чем финальный «Подарок для вас»: ореол уже,
          бейдж мельче. Два одинаково сильных акцента на странице гасят друг
          друга — здесь бонус к результатам, там финальный CTA. */}
      <Reveal className="mt-6">
        <div className="relative">
          {/* Ореол снаружи карточки: её `overflow-hidden` обрезал бы размытие. */}
          <div
            className="pointer-events-none absolute -inset-2 rounded-[1.75rem] bg-accent/[0.18] blur-2xl animate-ambient-pulse md:-inset-3"
            aria-hidden
          />
          <SpotlightCard
            variant="accent"
            /* Ореол под карточкой стоит на месте — потому и сама карточка
               не двигается, иначе она разъезжалась бы со своим свечением. */
            className="border-accent/40 p-7 shadow-[0_0_0_1px_color-mix(in srgb, var(--accent) 30%, transparent),0_6px_40px_color-mix(in srgb, var(--accent) 20%, transparent)] md:p-9"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              {/* Не общий IconBox: там нейтральное стекло, а этот блок должен
                  читаться акцентом ещё до чтения текста. */}
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent shadow-accent"
                aria-hidden
              >
                <Gift className="h-5 w-5 animate-float" />
              </span>
              <div>
                <Badge tone="accentOutline">
                  Эксклюзивный бонус
                </Badge>
                <p className="mt-4 text-base font-medium leading-relaxed text-foreground md:text-lg">
                  Только участникам этого потока в подарок —{" "}
                  <ShimmerText className="font-semibold">
                    доступ к интенсиву «Секреты успешных сторис»,{" "}
                  </ShimmerText>
                  где вы научитесь легко вести контент и упакуете свой профиль
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </Reveal>
    </Section>
  );
}
