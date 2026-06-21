import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/events")({
  head: () => ({ meta: [{ title: "News & Events — TLF" }] }),
  component: Events,
});

const news = [
  { title: "Partnership with local schools announced", date: "18 May 2024" },
  { title: "TLF hosts successful mentorship workshop", date: "15 May 2024" },
  { title: "Community upliftment project begins", date: "10 May 2024" },
];

const events = [
  { title: "Youth Leadership Summit 2024", date: "25 May 2024 · 09:00" },
  { title: "Community Outreach Day", date: "02 Jun 2024 · 08:00" },
  { title: "Mentorship Open Day", date: "15 Jun 2024 · 10:00" },
];

function Events() {
  const [tab, setTab] = useState<"news" | "events">("news");
  return (
    <div className="px-5 pb-6">
      <header className="sticky top-0 z-20 -mx-5 flex items-center justify-between bg-background/90 px-5 py-4 backdrop-blur-md">
        <Link to="/home" className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-base font-semibold">News & Events</h1>
        <div className="w-9" />
      </header>

      <div className="mt-2 grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1">
        {(["news","events"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition ${
              tab === t ? "bg-primary text-primary-foreground shadow-[var(--shadow-elevated)]" : "text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {(tab === "news" ? news : events).map((item) => (
          <article key={item.title} className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="flex gap-3 p-3">
              <div className="h-20 w-24 shrink-0 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10" />
              <div className="flex flex-col justify-between py-1">
                <h3 className="text-sm font-semibold leading-snug">{item.title}</h3>
                <div>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                  <button className="mt-1 text-xs font-semibold text-primary">Read More ›</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
