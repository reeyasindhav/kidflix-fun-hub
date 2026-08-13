import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Filter, Star } from "lucide-react";
import { useMemo, useState } from "react";

import { ShowCard } from "@/components/kidflix/show-card";
import { ageBands, categories, collections, getShow, shows, type AgeBand } from "@/data/kidflix";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections & age tiers — Kidflix" },
      {
        name: "description",
        content:
          "Browse Kidflix by mood and age tier: calm-down corner, curious kids, wiggle-it-out and more.",
      },
      { property: "og:title", content: "Collections & age tiers — Kidflix" },
      {
        property: "og:description",
        content: "Hand-built shelves for calm evenings, curious afternoons and wiggly mornings.",
      },
    ],
  }),
  component: Collections,
});

const toneBg = {
  mint: "bg-mint text-mint-foreground",
  sunny: "bg-sunny text-sunny-foreground",
  bubblegum: "bg-bubblegum text-bubblegum-foreground",
} as const;

function Collections() {
  const [band, setBand] = useState<AgeBand | "all">("all");
  const [cat, setCat] = useState<string | "all">("all");

  const filtered = useMemo(
    () =>
      shows.filter(
        (s) => (band === "all" || s.age === band) && (cat === "all" || s.category === cat),
      ),
    [band, cat],
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6">
      <section className="animate-rise dotted-grid rounded-4xl border-2 border-border bg-card px-8 py-12">
        <p className="label-caps text-primary">Shelves, not algorithms</p>
        <h1 className="mt-2 max-w-2xl text-5xl">Collections built by humans who like naps.</h1>
        <p className="mt-4 max-w-xl font-semibold text-muted-foreground">
          Every shelf is assembled by our curation team, then checked against the age tier a parent
          has unlocked for the profile.
        </p>
      </section>

      <div className="mt-10 space-y-14">
        {collections.map((c) => (
          <section key={c.id}>
            <div
              className={cn(
                "flex flex-wrap items-center gap-4 rounded-3xl px-6 py-5",
                toneBg[c.tone],
              )}
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-card">
                <Star className="size-6 text-primary" />
              </span>
              <div>
                <h2 className="text-2xl">{c.title}</h2>
                <p className="font-semibold opacity-85">{c.blurb}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.showIds
                .map((id) => getShow(id))
                .filter((s): s is NonNullable<typeof s> => Boolean(s))
                .map((s, i) => (
                  <ShowCard key={s.id} show={s} index={i} />
                ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 font-display text-2xl">
            <Filter className="size-5 text-primary" /> Filter the full library
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {ageBands.map((b) => (
            <button
              key={b.id}
              onClick={() => setBand(b.id)}
              className={cn(
                "press rounded-full px-4 py-2.5 text-sm font-extrabold",
                band === b.id ? "bg-primary text-primary-foreground shadow-pop" : "bg-secondary",
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["all", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "press rounded-full px-4 py-2 text-xs font-extrabold",
                cat === c ? "bg-grape text-grape-foreground shadow-pop" : "bg-card shadow-soft",
              )}
            >
              {c === "all" ? "Every genre" : c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((s, i) => (
            <ShowCard key={s.id} show={s} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="mt-10 grid place-items-center rounded-4xl bg-card p-14 text-center shadow-soft">
            <Compass className="animate-wiggle size-10 text-primary" />
            <p className="mt-4 font-display text-2xl">Nothing on that shelf yet</p>
            <Link
              to="/collections"
              onClick={() => {
                setBand("all");
                setCat("all");
              }}
              className="press mt-4 rounded-full bg-primary px-5 py-3 font-extrabold text-primary-foreground"
            >
              Reset filters
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
