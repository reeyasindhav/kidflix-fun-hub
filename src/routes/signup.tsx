import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Lock, Mail, User } from "lucide-react";
import { useState } from "react";

import { ageBands, type AgeBand } from "@/data/kidflix";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your household — Kidflix" },
      {
        name: "description",
        content:
          "Set up a Kidflix household in three steps: parent account, kid profile, age tier and daily watch-time limit.",
      },
      { property: "og:title", content: "Create your household — Kidflix" },
      { property: "og:description", content: "Three steps to a safer screen-time routine." },
    ],
  }),
  component: Signup,
});

const steps = ["Parent account", "Kid profile", "Safety rules"];

function Signup() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "Priya",
    email: "priya@kidflix.app",
    password: "kidflix1234",
    kidName: "Jamie",
    kidAge: 6,
    band: "6-8" as AgeBand,
    limit: 80,
    bedtime: "19:30",
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="label-caps text-primary">Get started</p>
      <h1 className="mt-2 text-5xl">Build your household.</h1>

      <ol className="mt-8 flex items-center gap-3">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-3">
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-full font-display text-lg transition-colors",
                i < step
                  ? "bg-mint text-mint-foreground"
                  : i === step
                    ? "bg-primary text-primary-foreground shadow-pop"
                    : "bg-secondary text-muted-foreground",
              )}
            >
              {i < step ? <Check className="size-5" /> : i + 1}
            </span>
            <span className="hidden text-sm font-extrabold sm:block">{s}</span>
            {i < steps.length - 1 && <span className="h-1 flex-1 rounded-full bg-secondary" />}
          </li>
        ))}
      </ol>

      <form
        className="animate-rise mt-8 rounded-4xl bg-card p-8 shadow-soft"
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 2) {
            setStep(step + 1);
            return;
          }
          signIn(form.email, form.name);
          navigate({ to: "/profile" });
        }}
      >
        {step === 0 && (
          <div className="animate-pop-in space-y-4">
            <h2 className="text-2xl">Who's the grown-up?</h2>
            {[
              { k: "name" as const, label: "Your name", icon: User, type: "text" },
              { k: "email" as const, label: "Email", icon: Mail, type: "email" },
              { k: "password" as const, label: "Password", icon: Lock, type: "password" },
            ].map((f) => (
              <label key={f.k} className="block">
                <span className="label-caps text-muted-foreground">{f.label}</span>
                <div className="mt-2 flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3.5">
                  <f.icon className="size-4 text-muted-foreground" />
                  <input
                    type={f.type}
                    value={form[f.k]}
                    onChange={(e) => set(f.k, e.target.value)}
                    className="w-full bg-transparent font-bold outline-none"
                  />
                </div>
              </label>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="animate-pop-in space-y-5">
            <h2 className="text-2xl">And who's watching?</h2>
            <label className="block">
              <span className="label-caps text-muted-foreground">Kid's first name</span>
              <input
                value={form.kidName}
                onChange={(e) => set("kidName", e.target.value)}
                className="mt-2 w-full rounded-2xl bg-secondary px-4 py-3.5 font-bold outline-none"
              />
            </label>
            <div>
              <span className="label-caps text-muted-foreground">Age tier to unlock</span>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {ageBands
                  .filter((b) => b.id !== "all")
                  .map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => set("band", b.id as AgeBand)}
                      className={cn(
                        "press rounded-3xl p-4 text-left transition-colors",
                        form.band === b.id
                          ? "bg-primary text-primary-foreground shadow-pop"
                          : "bg-secondary",
                      )}
                    >
                      <p className="font-display text-xl">{b.label}</p>
                      <p className="mt-1 text-xs font-bold opacity-80">{b.blurb}</p>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-pop-in space-y-6">
            <h2 className="text-2xl">Set the gentle limits</h2>
            <label className="block">
              <span className="label-caps text-muted-foreground">
                Daily watch time · {form.limit} min
              </span>
              <input
                type="range"
                min={15}
                max={180}
                step={5}
                value={form.limit}
                onChange={(e) => set("limit", Number(e.target.value))}
                className="mt-3 w-full accent-primary"
              />
            </label>
            <label className="block">
              <span className="label-caps text-muted-foreground">Screen-off time</span>
              <input
                type="time"
                value={form.bedtime}
                onChange={(e) => set("bedtime", e.target.value)}
                className="mt-2 w-full rounded-2xl bg-secondary px-4 py-3.5 font-bold outline-none"
              />
            </label>
            <div className="rounded-3xl bg-mint/40 p-5 text-sm font-bold">
              {form.kidName} will see only {form.band} shows, with {form.limit} minutes a day and a
              wind-down warning 10 minutes before {form.bedtime}.
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="press rounded-full bg-secondary px-5 py-3.5 font-extrabold"
            >
              Back
            </button>
          ) : (
            <Link to="/login" className="text-sm font-bold text-muted-foreground underline">
              I already have an account
            </Link>
          )}
          <button
            type="submit"
            className="press inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-display text-lg text-primary-foreground shadow-pop"
          >
            {step === 2 ? "Finish setup" : "Continue"} <ArrowRight className="size-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
