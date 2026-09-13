"use client";

import { useActionState } from "react";
import { savePackages, type SaveState } from "./actions";
import { Checkbox, Field, SubmitBar, TextInput } from "./fields";
import type { Package } from "@/lib/content";

/**
 * Цены пакетов консультаций.
 *
 * Добавления и удаления здесь нет намеренно: якорный пакет и три
 * спутника рисуются на `/individual` разной вёрсткой, и пятая карточка
 * без правки страницы просто не встанет в сетку. Форма правит то, что
 * действительно меняется, — суммы и примечание.
 */
export function PackagesForm({ packages }: { packages: Package[] }) {
  const [state, formAction] = useActionState<SaveState, FormData>(savePackages, {});

  return (
    <form action={formAction}>
      {/* Какие строки пришли — списком, а не перебором ключей FormData:
          так действие не зависит от порядка полей и от того, что
          браузер не прислал снятые чекбоксы. */}
      <input type="hidden" name="ids" value={packages.map((p) => p.id).join(",")} />

      <div className="flex flex-col gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="rounded-xl border border-surface-strong bg-card/50 p-4"
          >
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h3 className="text-sm font-semibold text-foreground">{pkg.title}</h3>
              {pkg.highlight ? (
                <span className="text-xs text-muted">якорный</span>
              ) : null}
            </div>

            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-3">
              <Field label="Было">
                <TextInput
                  name={`price_old_${pkg.id}`}
                  type="number"
                  step="0.01"
                  defaultValue={pkg.priceOld}
                />
              </Field>
              <Field label="Стало">
                <TextInput
                  name={`price_new_${pkg.id}`}
                  type="number"
                  step="0.01"
                  defaultValue={pkg.priceNew}
                />
              </Field>
              <Field label="Примечание">
                <TextInput name={`note_${pkg.id}`} defaultValue={pkg.note} />
              </Field>
            </div>

            <div className="mt-2">
              <Checkbox
                name={`is_active_${pkg.id}`}
                label="Показывать пакет"
                defaultChecked={pkg.isActive}
              />
            </div>
          </div>
        ))}
      </div>

      <SubmitBar state={state} />
    </form>
  );
}
