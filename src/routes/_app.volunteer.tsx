import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, User, Mail, Phone, Briefcase, Calendar } from "lucide-react";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/_app/volunteer")({
  head: () => ({ meta: [{ title: "Volunteer — TLF" }] }),
  component: Volunteer,
});

function Volunteer() {
  const [agreed, setAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  }

  return (
    <div className="px-5 pb-6">
      <header className="sticky top-0 z-20 -mx-5 flex items-center justify-between bg-background/90 px-5 py-4 backdrop-blur-md">
        <Link to="/home" className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-base font-semibold">Volunteer Registration</h1>
        <div className="w-9" />
      </header>

      <p className="mt-2 text-sm text-muted-foreground">
        Fill in the form below to apply as a volunteer.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        <Field icon={<User className="h-4 w-4 text-muted-foreground" />} placeholder="Full Name" />
        <Field icon={<Mail className="h-4 w-4 text-muted-foreground" />} placeholder="Email Address" type="email" />
        <Field icon={<Phone className="h-4 w-4 text-muted-foreground" />} placeholder="Phone Number" type="tel" />

        <Select icon={<Briefcase className="h-4 w-4 text-muted-foreground" />}>
          <option value="">Skills / Expertise</option>
          <option>Teaching</option>
          <option>Healthcare</option>
          <option>Event Management</option>
          <option>Marketing</option>
        </Select>

        <Select icon={<Calendar className="h-4 w-4 text-muted-foreground" />}>
          <option value="">Select Event / Program</option>
          <option>Youth Leadership Summit</option>
          <option>Community Outreach</option>
          <option>Mentorship Program</option>
        </Select>

        <label className="flex items-start gap-3 px-1 pt-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[color:var(--primary)]"
          />
          <span className="text-xs text-muted-foreground">
            I agree to the <span className="font-semibold text-primary">terms and conditions</span>
          </span>
        </label>

        <button
          type="submit"
          disabled={!agreed}
          className="mt-4 w-full rounded-xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] transition active:scale-[0.98] disabled:opacity-50"
        >
          {submitted ? "Application sent ✓" : "Apply Now"}
        </button>
      </form>
    </div>
  );
}

function Field({ icon, ...props }: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-[var(--shadow-card)]">
      {icon}
      <input required {...props} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
    </div>
  );
}

function Select({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-[var(--shadow-card)]">
      {icon}
      <select required defaultValue="" className="flex-1 bg-transparent text-sm outline-none">
        {children}
      </select>
    </div>
  );
}
