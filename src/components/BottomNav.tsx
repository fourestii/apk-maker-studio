import { Link, useLocation } from "@tanstack/react-router";
import { Home, Calendar, HeartHandshake, FileText, User } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/events", label: "Events", icon: Calendar },
  { to: "/volunteer", label: "Volunteer", icon: HeartHandshake },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)] pt-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className="flex flex-1 flex-col items-center justify-center gap-1 py-1.5 text-[10px] font-medium"
            >
              <Icon
                className={`h-5 w-5 transition-colors ${active ? "text-primary" : "text-muted-foreground"}`}
                strokeWidth={active ? 2.4 : 1.8}
              />
              <span className={active ? "text-primary" : "text-muted-foreground"}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
