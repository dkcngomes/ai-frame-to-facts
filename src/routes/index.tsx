import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, FileDown, ScanEye, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NewsVision AI — Turn any photo into a newspaper article" },
      {
        name: "description",
        content:
          "Upload a photograph and NewsVision AI analyses the scene, then drafts a neutral, publication-ready newspaper article grounded only in visual evidence.",
      },
      { property: "og:title", content: "NewsVision AI — Photo to newspaper article" },
      {
        property: "og:description",
        content:
          "AI vision analysis and AP-style article drafting from a single image, with no invented facts.",
      },
    ],
  }),
  component: Index,
});

const FEATURES = [
  {
    icon: ScanEye,
    title: "Deep visual analysis",
    body: "People, objects, actions, environment, weather, visible text, logos and mood — each with a confidence signal.",
  },
  {
    icon: ShieldCheck,
    title: "No invented facts",
    body: "Names, dates, statistics and quotes are never fabricated. Uncertainty is stated in plain, hedged language.",
  },
  {
    icon: FileDown,
    title: "Newsroom-ready exports",
    body: "Edit the draft inline, then copy or export it as PDF, Word, Markdown or plain text.",
  },
];

function Index() {
  return (
    <main>
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <p className="text-xs tracking-[0.25em] text-accent uppercase">
          Visual journalism, assisted
        </p>
        <h1 className="mt-5 font-serif text-4xl leading-tight font-bold text-balance sm:text-6xl">
          Transform an uploaded image into a professional newspaper article
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
          NewsVision AI reads a photograph the way a picture editor does, then hands you a neutral,
          AP-influenced draft ready for editorial review.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/upload">
              <Camera aria-hidden="true" /> Upload an image
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/about">How it works</Link>
          </Button>
        </div>
      </section>

      <section className="border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <Icon className="size-6 text-accent" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <h2 className="font-serif text-2xl font-bold">From photograph to page</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            ["Upload", "Drag in a PNG, JPEG or WEBP up to 20 MB."],
            ["Analyse", "The model catalogues everything observable in the frame."],
            ["Draft", "Headline, sub-headline, lead, body and closing are written."],
            ["Publish", "Edit, then copy or export in your preferred format."],
          ].map(([title, body], i) => (
            <li key={title} className="flex gap-4">
              <span className="font-serif text-3xl font-bold text-accent">{i + 1}</span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
