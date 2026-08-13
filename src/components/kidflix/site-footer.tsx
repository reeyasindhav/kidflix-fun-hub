import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

const columns = [
  {
    title: "Watch",
    links: [
      { to: "/", label: "Browse" },
      { to: "/collections", label: "Collections" },
      { to: "/my-list", label: "My list" },
    ] as const,
  },
  {
    title: "Parents",
    links: [
      { to: "/parent", label: "Parent zone" },
      { to: "/parent/watch-time", label: "Watch-time report" },
      { to: "/parent/controls", label: "Content controls" },
    ] as const,
  },
  {
    title: "Kidflix",
    links: [
      { to: "/about", label: "How it works" },
      { to: "/terms", label: "Terms of service" },
      { to: "/privacy", label: "Privacy policy" },
      { to: "/signup", label: "Create a household" },
      { to: "/login", label: "Sign in" },
    ] as const,
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Star className="size-5" />
            </span>
            <span className="font-display text-2xl text-primary">kidflix</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A child-first streaming home: curated cartoons, honest watch-time numbers and controls
            parents can actually understand.
          </p>
          <p className="mt-6 text-xs font-bold text-muted-foreground">
            Design prototype · mock data only
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="label-caps text-muted-foreground">{col.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm font-bold">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/70 px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Kidflix. No autoplay rabbit holes, ever.
      </div>
    </footer>
  );
}
