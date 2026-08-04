import { Link } from "@tanstack/react-router";
import { Newspaper } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/upload", label: "Upload" },
  { to: "/history", label: "History" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-serif text-lg font-bold tracking-tight">
          <Newspaper className="size-5 text-accent" aria-hidden="true" />
          NewsVision <span className="text-accent">AI</span>
        </Link>
        <nav aria-label="Main" className="ml-auto flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 py-8">
      <div className="mx-auto max-w-6xl px-4 text-sm text-muted-foreground sm:px-6">
        NewsVision AI drafts are generated from visual evidence only and should be reviewed by an
        editor before publication.
      </div>
    </footer>
  );
}