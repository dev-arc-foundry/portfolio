"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Maximum rotation on either axis, in degrees. */
const MAX_TILT = 12;
/** Scale the surface settles at while hovered. Below 1 reads as pushed back. */
const HOVER_SCALE = 0.985;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Keep the pointer off the very edge so the corners don't snap to full rotation. */
const clampEdge = (value: number, inset = 0.055) => clamp(value, inset, 1 - inset);

const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const surface = surfaceRef.current;
    if (!root || !surface) return;

    // A tilt that follows the cursor has nothing to follow on touch, and the
    // motion is exactly what reduced-motion users are asking us to skip.
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches || navigator.maxTouchPoints > 0) return;

    let rect: DOMRect | null = null;
    let rectStale = false;
    let frame = 0;
    let tilting = false;

    // Rendered values trail the targets, which is what makes the card settle
    // instead of snapping to the pointer.
    let renderedX = 0.5;
    let renderedY = 0.5;
    let renderedScale = 1;
    let targetX = 0.5;
    let targetY = 0.5;
    let targetScale = 1;

    const setVar = (name: string, value: string) => surface.style.setProperty(name, value);

    function measure() {
      rect = root!.getBoundingClientRect();
      rectStale = false;
    }

    function render() {
      frame = 0;
      if (rectStale) measure();

      renderedX = lerp(renderedX, targetX, 0.18);
      renderedY = lerp(renderedY, targetY, 0.18);
      renderedScale = lerp(renderedScale, targetScale, 0.25);

      setVar("--tilt-ry", `${clamp((renderedX - 0.5) * MAX_TILT * 2, -MAX_TILT, MAX_TILT)}deg`);
      setVar("--tilt-rx", `${clamp(-(renderedY - 0.5) * MAX_TILT * 2, -MAX_TILT, MAX_TILT)}deg`);
      setVar("--tilt-s", `${renderedScale}`);
      setVar("--tilt-gx", `${clamp(renderedX * 100, 2, 98)}%`);
      setVar("--tilt-gy", `${clamp(renderedY * 100, 2, 98)}%`);

      const settled =
        Math.abs(targetX - renderedX) < 0.001 &&
        Math.abs(targetY - renderedY) < 0.001 &&
        Math.abs(targetScale - renderedScale) < 0.001;

      // Once the lerps converge there is nothing new to write; handleMove
      // restarts the loop the moment the pointer supplies a new target.
      if (!settled) frame = requestAnimationFrame(render);
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    // The cached rect only goes wrong while the card is being tracked, so these
    // listeners exist only for as long as it is.
    const invalidate = () => {
      rectStale = true;
    };

    function watchViewport() {
      addEventListener("scroll", invalidate, { passive: true });
      addEventListener("resize", invalidate, { passive: true });
    }

    function unwatchViewport() {
      removeEventListener("scroll", invalidate);
      removeEventListener("resize", invalidate);
    }

    function handleEnter() {
      measure();
      tilting = true;
      targetScale = HOVER_SCALE;
      root!.classList.add("is-tilting");
      watchViewport();
      schedule();
    }

    function handleMove(event: PointerEvent) {
      if (!tilting) return;
      if (!rect) measure();
      targetX = clampEdge((event.clientX - rect!.left) / rect!.width);
      targetY = clampEdge((event.clientY - rect!.top) / rect!.height);
      schedule();
    }

    function handleLeave() {
      tilting = false;
      targetX = 0.5;
      targetY = 0.5;
      targetScale = 1;
      root!.classList.remove("is-tilting");
      unwatchViewport();
      schedule();
    }

    root.addEventListener("pointerenter", handleEnter, { passive: true });
    root.addEventListener("pointermove", handleMove, { passive: true });
    root.addEventListener("pointerleave", handleLeave, { passive: true });

    return () => {
      root.removeEventListener("pointerenter", handleEnter);
      root.removeEventListener("pointermove", handleMove);
      root.removeEventListener("pointerleave", handleLeave);
      unwatchViewport();
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("is-tilting");
    };
  }, []);

  return (
    <div ref={rootRef} className={`tilt-card relative ${className}`}>
      <div
        ref={surfaceRef}
        className="tilt-surface absolute inset-0 overflow-hidden rounded-2xl border border-line"
      >
        {children}
        <span aria-hidden="true" className="tilt-glare" />
      </div>
    </div>
  );
}
