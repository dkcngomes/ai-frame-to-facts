import { useCallback, useEffect, useState } from "react";
import type { AnalysisResult, HistoryEntry } from "./types";

const KEY = "newsvision.history.v1";

function read(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

function write(entries: HistoryEntry[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(entries.slice(0, 40)));
  } catch {
    // Storage full — drop the oldest half and retry once.
    try {
      window.localStorage.setItem(KEY, JSON.stringify(entries.slice(0, 10)));
    } catch {
      /* ignore */
    }
  }
  window.dispatchEvent(new Event("newsvision:history"));
}

export function saveEntry(
  result: AnalysisResult,
  imageDataUrl: string,
  fileName: string,
): HistoryEntry {
  const entry: HistoryEntry = {
    ...result,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    imageDataUrl,
    fileName,
  };
  write([entry, ...read()]);
  return entry;
}

export function updateEntry(id: string, patch: Partial<HistoryEntry>) {
  write(read().map((e) => (e.id === id ? { ...e, ...patch } : e)));
}

export function deleteEntry(id: string) {
  write(read().filter((e) => e.id !== id));
}

export function duplicateEntry(id: string): HistoryEntry | null {
  const source = read().find((e) => e.id === id);
  if (!source) return null;
  const copy: HistoryEntry = {
    ...source,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    article: { ...source.article, headline: `${source.article.headline} (copy)` },
  };
  write([copy, ...read()]);
  return copy;
}

export function getEntry(id: string): HistoryEntry | undefined {
  return read().find((e) => e.id === id);
}

/** Subscribes to the local history store. Returns `null` until hydrated. */
export function useHistory(): HistoryEntry[] | null {
  const [entries, setEntries] = useState<HistoryEntry[] | null>(null);

  const sync = useCallback(() => setEntries(read()), []);

  useEffect(() => {
    sync();
    window.addEventListener("newsvision:history", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("newsvision:history", sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  return entries;
}