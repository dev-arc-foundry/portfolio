"use client";

import { useEffect, useRef } from "react";
import { THEME_EVENT } from "@/lib/theme";

type Particle = {
  /** Home position — drifts on its own and is what the particle springs back to. */
  hx: number;
  hy: number;
  /** Ambient drift applied to the home. */
  dx: number;
  dy: number;
  /** Displacement from home, pushed by the cursor and pulled back by the spring. */
  ox: number;
  oy: number;
  ovx: number;
  ovy: number;
  /** Rendered position, cached for the link and draw passes. */
  x: number;
  y: number;
  r: number;
  phase: number;
  /** 0..1 — lights the particle up while the cursor is shoving it. */
  energy: number;
};

type Rgb = [number, number, number];

const MIN_PARTICLES = 165;
const MAX_PARTICLES = 780;
const DENSITY = 1 / 1850; // particles per px^2 of viewport
const LINK_DISTANCE = 52;
const CHARGED_REACH = 1.45; // links stretch this much further at full energy
const MAX_REACH = LINK_DISTANCE * CHARGED_REACH;
const MAX_SPEED = 0.055;
const POINTER_RADIUS = 240;
// Equilibrium displacement is roughly (PUSH / SPRING) * falloff, so this pair sizes the bubble.
const POINTER_PUSH = 1.8;
const OFFSET_SPRING = 0.008;
const OFFSET_DAMPING = 0.88;
const MAX_OFFSET = 320;
const MAX_OFFSET_SQ = MAX_OFFSET * MAX_OFFSET;
const ENERGY_GAIN = 0.16;
const ENERGY_DECAY = 0.012;
const TAU = Math.PI * 2;

/*
 * Every colour the canvas can paint is one of a few hundred, so they are built
 * once per theme instead of formatted per link and per dot per frame. Draws are
 * grouped by bucket, which collapses ~1,800 canvas state changes into ~50.
 */
const TINT_STEPS = 4; // how far a colour has shifted toward the accent
const ALPHA_STEPS = 8;
const MAX_LINK_ALPHA = 0.34; // (1 - 0) * (0.12 + 1 * 0.22)
const MAX_HALO_ALPHA = 0.09;
const LINK_STYLES = TINT_STEPS * ALPHA_STEPS;
const DOT_STYLES = 2 * TINT_STEPS * ALPHA_STEPS;

/* The four forward neighbours of a cell; with the same-cell pass they visit every pair once. */
const NEIGHBOR_DX = [1, -1, 0, 1];
const NEIGHBOR_DY = [0, 1, 1, 1];

const bucket = (value: number, steps: number) =>
  Math.min(steps - 1, Math.max(0, (value * steps) | 0));

function parseColor(value: string, fallback: Rgb): Rgb {
  const hex = value.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  if (hex) {
    const digits =
      hex[1].length === 3
        ? hex[1]
            .split("")
            .map((c) => c + c)
            .join("")
        : hex[1];
    return [
      parseInt(digits.slice(0, 2), 16),
      parseInt(digits.slice(2, 4), 16),
      parseInt(digits.slice(4, 6), 16),
    ];
  }

  const rgb = value.match(/-?[\d.]+/g);
  if (rgb && rgb.length >= 3) {
    return [Number(rgb[0]), Number(rgb[1]), Number(rgb[2])];
  }

  return fallback;
}

function readThemeColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    dot: parseColor(style.getPropertyValue("--steel").trim(), [137, 180, 250]),
    dotAlt: parseColor(style.getPropertyValue("--accent").trim(), [250, 179, 135]),
    line: parseColor(style.getPropertyValue("--text").trim(), [205, 214, 244]),
  };
}

function rgba(a: Rgb, b: Rgb, t: number, alpha: number) {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgba(${r}, ${g}, ${bl}, ${alpha.toFixed(3)})`;
}

/** Midpoint of a bucket, so a quantised value lands in the middle of its band. */
const mid = (index: number, steps: number) => (index + 0.5) / steps;

function createParticles(width: number, height: number): Particle[] {
  const count = Math.max(
    MIN_PARTICLES,
    Math.min(MAX_PARTICLES, Math.round(width * height * DENSITY)),
  );

  return Array.from({ length: count }, () => {
    const hx = Math.random() * width;
    const hy = Math.random() * height;
    return {
      hx,
      hy,
      dx: (Math.random() - 0.5) * MAX_SPEED * 2,
      dy: (Math.random() - 0.5) * MAX_SPEED * 2,
      ox: 0,
      oy: 0,
      ovx: 0,
      ovy: 0,
      x: hx,
      y: hy,
      r: Math.random() * 1.1 + 0.4,
      phase: Math.random() * TAU,
      energy: 0,
    };
  });
}

/*
 * Segment buffers, one per colour bucket. They grow by doubling and are reused
 * frame to frame, so the draw passes allocate nothing in steady state.
 */
class BucketBuffer {
  data: Float32Array;
  count = 0;

  constructor(capacity = 256) {
    this.data = new Float32Array(capacity);
  }

  push4(a: number, b: number, c: number, d: number) {
    if (this.count + 4 > this.data.length) {
      const grown = new Float32Array(this.data.length * 2);
      grown.set(this.data);
      this.data = grown;
    }
    this.data[this.count++] = a;
    this.data[this.count++] = b;
    this.data[this.count++] = c;
    this.data[this.count++] = d;
  }

  push3(a: number, b: number, c: number) {
    if (this.count + 3 > this.data.length) {
      const grown = new Float32Array(this.data.length * 2);
      grown.set(this.data);
      this.data = grown;
    }
    this.data[this.count++] = a;
    this.data[this.count++] = b;
    this.data[this.count++] = c;
  }
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = createParticles(width, height);
    let colors = readThemeColors();
    let animationFrame = 0;
    let running = false;
    let lastTime = 0;
    const pointer = { x: 0, y: 0, active: false };

    // Precomputed colour strings, indexed by bucket.
    let linkStyles: string[] = [];
    let dotStyles: string[] = [];
    let haloStyles: string[] = [];

    const linkBuckets = Array.from({ length: LINK_STYLES }, () => new BucketBuffer());
    const dotBuckets = Array.from({ length: DOT_STYLES }, () => new BucketBuffer());
    const haloBuckets = Array.from({ length: ALPHA_STEPS }, () => new BucketBuffer());

    // Uniform grid sized to the longest possible link, so a particle can only
    // reach into its own cell and its immediate neighbours.
    let cols = 0;
    let rows = 0;
    let cellHead = new Int32Array(0);
    let cellNext = new Int32Array(0);

    function buildStyles() {
      linkStyles = [];
      for (let tint = 0; tint < TINT_STEPS; tint++) {
        for (let alpha = 0; alpha < ALPHA_STEPS; alpha++) {
          linkStyles.push(
            rgba(
              colors.line,
              colors.dotAlt,
              mid(tint, TINT_STEPS),
              mid(alpha, ALPHA_STEPS) * MAX_LINK_ALPHA,
            ),
          );
        }
      }

      dotStyles = [];
      for (const base of [colors.dot, colors.dotAlt]) {
        for (let tint = 0; tint < TINT_STEPS; tint++) {
          for (let alpha = 0; alpha < ALPHA_STEPS; alpha++) {
            dotStyles.push(
              rgba(base, colors.dotAlt, mid(tint, TINT_STEPS) * 0.8, mid(alpha, ALPHA_STEPS)),
            );
          }
        }
      }

      haloStyles = [];
      for (let alpha = 0; alpha < ALPHA_STEPS; alpha++) {
        haloStyles.push(
          rgba(colors.dotAlt, colors.dotAlt, 0, mid(alpha, ALPHA_STEPS) * MAX_HALO_ALPHA),
        );
      }
    }

    function buildGrid() {
      cols = Math.max(1, Math.ceil(width / MAX_REACH));
      rows = Math.max(1, Math.ceil(height / MAX_REACH));
      cellHead = new Int32Array(cols * rows);
      cellNext = new Int32Array(particles.length);
    }

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height);
      buildGrid();
    }

    function refreshColors() {
      colors = readThemeColors();
      buildStyles();
    }

    function drawBuckets(buffers: BucketBuffer[], styles: string[], stroke: boolean) {
      for (let i = 0; i < buffers.length; i++) {
        const buffer = buffers[i];
        if (buffer.count === 0) continue;

        const { data, count } = buffer;
        ctx!.beginPath();
        if (stroke) {
          for (let k = 0; k < count; k += 4) {
            ctx!.moveTo(data[k], data[k + 1]);
            ctx!.lineTo(data[k + 2], data[k + 3]);
          }
          ctx!.strokeStyle = styles[i];
          ctx!.stroke();
        } else {
          for (let k = 0; k < count; k += 3) {
            // moveTo before each arc, or the subpaths get joined by a stray line.
            ctx!.moveTo(data[k] + data[k + 2], data[k + 1]);
            ctx!.arc(data[k], data[k + 1], data[k + 2], 0, TAU);
          }
          ctx!.fillStyle = styles[i];
          ctx!.fill();
        }
        buffer.count = 0;
      }
    }

    function link(a: Particle, b: Particle) {
      const charge = (a.energy + b.energy) / 2;
      const reach = LINK_DISTANCE * (1 + charge * (CHARGED_REACH - 1));
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      // Compare squared distances so the sqrt only runs for pairs that actually link.
      const distSq = dx * dx + dy * dy;
      if (distSq >= reach * reach) return;

      const dist = Math.sqrt(distSq);
      const strength = (1 - dist / reach) * (0.12 + charge * 0.22);
      const index =
        bucket(charge, TINT_STEPS) * ALPHA_STEPS +
        bucket(strength / MAX_LINK_ALPHA, ALPHA_STEPS);
      linkBuckets[index].push4(a.x, a.y, b.x, b.y);
    }

    function step(time: number) {
      if (!ctx) return;
      // Normalised to a 60fps frame, clamped so a backgrounded tab doesn't teleport anything.
      const dt = lastTime ? Math.min((time - lastTime) / 16.667, 3) : 1;
      lastTime = time;
      const damping = Math.pow(OFFSET_DAMPING, dt);

      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        // Slowly rotate the ambient drift so trajectories mutate over time. The
        // angle never exceeds 0.012rad, so the small-angle forms are exact to 1e-7.
        const rot = Math.sin(time / 7000 + particle.phase) * 0.004 * dt;
        const cos = 1 - (rot * rot) / 2;
        const rotatedDx = particle.dx * cos - particle.dy * rot;
        particle.dy = particle.dx * rot + particle.dy * cos;
        particle.dx = rotatedDx;

        particle.hx += particle.dx * dt;
        particle.hy += particle.dy * dt;
        if (particle.hx < -10) particle.hx = width + 10;
        if (particle.hx > width + 10) particle.hx = -10;
        if (particle.hy < -10) particle.hy = height + 10;
        if (particle.hy > height + 10) particle.hy = -10;

        if (pointer.active) {
          // Away from the cursor, not toward it.
          const px = particle.x - pointer.x;
          const py = particle.y - pointer.y;
          const distance = Math.sqrt(px * px + py * py) || 1;

          if (distance < POINTER_RADIUS) {
            const falloff = 1 - distance / POINTER_RADIUS;
            particle.ovx += (px / distance) * POINTER_PUSH * falloff * dt;
            particle.ovy += (py / distance) * POINTER_PUSH * falloff * dt;
            particle.energy = Math.min(1, particle.energy + falloff * ENERGY_GAIN * dt);
          }
        }

        // Spring back to home, damped — this is what refills the hole once the cursor moves on.
        particle.ovx -= particle.ox * OFFSET_SPRING * dt;
        particle.ovy -= particle.oy * OFFSET_SPRING * dt;
        particle.ovx *= damping;
        particle.ovy *= damping;
        particle.ox += particle.ovx * dt;
        particle.oy += particle.ovy * dt;

        // The cap is almost never hit, so the sqrt stays behind a squared test.
        const offsetSq = particle.ox * particle.ox + particle.oy * particle.oy;
        if (offsetSq > MAX_OFFSET_SQ) {
          const scale = MAX_OFFSET / Math.sqrt(offsetSq);
          particle.ox *= scale;
          particle.oy *= scale;
        }

        particle.energy = Math.max(0, particle.energy - ENERGY_DECAY * dt);
        particle.x = particle.hx + particle.ox;
        particle.y = particle.hy + particle.oy;
      }

      // Bin every particle, then test only the cells a link could span.
      cellHead.fill(-1);
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const cx = Math.min(cols - 1, Math.max(0, (particle.x / MAX_REACH) | 0));
        const cy = Math.min(rows - 1, Math.max(0, (particle.y / MAX_REACH) | 0));
        const cell = cy * cols + cx;
        cellNext[i] = cellHead[cell];
        cellHead[cell] = i;
      }

      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          for (let i = cellHead[cy * cols + cx]; i !== -1; i = cellNext[i]) {
            const a = particles[i];

            // Later entries in this cell, then the four forward neighbours —
            // every pair is visited exactly once.
            for (let j = cellNext[i]; j !== -1; j = cellNext[j]) link(a, particles[j]);

            for (let n = 0; n < 4; n++) {
              const nx = cx + NEIGHBOR_DX[n];
              const ny = cy + NEIGHBOR_DY[n];
              if (nx < 0 || nx >= cols || ny >= rows) continue;
              for (let j = cellHead[ny * cols + nx]; j !== -1; j = cellNext[j]) {
                link(a, particles[j]);
              }
            }
          }
        }
      }

      drawBuckets(linkBuckets, linkStyles, true);

      // Soft halo under the charged particles — cheap because only the shell being
      // shoved aside qualifies, never the whole field.
      for (const particle of particles) {
        if (particle.energy <= 0.12) continue;
        const radius = particle.r * (1 + particle.energy * 2);
        haloBuckets[bucket(particle.energy, ALPHA_STEPS)].push3(
          particle.x,
          particle.y,
          radius * 3.2,
        );
      }
      drawBuckets(haloBuckets, haloStyles, false);

      for (const particle of particles) {
        const twinkle = 0.55 + 0.45 * Math.sin(time / 1600 + particle.phase);
        const alpha = Math.min(1, twinkle * 0.75 + particle.energy * 0.35);
        // Charged particles grow and drift toward the accent colour.
        const index =
          (particle.phase > Math.PI ? TINT_STEPS * ALPHA_STEPS : 0) +
          bucket(particle.energy, TINT_STEPS) * ALPHA_STEPS +
          bucket(alpha, ALPHA_STEPS);
        dotBuckets[index].push3(
          particle.x,
          particle.y,
          particle.r * (1 + particle.energy * 2),
        );
      }
      drawBuckets(dotBuckets, dotStyles, false);

      animationFrame = requestAnimationFrame(step);
    }

    function start() {
      if (running) return;
      running = true;
      lastTime = 0;
      animationFrame = requestAnimationFrame(step);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(animationFrame);
    }

    function drawStaticFrame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const particle of particles) {
        dotBuckets[
          (particle.phase > Math.PI ? TINT_STEPS * ALPHA_STEPS : 0) +
            bucket(0.6, ALPHA_STEPS)
        ].push3(particle.x, particle.y, particle.r);
      }
      drawBuckets(dotBuckets, dotStyles, false);
    }

    function syncMotionPreference() {
      stop();
      if (reducedMotionQuery.matches) {
        pointer.active = false;
        drawStaticFrame();
      } else {
        start();
      }
    }

    function handleVisibility() {
      if (document.hidden) {
        stop();
      } else {
        syncMotionPreference();
      }
    }

    function handleThemeChange() {
      refreshColors();
      if (reducedMotionQuery.matches) drawStaticFrame();
    }

    function handlePointerMove(event: PointerEvent) {
      if (reducedMotionQuery.matches) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }

    function releasePointer() {
      pointer.active = false;
    }

    function handlePointerOut(event: PointerEvent) {
      // relatedTarget is null only when the pointer actually left the window.
      if (!event.relatedTarget) releasePointer();
    }

    let resizeTimeout: ReturnType<typeof setTimeout>;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        if (reducedMotionQuery.matches) drawStaticFrame();
      }, 150);
    }

    buildStyles();
    resize();
    syncMotionPreference();

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });
    window.addEventListener("blur", releasePointer);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener(THEME_EVENT, handleThemeChange);
    reducedMotionQuery.addEventListener("change", syncMotionPreference);
    colorSchemeQuery.addEventListener("change", handleThemeChange);

    return () => {
      stop();
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", releasePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener(THEME_EVENT, handleThemeChange);
      reducedMotionQuery.removeEventListener("change", syncMotionPreference);
      colorSchemeQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
