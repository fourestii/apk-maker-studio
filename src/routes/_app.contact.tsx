import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, User, Mail, FileText } from "lucide-react";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/_app/contact")({
  head: () => ({ meta: [{ title: "Contact Us — TLF" }] }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  }
  return (
    <div className="px-5 pb-6">
      <header className="sticky top-0 z-20 -mx-5 flex items-center justify-between bg-background/90 px-5 py-4 backdrop-blur-md">
        <Link to="/home" className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-base font-semibold">Contact Us</h1>
        <div className="w-9" />
      </header>

      <p className="mt-2 text-sm text-muted-foreground">
        We'd love to hear from you. Send us a message and we will get back to you.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        <Field icon={<User className="h-4 w-4 text-muted-foreground" />} placeholder="Full Name" />
        <Field icon={<Mail className="h-4 w-4 text-muted-foreground" />} placeholder="Email Address" type="email" />
        <Field icon={<FileText className="h-4 w-4 text-muted-foreground" />} placeholder="Subject" />

        <div className="rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
          <textarea
            required
            placeholder="Your Message"
            rows={5}
            className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elevated)]"
        >
          {sent ? "Message sent ✓" : "Send Message"}
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
