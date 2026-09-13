"use client";

import { useActionState } from "react";
import { saveSettings, type SaveState } from "./actions";
import { Field, Grid, SubmitBar, TextInput } from "./fields";

/**
 * Общесайтовые значения: то, что стоит в подвале каждой страницы.
 *
 * Список полей задан здесь, а не читается из таблицы: ключ без подписи
 * («copyright_years») в форме бесполезен, а подпись к нему — часть
 * интерфейса, не данных.
 */
const FIELDS = [
  {
    key: "copyright_years",
    label: "Годы в копирайте",
    hint: "Как в подвале: 2020–2026.",
  },
  {
    key: "diagnostic_form_url",
    label: "Анкета на диагностику",
    hint: "Кнопка «Записаться» в шапке ведёт сюда.",
  },
  {
    key: "individual_form_url",
    label: "Анкета на консультации",
    hint: "Кнопки записи на странице /individual.",
  },
] as const;

export function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [state, formAction] = useActionState<SaveState, FormData>(saveSettings, {});

  return (
    <form action={formAction}>
      <input type="hidden" name="keys" value={FIELDS.map((f) => f.key).join(",")} />

      <Grid>
        {FIELDS.map((field) => (
          <Field key={field.key} label={field.label} hint={field.hint}>
            <TextInput name={`setting_${field.key}`} defaultValue={settings[field.key]} />
          </Field>
        ))}
      </Grid>

      <SubmitBar state={state} />
    </form>
  );
}
