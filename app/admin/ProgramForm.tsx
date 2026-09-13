"use client";

import { useActionState } from "react";
import { saveProgram, type SaveState } from "./actions";
import { Checkbox, Field, Grid, Select, SubmitBar, TextInput } from "./fields";
import type { Program } from "@/lib/content";

/**
 * Форма одной программы.
 *
 * Какие поля показывать — решает страница, а не форма: у «Я ЛИДЕР» есть
 * встречи и выпускники, у «ПРОРЫВа» — места и годы опыта, у «Базовых
 * законов» пока только срок и дата. Форма со всеми полями сразу
 * заставляла бы каждый раз вспоминать, какие из них на этом лендинге
 * вообще где-то нарисованы.
 */
export type FieldKey =
  | "stream"
  | "duration"
  | "seats"
  | "meetings"
  | "graduates"
  | "experience"
  | "discount"
  | "price"
  | "form";

export function ProgramForm({
  program,
  fields,
}: {
  program: Program;
  fields: FieldKey[];
}) {
  const [state, formAction] = useActionState<SaveState, FormData>(saveProgram, {});

  const has = (key: FieldKey) => fields.includes(key);

  return (
    <form action={formAction}>
      {/* Какую программу сохраняем. Раньше slug прибивался к действию
          через `bind`, но привязанный аргумент подвешивал ответ на
          отправку формы без JS. Значение здесь не доверенное: действие
          сверяет его со своим списком маршрутов. */}
      <input type="hidden" name="slug" value={program.slug} />

      <Grid>
        {has("stream") ? (
          <Field label="Номер потока">
            <TextInput name="stream_number" type="number" defaultValue={program.streamNumber} />
          </Field>
        ) : null}

        <Field label="Дата старта" hint="Пусто — покажем подпись из следующего поля.">
          <TextInput name="start_date" type="date" defaultValue={program.startDate} />
        </Field>

        <Field label="Подпись вместо даты" hint="Например: «Дата уточняется».">
          <TextInput
            name="start_label"
            defaultValue={program.startLabel}
            placeholder="Дата уточняется"
          />
        </Field>

        {has("duration") ? (
          <Field label="Длительность, недель">
            <TextInput name="duration_weeks" type="number" defaultValue={program.durationWeeks} />
          </Field>
        ) : null}

        {has("seats") ? (
          <Field label="Мест в группе" hint="Падеж подписи считается сам: 1 место, 7 мест.">
            <TextInput name="seats" type="number" defaultValue={program.seats} />
          </Field>
        ) : null}

        {has("meetings") ? (
          <>
            <Field label="Индивидуальных встреч">
              <TextInput
                name="individual_meetings"
                type="number"
                defaultValue={program.individualMeetings}
              />
            </Field>
            <Field label="Групповых встреч">
              <TextInput
                name="group_meetings"
                type="number"
                defaultValue={program.groupMeetings}
              />
            </Field>
          </>
        ) : null}

        {has("graduates") ? (
          <Field label="Выпускников" hint="Строкой — плюс в «100+» часть смысла.">
            <TextInput name="graduates_count" defaultValue={program.graduatesCount} />
          </Field>
        ) : null}

        {has("experience") ? (
          <Field label="Лет опыта">
            <TextInput name="years_experience" type="number" defaultValue={program.yearsExperience} />
          </Field>
        ) : null}

        {has("discount") ? (
          <Field label="Скидка, %">
            <TextInput name="discount_percent" type="number" defaultValue={program.discountPercent} />
          </Field>
        ) : null}

        {has("price") ? (
          <>
            <Field label="Цена до скидки">
              <TextInput name="price_old" type="number" step="0.01" defaultValue={program.priceOld} />
            </Field>
            <Field label="Текущая цена">
              <TextInput name="price_new" type="number" step="0.01" defaultValue={program.priceNew} />
            </Field>
            <Field label="Валюта">
              <Select
                name="currency"
                defaultValue={program.currency}
                options={[
                  { value: "BYN", label: "BYN" },
                  { value: "USD", label: "USD ($)" },
                  { value: "EUR", label: "EUR (€)" },
                ]}
              />
            </Field>
          </>
        ) : (
          /* Поле валюты есть всегда — действие пишет колонку безусловно,
             и без него у программы без цен валюта затиралась бы на BYN. */
          <input type="hidden" name="currency" value={program.currency} />
        )}

        {has("form") ? (
          <Field label="Ссылка на анкету">
            <TextInput name="form_url" type="url" defaultValue={program.formUrl} />
          </Field>
        ) : null}
      </Grid>

      <div className="mt-5 flex flex-col gap-1">
        {has("price") ? (
          <Checkbox
            name="price_visible"
            label="Показывать цену на странице"
            defaultChecked={program.priceVisible}
            hint="Пока снята, блок с ценой не рисуется вовсе."
          />
        ) : (
          /* Скрытой галочки быть не должно, а затирать флаг в базе — тем
             более: действие пишет колонку всегда, и непоказанный чекбокс
             прочитался бы как снятый. Поэтому поле появляется, только
             если флаг уже стоит, и сохраняет его значение. */
          program.priceVisible && <input type="hidden" name="price_visible" value="1" />
        )}
      </div>

      <SubmitBar state={state} />
    </form>
  );
}
