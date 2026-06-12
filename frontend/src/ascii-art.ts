// frontend/src/ascii-art.ts
//
// Phase 13.B+ (O7). Monospace single-weight ASCII art driven by a
// particle-and-attractor brightness field. Inspired by
// https://chenglou.me/pretext/variable-typographic-ascii/ "Monospace ×
// Single Weight" variant. Pure visual; no semantic content.
//
// Three attractors orbit the center on offset phases, so the field
// breathes and swirls instead of collapsing into a static center blob.
// Pauses when the pane is offscreen (IntersectionObserver) or the tab
// is hidden (visibilitychange), caps at 30fps, re-seeds on resize, and
// respects prefers-reduced-motion (renders one static frame).
//
// Citation: seeds/citations/pretext.md

const LUMA = " .:;+*xX$#@";
const FRAME_MS = 1000 / 30;
const ATTRACTORS = [
  { radiusScale: 0.32, speed: 0.00045, phase: 0 },
  { radiusScale: 0.22, speed: -0.0007, phase: 2.1 },
  { radiusScale: 0.38, speed: 0.00055, phase: 4.2 },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface AsciiOptions {
  cols: number;
  rows: number;
  particleCount: number;
  attractorRadius: number;
}

export function startAsciiArt(target: HTMLPreElement): () => void {
  let opts = computeOptions(target);
  let particles = seedParticles(opts);
  let buf = new Float32Array(opts.cols * opts.rows);
  let raf: number | null = null;
  let running = true;
  let lastFrame = 0;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function frame(now: number) {
    if (!running) return;
    if (!reduce) raf = requestAnimationFrame(frame);
    if (now - lastFrame < FRAME_MS) return;
    lastFrame = now;
    step(particles, opts, now);
    rasterize(particles, buf, opts);
    target.textContent = render(buf, opts);
  }

  function resume() {
    if (running) return;
    running = true;
    if (!reduce) raf = requestAnimationFrame(frame);
  }

  function pause() {
    running = false;
    if (raf !== null) cancelAnimationFrame(raf);
    raf = null;
  }

  // Pause when offscreen.
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) resume();
      else pause();
    }
  });
  io.observe(target);

  // Pause when the tab is hidden — rAF already throttles, but skipping
  // the bookkeeping entirely is free battery on mobile.
  const onVisibility = () => {
    if (document.hidden) pause();
    else resume();
  };
  document.addEventListener("visibilitychange", onVisibility);

  // Re-derive grid + particles on resize/rotation; the original grid is
  // wrong after an orientation change.
  let resizeTimer: ReturnType<typeof setTimeout> | null = null;
  const onResize = () => {
    if (resizeTimer !== null) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      opts = computeOptions(target);
      particles = seedParticles(opts);
      buf = new Float32Array(opts.cols * opts.rows);
      if (reduce) frame(performance.now() + FRAME_MS);
    }, 150);
  };
  window.addEventListener("resize", onResize);

  frame(performance.now() + FRAME_MS);

  return () => {
    pause();
    io.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("resize", onResize);
    if (resizeTimer !== null) clearTimeout(resizeTimer);
  };
}

function computeOptions(target: HTMLPreElement): AsciiOptions {
  const rect = target.parentElement?.getBoundingClientRect() ?? target.getBoundingClientRect();
  const style = getComputedStyle(target);
  const fontSize = parseFloat(style.fontSize) || 11;
  // Monospace cell width is roughly 0.6 of font-size for most fonts.
  const cellW = fontSize * 0.6;
  const cellH = fontSize;
  const cols = Math.max(20, Math.floor(rect.width / cellW));
  const rows = Math.max(10, Math.floor(rect.height / cellH));
  const particleCount = Math.min(48, Math.max(12, Math.floor((cols * rows) / 60)));
  const attractorRadius = Math.max(4, Math.floor(Math.min(cols, rows) / 4));
  return { cols, rows, particleCount, attractorRadius };
}

function seedParticles(opts: AsciiOptions): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < opts.particleCount; i++) {
    out.push({
      x: Math.random() * opts.cols,
      y: Math.random() * opts.rows,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.4,
    });
  }
  return out;
}

function step(particles: Particle[], opts: AsciiOptions, t = 0): void {
  // Three attractors orbit the center on offset phases and speeds, so
  // the field never settles. Particles wrap at the bounding box.
  const cx = opts.cols / 2;
  const cy = opts.rows / 2;
  const orbit = Math.min(opts.cols, opts.rows);
  for (const p of particles) {
    for (const a of ATTRACTORS) {
      const angle = t * a.speed + a.phase;
      const ax = cx + Math.cos(angle) * orbit * a.radiusScale;
      // Halve vertical orbit so attractors stay in the (wide, short) pane.
      const ay = cy + Math.sin(angle) * orbit * a.radiusScale * 0.5;
      const dx = ax - p.x;
      const dy = ay - p.y;
      const d2 = dx * dx + dy * dy + 1;
      const pull = 0.05 / Math.sqrt(d2);
      p.vx += dx * pull;
      p.vy += dy * pull;
    }
    // Damping.
    p.vx *= 0.985;
    p.vy *= 0.985;
    p.x += p.vx;
    p.y += p.vy;
    // Wrap (keeps the field active).
    if (p.x < 0) p.x += opts.cols;
    if (p.x >= opts.cols) p.x -= opts.cols;
    if (p.y < 0) p.y += opts.rows;
    if (p.y >= opts.rows) p.y -= opts.rows;
  }
}

function rasterize(particles: Particle[], buf: Float32Array, opts: AsciiOptions): void {
  buf.fill(0);
  const r = opts.attractorRadius;
  for (const p of particles) {
    const xi = Math.floor(p.x);
    const yi = Math.floor(p.y);
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        const x = xi + dx;
        const y = yi + dy;
        if (x < 0 || x >= opts.cols || y < 0 || y >= opts.rows) continue;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > r) continue;
        const contribution = 1 - dist / r;
        const idx = y * opts.cols + x;
        const cur = buf[idx] ?? 0;
        buf[idx] = cur + contribution;
      }
    }
  }
}

function render(buf: Float32Array, opts: AsciiOptions): string {
  const lines: string[] = [];
  let max = 0;
  for (let i = 0; i < buf.length; i++) {
    const v = buf[i] ?? 0;
    if (v > max) max = v;
  }
  const norm = max > 0 ? 1 / max : 0;
  for (let y = 0; y < opts.rows; y++) {
    let line = "";
    for (let x = 0; x < opts.cols; x++) {
      const v = (buf[y * opts.cols + x] ?? 0) * norm;
      const i = Math.min(LUMA.length - 1, Math.max(0, Math.floor(v * (LUMA.length - 1))));
      line += LUMA[i];
    }
    lines.push(line);
  }
  return lines.join("\n");
}

// Exported helpers for testing.
export const __test = { computeOptions, seedParticles, step, rasterize, render, LUMA };
