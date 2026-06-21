import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) throw redirect({ to: "/home" });
  },
  head: () => ({
    meta: [
      { title: "Sign in — Tshwane Leadership Foundation" },
      { name: "description", content: "Sign in or create an account to access the Tshwane Leadership Foundation app." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: name },
          },
        });
        if (error) throw error;
      }
      navigate({ to: "/home" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setError(null);
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(result.error instanceof Error ? result.error.message : String(result.error));
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/home" });
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <div className="relative" style={{ background: "var(--gradient-hero)" }}>
        <div className="h-44" />
        <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="absolute -bottom-px left-0 h-16 w-full">
          <path d="M0,0 C120,90 280,90 400,0 L400,80 L0,80 Z" fill="var(--background)" />
        </svg>
      </div>

      <div className="-mt-16 flex flex-col items-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-[var(--shadow-card)]">
          <div className="h-9 w-9 rounded-md bg-primary" />
        </div>
        <h1 className="mt-3 text-lg font-extrabold tracking-tight text-primary">TSHWANE</h1>
        <p className="text-sm font-semibold text-foreground">LEADERSHIP FOUNDATION</p>
        <p className="mt-1 text-xs text-muted-foreground">Empowering Communities</p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 flex flex-1 flex-col px-6 pb-10">
        <h2 className="text-2xl font-bold tracking-tight">
          {mode === "login" ? "Welcome back!" : "Create account"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "login" ? "Sign in to continue" : "Join us in empowering communities"}
        </p>

        <div className="mt-6 space-y-3">
          {mode === "signup" && (
            <Field icon={<User className="h-4 w-4 text-muted-foreground" />}
              type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <Field icon={<Mail className="h-4 w-4 text-muted-foreground" />}
            type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-[var(--shadow-card)]">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <input
              type={show ? "text" : "password"}
              required
              minLength={6}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="button" onClick={() => setShow((s) => !s)} className="text-muted-foreground">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 rounded-xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] transition active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "Please wait…" : mode === "login" ? "Login" : "Create Account"}
        </button>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={onGoogle}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-4 text-sm font-semibold text-foreground transition active:scale-[0.98] disabled:opacity-60"
        >
          <GoogleIcon /> Continue with Google
        </button>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => { setError(null); setMode(mode === "login" ? "signup" : "login"); }}
            className="font-semibold text-primary"
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}

function Field({ icon, ...props }: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-[var(--shadow-card)]">
      {icon}
      <input {...props} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5 44.5 36.3 44.5 25c0-1.5-.2-3-.5-4.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16.1 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 16.3 4.5 9.7 8.8 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 45.5c5.1 0 9.7-1.9 13.2-5.1l-6.1-5.2C29.2 36.6 26.7 37.5 24 37.5c-5.3 0-9.7-3.3-11.3-8L6.2 34.4C9.6 40.4 16.2 45.5 24 45.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.1 5.2c-.4.4 6.3-4.6 6.3-13.9 0-1.5-.2-3-.5-4.5z"/>
    </svg>
  );
}
