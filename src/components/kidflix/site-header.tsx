import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Heart, Home, Lock, Menu, Popcorn, Sparkles, X } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Browse", icon: Home },
  { to: "/collections", label: "Collections", icon: Popcorn },
  { to: "/my-list", label: "My list", icon: Heart },
];

export function SiteHeader() {
  const { account, signOut } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="press flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-pop">
            <Sparkles className="size-5" />
          </span>
          <span className="leading-none">
            <span className="label-caps block text-[0.6rem] text-muted-foreground">
              Safe streaming for
            </span>
            <span className="font-display text-2xl text-primary">kidflix</span>
          </span>
        </Link>

        <nav className="mx-auto hidden items-center gap-1 rounded-full bg-secondary/70 p-1.5 md:flex">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "press flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors",
                  active
                    ? "bg-card text-primary shadow-soft"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="press grid size-11 place-items-center rounded-full bg-card shadow-soft"
          >
            <Bell className="size-4.5" />
          </Link>
          <Link
            to="/parent"
            className="press hidden items-center gap-2 rounded-full bg-mint px-4 py-2.5 text-sm font-extrabold text-mint-foreground shadow-pop sm:flex"
          >
            <Lock className="size-4" />
            Parent zone
          </Link>
          {account ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="press grid size-11 place-items-center rounded-full bg-sunny font-display text-lg text-sunny-foreground shadow-pop"
                aria-label="Your profile"
              >
                {account.name.charAt(0).toUpperCase()}
              </Link>
              <button
                onClick={signOut}
                className="hidden text-xs font-bold text-muted-foreground underline-offset-4 hover:underline lg:block"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="press rounded-full bg-primary px-4 py-2.5 text-sm font-extrabold text-primary-foreground shadow-pop"
            >
              Sign in
            </Link>
          )}
          <button
            className="press grid size-11 place-items-center rounded-full bg-card shadow-soft md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-rise border-t border-border bg-card px-4 py-4 md:hidden">
          <div className="grid gap-2">
            {[...nav, { to: "/parent", label: "Parent zone", icon: Lock }].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-secondary/60 px-4 py-3 font-bold"
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
