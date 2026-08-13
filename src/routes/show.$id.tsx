import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Heart, Play, ShieldCheck, Sparkles, Star } from "lucide-react";

import { ShowCard } from "@/components/kidflix/show-card";
import { getShow, img, shows, toneClass } from "@/data/kidflix";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/show/$id")({
  loader: ({ params }) => {
    const show = getShow(params.id);
    if (!show) throw notFound();
    return { show };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Show unavailable — Kidflix" }, { name: "robots", content: "noindex" }],
      };
    }
    const { show } = loaderData;
    return {
      meta: [
        { title: `${show.title} — Kidflix` },
        { name: "description", content: `${show.tagline}. ${show.description}` },
        { property: "og:title", content: `${show.title} on Kidflix` },
        { property: "og:description", content: show.tagline },
      ],
    };
  },
  component: ShowDetail,
});

function ShowDetail() {
  const { show } = Route.useLoaderData();
  const related = shows.filter((s) => s.id !== show.id && s.category === show.category).slice(0, 4);
  const more = related.length ? related : shows.filter((s) => s.id !== show.id).slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6">
      <Link
        to="/"
        className="press inline-flex items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-extrabold shadow-soft"
      >
        <ArrowLeft className="size-4" /> Back to browse
      </Link>

      <section className="animate-rise mt-5 grid gap-8 rounded-4xl bg-card p-6 shadow-soft lg:grid-cols-[1.05fr_1fr] lg:p-10">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={img(show.seed, 800, 600)}
            alt={show.title}
            className="aspect-4/3 w-full object-cover"
          />
          <span
            className={cn(
              "absolute top-4 left-4 rounded-full px-3 py-1.5 text-xs font-extrabold shadow-pop",
              toneClass[show.color],
            )}
          >
            Ages {show.age}
          </span>
        </div>

        <div>
          <p className="label-caps text-primary">{show.category}</p>
          <h1 className="mt-2 text-5xl leading-none">{show.title}</h1>
          <p className="mt-3 text-lg font-bold text-muted-foreground">{show.tagline}</p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-extrabold">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2">
              <Clock className="size-3.5" /> {show.minutes} min episodes
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2">
              <Sparkles className="size-3.5" /> {show.episodes} episodes
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sunny px-3 py-2 text-sunny-foreground">
              <Star className="size-3.5 fill-current" /> {show.rating.toFixed(1)}
            </span>
          </div>

          <p className="mt-6 font-semibold">{show.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/watch/$id"
              params={{ id: show.id }}
              className="press inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-display text-lg text-primary-foreground shadow-pop"
            >
              <Play className="size-5 fill-current" /> Play episode 1
            </Link>
            <Link
              to="/my-list"
              className="press inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-4 font-extrabold"
            >
              <Heart className="size-5" /> Add to my list
            </Link>
          </div>

          <div className="mt-8 rounded-3xl bg-mint/40 p-5">
            <p className="flex items-center gap-2 font-display text-lg">
              <ShieldCheck className="size-5 text-primary" /> Parent note
            </p>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">{show.parentNote}</p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl">What kids pick up</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {show.learns.map((l, i) => (
            <div
              key={l}
              className="animate-pop-in rounded-3xl bg-card p-6 shadow-soft"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-sunny font-display text-lg text-sunny-foreground">
                {i + 1}
              </span>
              <p className="mt-4 font-display text-xl">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl">Episodes</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Link
              key={i}
              to="/watch/$id"
              params={{ id: show.id }}
              className="press flex items-center gap-4 rounded-3xl bg-card p-4 shadow-soft"
            >
              <img
                src={img(`${show.seed}-ep${i}`, 240, 180)}
                alt=""
                className="size-20 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0">
                <p className="font-display text-lg">
                  Ep {i + 1} ·{" "}
                  {
                    [
                      "The wobbly start",
                      "A very loud quiet",
                      "Turbo's big day",
                      "Home by starlight",
                    ][i]
                  }
                </p>
                <p className="truncate text-sm font-semibold text-muted-foreground">
                  {show.minutes} min · ends calmly, no cliffhanger
                </p>
              </div>
              <Play className="ml-auto size-5 shrink-0 fill-primary text-primary" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl">More like this</h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {more.map((s, i) => (
            <ShowCard key={s.id} show={s} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
