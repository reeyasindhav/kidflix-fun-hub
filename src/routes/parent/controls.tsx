import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, KeyRound, Moon, ShieldCheck, Star, Volume2 } from "lucide-react";
import { useState } from "react";

import { AuthGate } from "@/components/kidflix/auth-gate";
import { ageBands, categories, img, kidProfiles, type AgeBand } from "@/data/kidflix";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/parent/controls")({
  head: () => ({
    meta: [
      { title: "Content controls — Kidflix" },
      {
        name: "description",
        content:
          "Granular parental controls: age tiers, blocked genres, daily minutes, session caps, screen-off time and a PIN lock.",
      },
      { property: "og:title", content: "Content controls — Kidflix" },
      { property: "og:description", content: "Age tiers, genre blocks, limits and a PIN lock." },
    ],
  }),
  component: () => (
    <AuthGate title="Content controls">
      <Controls />
    </AuthGate>
  ),
});

function Toggle({
  label,
  note,
  on,
  onChange,
}: {
  label: string;
  note: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="flex w-full items-center gap-4 rounded-3xl bg-secondary/60 p-5 text-left"
    >
      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg">{label}</span>
        <span className="block text-sm font-semibold text-muted-foreground">{note}</span>
      </span>
      <span
        className={cn(
          "relative h-8 w-14 shrink-0 rounded-full transition-colors duration-300",
          on ? "bg-primary" : "bg-border",
        )}
      >
        <span
          className={cn(
            "absolute top-1 size-6 rounded-full bg-card shadow-soft transition-transform duration-300",
            on ? "translate-x-7" : "translate-x-1",
          )}
        />
      </span>
    </button>
  );
}

function Controls() {
  const [kidId, setKidId] = useState(kidProfiles[0]!.id);
  const kid = kidProfiles.find((k) => k.id === kidId)!;
  const [band, setBand] = useState<AgeBand>(kid.band);
  const [limit, setLimit] = useState(kid.dailyLimit);
  const [session, setSession] = useState(45);
  const [blocked, setBlocked] = useState<string[]>(["Comedy"]);
  const [switches, setSwitches] = useState({
    autoplay: false,
    winddown: true,
    quiet: true,
    search: true,
  });
  const [pin, setPin] = useState("2468");

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <Link
        to="/parent"
        className="press inline-flex items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-extrabold shadow-soft"
      >
        <ArrowLeft className="size-4" /> Parent zone
      </Link>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label-caps text-primary">Granular by design</p>
          <h1 className="mt-2 text-5xl">Content controls</h1>
          <p className="mt-3 max-w-lg font-semibold text-muted-foreground">
            Changes apply the moment you save — even mid-episode.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {kidProfiles.map((k) => (
            <button
              key={k.id}
              onClick={() => {
                setKidId(k.id);
                setBand(k.band);
                setLimit(k.dailyLimit);
              }}
              className={cn(
                "press flex items-center gap-2 rounded-full py-2 pr-4 pl-2 text-sm font-extrabold",
                k.id === kidId ? "bg-primary text-primary-foreground shadow-pop" : "bg-secondary",
              )}
            >
              <img
                src={img(k.avatarSeed, 100, 100)}
                alt=""
                className="size-8 rounded-full object-cover"
              />
              {k.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-6">
          <section className="animate-rise rounded-4xl bg-card p-8 shadow-soft">
            <h2 className="text-2xl">Age tier for {kid.name}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {ageBands
                .filter((b) => b.id !== "all")
                .map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBand(b.id as AgeBand)}
                    className={cn(
                      "press rounded-3xl p-5 text-left",
                      band === b.id
                        ? "bg-primary text-primary-foreground shadow-pop"
                        : "bg-secondary",
                    )}
                  >
                    <p className="font-display text-xl">{b.label}</p>
                    <p className="mt-1 text-xs font-bold opacity-80">{b.blurb}</p>
                  </button>
                ))}
            </div>
          </section>

          <section className="animate-rise rounded-4xl bg-card p-8 shadow-soft">
            <h2 className="text-2xl">Blocked genres</h2>
            <p className="font-semibold text-muted-foreground">
              Tap to hide a genre from {kid.name}'s shelves entirely.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((c) => {
                const off = blocked.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() =>
                      setBlocked((b) => (b.includes(c) ? b.filter((x) => x !== c) : [...b, c]))
                    }
                    className={cn(
                      "press rounded-full px-4 py-2.5 text-sm font-extrabold transition-colors",
                      off
                        ? "bg-destructive/15 text-destructive line-through"
                        : "bg-mint text-mint-foreground",
                    )}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="animate-rise rounded-4xl bg-card p-8 shadow-soft">
            <h2 className="text-2xl">Time limits</h2>
            <label className="mt-6 block">
              <span className="label-caps text-muted-foreground">Daily minutes · {limit}</span>
              <input
                type="range"
                min={15}
                max={180}
                step={5}
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="mt-3 w-full accent-primary"
              />
            </label>
            <label className="mt-5 block">
              <span className="label-caps text-muted-foreground">
                Single session cap · {session} min
              </span>
              <input
                type="range"
                min={10}
                max={90}
                step={5}
                value={session}
                onChange={(e) => setSession(Number(e.target.value))}
                className="mt-3 w-full accent-primary"
              />
            </label>
            <div className="mt-6 flex items-center gap-3 rounded-3xl bg-mint/40 p-5 text-sm font-bold">
              <Moon className="size-5 shrink-0 text-primary" />
              Screen-off at 19:30 with a 10-minute wind-down warning and a bedtime story offer.
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="animate-rise space-y-3 rounded-4xl bg-card p-8 shadow-soft">
            <h2 className="text-2xl">Safety switches</h2>
            <Toggle
              label="Autoplay next episode"
              note="Off by default. We recommend keeping it off."
              on={switches.autoplay}
              onChange={(v) => setSwitches((s) => ({ ...s, autoplay: v }))}
            />
            <Toggle
              label="Wind-down mode"
              note="Dim screen and lower volume in the last 10 minutes."
              on={switches.winddown}
              onChange={(v) => setSwitches((s) => ({ ...s, winddown: v }))}
            />
            <Toggle
              label="Loudness cap"
              note="Normalise all audio to a calm 78 dB."
              on={switches.quiet}
              onChange={(v) => setSwitches((s) => ({ ...s, quiet: v }))}
            />
            <Toggle
              label="Search inside the tier"
              note="Kids can search, but only within unlocked shows."
              on={switches.search}
              onChange={(v) => setSwitches((s) => ({ ...s, search: v }))}
            />
          </section>

          <section className="animate-rise rounded-4xl bg-primary p-8 text-primary-foreground shadow-soft">
            <span className="grid size-12 place-items-center rounded-2xl bg-primary-foreground/15">
              <KeyRound className="size-6" />
            </span>
            <h2 className="mt-5 text-2xl">Parent PIN</h2>
            <p className="mt-2 font-semibold opacity-85">
              Required to leave a kid profile, change limits or approve a request.
            </p>
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
              inputMode="numeric"
              className="mt-5 w-32 rounded-2xl bg-primary-foreground/15 px-4 py-3 text-center font-display text-3xl tracking-[0.4em] outline-none"
              aria-label="Parent PIN"
            />
          </section>

          <section className="animate-rise rounded-4xl bg-sunny p-8 text-sunny-foreground shadow-soft">
            <Star className="size-7" />
            <h2 className="mt-4 text-2xl">Saved automatically</h2>
            <p className="mt-2 font-semibold opacity-85">
              {kid.name}: {band} tier · {limit} min/day · {session} min sessions · {blocked.length}{" "}
              blocked genre{blocked.length === 1 ? "" : "s"}.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="press inline-flex items-center gap-2 rounded-full bg-card px-5 py-3 font-extrabold text-primary shadow-pop">
                <ShieldCheck className="size-4" /> Apply to all kids
              </button>
              <button className="press inline-flex items-center gap-2 rounded-full bg-sunny-foreground/10 px-5 py-3 font-extrabold">
                <Volume2 className="size-4" /> Test wind-down
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
