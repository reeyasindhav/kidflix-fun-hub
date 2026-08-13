import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

import { img } from "@/data/kidflix";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Kidflix" },
      {
        name: "description",
        content:
          "Sign in to your Kidflix household to manage kid profiles, controls and watch time.",
      },
      { property: "og:title", content: "Sign in — Kidflix" },
      { property: "og:description", content: "Parents sign in here. Kids just pick their avatar." },
    ],
  }),
  component: Login,
});

function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("parent@kidflix.app");
  const [password, setPassword] = useState("kidflix1234");
  const [error, setError] = useState("");

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
      <section className="animate-rise relative order-2 overflow-hidden rounded-4xl bg-primary p-10 text-primary-foreground shadow-float lg:order-1">
        <span className="animate-blob absolute -bottom-16 -left-10 size-64 bg-mint/60" />
        <div className="relative">
          <Sparkles className="size-8" />
          <h2 className="mt-6 text-4xl leading-tight">
            Kids get the fun.
            <br />
            Parents get the controls.
          </h2>
          <ul className="mt-8 space-y-4 font-semibold">
            {[
              "Age tiers you unlock, not guess at",
              "Watch-time limits with a soft landing",
              "No autoplay, no comments, no ads",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-sunny" /> {t}
              </li>
            ))}
          </ul>
          <img
            src={img("kids fun cartoon", 700, 500)}
            alt="Children laughing together"
            className="animate-float mt-10 aspect-4/3 w-full rounded-3xl border-6 border-accent/60 object-cover"
          />
        </div>
      </section>

      <section className="order-1 lg:order-2">
        <p className="label-caps text-primary">Parent sign in</p>
        <h1 className="mt-2 text-5xl">Welcome back.</h1>
        <p className="mt-3 font-semibold text-muted-foreground">
          This is a design prototype — any email and a 4+ character password will let you in.
        </p>

        <form
          className="animate-rise mt-8 space-y-4 rounded-4xl bg-card p-8 shadow-soft"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.includes("@") || password.length < 4) {
              setError("Use a valid email and at least 4 characters.");
              return;
            }
            signIn(email);
            navigate({ to: "/profile" });
          }}
        >
          <label className="block">
            <span className="label-caps text-muted-foreground">Email</span>
            <div className="mt-2 flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3.5">
              <Mail className="size-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent font-bold outline-none"
                autoComplete="email"
              />
            </div>
          </label>
          <label className="block">
            <span className="label-caps text-muted-foreground">Password</span>
            <div className="mt-2 flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3.5">
              <Lock className="size-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent font-bold outline-none"
                autoComplete="current-password"
              />
            </div>
          </label>

          {error && (
            <p className="animate-pop-in rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-extrabold text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="press flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 font-display text-lg text-primary-foreground shadow-pop"
          >
            Enter parent zone <ArrowRight className="size-5" />
          </button>

          <p className="text-center text-sm font-bold text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="text-primary underline decoration-2 underline-offset-4">
              Create a household
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
