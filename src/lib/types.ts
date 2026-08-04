export interface DetectedEntity {
  label: string;
  confidence: number;
  note?: string;
}

export interface ImageAnalysis {
  sceneSummary: string;
  people: string[];
  objects: string[];
  actions: string[];
  environment: string;
  weather: string;
  emotions: string[];
  textInImage: string[];
  logos: string[];
  possibleEvent: string;
  newsworthiness: string;
  uncertainties: string[];
  entities: DetectedEntity[];
}

export interface Article {
  headline: string;
  subheadline: string;
  lead: string;
  body: string[];
  closing: string;
  category: string;
  keywords: string[];
  confidence: number;
}

export interface AnalysisResult {
  analysis: ImageAnalysis;
  article: Article;
}

export interface HistoryEntry extends AnalysisResult {
  id: string;
  createdAt: string;
  imageDataUrl: string;
  fileName: string;
}

export const wordCount = (entry: AnalysisResult): number =>
  [entry.article.lead, ...entry.article.body, entry.article.closing]
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

export const readingMinutes = (entry: AnalysisResult): number =>
  Math.max(1, Math.round(wordCount(entry) / 220));