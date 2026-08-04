import { useCallback, useRef, useState } from "react";
import { ImageUp, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ACCEPTED_TYPES, validateFile } from "@/lib/image";
import { cn } from "@/lib/utils";

interface Props {
  previewUrl: string | null;
  fileName: string | null;
  disabled?: boolean;
  onSelect: (file: File) => void;
  onClear: () => void;
}

export function ImageDropzone({ previewUrl, fileName, disabled, onSelect, onClear }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      console.log("HANDLEFILE", file?.name, file?.type, file?.size);
      if (!file) return;
      const message = validateFile(file);
      setError(message);
      if (!message) onSelect(file);
    },
    [onSelect],
  );

  if (previewUrl) {
    return (
      <div className="space-y-4">
        <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <img
            src={previewUrl}
            alt={fileName ? `Preview of ${fileName}` : "Uploaded image preview"}
            className="max-h-[26rem] w-full object-contain"
          />
          <figcaption className="truncate border-t border-border px-4 py-3 text-sm text-muted-foreground">
            {fileName}
          </figcaption>
        </figure>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => inputRef.current?.click()} disabled={disabled}>
            <RefreshCw aria-hidden="true" /> Replace image
          </Button>
          <Button variant="ghost" onClick={onClear} disabled={disabled}>
            <X aria-hidden="true" /> Remove
          </Button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card px-6 py-16 text-center transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          dragging && "border-accent bg-accent/5",
        )}
      >
        <ImageUp className="size-8 text-accent" aria-hidden="true" />
        <span className="font-serif text-lg font-semibold">Drop an image or click to upload</span>
        <span className="text-sm text-muted-foreground">PNG, JPEG or WEBP · up to 20 MB</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}