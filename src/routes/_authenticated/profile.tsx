import { createFileRoute, Link } from "@tanstack/react-router";
import { User, Bell, Settings, HelpCircle, LogOut, HeartHandshake, Mail, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — TLF" }] }),
  component: Profile,
});

function Profile() {
  return (
    <div>
      <div className="px-5 pb-10 pt-8 text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/15 ring-2 ring-primary-foreground/30">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-lg font-bold">User Name</h1>
            <p className="text-sm text-primary-foreground/80">user@example.com</p>
          </div>
        </div>
      </div>

      <div className="-mt-6 space-y-3 px-5">
        <Group>
          <Row to="/donate" icon={<HeartHandshake className="h-4 w-4" />} label="Donate" />
          <Row to="/contact" icon={<Mail className="h-4 w-4" />} label="Contact Us" />
        </Group>
        <Group>
          <Row icon={<Bell className="h-4 w-4" />} label="Notifications" />
          <Row icon={<Settings className="h-4 w-4" />} label="Settings" />
          <Row icon={<HelpCircle className="h-4 w-4" />} label="Help & Support" />
        </Group>
        <Group>
          <Link to="/" className="flex items-center justify-between px-4 py-4 text-destructive">
            <span className="flex items-center gap-3 text-sm font-semibold">
              <LogOut className="h-4 w-4" /> Log out
            </span>
          </Link>
        </Group>
      </div>
    </div>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] divide-y divide-border">
      {children}
    </div>
  );
}

function Row({ icon, label, to }: { icon: React.ReactNode; label: string; to?: "/donate" | "/contact" }) {
  const inner = (
    <div className="flex items-center justify-between px-4 py-4">
      <span className="flex items-center gap-3 text-sm font-medium">
        <span className="text-primary">{icon}</span> {label}
      </span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  );
  return to ? <Link to={to}>{inner}</Link> : <button className="w-full text-left">{inner}</button>;
}
