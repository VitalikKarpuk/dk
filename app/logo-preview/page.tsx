import {
  LogoBold,
  LogoDot,
  LogoUnderline,
  LogoFrame,
  LogoTileNavy,
  LogoTileGold,
  LogoSealGold,
  LogoLockup,
  LogoBar,
} from "../../components/Logo/variants";

const CONCEPTS = [
  { id: "A", name: "Монограмма + золотая точка", Comp: LogoDot },
  { id: "B", name: "Золотое подчёркивание", Comp: LogoUnderline },
  { id: "C", name: "Золотая рамка", Comp: LogoFrame },
  { id: "D", name: "Плитка navy / золото", Comp: LogoTileNavy },
  { id: "E", name: "Плитка золото / navy", Comp: LogoTileGold },
  { id: "F", name: "Печать (золотое кольцо)", Comp: LogoSealGold },
  { id: "G", name: "Локап с именем", Comp: LogoLockup },
  { id: "H", name: "Золотая черта сверху", Comp: LogoBar },
] as const;

const FG = "var(--foreground)"; // #0e1f42 navy
const ACCENT = "var(--accent)"; // #1e78f0 blue
const GOLD = "var(--accent-soft)"; // #d9b36e gold
const MUTED = "var(--muted)"; // #4d6080

const COMBOS = [
  { id: 1, name: "D navy · K blue (текущий)", d: FG, k: ACCENT },
  { id: 2, name: "D navy · K gold", d: FG, k: GOLD },
  { id: 3, name: "Monochrome navy", d: FG, k: FG },
  { id: 4, name: "Monochrome blue", d: ACCENT, k: ACCENT },
  { id: 5, name: "D blue · K navy", d: ACCENT, k: FG },
  { id: 6, name: "D navy · K muted", d: FG, k: MUTED },
  { id: 7, name: "D gold · K navy", d: GOLD, k: FG },
  { id: 8, name: "D blue · K gold", d: ACCENT, k: GOLD },
] as const;

export default async function LogoPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ only?: string }>;
}) {
  const only = (await searchParams)?.only;
  return (
    <main className="mx-auto w-full max-w-[1000px] px-6 py-16">
      {only !== "concepts" && (
        <>
      <h1 className="mb-2 font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
        Bold monogram — цветовые варианты
      </h1>
      <p className="mb-10 text-sm text-muted">
        Знак №4 на светлом и тёмном фоне + размер как в футере.
      </p>

      <div className="flex flex-col gap-6">
        {COMBOS.map(({ id, name, d, k }) => (
          <div
            key={id}
            className="rounded-2xl border border-surface-strong bg-card p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                {id}
              </span>
              <span className="font-[family-name:var(--font-display)] text-base font-semibold text-foreground">
                {name}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center justify-center rounded-xl border border-surface-strong bg-white p-8">
                <LogoBold className="h-12 w-auto" dColor={d} kColor={k} />
              </div>
              <div className="flex items-center justify-center rounded-xl border border-surface-strong bg-white p-8">
                <LogoBold className="h-9 w-auto" dColor={d} kColor={k} />
              </div>
              <div className="flex items-center justify-center gap-3 rounded-xl border border-surface-strong bg-white p-8">
                <LogoBold className="h-9 w-auto" dColor={d} kColor={k} />
                <div>
                  <p className="font-[family-name:var(--font-display)] text-base font-semibold text-foreground">
                    Дарья Карпук
                  </p>
                  <p className="text-xs text-muted">Психолог · Практика 2026</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
        </>
      )}

      <h2 className="mt-16 mb-2 font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
        Ещё концепции (золото + navy)
      </h2>
      <p className="mb-10 text-sm text-muted">
        Другие формы знака в выбранной палитре — всё на белом фоне.
      </p>

      <div className="flex flex-col gap-6">
        {CONCEPTS.map(({ id, name, Comp }) => (
          <div
            key={id}
            className="rounded-2xl border border-surface-strong bg-card p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-foreground">
                {id}
              </span>
              <span className="font-[family-name:var(--font-display)] text-base font-semibold text-foreground">
                {name}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center justify-center rounded-xl border border-surface-strong bg-white p-8">
                <Comp className="h-12 w-auto" />
              </div>
              <div className="flex items-center justify-center rounded-xl border border-surface-strong bg-white p-8">
                <Comp className="h-9 w-auto" />
              </div>
              <div className="flex items-center justify-center gap-3 rounded-xl border border-surface-strong bg-white p-8">
                <Comp className="h-9 w-auto" />
                <div>
                  <p className="font-[family-name:var(--font-display)] text-base font-semibold text-foreground">
                    Дарья Карпук
                  </p>
                  <p className="text-xs text-muted">Психолог · Практика 2026</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
