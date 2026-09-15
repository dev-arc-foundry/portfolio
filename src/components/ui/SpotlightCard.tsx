"use client";

import { useEffect, useRef, type ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // The card's box only moves while the pointer is on it if the page scrolls
    // or resizes, so it is measured on enter rather than on every frame.
    let rect: DOMRect | null = null;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const measure = () => {
      rect = node.getBoundingClientRect();
    };

    function render() {
      frame = 0;
      if (!rect) return;
      node!.style.setProperty("--spot-x", `${pointerX - rect.left}px`);
      node!.style.setProperty("--spot-y", `${pointerY - rect.top}px`);
    }

    function handleEnter(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      measure();
      addEventListener("scroll", measure, { passive: true });
      addEventListener("resize", measure, { passive: true });
    }

    function handleMove(event: PointerEvent) {
      if (!rect) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(render);
    }

    function handleLeave() {
      rect = null;
      removeEventListener("scroll", measure);
      removeEventListener("resize", measure);
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }

    node.addEventListener("pointerenter", handleEnter, { passive: true });
    node.addEventListener("pointermove", handleMove, { passive: true });
    node.addEventListener("pointerleave", handleLeave, { passive: true });

    return () => {
      node.removeEventListener("pointerenter", handleEnter);
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      handleLeave();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-surface ${className}`}
    >
      <div aria-hidden="true" className="spotlight-glow" />
      <div className="relative">{children}</div>
    </div>
  );
}
