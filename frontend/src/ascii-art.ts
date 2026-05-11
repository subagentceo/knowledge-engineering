// frontend/src/ascii-art.ts
//
// Phase 13.B+ (O7). Monospace single-weight ASCII art driven by a
// particle-and-attractor brightness field. Inspired by
// https://chenglou.me/pretext/variable-typographic-ascii/ "Monospace ×
// Single Weight" variant. Pure visual; no semantic content.
//
// Pauses when the pane is offscreen (IntersectionObserver) and respects
// prefers-reduced-motion (renders one static frame).
//
// Citation: seeds/citations/pretext.md

const LUMA = " .:;+*xX$#@";

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
  const opts = computeOptions(target);
  const particles = seedParticles(opts);
  const buf = new Float32Array(opts.cols * opts.rows);
  let raf: number | null = null;
  let running = true;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function frame() {
    if (!running) return;
    step(particles, opts);
    rasterize(particles, buf, opts);
    target.textContent = render(buf, opts);
    if (!reduce) raf = requestAnimationFrame(frame);
  }

  // Pause when offscreen.
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        if (!running) {
          running = true;
          if (!reduce) frame();
        }
      } else {
        running = false;
        if (raf !== null) cancelAnimationFrame(raf);
      }
    }
  });
  io.observe(target);

  frame();

  return () => {
    running = false;
    if (raf !== null) cancelAnimationFrame(raf);
    io.disconnect();
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
  const particleCount = Math.min(36, Math.floor((cols * rows) / 80));
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

function step(particles: Particle[], opts: AsciiOptions): void {
  // Single attractor in the middle, pulling particles in. Particles
  // bounce off the bounding box.
  const cx = opts.cols / 2;
  const cy = opts.rows / 2;
  for (const p of particles) {
    const dx = cx - p.x;
    const dy = cy - p.y;
    const d2 = dx * dx + dy * dy + 1;
    const pull = 0.06 / Math.sqrt(d2);
    p.vx += dx * pull;
    p.vy += dy * pull;
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
