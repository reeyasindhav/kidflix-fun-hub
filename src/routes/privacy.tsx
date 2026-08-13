import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Kidflix" },
      {
        name: "description",
        content:
          "How Kidflix handles data in the prototype, what is stored locally, and how parents can control child information.",
      },
      { property: "og:title", content: "Privacy policy — Kidflix" },
      {
        property: "og:description",
        content: "Local-first preview data, parent controls and child privacy.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <section className="animate-rise rounded-4xl bg-card p-8 shadow-soft sm:p-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-extrabold text-primary">
          <ShieldCheck className="size-4" /> Privacy
        </span>
        <h1 className="mt-6 text-4xl">Privacy Policy</h1>
        <p className="mt-3 font-semibold text-muted-foreground">
          This policy explains how data is handled in the Kidflix prototype. Because this is a
          design preview, the details below may change before launch.
        </p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-2xl">1. What we collect</h2>
            <p className="mt-2 font-semibold text-muted-foreground">
              In the prototype, account details, child profiles, watch-time entries and preferences
              are stored locally in the browser or preview environment. No real payments or identity
              documents are required.
            </p>
          </section>

          <section>
            <h2 className="text-2xl">2. How we use it</h2>
            <p className="mt-2 font-semibold text-muted-foreground">
              Data is used only to run the preview experience: showing profiles, age-tier shelves,
              watch-time bars and parent reports. We do not sell or share preview data with third
              parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl">3. Parent controls</h2>
            <p className="mt-2 font-extrabold text-muted-foreground">
              Parents can create, rename or remove child profiles, adjust age tiers, review
              watch-time history and delete local preview data at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl">4. Children's privacy</h2>
            <p className="mt-2 font-semibold text-muted-foreground">
              Kidflix is built for child-first viewing, but this preview is not a production
              child-safe platform. Parents should supervise use, limit screen time and avoid
              entering sensitive personal information for children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl">5. Data retention</h2>
            <p className="mt-2 font-semibold text-muted-foreground">
              Preview data remains in the local environment until it is cleared by the user. In a
              future production version, retention and deletion rules will be clearly defined and
              enforceable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl">6. Changes to this policy</h2>
            <p className="mt-2 font-semibold text-muted-foreground">
              This privacy policy may be updated as the prototype evolves. Continued use after
              updates means you accept the revised policy.
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="press inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-extrabold text-primary-foreground shadow-pop"
          >
            Back to home
          </Link>
          <Link to="/terms" className="press rounded-full bg-secondary px-5 py-3 font-extrabold">
            Read terms of service
          </Link>
        </div>
      </section>
    </div>
  );
}
