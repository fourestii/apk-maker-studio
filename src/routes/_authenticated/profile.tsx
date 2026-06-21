import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { User, Bell, Settings, HelpCircle, LogOut, HeartHandshake, Mail, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "Profile — TLF" }] }),
  component: Profile,
});

type Profile = { display_name: string | null; email: string | null; avatar_url: string | null };

function Profile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !mounted) return;
      const { data } = await supabase
        .from("profiles")
        .select("display_name, email, avatar_url")
        .eq("id", user.id)
        .maybeSingle();
      if (mounted) setProfile(data ?? { display_name: null, email: user.email ?? null, avatar_url: null });
    })();
    return () => { mounted = false; };
  }, []);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div>
      <div className="px-5 pb-10 pt-8 text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary-foreground/15 ring-2 ring-primary-foreground/30">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" />
            ) : (
              <User className="h-8 w-8" />
            )}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold">{profile?.display_name ?? "Welcome"}</h1>
            <p className="truncate text-sm text-primary-foreground/80">{profile?.email ?? ""}</p>
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
          <button onClick={handleSignOut} className="flex w-full items-center justify-between px-4 py-4 text-destructive">
            <span className="flex items-center gap-3 text-sm font-semibold">
              <LogOut className="h-4 w-4" /> Log out
            </span>
          </button>
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
  if (to) {
    // dynamic import would be nicer but we can use Link via prop
    return <a href={to}>{inner}</a>;
  }
  return <button className="w-full text-left">{inner}</button>;
}
