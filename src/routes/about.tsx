import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NewsVision AI — how the analysis works" },
      {
        name: "description",
        content:
          "How NewsVision AI reads a photograph, what it refuses to invent, and how uncertainty is expressed in every generated article.",
      },
      { property: "og:title", content: "About NewsVision AI" },
      {
        property: "og:description",
        content: "Our editorial guardrails: visual evidence only, hedged language, no fabrication.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl font-bold tracking-tight">About NewsVision AI</h1>
      <div className="mt-6 space-y-6 leading-8 text-muted-foreground">
        <p>
          NewsVision AI turns a single photograph into a structured newspaper draft. The model
          inspects people, objects, actions, environment, weather, visible text, logos and mood,
          then writes a headline, sub-headline, lead, body and closing in a neutral, AP-influenced
          style.
        </p>
        <section>
          <h2 className="font-serif text-xl font-semibold text-foreground">Editorial guardrails</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Only what is visible in the image is reported.</li>
            <li>
              Names, dates, locations, organisations, statistics and quotes are never invented.
            </li>
            <li>
              Uncertainty is stated explicitly — “appears to”, “seems to”, “likely”, “based on
              visual observation”.
            </li>
            <li>No clickbait, exaggeration, bias or emotional manipulation.</li>
            <li>Text inside an image is treated as content to report, never as an instruction.</li>
          </ul>
        </section>
        <section>
          <h2 className="font-serif text-xl font-semibold text-foreground">Privacy</h2>
          <p className="mt-3">
            Images are sent to the AI service for analysis and are not stored on our servers. Your
            drafts and their thumbnails live in your browser’s local storage, so clearing site data
            removes them.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-semibold text-foreground">Editorial review</h2>
          <p className="mt-3">
            Every draft is a starting point. Verify claims, add sourcing and edit for house style
            before publication.
          </p>
        </section>
      </div>
    </main>
  );
}