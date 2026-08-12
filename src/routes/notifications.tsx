import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, Clock, ShieldCheck, Sparkles } from "lucide-react";

import { getShow, img } from "@/data/kidflix";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Kidflix" },
      {
        name: "description",
        content:
          "New episodes on your shelves, approval requests and gentle watch-time nudges, all in one quiet inbox.",
      },
      { property: "og:title", content: "Notifications — Kidflix" },
      { property: "og:description", content: "New episodes, approvals and watch-time nudges." },
    ],
  }),
  component: Notifications,
});

const items = [
  {
    kind: "New episodes",
    icon: Sparkles,
    tone: "bg-sunny text-sunny-foreground",
    title: "Tiny Tinkerers added 4 builds",
    body: "All four are inside Jamie's 6–8 tier.",
    showId: "tiny-tinkerers",
    when: "2h ago",
  },
  {
    kind: "Approval",
    icon: ShieldCheck,
    tone: "bg-mint text-mint-foreground",
    title: "Nila asked for Ocean Oddballs",
    body: "Outside weekday rules — waiting on your yes or no.",
    showId: "ocean-oddballs",
    when: "5h ago",
  },
  {
    kind: "Watch time",
    icon: Clock,
    tone: "bg-card",
    title: "Friday ran 76 minutes",
    body: "Kidflix offered a wind-down story instead of a next episode.",
    showId: "starlight-stories",
    when: "Yesterday",
  },
];

function Notifications() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <div className="animate-rise flex items-center gap-4">
        <span className="animate-wiggle grid size-14 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-pop">
          <BellRing className="size-6" />
        </span>
        <div>
          <p className="label-caps text-primary">Quiet inbox</p>
          <h1 className="mt-1 text-4xl">Notifications</h1>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {items.map((n, i) => {
          const show = getShow(n.showId)!;
          return (
            <article
              key={n.title}
              className={`animate-pop-in flex flex-wrap items-center gap-5 rounded-4xl p-6 shadow-soft ${n.tone}`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <img
                src={img(show.seed, 200, 200)}
                alt=""
                className="size-16 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="label-caps flex items-center gap-2 opacity-70">
                  <n.icon className="size-3.5" /> {n.kind} · {n.when}
                </p>
                <p className="mt-1 font-display text-xl">{n.title}</p>
                <p className="text-sm font-semibold opacity-80">{n.body}</p>
              </div>
              <Link
                to="/show/$id"
                params={{ id: show.id }}
                className="press rounded-full bg-card px-5 py-3 font-extrabold text-primary shadow-pop"
              >
                Open
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mt-10 rounded-4xl bg-card p-8 text-center shadow-soft">
        <p className="font-display text-2xl">That's everything.</p>
        <p className="mt-2 font-semibold text-muted-foreground">
          Kidflix never sends "keep watching" nudges to kids.
        </p>
        <Link
          to="/parent"
          className="press mt-5 inline-block rounded-full bg-primary px-6 py-3.5 font-extrabold text-primary-foreground shadow-pop"
        >
          Back to parent zone
        </Link>
      </div>
    </div>
  );
}
