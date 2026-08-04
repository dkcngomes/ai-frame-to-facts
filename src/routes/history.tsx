import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteEntry, duplicateEntry, useHistory } from "@/lib/history";
import { formatDate } from "@/lib/export";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Your article history — NewsVision AI" },
      {
        name: "description",
        content: "Search, reopen, duplicate or delete the newspaper drafts you generated earlier.",
      },
      { property: "og:title", content: "Your article history — NewsVision AI" },
      {
        property: "og:description",
        content: "Every draft you generated, stored privately in your browser.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const entries = useHistory();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set((entries ?? []).map((e) => e.article.category))).sort(),
    [entries],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (entries ?? []).filter((e) => {
      const matchesQuery =
        !q ||
        e.article.headline.toLowerCase().includes(q) ||
        e.article.keywords.join(" ").toLowerCase().includes(q) ||
        e.fileName.toLowerCase().includes(q);
      const matchesCategory = category === "all" || e.article.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [entries, query, category]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl font-bold tracking-tight">History</h1>
      <p className="mt-2 text-muted-foreground">
        Drafts are stored privately in this browser and never leave your device.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search headlines, keywords or file names"
          aria-label="Search history"
          className="sm:max-w-sm"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="sm:w-56" aria-label="Filter by category">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {entries === null ? (
        <div className="mt-8 space-y-3">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="font-serif text-lg font-semibold">No drafts yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate your first article to see it here.
          </p>
          <Button asChild className="mt-6">
            <Link to="/upload">Upload an image</Link>
          </Button>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {filtered.map((entry) => (
            <li
              key={entry.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row"
            >
              <img
                src={entry.imageDataUrl}
                alt=""
                loading="lazy"
                className="h-28 w-full rounded-lg object-cover sm:w-40"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{entry.article.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
                <Link
                  to="/article/$id"
                  params={{ id: entry.id }}
                  className="mt-2 block font-serif text-lg font-semibold hover:text-accent"
                >
                  {entry.article.headline}
                </Link>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {entry.article.subheadline}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link to="/article/$id" params={{ id: entry.id }}>
                      Reopen
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      duplicateEntry(entry.id);
                      toast.success("Draft duplicated");
                    }}
                  >
                    <Copy aria-hidden="true" /> Duplicate
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      deleteEntry(entry.id);
                      toast.success("Draft deleted");
                    }}
                  >
                    <Trash2 aria-hidden="true" /> Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}