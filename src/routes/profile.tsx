import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Award, Clock, Flame, Heart, Pencil, Settings } from "lucide-react";

import { AuthGate } from "@/components/kidflix/auth-gate";
import { AddKidDialog } from "@/components/kidflix/add-kid-dialog";
import { SignOutConfirm } from "@/components/kidflix/sign-out-confirm";
import { badges, getShow, img, kidProfiles, weekWatch, type AgeBand } from "@/data/kidflix";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your household profiles — Kidflix" },
      {
        name: "description",
        content:
          "Switch between kid profiles, review badges earned and see each child's watch-time streak.",
      },
      { property: "og:title", content: "Your household profiles — Kidflix" },
      { property: "og:description", content: "Kid profiles, badges and streaks in one place." },
    ],
  }),
  component: () => (
    <AuthGate title="Profiles">
      <ProfilePage />
    </AuthGate>
  ),
});

const tone: Record<string, string> = {
  sunny: "bg-sunny text-sunny-foreground",
  mint: "bg-mint text-mint-foreground",
  grape: "bg-grape text-grape-foreground",
  primary: "bg-primary text-primary-foreground",
};

function ProfilePage() {
  const { account, setActiveKid, signOut } = useAuth();
  const activeId = account?.activeKid ?? "jamie";
  const [profiles, setProfiles] = useState(kidProfiles);
  const kid = profiles.find((k) => k.id === activeId) ?? profiles[0]!;
  const fav = getShow(
    kid.favourite === "Tiny Tinkerers"
      ? "tiny-tinkerers"
      : kid.favourite === "Dino Daycare"
        ? "dino-daycare"
        : "code-critters",
  )!;
  const weekTotal = weekWatch.reduce((a, b) => a + b.minutes, 0);

  const handleAddKid = (newKid: (typeof kidProfiles)[number]) => {
    setProfiles((prev) => [...prev, newKid]);
    setActiveKid(newKid.id);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <section className="animate-rise flex flex-wrap items-center justify-between gap-6 rounded-4xl bg-card p-8 shadow-soft">
        <div className="flex items-center gap-5">
          <span className="grid size-20 place-items-center rounded-3xl bg-primary font-display text-4xl text-primary-foreground shadow-pop">
            {account?.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="label-caps text-primary">{account?.household}</p>
            <h1 className="mt-1 text-4xl capitalize">{account?.name}</h1>
            <p className="font-semibold text-muted-foreground">{account?.email}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/parent"
            className="press inline-flex items-center gap-2 rounded-full bg-mint px-5 py-3.5 font-extrabold text-mint-foreground shadow-pop"
          >
            <Settings className="size-4" /> Parent zone
          </Link>
          <SignOutConfirm onConfirm={signOut}>
            <button className="press rounded-full bg-secondary px-5 py-3.5 font-extrabold">
              Sign out
            </button>
          </SignOutConfirm>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl">Who's watching?</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((k, i) => (
            <button
              key={k.id}
              onClick={() => setActiveKid(k.id)}
              className={cn(
                "card-pop animate-pop-in overflow-hidden rounded-4xl p-6 text-left shadow-soft",
                k.id === activeId ? tone[k.color] : "bg-card",
              )}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img
                src={img(k.avatarSeed, 300, 300)}
                alt={`${k.name}'s avatar`}
                className="size-20 rounded-3xl border-4 border-card object-cover"
              />
              <p className="mt-4 font-display text-2xl">{k.name}</p>
              <p className="text-sm font-bold opacity-80">
                {k.age} yrs · {k.band} tier
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-xs font-extrabold">
                <Flame className="size-3.5" /> {k.streak}-day streak
              </p>
              {k.id === activeId && (
                <span className="mt-4 inline-block rounded-full bg-card px-3 py-1 text-xs font-extrabold text-primary">
                  Active profile
                </span>
              )}
            </button>
          ))}
          <AddKidDialog onAdd={handleAddKid} />
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="animate-rise rounded-4xl bg-card p-8 shadow-soft lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="label-caps text-primary">{kid.name}'s week</p>
              <h2 className="mt-2 text-3xl">{weekTotal} minutes, mostly mornings</h2>
            </div>
            <span className="grid size-12 place-items-center rounded-2xl bg-sunny text-sunny-foreground">
              <Clock className="size-6" />
            </span>
          </div>
          <div className="mt-8 flex h-36 items-end justify-between gap-3">
            {weekWatch.map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-extrabold text-muted-foreground">{d.minutes}</span>
                <div
                  className="animate-rise w-full max-w-8 rounded-t-2xl bg-primary/85"
                  style={{ height: `${(d.minutes / 80) * 100}%`, animationDelay: `${i * 70}ms` }}
                />
                <span className="text-xs font-extrabold">{d.day}</span>
              </div>
            ))}
          </div>
          <Link
            to="/parent/watch-time"
            className="press mt-6 inline-block rounded-full bg-secondary px-5 py-3 font-extrabold"
          >
            Full watch-time report
          </Link>
        </div>

        <div className="animate-rise rounded-4xl bg-card p-8 shadow-soft">
          <p className="label-caps text-primary">Most loved</p>
          <img
            src={img(fav.seed, 500, 380)}
            alt={fav.title}
            className="mt-4 aspect-4/3 w-full rounded-3xl object-cover"
          />
          <h3 className="mt-4 font-display text-2xl">{fav.title}</h3>
          <p className="text-sm font-bold text-muted-foreground">{fav.tagline}</p>
          <Link
            to="/show/$id"
            params={{ id: fav.id }}
            className="press mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-extrabold text-primary-foreground shadow-pop"
          >
            <Heart className="size-4" /> Open show
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl">Badges {kid.name} collected</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((b, i) => (
            <div
              key={b.id}
              className={cn(
                "animate-pop-in rounded-4xl p-6 shadow-soft",
                tone[b.tone] ?? "bg-card",
              )}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className="animate-twinkle grid size-12 place-items-center rounded-2xl bg-card">
                <Award className="size-6 text-primary" />
              </span>
              <p className="mt-4 font-display text-xl">{b.label}</p>
              <p className="text-sm font-bold opacity-80">{b.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-4xl bg-primary p-8 text-primary-foreground shadow-float">
        <div>
          <h2 className="text-3xl">Keep the profile fresh</h2>
          <p className="mt-2 max-w-md font-semibold opacity-85">
            Change avatars, rename profiles or move a child up an age tier when they're ready.
          </p>
        </div>
        <Link
          to="/parent/controls"
          className="press inline-flex items-center gap-2 rounded-full bg-sunny px-6 py-4 font-display text-lg text-sunny-foreground shadow-pop"
        >
          <Pencil className="size-5" /> Edit profiles
        </Link>
      </section>
    </div>
  );
}
