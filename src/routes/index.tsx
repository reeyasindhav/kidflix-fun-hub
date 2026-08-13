import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Play, Search, ShieldCheck, Star } from "lucide-react";
import { useMemo, useState } from "react";

import { ShowCard } from "@/components/kidflix/show-card";
import { ageBands, img, kidProfiles, shows, weekWatch, type AgeBand } from "@/data/kidflix";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kidflix — Safe cartoon streaming for curious kids" },
      {
        name: "description",
        content:
          "Kidflix is a child-first streaming home: curated cartoons, age-tier filtering, parental controls and honest watch-time tracking.",
      },
      { property: "og:title", content: "Kidflix — Safe cartoon streaming for curious kids" },
      {
        property: "og:description",
        content: "Curated cartoons, age filters, parent controls and gentle watch-time limits.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { account } = useAuth();
  const [band, setBand] = useState<AgeBand | "all">("all");
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState<string[]>(["luna-and-friends"]);

  const kid = kidProfiles.find((k) => k.id === (account?.activeKid ?? "jamie")) ?? kidProfiles[0]!;

  const visible = useMemo(
    () =>
      shows.filter(
        (s) =>
          (band === "all" || s.age === band) &&
          (query.trim() === "" ||
            `${s.title} ${s.category} ${s.tagline}`.toLowerCase().includes(query.toLowerCase())),
      ),
    [band, query],
  );

  const pct = Math.round((kid.watchedToday / kid.dailyLimit) * 100);
  const maxWeek = Math.max(...weekWatch.map((d) => d.minutes));

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6">
      {/* HERO */}
      <section className="animate-rise relative overflow-hidden rounded-4xl bg-primary px-6 py-12 text-primary-foreground shadow-float sm:px-12 sm:py-16">
        <span className="animate-blob absolute -top-16 right-24 size-56 bg-sunny/90" />
        <span className="animate-blob absolute -right-24 -bottom-24 size-80 bg-accent/60 [animation-delay:-4s]" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 text-sm font-extrabold">
              <ShieldCheck className="size-4" /> Curated just for kids
            </span>
            <h1 className="mt-6 text-5xl leading-[0.95] sm:text-7xl">
              Big adventures.
              <br />
              <span className="text-sunny">Little worries.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg font-semibold text-primary-foreground/85">
              A happy place for curious minds to explore, learn and laugh — without autoplay rabbit
              holes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/show/$id"
                params={{ id: "luna-and-friends" }}
                className="press inline-flex items-center gap-2 rounded-full bg-sunny px-7 py-4 font-display text-lg text-sunny-foreground shadow-pop"
              >
                <Play className="size-5 fill-current" /> Start watching
              </Link>
              <Link
                to="/about"
                className="press inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 px-6 py-4 font-bold"
              >
                How Kidflix keeps it safe <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <span className="animate-float absolute -top-6 -left-6 grid size-16 place-items-center rounded-3xl bg-mint text-mint-foreground shadow-pop">
              <Star className="size-7 fill-current" />
            </span>
            <img
              src={img("cute cat cartoon", 900, 1100)}
              alt="A curious kitten peeking out from leaves"
              className="animate-float aspect-3/4 w-full rounded-[3rem] border-8 border-accent/70 object-cover shadow-float [animation-delay:-2s]"
            />
          </div>
        </div>
      </section>

      {/* YOUR SPACE */}
      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-caps text-primary">Your space</p>
            <h2 className="mt-2 text-4xl">Hi {kid.name}, ready to play?</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-muted-foreground">Show me:</span>
            {ageBands.map((b) => (
              <button
                key={b.id}
                onClick={() => setBand(b.id)}
                className={cn(
                  "press rounded-full px-4 py-2.5 text-sm font-extrabold transition-colors",
                  band === b.id
                    ? "bg-primary text-primary-foreground shadow-pop"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl">Keep exploring</h3>
            <p className="font-semibold text-muted-foreground">Friendly picks with no surprises.</p>
          </div>
          <label className="flex w-full max-w-xs items-center gap-2 rounded-full bg-card px-4 py-3 shadow-soft sm:w-auto">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search shows"
              className="w-full bg-transparent text-sm font-bold outline-none placeholder:text-muted-foreground sm:w-52"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.slice(0, 8).map((s, i) => (
            <ShowCard
              key={s.id}
              show={s}
              index={i}
              liked={liked.includes(s.id)}
              onToggleLike={(id) =>
                setLiked((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]))
              }
            />
          ))}
        </div>
        {visible.length === 0 && (
          <p className="mt-10 text-center font-bold text-muted-foreground">
            No shows match that yet — try another age tier.
          </p>
        )}
      </section>

      {/* WATCH TIME + STREAK */}
      <section className="mt-14 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="animate-rise rounded-4xl bg-card p-8 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label-caps text-primary">This week</p>
              <h3 className="mt-2 text-3xl">Your watch-time garden</h3>
              <p className="font-semibold text-muted-foreground">
                You have {Math.max(kid.dailyLimit - kid.watchedToday, 0)} minutes left in today's
                gentle limit.
              </p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-sunny text-sunny-foreground shadow-pop">
              <Clock className="size-6" />
            </span>
          </div>

          <div className="mt-7 h-4 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs font-extrabold">
            <span>{kid.watchedToday} min watched</span>
            <span>{kid.dailyLimit} min goal</span>
          </div>

          <div className="mt-8 flex h-32 items-end justify-between gap-3">
            {weekWatch.map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="animate-rise w-4 rounded-full bg-mint"
                  style={{
                    height: `${(d.minutes / maxWeek) * 100}%`,
                    animationDelay: `${i * 80}ms`,
                  }}
                  title={`${d.minutes} min`}
                />
                <span className="text-xs font-extrabold text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-rise flex flex-col justify-between rounded-4xl bg-mint p-8 text-mint-foreground shadow-soft">
          <div className="flex items-start justify-between">
            <span className="grid size-12 place-items-center rounded-2xl bg-card">
              <Star className="size-6 fill-primary text-primary" />
            </span>
            <span className="rounded-full bg-card px-3 py-1.5 text-xs font-extrabold">
              Parent-approved
            </span>
          </div>
          <div className="mt-10">
            <h3 className="text-3xl">Small steps, big stars.</h3>
            <p className="mt-2 font-semibold opacity-80">
              You're on a {kid.streak}-day exploring streak. Keep it up!
            </p>
            <Link
              to="/parent"
              className="press mt-6 inline-flex items-center gap-2 font-display text-lg underline decoration-2 underline-offset-4"
            >
              View family dashboard <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
