import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  Clock,
  Eye,
  ShieldCheck,
  SlidersHorizontal,
  TrendingDown,
} from "lucide-react";

import { AuthGate } from "@/components/kidflix/auth-gate";
import { getShow, img, kidProfiles, weekWatch } from "@/data/kidflix";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/parent/")({
  head: () => ({
    meta: [
      { title: "Parent zone — Kidflix" },
      {
        name: "description",
        content:
          "One dashboard for every child: watch-time totals, content controls, approval requests and weekly trends.",
      },
      { property: "og:title", content: "Parent zone — Kidflix" },
      {
        property: "og:description",
        content: "Watch-time totals, controls and approvals for the whole household.",
      },
    ],
  }),
  component: () => (
    <AuthGate title="The parent zone">
      <ParentDashboard />
    </AuthGate>
  ),
});

const recent = [
  { id: "tiny-tinkerers", kid: "Jamie", when: "Today, 4:12 pm", minutes: 28 },
  { id: "dino-daycare", kid: "Arun", when: "Today, 10:05 am", minutes: 20 },
  { id: "code-critters", kid: "Nila", when: "Yesterday, 6:40 pm", minutes: 52 },
  { id: "starlight-stories", kid: "Arun", when: "Yesterday, 7:25 pm", minutes: 10 },
];

const requests = [
  { id: "ocean-oddballs", kid: "Nila", reason: "Outside the 9–12 tier limit for weekdays" },
  { id: "rocket-recess", kid: "Jamie", reason: "Above Jamie's 6–8 tier" },
];

function ParentDashboard() {
  const { account } = useAuth();
  const weekTotal = weekWatch.reduce((a, b) => a + b.minutes, 0);
  const householdLimit = kidProfiles.reduce((a, k) => a + k.dailyLimit, 0);
  const householdWatched = kidProfiles.reduce((a, k) => a + k.watchedToday, 0);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <section className="animate-rise relative overflow-hidden rounded-4xl bg-primary px-8 py-12 text-primary-foreground shadow-float">
        <span className="animate-blob absolute -top-24 -right-16 size-72 bg-mint/50" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-caps opacity-80">Parent zone</p>
            <h1 className="mt-2 text-5xl">Good evening, {account?.name}.</h1>
            <p className="mt-3 max-w-lg font-semibold opacity-85">
              {householdWatched} of {householdLimit} household minutes used today. Two shows are
              waiting for your approval.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/parent/controls"
              className="press inline-flex items-center gap-2 rounded-full bg-sunny px-5 py-3.5 font-extrabold text-sunny-foreground shadow-pop"
            >
              <SlidersHorizontal className="size-4" /> Controls
            </Link>
            <Link
              to="/parent/watch-time"
              className="press inline-flex items-center gap-2 rounded-full bg-card px-5 py-3.5 font-extrabold text-primary shadow-pop"
            >
              <Clock className="size-4" /> Watch time
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Minutes this week", value: `${weekTotal}`, icon: Clock, tone: "bg-card" },
          {
            label: "Down from last week",
            value: "-14%",
            icon: TrendingDown,
            tone: "bg-mint text-mint-foreground",
          },
          { label: "Blocked attempts", value: "3", icon: ShieldCheck, tone: "bg-card" },
          {
            label: "Approval requests",
            value: "2",
            icon: BellRing,
            tone: "bg-sunny text-sunny-foreground",
          },
        ].map((s, i) => (
          <div
            key={s.label}
            className={cn("animate-pop-in rounded-4xl p-6 shadow-soft", s.tone)}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <s.icon className="size-6 opacity-70" />
            <p className="mt-4 font-display text-4xl">{s.value}</p>
            <p className="text-sm font-bold opacity-75">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="animate-rise rounded-4xl bg-card p-8 shadow-soft lg:col-span-2">
          <h2 className="text-3xl">Each child today</h2>
          <div className="mt-6 space-y-5">
            {kidProfiles.map((k) => {
              const pct = Math.round((k.watchedToday / k.dailyLimit) * 100);
              return (
                <div key={k.id} className="flex items-center gap-4">
                  <img
                    src={img(k.avatarSeed, 200, 200)}
                    alt={k.name}
                    className="size-14 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between text-sm font-extrabold">
                      <span>
                        {k.name} · {k.band}
                      </span>
                      <span className={cn(pct > 85 && "text-destructive")}>
                        {k.watchedToday}/{k.dailyLimit} min
                      </span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={cn(
                          "h-full rounded-full transition-[width] duration-1000",
                          pct > 85 ? "bg-bubblegum" : "bg-primary",
                        )}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="animate-rise rounded-4xl bg-bubblegum p-8 text-bubblegum-foreground shadow-soft">
          <span className="grid size-12 place-items-center rounded-2xl bg-card">
            <AlertTriangle className="size-6 text-bubblegum" />
          </span>
          <h2 className="mt-5 text-2xl">Needs your yes or no</h2>
          <div className="mt-5 space-y-4">
            {requests.map((r) => {
              const show = getShow(r.id)!;
              return (
                <div key={r.id} className="rounded-3xl bg-card p-4 text-foreground">
                  <p className="font-display text-lg">{show.title}</p>
                  <p className="text-xs font-bold text-muted-foreground">
                    {r.kid} · {r.reason}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="press flex-1 rounded-full bg-mint py-2 text-xs font-extrabold text-mint-foreground">
                      Allow once
                    </button>
                    <button className="press flex-1 rounded-full bg-secondary py-2 text-xs font-extrabold">
                      Not yet
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-4xl bg-card p-8 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl">Recently watched</h2>
          <Link
            to="/parent/watch-time"
            className="press inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 font-extrabold"
          >
            Full history <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {recent.map((r, i) => {
            const show = getShow(r.id)!;
            return (
              <Link
                key={`${r.id}-${i}`}
                to="/show/$id"
                params={{ id: show.id }}
                className="press flex items-center gap-4 rounded-3xl bg-secondary/60 p-4"
              >
                <img
                  src={img(show.seed, 200, 200)}
                  alt=""
                  className="size-16 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-display text-lg">{show.title}</p>
                  <p className="text-xs font-bold text-muted-foreground">
                    {r.kid} · {r.when} · {r.minutes} min
                  </p>
                </div>
                <Eye className="ml-auto size-5 shrink-0 text-primary" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
