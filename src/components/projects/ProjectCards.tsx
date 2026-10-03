"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectImage } from "./ProjectImage";

const STORAGE_KEY = "devarc-projects-scroll";
let rememberedScroll = 0;

export function ProjectCards({ projects }: { projects: Project[] }) {
  const rowRef = useRef<HTMLUListElement>(null);
  const [scroll, setScroll] = useState({ overflows: false, atStart: true, atEnd: false });

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    try {
      const saved = Number(sessionStorage.getItem(STORAGE_KEY));
      if (Number.isFinite(saved)) rememberedScroll = Math.max(0, saved);
    } catch { /* In-memory restoration also works when storage is unavailable. */ }
    row.scrollLeft = rememberedScroll;

    function update() {
      if (!row) return;
      const maximum = row.scrollWidth - row.clientWidth;
      setScroll({ overflows: maximum > 1, atStart: row.scrollLeft <= 1, atEnd: row.scrollLeft >= maximum - 1 });
    }
    function remember() {
      if (!row) return;
      rememberedScroll = row.scrollLeft;
      try { sessionStorage.setItem(STORAGE_KEY, String(rememberedScroll)); } catch { /* Storage is optional. */ }
      update();
    }
    const resize = new ResizeObserver(update);
    resize.observe(row);
    for (const card of row.children) resize.observe(card);
    row.addEventListener("scroll", remember, { passive: true });
    return () => {
      row.removeEventListener("scroll", remember);
      resize.disconnect();
    };
  }, []);

  function move(direction: -1 | 1) {
    const row = rowRef.current;
    if (!row) return;
    const card = row.firstElementChild;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    row.scrollBy({ left: direction * ((card?.getBoundingClientRect().width ?? row.clientWidth) + gap), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      event.currentTarget.scrollTo({ left: event.key === "Home" ? 0 : event.currentTarget.scrollWidth, behavior: "instant" });
    }
  }

  return (
    <div className="min-w-0">
      <ul ref={rowRef} id="project-cards" className="project-card-row" tabIndex={0} aria-label="Current projects. Use left and right arrow keys to scroll." onKeyDown={onKeyDown}>
        {projects.map((project) => (
          <li key={project.slug} className="project-card-item">
            <Link href={`/projects/${project.slug}`} className="project-card">
              <span className="project-thumbnail"><ProjectImage image={project.thumbnail} variant="thumbnail" /></span>
              <span className="min-w-0 flex-1 text-base font-medium leading-snug tracking-tight sm:text-lg">{project.title}</span>
              <ArrowRight className="h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      {scroll.overflows && (
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" className="project-control" aria-label="Previous projects" aria-controls="project-cards" disabled={scroll.atStart} onClick={() => move(-1)}><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
          <button type="button" className="project-control" aria-label="Next projects" aria-controls="project-cards" disabled={scroll.atEnd} onClick={() => move(1)}><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
        </div>
      )}
    </div>
  );
}
