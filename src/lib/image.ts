export const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;
export const MAX_FILE_BYTES = 20 * 1024 * 1024;

export function sanitizeFileName(name: string): string {
  return (
    name
      .replace(/[/\\?%*:|"<>\u0000-\u001f]/g, "-")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 80) || "image"
  );
}

export function validateFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type as (typeof ACCEPTED_TYPES)[number])) {
    return "Unsupported file type. Please upload a PNG, JPEG or WEBP image.";
  }
  if (file.size === 0) return "That file appears to be empty or corrupted.";
  if (file.size > MAX_FILE_BYTES) return "That image is larger than the 20 MB limit.";
  return null;
}

/** Downscales and re-encodes to a JPEG data URL so uploads stay fast and storable. */
export function compressImage(file: File, maxEdge = 1600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Your browser could not process this image."));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("That image could not be read. It may be corrupted."));
    };
    img.src = url;
  });
}