import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { ImageDropzone } from "@/components/image-dropzone";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { compressImage, sanitizeFileName } from "@/lib/image";
import { saveEntry } from "@/lib/history";
import type { AnalysisResult } from "@/lib/types";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload an image — NewsVision AI" },
      {
        name: "description",
        content:
          "Upload a PNG, JPEG or WEBP photo and let NewsVision AI analyse the scene and draft a newsroom-ready article.",
      },
      { property: "og:title", content: "Upload an image — NewsVision AI" },
      {
        property: "og:description",
        content: "Turn a single photograph into a professionally structured news draft.",
      },
    ],
  }),
  component: UploadPage,
});

const STAGES = [
  "Validating and optimising the image",
  "Detecting people, objects and text",
  "Reading the scene, context and mood",
  "Drafting the article in AP style",
];

function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setFile(null);
    setPreview(null);
    setError(null);
  };

  const select = (selected: File) => {
    setError(null);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const analyze = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setStage(0);
    const ticker = setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 4000);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120_000);

    try {
      const imageDataUrl = await compressImage(file);
      setStage(1);
      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDataUrl }),
        signal: controller.signal,
      });

      const payload = (await response.json().catch(() => null)) as
        | (AnalysisResult & { error?: string })
        | null;

      if (!response.ok || !payload || !payload.article) {
        throw new Error(payload?.error ?? "The article could not be generated. Please try again.");
      }

      const entry = saveEntry(
        { analysis: payload.analysis, article: payload.article },
        imageDataUrl,
        sanitizeFileName(file.name),
      );
      toast.success("Article generated");
      navigate({ to: "/article/$id", params: { id: entry.id } });
    } catch (err) {
      const message =
        err instanceof DOMException && err.name === "AbortError"
          ? "The AI took too long to respond. Please try again."
          : err instanceof Error
            ? err.message
            : "Something went wrong.";
      setError(message);
      toast.error(message);
    } finally {
      clearInterval(ticker);
      clearTimeout(timeout);
      setBusy(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl font-bold tracking-tight">Upload an image</h1>
      <p className="mt-2 text-muted-foreground">
        NewsVision AI reports only what is visible. Anything uncertain is flagged with hedged
        language.
      </p>

      <div className="mt-8 space-y-6">
        <ImageDropzone
          previewUrl={preview}
          fileName={file?.name ?? null}
          disabled={busy}
          onSelect={select}
          onClear={reset}
        />

        {error && (
          <p role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {busy ? (
          <div className="space-y-4 rounded-2xl border border-border bg-card p-6" aria-live="polite">
            <p className="flex items-center gap-2 font-medium">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {STAGES[stage]}…
            </p>
            <div className="space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ) : (
          <Button size="lg" onClick={analyze} disabled={!file}>
            <Sparkles aria-hidden="true" /> Analyse &amp; generate article
          </Button>
        )}
      </div>
    </main>
  );
}