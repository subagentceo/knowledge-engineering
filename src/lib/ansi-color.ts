// src/lib/ansi-color.ts
//
// Phase 13.B+ (O6). Maps a flag value (one of 8 colors) to a 256-color
// ANSI prefix. Pure function. Respects TTY: returns plain text when
// stdout is not a TTY (CI, log files), so ANSI escape sequences never
// leak into pipelines.
//
// Citations:
//   @cite rubrics/phase-13.md (O6)
//   @cite seeds/openfeature/local-flags.json (color-code allowed values)

export const ALLOWED_COLORS = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "cyan",
] as const;
export type Color = (typeof ALLOWED_COLORS)[number];

const DEFAULT: Color = "cyan";

// 256-color codes (standard xterm-256 palette).
// Picked to give visible distinction on dark and light terminal themes.
const ANSI_FG: Record<Color, number> = {
  red: 196,
  blue: 33,
  green: 46,
  yellow: 226,
  purple: 129,
  orange: 208,
  pink: 213,
  cyan: 51,
};

/**
 * Returns true if `value` is one of the 8 allowed colors. Use to gate
 * an OpenFeature-resolved flag value at the call site.
 */
export function isColor(value: string): value is Color {
  return (ALLOWED_COLORS as readonly string[]).includes(value);
}

/**
 * Coerce an arbitrary string into a {@link Color}. Returns the default
 * (`cyan`) for any value not in the allowed list — never throws.
 */
export function coerceColor(value: string | undefined): Color {
  if (value !== undefined && isColor(value)) return value;
  return DEFAULT;
}

/**
 * Wrap `text` in a 256-color ANSI prefix + reset. When `isTty` is
 * false (CI, redirected stdout, log files), returns `text` unchanged
 * so escape sequences don't leak.
 */
export function colorize(color: Color, text: string, isTty: boolean): string {
  if (!isTty) return text;
  const code = ANSI_FG[color];
  return `[38;5;${code}m${text}[0m`;
}
