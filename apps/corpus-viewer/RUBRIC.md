# RUBRIC — apps/corpus-viewer

Measurable criteria for `node eval/run.mjs`. All must pass for exit 0.

## 1. Logic (`swift-test`)

- [ ] `swift test` exits 0 from `apps/corpus-viewer/`.
- [ ] `testLiveCorpusVendorsPopulated` — `CorpusScanner.listVendors()` returns ≥20 vendor dirs, each with ≥1 markdown file.
- [ ] `testChildEntriesFiltersToMdAndDirs` — `childEntries(of:)` filters non-markdown files; only `.md` and directories surface.
- [ ] `testEscapeOutsideRootThrows` — `readMarkdown(at:)` rejects paths outside the corpus root with `CorpusScannerError.escapesRoot`.
- [ ] `testReadsArbitraryMarkdown` — reads a real markdown file and gets non-empty UTF-8 text.
- [ ] `testRelativePathStrippingIsCorrect` — `relativePath(of:)` strips the corpus root prefix correctly.

## 2. macOS visual (`mac-screenshot`)

- [ ] `swift build -c debug --product CorpusViewer` exits 0.
- [ ] `eval/.last/mac.png` exists and is ≥100 KB.
- [ ] Claude reads `mac.png` and visually confirms:
  - Left pane: `NavigationSplitView` sidebar with ≥20 vendor rows (anthropics, cloudflare, twilio, etc.).
  - Middle pane: a file-tree disclosure list rooted at the selected vendor.
  - Right pane: either the host banner (no file selected) or a rendered `MarkdownUI` view.
- [ ] `CorpusViewer.app` process terminates cleanly after capture.

## 3. Hygiene

- [ ] `eval/.last/` and `eval/.build/` are in `.gitignore` and never committed.
- [ ] `eval/run.mjs` uses explicit-argv `execFileSync` / `spawnSync` — no shell strings, no `eval`, no `curl | sh`.
- [ ] No tokens, no API keys, no PAT inlines in any tracked file under `apps/corpus-viewer/`.
- [ ] `Package.swift` pins `swift-markdown-ui` to the local path `../../../swift-markdown-ui` (deterministic; remote `github.com/anthropics/swift-markdown-ui` is not currently resolvable and the local clone's origin embeds a token that should be rotated separately).

## Failure modes

- Compile error or any failing `swift test`.
- `swift build` exits non-zero.
- `mac.png` < 50 KB, unreadable, or shows a blank window / SIGTRAP / "could not find vendor root" error overlay.
- App process lingers after the harness exits.
