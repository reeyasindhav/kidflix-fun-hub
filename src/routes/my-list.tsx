import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, HeartCrack, ListMusic } from "lucide-react";
import { useState } from "react";

import { ShowCard } from "@/components/kidflix/show-card";
import { shows } from "@/data/kidflix";

export const Route = createFileRoute("/my-list")({
  head: () => ({
    meta: [
      { title: "My list — Kidflix" },
      {
        name: "description",
        content: "Every show your child has hearted, kept in one calm, parent-approved shelf.",
      },
      { property: "og:title", content: "My list — Kidflix" },
      { property: "og:description", content: "Saved shows, all parent-approved." },
    ],
  }),
  component: MyList,
});

const initial = ["luna-and-friends", "tiny-tinkerers", "starlight-stories", "melody-market", "dino-daycare"];

function MyList() {
  const [saved, setSaved] = useState<string[]>(initial);
  const list = shows.filter((s) => saved.includes(s.id));
  const totalMinutes = list.reduce((sum, s) => sum + s.minutes, 0);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6">
      <section className="animate-rise relative overflow-hidden rounded-4xl bg-bubblegum px-8 py-12 text-bubblegum-foreground shadow-float">
        <span className="animate-blob absolute -top-20 -right-10 size-64 bg-sunny/70" />
        <div className="relative">
          <p className="label-caps opacity-80">Saved by you</p>
          <h1 className="mt-2 text-5xl">My list</h1>
          <p className="mt-3 max-w-md font-semibold opacity-90">
            {list.length} shows · about {totalMinutes} minutes of hearted favourites.
          </p>
        </div>
      </section>

      {list.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s, i) => (
            <ShowCard
              key={s.id}
              show={s}
              index={i}
              liked
              onToggleLike={(id) => setSaved((v) => v.filter((x) => x !== id))}
            />
          ))}
        </div>
      ) : (
        <div className="animate-pop-in mt-12 grid place-items-center rounded-4xl bg-card p-16 text-center shadow-soft">
          <span className="animate-wiggle grid size-20 place-items-center rounded-3xl bg-secondary">
            <HeartCrack className="size-9 text-primary" />
          </span>
          <h2 className="mt-6 text-3xl">Your list is empty</h2>
          <p className="mt-2 font-semibold text-muted-foreground">
            Tap the heart on any show to keep it here.
          </p>
          <Link
            to="/"
            className="press mt-6 rounded-full bg-primary px-6 py-3.5 font-extrabold text-primary-foreground shadow-pop"
          >
            Find something to love
          </Link>
        </div>
      )}

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-4xl bg-card p-8 shadow-soft">
          <span className="grid size-12 place-items-center rounded-2xl bg-mint text-mint-foreground">
            <ListMusic className="size-6" />
          </span>
          <h2 className="mt-5 text-2xl">Make a bedtime queue</h2>
          <p className="mt-2 font-semibold text-muted-foreground">
            Line up two short stories and Kidflix will stop after the last one — no "just one more".
          </p>
          <Link
            to="/collections"
            className="press mt-5 inline-block rounded-full bg-secondary px-5 py-3 font-extrabold"
          >
            Browse collections
          </Link>
        </div>
        <div className="rounded-4xl bg-sunny p-8 text-sunny-foreground shadow-soft">
          <span className="grid size-12 place-items-center rounded-2xl bg-card">
            <Heart className="size-6 text-primary" />
          </span>
          <h2 className="mt-5 text-2xl">Hearts help us pick better</h2>
          <p className="mt-2 font-semibold opacity-85">
            Recommendations only ever come from the age tier a parent has unlocked.
          </p>
          <Link
            to="/parent/controls"
            className="press mt-5 inline-block rounded-full bg-card px-5 py-3 font-extrabold"
          >
            See content controls
          </Link>
        </div>
      </section>
    </div>
  );
}
