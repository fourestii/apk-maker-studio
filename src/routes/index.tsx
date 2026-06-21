import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login — Tshwane Leadership Foundation" },
      { name: "description", content: "Sign in to the Tshwane Leadership Foundation app." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    navigate({ to: "/home" });
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      {/* Brand header with curve */}
      <div className="relative" style={{ background: "var(--gradient-hero)" }}>
        <div className="h-44" />
        <svg
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          className="absolute -bottom-px left-0 h-16 w-full"
        >
          <path d="M0,0 C120,90 280,90 400,0 L400,80 L0,80 Z" fill="var(--background)" />
        </svg>
      </div>

      <div className="-mt-16 flex flex-col items-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-[var(--shadow-card)]">
          <div className="h-9 w-9 rounded-md bg-primary" />
        </div>
        <h1 className="mt-3 text-lg font-extrabold tracking-tight text-primary">
          TSHWANE
        </h1>
        <p className="text-sm font-semibold text-foreground">LEADERSHIP FOUNDATION</p>
        <p className="mt-1 text-xs text-muted-foreground">Empowering Communities</p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 flex flex-1 flex-col px-6 pb-10">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to continue</p>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-[var(--shadow-card)]">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-[var(--shadow-card)]">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <input
              type={show ? "text" : "password"}
              required
              placeholder="Password"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="button" onClick={() => setShow((s) => !s)} className="text-muted-foreground">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="button"
          className="mt-3 self-end text-xs font-semibold text-primary"
        >
          Forgot Password?
        </button>

        <button
          type="submit"
          className="mt-6 rounded-xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] transition active:scale-[0.98]"
        >
          Login
        </button>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Link
          to="/signup"
          className="rounded-xl border border-border bg-card px-4 py-4 text-center text-sm font-semibold text-foreground transition active:scale-[0.98]"
        >
          Sign Up
        </Link>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Continue as <button className="font-semibold text-primary">Guest</button>
        </p>
      </form>
    </div>
  );
}
