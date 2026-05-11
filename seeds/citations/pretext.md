# pretext (`@chenglou/pretext`) — citation extract

Source: https://github.com/chenglou/pretext (npm `@chenglou/pretext` v0.0.7, installed in `frontend/`).

> Pure JavaScript/TypeScript library for multiline text measurement and layout.

Pretext provides text-layout primitives that work without ever inserting nodes into the DOM:

- `prepare(text, font)` — analyzes text into laid-out segments
- `prepareWithSegments(text, font)` — same with segment metadata for low-level work
- `layout(prepared, maxWidth, lineHeight)` → `{ lineCount, height }`
- `layoutWithLines(prepared, maxWidth, lineHeight)` → `{ lines: [...] }`
- `measureLineStats(prepared, maxWidth)` → `{ lineCount, maxLineWidth }`

Used by the chassis in:

- `frontend/src/accordion.ts` — measures each accordion section's content
  height before the user clicks expand. The "finally sane accordion"
  pattern: heights set inline rather than measured-after-render-and-flop.

Why pretext rather than DOM measurement:

- DOM-based measurement requires the content to be already in the
  layout tree — invisible measurement requires `visibility: hidden;
  position: absolute` hacks that interact poorly with mobile Safari and
  with iOS dynamic-island insets.
- Pretext computes from canvas-measured text widths, which match the
  actual rendered widths once the content is in flow.

Inspired demos:

- https://chenglou.me/pretext/accordion/ — finally sane accordion.
- https://chenglou.me/pretext/variable-typographic-ascii/ — particle-and-attractor brightness field driving char selection.

The chassis ships its OWN ascii-art renderer (`frontend/src/ascii-art.ts`)
modeled on the cited demo's brightness-field approach but written from
scratch (~140 LOC). The accordion uses pretext directly for measurement.

Citation: rubrics/phase-13.md (O7)
