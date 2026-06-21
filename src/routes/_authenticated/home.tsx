import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Menu, Calendar, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/home")({
  head: () => ({ meta: [{ title: "Home — TLF" }] }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="relative px-5 pb-10 pt-6 text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
        <div className="flex items-center justify-between">
          <button className="rounded-md p-1.5"><Menu className="h-5 w-5" /></button>
          <button className="relative rounded-md p-1.5">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
          </button>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-extrabold tracking-tight">Hi, User 👋</h1>
          <p className="mt-0.5 text-sm text-primary-foreground/80">Welcome back!</p>
        </div>
      </div>

      <div className="space-y-6 px-5 py-5">
        {/* Latest News */}
        <Section title="Latest News" actionLabel="View all" to="/events">
          <Link to="/events" className="block overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="flex gap-3 p-3">
              <div className="h-20 w-24 shrink-0 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10" />
              <div className="flex flex-col justify-between py-1">
                <h3 className="text-sm font-semibold leading-snug">
                  TLF launches new youth empowerment program
                </h3>
                <p className="text-xs text-muted-foreground">20 May 2024</p>
              </div>
            </div>
          </Link>
          <div className="mt-2 flex justify-center gap-1.5">
            {[0,1,2,3].map((i) => (
              <span key={i} className={`h-1.5 rounded-full ${i===0?"w-4 bg-primary":"w-1.5 bg-border"}`} />
            ))}
          </div>
        </Section>

        {/* Upcoming Events */}
        <Section title="Upcoming Events" actionLabel="View all" to="/events">
          <div className="rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
            <div className="flex gap-3">
              <div className="flex w-16 flex-col overflow-hidden rounded-xl border border-border">
                <div className="bg-primary py-1 text-center text-[10px] font-bold uppercase tracking-wider text-primary-foreground">May</div>
                <div className="bg-card py-2 text-center text-xl font-extrabold">25</div>
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <h3 className="text-sm font-semibold">Youth Leadership Summit 2024</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">25 May 2024 · 09:00 AM</p>
                <p className="text-xs text-muted-foreground">At TLF Community Hall</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Announcements */}
        <section>
          <h2 className="mb-3 text-base font-bold">Announcements</h2>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <p className="text-sm font-medium">New annual report is now available.</p>
            <p className="mt-1 text-xs text-muted-foreground">20 May 2024</p>
          </div>
        </section>

        {/* Quick actions */}
        <section className="grid grid-cols-2 gap-3">
          <QuickAction to="/donate" label="Donate" tone="primary" />
          <QuickAction to="/contact" label="Contact Us" tone="muted" />
        </section>
      </div>
    </div>
  );
}

function Section({ title, actionLabel, to, children }: { title: string; actionLabel?: string; to?: "/events"; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold">{title}</h2>
        {actionLabel && to && (
          <Link to={to} className="flex items-center text-xs font-semibold text-primary">
            {actionLabel} <ChevronRight className="h-3 w-3" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function QuickAction({ to, label, tone }: { to: "/donate" | "/contact"; label: string; tone: "primary" | "muted" }) {
  const cls = tone === "primary"
    ? "bg-primary text-primary-foreground"
    : "bg-card text-foreground border border-border";
  return (
    <Link to={to} className={`flex items-center justify-center rounded-2xl px-4 py-4 text-sm font-semibold shadow-[var(--shadow-card)] ${cls}`}>
      {label}
    </Link>
  );
}
