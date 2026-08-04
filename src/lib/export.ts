import type { HistoryEntry } from "./types";
import { readingMinutes, wordCount } from "./types";

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function toPlainText(entry: HistoryEntry): string {
  const a = entry.article;
  return [
    a.headline,
    a.subheadline,
    `By AI Correspondent — ${formatDate(entry.createdAt)}`,
    "",
    a.lead,
    "",
    ...a.body,
    "",
    a.closing,
    "",
    "IMAGE ANALYSIS SUMMARY",
    entry.analysis.sceneSummary,
    "",
    `Confidence: ${Math.round(a.confidence * 100)}%`,
    `Keywords: ${a.keywords.join(", ")}`,
    `${wordCount(entry)} words · ${readingMinutes(entry)} min read`,
  ].join("\n");
}

export function toMarkdown(entry: HistoryEntry): string {
  const a = entry.article;
  return [
    `# ${a.headline}`,
    ``,
    `**${a.subheadline}**`,
    ``,
    `_By AI Correspondent — ${formatDate(entry.createdAt)}_`,
    ``,
    a.lead,
    ``,
    ...a.body.flatMap((p) => [p, ""]),
    a.closing,
    ``,
    `---`,
    ``,
    `## Image analysis summary`,
    ``,
    entry.analysis.sceneSummary,
    ``,
    `**Confidence:** ${Math.round(a.confidence * 100)}%`,
    ``,
    `**Keywords:** ${a.keywords.join(", ")}`,
  ].join("\n");
}

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );

export function toHtmlDocument(entry: HistoryEntry): string {
  const a = entry.article;
  const paragraphs = [a.lead, ...a.body, a.closing]
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("\n");
  return `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(
    a.headline,
  )}</title></head><body style="font-family: Georgia, serif; max-width: 42rem; margin: 2rem auto; line-height: 1.7;">
<h1>${escapeHtml(a.headline)}</h1>
<h2 style="font-weight:400;color:#555">${escapeHtml(a.subheadline)}</h2>
<p><em>By AI Correspondent — ${escapeHtml(formatDate(entry.createdAt))}</em></p>
<hr />
${paragraphs}
<hr />
<h3>Image analysis summary</h3>
<p>${escapeHtml(entry.analysis.sceneSummary)}</p>
<p><strong>Confidence:</strong> ${Math.round(a.confidence * 100)}%<br />
<strong>Keywords:</strong> ${escapeHtml(a.keywords.join(", "))}</p>
</body></html>`;
}

export function downloadBlob(content: string, fileName: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "article";