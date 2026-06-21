import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Heart, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/_authenticated/donate")({
  head: () => ({ meta: [{ title: "Donate — TLF" }] }),
  component: Donate,
});

const presets = [50, 100, 200];

function Donate() {
  const [amount, setAmount] = useState<number | "other">(100);
  const [custom, setCustom] = useState("100.00");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  }

  return (
    <div className="px-5 pb-6">
      <header className="sticky top-0 z-20 -mx-5 flex items-center justify-between bg-background/90 px-5 py-4 backdrop-blur-md">
        <Link to="/home" className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-base font-semibold">Support Our Mission</h1>
        <div className="w-9" />
      </header>

      <p className="mt-2 text-center text-sm text-muted-foreground">
        Your contribution helps us empower communities and build a better future.
      </p>

      <div className="mt-6 flex justify-center">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-primary/8">
          <Heart className="h-14 w-14 fill-primary text-primary" />
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <p className="text-sm font-semibold">Choose Amount</p>
        <div className="grid grid-cols-4 gap-2">
          {presets.map((p) => {
            const active = amount === p;
            return (
              <button
                type="button"
                key={p}
                onClick={() => { setAmount(p); setCustom(`${p}.00`); }}
                className={`rounded-xl border px-2 py-3 text-sm font-semibold transition ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-elevated)]"
                    : "border-border bg-card text-foreground"
                }`}
              >
                R{p}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setAmount("other")}
            className={`rounded-xl border px-2 py-3 text-sm font-semibold ${
              amount === "other"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground"
            }`}
          >
            Other
          </button>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-[var(--shadow-card)]">
          <span className="text-sm font-semibold text-muted-foreground">R</span>
          <input
            value={custom}
            onChange={(e) => { setCustom(e.target.value); setAmount("other"); }}
            inputMode="decimal"
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elevated)]"
        >
          {sent ? "Thank you ❤" : "Donate Now"}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" /> Secure Transaction
        </p>
      </form>
    </div>
  );
}
