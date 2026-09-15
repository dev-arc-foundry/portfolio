"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/*
 * One observer shared by every Reveal on the page rather than one per instance.
 * The animation itself is the .reveal rule in globals.css; this only decides
 * when to hand it the class, and each element unobserves on its first hit.
 */
let observer: IntersectionObserver | null = null;

function observe(node: Element) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "150px 0px 150px 0px" },
  );

  observer.observe(node);
  return () => observer?.unobserve(node);
}

export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // The reduced-motion rule already leaves .reveal fully opaque, so there is
    // nothing to trigger and no reason to watch the element at all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return observe(node);
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
