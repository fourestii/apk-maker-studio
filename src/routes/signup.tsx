import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, User } from "lucide-react";
import type { FormEvent } from "react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — Tshwane Leadership Foundation" },
      { name: "description", content: "Create your Tshwane Leadership Foundation account." },
    ],
  }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    navigate({ to: "/home" });
  }
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background px-6 py-8">
      <Link to="/" className="text-xs font-semibold text-primary">‹ Back</Link>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">Create account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Join us in empowering communities</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-3">
        <Field icon={<User className="h-4 w-4 text-muted-foreground" />} placeholder="Full Name" />
        <Field icon={<Mail className="h-4 w-4 text-muted-foreground" />} placeholder="Email Address" type="email" />
        <Field icon={<Lock className="h-4 w-4 text-muted-foreground" />} placeholder="Password" type="password" />

        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elevated)]"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

function Field({ icon, ...props }: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-[var(--shadow-card)]">
      {icon}
      <input
        required
        {...props}
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
