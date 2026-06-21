import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-background pb-24">
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  back,
  right,
}: {
  title: string;
  back?: string;
  right?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-4 backdrop-blur-md">
      <div className="w-9">
        {back && (
          <Link to={back} className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        )}
      </div>
      <h1 className="text-base font-semibold tracking-tight">{title}</h1>
      <div className="flex w-9 justify-end">{right}</div>
    </header>
  );
}
