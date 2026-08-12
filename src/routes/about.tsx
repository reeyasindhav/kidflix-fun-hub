import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, Heart, ShieldCheck, Sparkles, Timer } from "lucide-react";

import { img } from "@/data/kidflix";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "How Kidflix keeps it safe — Kidflix" },
      {
        name: "description",
        content:
          "How Kidflix works: human curation, age tiers parents unlock, no autoplay loops and transparent watch-time metrics.",
      },
      { property: "og:title", content: "How Kidflix keeps it safe" },
      {
        property: "og:description",
        content: "Human curation, age tiers, no autoplay and honest screen-time numbers.",
      },
    ],
  }),
  component: About,
});

const pillars = [
  {
    icon: ShieldCheck,
    title: "Curated by people",
    body: "Every episode is watched end to end by our curation team before it reaches a shelf.",
    tone: "bg-card",
  },
  {
    icon: Timer,
    title: "No autoplay loops",
    body: "Episodes end. The screen says so. Nothing queues itself behind your back.",
    tone: "bg-mint text-mint-foreground",
  },
  {
    icon: Eye,
    title: "Age tiers you unlock",
    body: "3–5, 6–8 and 9–12 tiers are opened by a parent — never guessed by an algorithm.",
    tone: "bg-card",
  },
  {
    icon: Heart,
    title: "Honest numbers",
    body: "Watch-time reports show the real totals, including the days that went long.",
    tone: "bg-sunny text-sunny-foreground",
  },
];

const flow = [
  { step: "1", title: "Parent signs up", body: "Create the household, add kids, pick age tiers." },
  { step: "2", title: "Set gentle limits", body: "Daily minutes, session caps and screen-off time." },
  { step: "3", title: "Kid picks a profile", body: "They only ever see their own unlocked shelves." },
  { step: "4", title: "Watch, then stop", body: "A calm end card, a wind-down story, no next-up." },
  { step: "5", title: "Parent reviews", body: "Weekly report, approvals and one-tap adjustments." },
];

function About() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <section className="animate-rise relative overflow-hidden rounded-4xl bg-primary px-8 py-14 text-primary-foreground shadow-float sm:px-14">
        <span className="animate-blob absolute -right-20 -bottom-24 size-80 bg-sunny/70" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 text-sm font-extrabold">
            <Sparkles className="size-4" /> Our promise
          </span>
          <h1 className="mt-6 text-5xl leading-tight sm:text-6xl">
            Screen time that ends on purpose.
          </h1>
          <p className="mt-5 text-lg font-semibold opacity-85">
            Mainstream platforms are built to keep watching. Kidflix is built to stop — kindly, at the
            right moment, with the numbers to prove it.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <div
            key={p.title}
            className={`animate-pop-in rounded-4xl p-7 shadow-soft ${p.tone}`}
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/10">
              <p.icon className="size-6 text-primary" />
            </span>
            <h2 className="mt-5 text-2xl">{p.title}</h2>
            <p className="mt-2 font-semibold opacity-80">{p.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <img
          src={img("kidflix-about-family", 900, 700)}
          alt="A child reading beside a window full of books"
          className="animate-float aspect-4/3 w-full rounded-4xl border-8 border-accent/60 object-cover shadow-float"
        />
        <div>
          <p className="label-caps text-primary">The user flow</p>
          <h2 className="mt-2 text-4xl">Five steps, start to stop.</h2>
          <ol className="mt-7 space-y-4">
            {flow.map((f, i) => (
              <li
                key={f.step}
                className="animate-rise flex gap-4 rounded-3xl bg-card p-5 shadow-soft"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary font-display text-lg text-primary-foreground">
                  {f.step}
                </span>
                <span>
                  <span className="block font-display text-xl">{f.title}</span>
                  <span className="block text-sm font-semibold text-muted-foreground">{f.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-4xl bg-mint p-10 text-mint-foreground shadow-soft">
        <div>
          <h2 className="text-4xl">Ready to try a calmer screen?</h2>
          <p className="mt-2 max-w-lg font-semibold opacity-85">
            Set up a household in three steps. No card needed for the prototype.
          </p>
        </div>
        <Link
          to="/signup"
          className="press inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-display text-lg text-primary-foreground shadow-pop"
        >
          Create a household <ArrowRight className="size-5" />
        </Link>
      </section>
    </div>
  );
}
