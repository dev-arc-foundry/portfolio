"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { ProjectImage as ProjectImageData } from "@/data/projects";

type Props = {
  image: ProjectImageData;
  variant?: "thumbnail" | "screenshot" | "viewer";
};

export function ProjectImage({ image, variant = "screenshot" }: Props) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  if (failed) {
    return (
      <span
        className={`project-image-fallback project-image-${variant}`}
        style={variant === "screenshot" ? { aspectRatio: `${image.width} / ${image.height}` } : undefined}
        role={variant === "thumbnail" ? undefined : "status"}
        aria-hidden={variant === "thumbnail" ? true : undefined}
      >
        <ImageOff className="h-6 w-6 shrink-0" aria-hidden="true" />
        {variant !== "thumbnail" && <span>Image unavailable. {image.alt}</span>}
        {variant === "viewer" && (
          <button
            type="button"
            className="rounded-full border border-line-strong px-5 py-3 text-sm text-text"
            onClick={() => { setAttempt((value) => value + 1); setFailed(false); }}
          >
            Retry image
          </button>
        )}
      </span>
    );
  }

  return (
    <Image
      key={attempt}
      src={image.src}
      alt={variant === "thumbnail" ? "" : image.alt}
      width={image.width}
      height={image.height}
      sizes={variant === "thumbnail" ? "80px" : variant === "viewer" ? "100vw" : "(max-width: 1152px) calc(100vw - 48px), 1104px"}
      loading={variant === "viewer" ? "eager" : "lazy"}
      className={`project-image-${variant}`}
      onError={() => setFailed(true)}
    />
  );
}
