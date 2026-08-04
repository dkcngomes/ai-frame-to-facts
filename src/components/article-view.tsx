import { useState } from "react";
import {
  Check,
  Copy,
  Download,
  FileText,
  Pencil,
  Printer,
  RefreshCw,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  downloadBlob,
  formatDate,
  slugify,
  toHtmlDocument,
  toMarkdown,
  toPlainText,
} from "@/lib/export";
import { updateEntry } from "@/lib/history";
import type { HistoryEntry } from "@/lib/types";
import { readingMinutes, wordCount } from "@/lib/types";

interface Props {
  entry: HistoryEntry;
  onRegenerate?: () => void;
}

export function ArticleView({ entry, onRegenerate }: Props) {
  const [draft, setDraft] = useState(entry.article);
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const current: HistoryEntry = { ...entry, article: draft };
  const confidence = Math.round(draft.confidence * 100);

  const save = () => {
    updateEntry(entry.id, { article: draft });
    setEditing(false);
    toast.success("Article updated");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(toPlainText(current));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Article copied to clipboard");
    } catch {
      toast.error("Clipboard access was blocked by your browser");
    }
  };

  const share = async () => {
    const text = toPlainText(current);
    if (navigator.share) {
      try {
        await navigator.share({ title: draft.headline, text });
        return;
      } catch {
        return; // user dismissed
      }
    }
    await copy();
  };

  const base = slugify(draft.headline);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <article className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{draft.category}</Badge>
          <span className="text-sm text-muted-foreground">
            {wordCount(current)} words · {readingMinutes(current)} min read
          </span>
        </div>

        {editing ? (
          <div className="space-y-4">
            <label className="block text-sm font-medium" htmlFor="headline">
              Headline
            </label>
            <Input
              id="headline"
              value={draft.headline}
              onChange={(e) => setDraft({ ...draft, headline: e.target.value })}
            />
            <label className="block text-sm font-medium" htmlFor="subheadline">
              Sub-headline
            </label>
            <Input
              id="subheadline"
              value={draft.subheadline}
              onChange={(e) => setDraft({ ...draft, subheadline: e.target.value })}
            />
            <label className="block text-sm font-medium" htmlFor="body">
              Article body
            </label>
            <Textarea
              id="body"
              rows={18}
              value={[draft.lead, ...draft.body, draft.closing].join("\n\n")}
              onChange={(e) => {
                const parts = e.target.value.split(/\n{2,}/).filter(Boolean);
                setDraft({
                  ...draft,
                  lead: parts[0] ?? "",
                  body: parts.slice(1, -1),
                  closing: parts.length > 1 ? (parts[parts.length - 1] ?? "") : "",
                });
              }}
            />
            <div className="flex gap-2">
              <Button onClick={save}>Save changes</Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setDraft(entry.article);
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <header className="space-y-3">
              <h1 className="font-serif text-3xl leading-tight font-bold text-balance sm:text-4xl">
                {draft.headline}
              </h1>
              <p className="font-serif text-lg text-muted-foreground text-pretty">
                {draft.subheadline}
              </p>
              <p className="text-sm tracking-wide text-muted-foreground uppercase">
                By AI Correspondent · {formatDate(entry.createdAt)}
              </p>
            </header>
            <Separator />
            <div className="space-y-5 text-[1.0625rem] leading-8">
              <p className="first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-5xl first-letter:leading-[0.85] first-letter:font-bold">
                {draft.lead}
              </p>
              {draft.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <p className="text-muted-foreground italic">{draft.closing}</p>
            </div>
          </>
        )}

        <Separator />

        <div className="flex flex-wrap gap-2 print:hidden">
          <Button onClick={copy} variant="default">
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />} Copy
          </Button>
          <Button variant="outline" onClick={() => setEditing((v) => !v)}>
            <Pencil aria-hidden="true" /> {editing ? "Stop editing" : "Edit"}
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            <Printer aria-hidden="true" /> PDF
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              downloadBlob(toHtmlDocument(current), `${base}.doc`, "application/msword")
            }
          >
            <FileText aria-hidden="true" /> Word
          </Button>
          <Button
            variant="outline"
            onClick={() => downloadBlob(toMarkdown(current), `${base}.md`, "text/markdown")}
          >
            <Download aria-hidden="true" /> Markdown
          </Button>
          <Button
            variant="outline"
            onClick={() => downloadBlob(toPlainText(current), `${base}.txt`, "text/plain")}
          >
            <Download aria-hidden="true" /> Text
          </Button>
          <Button variant="outline" onClick={share}>
            <Share2 aria-hidden="true" /> Share
          </Button>
          {onRegenerate && (
            <Button variant="ghost" onClick={onRegenerate}>
              <RefreshCw aria-hidden="true" /> Generate again
            </Button>
          )}
        </div>
      </article>

      <aside className="space-y-4 print:hidden">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Source image</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={entry.imageDataUrl}
              alt={`Source image analysed for "${draft.headline}"`}
              loading="lazy"
              className="w-full rounded-lg border border-border object-contain"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Confidence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={confidence}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Overall analysis confidence"
            >
              <div className="h-full rounded-full bg-accent" style={{ width: `${confidence}%` }} />
            </div>
            <p className="text-sm text-muted-foreground">
              {confidence}% confidence based on visual observation alone.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Image analysis summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground">{entry.analysis.sceneSummary}</p>
            <DetailList title="Detected" items={entry.analysis.entities.map((e) => e.label)} />
            <DetailList title="People" items={entry.analysis.people} />
            <DetailList title="Actions" items={entry.analysis.actions} />
            <DetailList title="Text in image" items={entry.analysis.textInImage} />
            <DetailList title="Logos" items={entry.analysis.logos} />
            <div>
              <p className="font-medium">Environment</p>
              <p className="text-muted-foreground">
                {entry.analysis.environment} · {entry.analysis.weather}
              </p>
            </div>
            <div>
              <p className="font-medium">Possible event</p>
              <p className="text-muted-foreground">{entry.analysis.possibleEvent}</p>
            </div>
            {entry.analysis.uncertainties.length > 0 && (
              <div>
                <p className="font-medium">Stated uncertainties</p>
                <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                  {entry.analysis.uncertainties.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Keywords</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {draft.keywords.map((k) => (
              <Badge key={k} variant="outline">
                {k}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-muted-foreground">{items.join(", ")}</p>
    </div>
  );
}