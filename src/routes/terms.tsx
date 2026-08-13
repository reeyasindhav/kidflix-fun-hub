import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — Kidflix" },
      {
        name: "description",
        content:
          "Terms of service for using Kidflix, including account responsibilities, content use and safety expectations.",
      },
      { property: "og:title", content: "Terms of service — Kidflix" },
      {
        property: "og:description",
        content: "Account responsibilities, content use and safety expectations.",
      },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <section className="animate-rise rounded-4xl bg-card p-8 shadow-soft sm:p-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-extrabold text-primary">
          <FileText className="size-4" /> Legal
        </span>
        <h1 className="mt-6 text-4xl">Terms of Service</h1>
        <p className="mt-3 font-semibold text-muted-foreground">
          These terms apply to the Kidflix prototype and design preview. By using the site, you
          agree to the following.
        </p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-2xl">1. Account responsibility</h2>
            <p className="mt-2 font-semibold text-muted-foreground">
              Parents are responsible for creating household accounts, adding child profiles and
              applying age tiers. Keep login details safe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl">2. Content preview</h2>
            <p className="mt-2 font-semibold text-muted-foreground">
              Kidflix currently uses mock data and placeholder shows for design demonstration. Real
              content licensing, ratings and availability are not yet implemented.
            </p>
          </section>

          <section>
            <h2 className="text-2xl">3. Personal information</h2>
            <p className="mt-2 font-semibold text-muted-foreground">
              Any account information created in this preview is stored locally for demonstration.
              Do not enter real payment or sensitive personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl">4. Acceptable use</h2>
            <p className="mt-2 font-semibold text-muted-foreground">
              Use the site only as intended: browsing shows, setting gentle limits and reviewing
              watch-time reports. Do not attempt to reverse-engineer, copy or redistribute the
              prototype.
            </p>
          </section>

          <section>
            <h2 className="text-2xl">5. Safety first</h2>
            <p className="mt-2 font-semibold text-muted-foreground">
              Kidflix is designed for child-first viewing. Parents should supervise use, adjust age
              tiers as children grow and review watch-time history regularly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl">6. Changes</h2>
            <p className="mt-2 font-semibold text-muted-foreground">
              These terms may change as the product evolves. Continued use after updates implies
              acceptance of the new terms.
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
          <Link to="/about" className="press rounded-full bg-secondary px-5 py-3 font-extrabold">
            Learn more about Kidflix
          </Link>
        </div>
      </section>
    </div>
  );
}
