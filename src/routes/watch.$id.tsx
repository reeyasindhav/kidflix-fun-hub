import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Captions,
  Heart,
  Maximize,
  Pause,
  Play,
  ShieldCheck,
  SkipForward,
  Volume2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getShow, img } from "@/data/kidflix";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/watch/$id")({
  loader: ({ params }) => {
    const show = getShow(params.id);
    if (!show) throw notFound();
    return { show };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Watching ${loaderData.show.title} — Kidflix` : "Watching — Kidflix" },
      {
        name: "description",
        content: "A calm player with no autoplay, no recommendations sidebar and a gentle end card.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Kidflix player" },
      { property: "og:description", content: "Gentle playback with no autoplay next." },
    ],
  }),
  component: Watch,
});

function Watch() {
  const { show } = Route.useLoaderData();
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(18);
  const [captions, setCaptions] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => setProgress((p) => (p >= 100 ? 100 : p + 0.6)), 500);
    return () => window.clearInterval(t);
  }, [playing]);

  const done = progress >= 100;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6">
      <Link
        to="/show/$id"
        params={{ id: show.id }}
        className="press inline-flex items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-extrabold shadow-soft"
      >
        <ArrowLeft className="size-4" /> Back to {show.title}
      </Link>

      <section className="animate-rise mt-5 overflow-hidden rounded-4xl bg-primary shadow-float">
        <div className="relative aspect-video">
          <img
            src={img(`${show.seed}-play`, 1280, 720)}
            alt=""
            className={cn(
              "size-full object-cover transition-all duration-700",
              done ? "scale-105 blur-sm brightness-50" : playing ? "brightness-95" : "brightness-75",
            )}
          />
          {!playing && !done && (
            <button
              onClick={() => setPlaying(true)}
              className="animate-pop-in absolute inset-0 grid place-items-center"
              aria-label="Resume"
            >
              <span className="grid size-24 place-items-center rounded-full bg-sunny text-sunny-foreground shadow-float">
                <Play className="size-10 fill-current" />
              </span>
            </button>
          )}
          {done && (
            <div className="animate-pop-in absolute inset-0 grid place-content-center gap-4 p-8 text-center text-primary-foreground">
              <p className="font-display text-4xl">That's the end of the episode.</p>
              <p className="font-semibold opacity-85">
                Nothing plays next automatically. Take a stretch, then choose together.
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    setProgress(0);
                    setPlaying(true);
                  }}
                  className="press rounded-full bg-sunny px-6 py-3 font-extrabold text-sunny-foreground shadow-pop"
                >
                  Watch again
                </button>
                <Link
                  to="/"
                  className="press rounded-full border-2 border-primary-foreground/40 px-6 py-3 font-extrabold"
                >
                  Back to browse
                </Link>
              </div>
            </div>
          )}
          {captions && !done && (
            <p className="absolute inset-x-6 bottom-24 mx-auto max-w-xl rounded-2xl bg-foreground/70 px-4 py-2 text-center text-sm font-extrabold text-background">
              "Careful now — that beetle is doing very important work."
            </p>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-5 pt-16">
            <div className="h-2.5 overflow-hidden rounded-full bg-background/30">
              <div
                className="h-full rounded-full bg-sunny transition-[width] duration-500 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 flex items-center gap-3 text-background">
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className="press grid size-12 place-items-center rounded-full bg-sunny text-sunny-foreground"
              >
                {playing && !done ? (
                  <Pause className="size-5 fill-current" />
                ) : (
                  <Play className="size-5 fill-current" />
                )}
              </button>
              <span className="font-extrabold">
                {Math.round((progress / 100) * show.minutes)} / {show.minutes} min
              </span>
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => setCaptions((c) => !c)}
                  aria-label="Toggle captions"
                  className={cn(
                    "press grid size-10 place-items-center rounded-full",
                    captions ? "bg-mint text-mint-foreground" : "bg-background/25",
                  )}
                >
                  <Captions className="size-5" />
                </button>
                <span className="press grid size-10 place-items-center rounded-full bg-background/25">
                  <Volume2 className="size-5" />
                </span>
                <span className="press grid size-10 place-items-center rounded-full bg-background/25">
                  <SkipForward className="size-5" />
                </span>
                <span className="press grid size-10 place-items-center rounded-full bg-background/25">
                  <Maximize className="size-5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-card p-5 shadow-soft">
          <p className="label-caps text-primary">Now playing</p>
          <p className="mt-1 font-display text-xl">{show.title}</p>
          <p className="text-sm font-semibold text-muted-foreground">Ep 1 · {show.category}</p>
        </div>
        <div className="rounded-3xl bg-mint p-5 text-mint-foreground shadow-soft">
          <p className="flex items-center gap-2 font-display text-lg">
            <ShieldCheck className="size-5" /> Autoplay is off
          </p>
          <p className="mt-1 text-sm font-semibold opacity-80">
            Kidflix never queues another episode for you.
          </p>
        </div>
        <Link to="/my-list" className="press rounded-3xl bg-sunny p-5 text-sunny-foreground shadow-soft">
          <p className="flex items-center gap-2 font-display text-lg">
            <Heart className="size-5" /> Save for later
          </p>
          <p className="mt-1 text-sm font-semibold opacity-80">Add this to my list.</p>
        </Link>
      </div>
    </div>
  );
}
