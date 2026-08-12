import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Moon, Sun, Sunset, TrendingDown } from "lucide-react";
import { useState } from "react";

import { AuthGate } from "@/components/kidflix/auth-gate";
import { kidProfiles, weekWatch } from "@/data/kidflix";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/parent/watch-time")({
  head: () => ({
    meta: [
      { title: "Watch-time report — Kidflix" },
      {
        name: "description",
        content:
          "Transparent screen-time metrics: daily totals, time-of-day patterns and gentle limits per child.",
      },
      { property: "og:title", content: "Watch-time report — Kidflix" },
      { property: "og:description", content: "Honest screen-time numbers, no dark patterns." },
    ],
  }),
  component: () => (
    <AuthGate title="The watch-time report">
      <WatchTime />
    </AuthGate>
  ),
});

const partsOfDay = [
  { label: "Morning", icon: Sun, minutes: 96, tone: "bg-sunny text-sunny-foreground" },
  { label: "Afternoon", icon: Sunset, minutes: 148, tone: "bg-mint text-mint-foreground" },
  { label: "Evening", icon: Moon, minutes: 77, tone: "bg-grape text-grape-foreground" },
];

const genreSplit = [
  { label: "Learn & make", pct: 34 },
  { label: "Nature", pct: 24 },
  { label: "Feelings", pct: 18 },
  { label: "Comedy", pct: 14 },
  { label: "Music", pct: 10 },
];

function WatchTime() {
  const [kidId, setKidId] = useState(kidProfiles[0]!.id);
  const kid = kidProfiles.find((k) => k.id === kidId)!;
  const weekTotal = weekWatch.reduce((a, b) => a + b.minutes, 0);
  const maxWeek = Math.max(...weekWatch.map((d) => d.minutes));

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
          <p className="label-caps text-primary">Transparent by default</p>
          <h1 className="mt-2 text-5xl">Watch-time report</h1>
          <p className="mt-3 max-w-lg font-semibold text-muted-foreground">
            {weekTotal} minutes across the household this week — {" "}
            <span className="text-primary">14% less</span> than last week.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {kidProfiles.map((k) => (
            <button
              key={k.id}
              onClick={() => setKidId(k.id)}
              className={cn(
                "press rounded-full px-4 py-2.5 text-sm font-extrabold",
                k.id === kidId ? "bg-primary text-primary-foreground shadow-pop" : "bg-secondary",
              )}
            >
              {k.name}
            </button>
          ))}
        </div>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="animate-rise rounded-4xl bg-card p-8 shadow-soft">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl">{kid.name}'s seven days</h2>
              <p className="font-semibold text-muted-foreground">
                Daily limit {kid.dailyLimit} min · {kid.watchedToday} min used today
              </p>
            </div>
            <span className="grid size-12 place-items-center rounded-2xl bg-sunny text-sunny-foreground">
              <Clock className="size-6" />
            </span>
          </div>

          <div className="mt-10 flex h-52 items-end justify-between gap-3">
            {weekWatch.map((d, i) => {
              const over = d.minutes > kid.dailyLimit;
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-extrabold text-muted-foreground">{d.minutes}m</span>
                  <div
                    className={cn(
                      "animate-rise w-full max-w-10 rounded-t-3xl",
                      over ? "bg-bubblegum" : "bg-primary/85",
                    )}
                    style={{
                      height: `${(d.minutes / maxWeek) * 100}%`,
                      animationDelay: `${i * 70}ms`,
                    }}
                  />
                  <span className="text-xs font-extrabold">{d.day}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-6 flex items-center gap-2 rounded-3xl bg-mint/40 px-4 py-3 text-sm font-bold">
            <TrendingDown className="size-4 text-primary" /> Friday was the longest day. Kidflix
            offered a wind-down story at 76 minutes.
          </p>
        </div>

        <div className="space-y-6">
          <div className="animate-rise rounded-4xl bg-card p-8 shadow-soft">
            <h2 className="text-2xl">When they watch</h2>
            <div className="mt-5 space-y-3">
              {partsOfDay.map((p) => (
                <div key={p.label} className={cn("rounded-3xl p-4", p.tone)}>
                  <div className="flex items-center justify-between font-extrabold">
                    <span className="flex items-center gap-2">
                      <p.icon className="size-4" /> {p.label}
                    </span>
                    <span>{p.minutes} min</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-card/70">
                    <div
                      className="h-full rounded-full bg-primary transition-[width] duration-1000"
                      style={{ width: `${(p.minutes / 148) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-rise rounded-4xl bg-primary p-8 text-primary-foreground shadow-soft">
            <h2 className="text-2xl">What they watch</h2>
            <div className="mt-5 space-y-3">
              {genreSplit.map((g) => (
                <div key={g.label}>
                  <div className="flex justify-between text-sm font-extrabold">
                    <span>{g.label}</span>
                    <span>{g.pct}%</span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-primary-foreground/20">
                    <div
                      className="h-full rounded-full bg-sunny transition-[width] duration-1000"
                      style={{ width: `${g.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-5 sm:grid-cols-3">
        {[
          { label: "Longest single session", value: "34 min", note: "Below the 45 min cap" },
          { label: "Sessions ended by limit", value: "2", note: "Both had a wind-down story" },
          { label: "Late-night attempts", value: "0", note: "Screen-off time respected" },
        ].map((s, i) => (
          <div
            key={s.label}
            className="animate-pop-in rounded-4xl bg-card p-6 shadow-soft"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <p className="font-display text-4xl text-primary">{s.value}</p>
            <p className="mt-2 font-extrabold">{s.label}</p>
            <p className="text-sm font-semibold text-muted-foreground">{s.note}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-4xl bg-sunny p-8 text-sunny-foreground shadow-soft">
        <div>
          <h2 className="text-3xl">Want a tighter limit?</h2>
          <p className="mt-2 max-w-lg font-semibold opacity-85">
            Adjust daily minutes, session caps and screen-off times per child in content controls.
          </p>
        </div>
        <Link
          to="/parent/controls"
          className="press rounded-full bg-card px-6 py-4 font-display text-lg text-primary shadow-pop"
        >
          Open controls
        </Link>
      </section>
    </div>
  );
}
