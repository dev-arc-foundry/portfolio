"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { ProjectImage as ProjectImageData } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectImage } from "./ProjectImage";

type Viewer = { index: number; previous: number | null };

export function ProjectGallery({ images, title }: { images: ProjectImageData[]; title: string }) {
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const animationsRef = useRef<Animation[]>([]);
  const closingRef = useRef(false);
  const isOpen = viewer !== null;

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const body = document.body;
    const properties = ["position", "top", "left", "width", "overflow", "paddingRight"] as const;
    const saved = properties.map((property) => body.style[property]);
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(body).paddingRight) || 0;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.paddingRight = `${padding + scrollbar}px`;
    closingRef.current = false;
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const panel = dialog.querySelector(".project-viewer-content");
      animationsRef.current = [
        dialog.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }),
        ...(panel ? [panel.animate([{ transform: "scale(0.96)" }, { transform: "scale(1)" }], { duration: 250, easing: "cubic-bezier(0.16, 1, 0.3, 1)" })] : []),
      ];
    }

    return () => {
      animationsRef.current.forEach((animation) => animation.cancel());
      animationsRef.current = [];
      closingRef.current = false;
      dialog.close();
      properties.forEach((property, index) => { body.style[property] = saved[index]; });
      const root = document.documentElement;
      const behavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(scrollX, scrollY);
      root.style.scrollBehavior = behavior;
      if (triggerRef.current?.isConnected) triggerRef.current.focus({ preventScroll: true });
    };
  }, [isOpen]);

  function dismiss() {
    const dialog = dialogRef.current;
    if (!dialog?.open || closingRef.current) return;
    closingRef.current = true;
    const opacity = getComputedStyle(dialog).opacity;
    animationsRef.current.forEach((animation) => animation.cancel());
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setViewer(null);
      return;
    }
    const animation = dialog.animate([{ opacity }, { opacity: 0 }], { duration: 160, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" });
    animationsRef.current = [animation];
    // Cancellation on unmount rejects finished; it must never dismiss a new viewer.
    void animation.finished.then(() => setViewer(null)).catch(() => {});
  }

  function move(direction: -1 | 1) {
    if (closingRef.current) return;
    setViewer((current) => {
      if (!current) return current;
      const index = Math.max(0, Math.min(images.length - 1, current.index + direction));
      return index === current.index ? current : { index, previous: current.index };
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Tab") {
      const controls = Array.from(
        event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"),
      ).filter((button) => !button.closest("[inert]"));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    }
  }

  return (
    <>
      <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
        {images.map((image, index) => (
          <Reveal key={image.src} delay={Math.min(index * 0.06, 0.2)}>
            <figure>
              <button
                type="button"
                className="project-screenshot"
                aria-label={`Expand screenshot ${index + 1}: ${image.alt}`}
                aria-haspopup="dialog"
                onClick={(event) => { triggerRef.current = event.currentTarget; setViewer({ index, previous: null }); }}
              >
                <ProjectImage image={image} />
                <span className="project-expand"><Expand className="h-4 w-4" aria-hidden="true" /><span>Expand</span></span>
              </button>
              {image.caption && <figcaption className="mt-4 text-sm leading-relaxed text-muted">{image.caption}</figcaption>}
            </figure>
          </Reveal>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="project-viewer"
        aria-labelledby="project-viewer-title"
        onCancel={(event) => { event.preventDefault(); dismiss(); }}
        onKeyDown={onKeyDown}
      >
        {viewer && (
          <div className="project-viewer-content">
            <div className="flex min-w-0 items-center justify-between gap-4">
              <h2 id="project-viewer-title" className="min-w-0 text-sm font-medium sm:text-base">{title}</h2>
              <button ref={closeRef} type="button" className="project-control shrink-0" aria-label="Close image viewer" onClick={dismiss}><X className="h-5 w-5" aria-hidden="true" /></button>
            </div>
            <div className="project-viewer-stage">
              {images.map((image, index) => (index === viewer.index || index === viewer.previous) && (
                <div key={image.src} className="project-viewer-slide" data-current={index === viewer.index} aria-hidden={index !== viewer.index} inert={index !== viewer.index}>
                  <ProjectImage image={image} variant="viewer" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
              <button type="button" className="project-control shrink-0" aria-label="Previous image" disabled={viewer.index === 0} onClick={() => move(-1)}><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
              <div className="min-w-0 flex-1 text-center" aria-live="polite" aria-atomic="true">
                <p className="text-sm leading-relaxed text-muted">{images[viewer.index].caption ?? images[viewer.index].alt}</p>
                <p className="mt-1 font-mono text-xs text-muted">{viewer.index + 1} / {images.length}</p>
              </div>
              <button type="button" className="project-control shrink-0" aria-label="Next image" disabled={viewer.index === images.length - 1} onClick={() => move(1)}><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
