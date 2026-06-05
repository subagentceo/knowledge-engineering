# N-API / Native Addon Packages in the @anthropic-ai Namespace

Captured: 2026-06-04
Sources: npm registry, npmjs.com package pages, GitHub issue anthropics/claude-code#61313

## Summary

The `@anthropic-ai` namespace does **not** publish standalone N-API native addon packages. The native addons used by Claude Code are bundled exclusively inside the pre-built platform binary packages that ship as `optionalDependencies` of `@anthropic-ai/claude-code`.

## Architecture: Platform Binary Distribution (since v2.1.113)

Before v2.1.113, `@anthropic-ai/claude-code` shipped a bundled `cli.js`. Since v2.1.113, it switched to a thin wrapper (`install.cjs` + `cli-wrapper.cjs`) that resolves a pre-built native binary from the matching platform package at install time.

The platform binary packages are:

| Package | Platform |
|---|---|
| `@anthropic-ai/claude-code-darwin-arm64` | macOS Apple Silicon |
| `@anthropic-ai/claude-code-darwin-x64` | macOS Intel |
| `@anthropic-ai/claude-code-linux-arm64` | Linux ARM64 (glibc) |
| `@anthropic-ai/claude-code-linux-arm64-musl` | Linux ARM64 (musl/Alpine) |
| `@anthropic-ai/claude-code-linux-x64` | Linux x86-64 (glibc) |
| `@anthropic-ai/claude-code-linux-x64-musl` | Linux x86-64 (musl/Alpine) |
| `@anthropic-ai/claude-code-win32-arm64` | Windows ARM64 |
| `@anthropic-ai/claude-code-win32-x64` | Windows x86-64 |

The same pattern applies to `@anthropic-ai/claude-agent-sdk` with an equivalent set of `@anthropic-ai/claude-agent-sdk-<platform>` packages.

## N-API Addons Bundled Inside the Binary

These are native addons compiled into the Claude Code binary. They are **not** published as standalone npm packages and cannot be `npm install`-ed independently.

| Internal Name | Purpose |
|---|---|
| `audio-capture-napi` | Microphone/audio input capture for voice features |
| `color-diff-napi` | Pixel diff for screenshot comparison (vision-based testing) |
| `image-processor-napi` | Image resize and encode pipeline for the vision API |
| `modifiers-napi` | Keyboard modifier key detection (Shift, Ctrl, Alt, Meta state) |
| `url-handler-napi` | OS-level URL open handler (opens links in the default browser) |

Note: `audio-capture-napi` has a name-squatted placeholder on npm (`pacifier136/audio-capture-napi@0.0.1`, published with message "This package name has been reserved"), confirming Anthropic reserved the namespace but does not distribute it there.

## Missing Platform: FreeBSD

As of 2026-06-04, FreeBSD binaries (`@anthropic-ai/claude-code-freebsd-x64` and `-freebsd-arm64`) are not published despite the install scripts having `freebsd-x64` and `freebsd-arm64` entries in their `PLATFORMS` map. The FreeBSD port (`misc/claude-code`) is stuck at v2.1.112 as a result.

GitHub issue: anthropics/claude-code#61313 (filed 2026-05-21)

## Relevance to This Repo

- **WSL2 container target**: `linux-x64` (glibc)
- **Alpine/Docker musl target**: `linux-x64-musl`
- **Sandbox isolation**: The `@anthropic-ai/sandbox-runtime` (ASRT) package provides the process-level security boundary (macOS seatbelt / Linux bubblewrap) that wraps these binaries at runtime. It is a separate npm package at `github.com/anthropic-experimental/sandbox-runtime`, not a native addon.
