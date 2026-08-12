import { Link } from "@tanstack/react-router";
import { Clock, Heart, Play } from "lucide-react";

import { img, toneClass, type Show } from "@/data/kidflix";
import { cn } from "@/lib/utils";

export function ShowCard({
  show,
  index = 0,
  liked = false,
  onToggleLike,
}: {
  show: Show;
  index?: number;
  liked?: boolean;
  onToggleLike?: (id: string) => void;
}) {
  return (
    <article
      className="card-pop animate-pop-in group relative overflow-hidden rounded-3xl bg-card shadow-soft"
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
    >
      <Link to="/show/$id" params={{ id: show.id }} className="block">
        <div className="relative aspect-4/3 overflow-hidden">
          <img
            src={img(show.seed, 800, 600)}
            alt={`${show.title} — ${show.tagline}`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-108"
          />
          <span
            className={cn(
              "absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-extrabold shadow-pop",
              toneClass[show.color],
            )}
          >
            {show.age}
          </span>
          <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center gap-2 bg-primary/90 px-4 py-3 text-sm font-extrabold text-primary-foreground transition-transform duration-300 group-hover:translate-y-0">
            <Play className="size-4 fill-current" /> Watch now
          </span>
        </div>
      </Link>

      <button
        aria-label={liked ? `Remove ${show.title} from my list` : `Add ${show.title} to my list`}
        onClick={() => onToggleLike?.(show.id)}
        className={cn(
          "press absolute top-3 right-3 grid size-9 place-items-center rounded-full shadow-pop transition-colors",
          liked ? "bg-primary text-primary-foreground" : "bg-card text-primary",
        )}
      >
        <Heart className={cn("size-4.5", liked && "fill-current")} />
      </button>

      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <h3 className="font-display text-lg leading-tight">{show.title}</h3>
          <p className="text-sm font-bold text-muted-foreground">{show.category}</p>
        </div>
        <span className="mt-1 flex shrink-0 items-center gap-1.5 text-xs font-extrabold text-muted-foreground">
          <Clock className="size-3.5" /> {show.minutes} min
        </span>
      </div>
    </article>
  );
}
