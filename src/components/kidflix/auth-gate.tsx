import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";

import { useAuth } from "@/lib/auth";

/** Prototype-level gate: shows a friendly sign-in wall instead of protected content. */
export function AuthGate({ title, children }: { title: string; children: React.ReactNode }) {
  const { account, ready } = useAuth();

  if (!ready) {
    return (
      <div className="mx-auto grid w-full max-w-3xl place-items-center px-4 py-24">
        <div className="animate-pulse rounded-4xl bg-card px-10 py-14 shadow-soft">
          <p className="font-display text-2xl text-muted-foreground">Unlocking…</p>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <div className="animate-pop-in grid place-items-center rounded-4xl bg-card p-12 text-center shadow-soft">
          <span className="animate-wiggle grid size-20 place-items-center rounded-3xl bg-mint text-mint-foreground">
            <Lock className="size-9" />
          </span>
          <h1 className="mt-6 text-4xl">{title} is parent-only</h1>
          <p className="mt-3 max-w-md font-semibold text-muted-foreground">
            Sign in with the household account to see profiles, controls and watch-time reports.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/login"
              className="press rounded-full bg-primary px-6 py-3.5 font-extrabold text-primary-foreground shadow-pop"
            >
              Sign in
            </Link>
            <Link to="/signup" className="press rounded-full bg-secondary px-6 py-3.5 font-extrabold">
              Create a household
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
