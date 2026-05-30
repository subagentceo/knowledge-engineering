# OUTCOME — apps/corpus-viewer

A macOS SwiftUI app that browses the `knowledge-engineering/vendor/` corpus (≥2,000 markdown files across 28 vendor directories) in a three-pane `NavigationSplitView`: vendor list → file tree → rendered markdown. Markdown is rendered through `MarkdownUI` (Anthropic-maintained fork of `swift-markdown-ui`, vendored locally at `../../../swift-markdown-ui`). Read-only. Live filesystem reads from the absolute path; no bundling, no network.

## Verification

```bash
node /Users/alexzh/subagentmcp/subagentceo/knowledge-engineering/apps/corpus-viewer/eval/run.mjs
```

Two sub-probes:

1. **`swift-test`** — `swift test` exercises `CorpusScanner` against the live corpus: vendor enumeration, child filtering (md + dirs only), path-escape rejection, arbitrary-file read, relative-path normalisation. 5 tests.
2. **`mac-screenshot`** — `swift build -c debug` produces a `CorpusViewer.app` bundle, harness `open`s it, waits, captures a full-screen PNG, and quits the app. Claude reads `eval/.last/mac.png` to confirm the three-pane UI with vendors populated.

Artifacts under `eval/.last/`.

## Non-goals

- iOS / iPad / tvOS targets (macOS-only; we deliberately read the host filesystem).
- Search / full-text indexing (defer; out of scope for first paint).
- Edit, save, sync, or publish workflow (read-only viewer).
- Syntax highlighting inside fenced code blocks (defer until we add swift-syntax or a highlighter).
- Use of Xcode `#Preview` Canvas (validation goes through `swift test` + screencap; Canvas requires UI clicks).
