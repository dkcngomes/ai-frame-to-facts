import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArticleView } from "@/components/article-view";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getEntry } from "@/lib/history";
import type { HistoryEntry } from "@/lib/types";

export const Route = createFileRoute("/article/$id")({
  head: () => ({
    meta: [
      { title: "Generated article — NewsVision AI" },
      {
        name: "description",
        content:
          "Review, edit and export the newspaper article NewsVision AI drafted from your image.",
      },
      { property: "og:title", content: "Generated article — NewsVision AI" },
      {
        property: "og:description",
        content: "Review, edit and export an AI-drafted newspaper article.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<HistoryEntry | null | undefined>(undefined);

  useEffect(() => {
    setEntry(getEntry(id) ?? null);
  }, [id]);

  if (entry === undefined) {
    return (
      <main className="mx-auto max-w-6xl space-y-4 px-4 py-12 sm:px-6">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </main>
    );
  }

  if (entry === null) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-serif text-2xl font-bold">Article not found</h1>
        <p className="mt-2 text-muted-foreground">
          This draft is stored in your browser only, and it is no longer available here.
        </p>
        <Button asChild className="mt-6">
          <Link to="/upload">Generate a new article</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <ArticleView entry={entry} onRegenerate={() => navigate({ to: "/upload" })} />
    </main>
  );
}