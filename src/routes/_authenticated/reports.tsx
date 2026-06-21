import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";

export const Route = createFileRoute("/_authenticated/reports")({
  head: () => ({ meta: [{ title: "Reports — TLF" }] }),
  component: Reports,
});

const reports = [
  { title: "Annual Report 2023", size: "PDF · 2.4 MB", color: "var(--primary)" },
  { title: "Financial Report 2023", size: "PDF · 1.8 MB", color: "oklch(0.55 0.22 25)" },
  { title: "Impact Report 2023", size: "PDF · 3.1 MB", color: "oklch(0.65 0.19 55)" },
  { title: "Strategic Plan 2024-2026", size: "PDF · 1.2 MB", color: "oklch(0.55 0.22 25)" },
];

function Reports() {
  return (
    <div className="px-5 pb-6 pt-6">
      <h1 className="text-2xl font-bold tracking-tight">Reports & Documents</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Access and download our latest reports and documents.
      </p>

      <div className="mt-6 space-y-3">
        {reports.map((r) => (
          <article key={r.title} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-primary-foreground"
              style={{ backgroundColor: r.color as string }}
            >
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="truncate text-sm font-semibold">{r.title}</h3>
              <p className="text-xs text-muted-foreground">{r.size}</p>
            </div>
            <button className="rounded-lg bg-muted px-3 py-2 text-xs font-semibold text-foreground">View</button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Download className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
