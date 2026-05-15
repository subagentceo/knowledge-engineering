---
slug: spotify-confidence
source: https://github.com/orgs/spotify/repositories?q=confidence
sources:
  - https://www.npmjs.com/org/spotify-confidence
  - https://github.com/spotify/confidence-sdk-js
  - https://confidence.spotify.com/
local: vendor/spotify-confidence/confidence.spotify.com/
drives: Phase 16 verified vendor coverage (entity id=spotify_confidence in v2 catalog)
captured: 2026-05-15 (operator-direct browser inventory)
---

# spotify-confidence — SDK ecosystem extract

> Operator-supplied inventory of the live Spotify Confidence developer
> surface. Use as the citation source for the `spotify_confidence`
> entity in `seeds/citations/vendor-graph-v2.xml` and the
> `vendor/spotify-confidence/crawl.json` configuration.

## npm: @spotify-confidence (7 packages)

| Package | Latest | Lifecycle | Last published |
| :--- | :--- | :--- | :--- |
| `@spotify-confidence/sdk` | 0.3.14 | beta | a day ago |
| `@spotify-confidence/openfeature-server-provider` | 0.3.14 | beta | a day ago |
| `@spotify-confidence/openfeature-web-provider` | 0.3.14 | beta | a day ago |
| `@spotify-confidence/openfeature-server-provider-local` | 0.13.1 | — | 3 days ago |
| `@spotify-confidence/react` | 0.2.13 | beta | a day ago |
| `@spotify-confidence/client-http` | 0.1.6 | beta | 2 years ago |
| `@spotify-confidence/integration-react` | 0.2.3 | **deprecated** | 2 years ago |

**Observations:**

- The active core SDK is `@spotify-confidence/sdk`. Five packages are
  currently maintained (versions bumped in the last 3 days).
- `@spotify-confidence/client-http` (2 years stale) and
  `@spotify-confidence/integration-react` (deprecated) are legacy.
- The OpenFeature provider trio (`openfeature-server-provider`,
  `openfeature-web-provider`, `openfeature-server-provider-local`)
  is the cross-reference to our `openfeature` entity. The v2
  catalog's `cross_refs` edge captures this:
  `spotify_confidence implements_provider_for openfeature`.

## GitHub: spotify/confidence-* (13 repositories)

| Repo | Language | Stars | Description |
| :--- | :--- | ---: | :--- |
| `spotify/confidence-sdk-js` | TypeScript | 19 | Core JS SDK (npm @spotify-confidence/*) |
| `spotify/confidence-resolver` | Rust | 11 | Flag Resolvers for Confidence |
| `spotify/confidence-ai-plugins` | (multi) | 1 | AI plugin integrations |
| `spotify/confidence-sdk-android` | Kotlin | 13 | Android SDK |
| `spotify/confidence-sdk-dotnet` | C# | 2 | .NET SDK |
| `spotify/confidence-sdk-python` | Python | 3 | Python SDK |
| `spotify/confidence-sdk-java` | Java | 6 | Java SDK |
| `spotify/confidence-sdk-swift` | Swift | 20 | Swift SDK (highest-star) |
| `spotify/confidence` | Python | 289 | Python library for **AB test analysis** (separate library, not the SDK) |
| `spotify/confidence-sdk-rust` | Rust | 2 | Rust SDK |
| `spotify/confidence-sdk-demos` | TypeScript | 0 | Demo apps |
| `spotify/confidence-sdk-flutter` | Dart | 1 | Flutter SDK |
| `spotify/confidence-sdk-go` | Go | 3 | Go SDK |

**Cross-language SDK coverage:** TypeScript, Kotlin (Android), C# (.NET),
Python, Java, Swift, Rust, Dart (Flutter), Go — 9 languages.

**Note:** `spotify/confidence` (Python AB-test-analysis library, 289 stars)
is a **separate project** from the Confidence flag SDK family. Don't
conflate them.

## Cross-vendor relevance

Confidence is a feature-flag / experimentation platform that ships as
an **OpenFeature provider** (per the v2 catalog's
`implements_provider_for` edge). Anyone using the OpenFeature standard
(our `openfeature` ecosystem entity) can plug Confidence in via the
three provider packages.

For knowledge-engineering's chassis, the `spotify-confidence` vendor
mirror at `vendor/spotify-confidence/confidence.spotify.com/` captures
the **product documentation**. The SDK source-of-truth lives at the
GitHub org above; the npm packages are the deployment surface.

## Provenance + verification

- npm org: https://www.npmjs.com/org/spotify-confidence (7 packages confirmed)
- GitHub org search: https://github.com/orgs/spotify/repositories?q=confidence
  (13 repositories confirmed)
- Both captured by operator on 2026-05-15 via authenticated browser
  session and pasted into the orchestrator prompt.

## How this drives Phase 16

`rubrics/phase-16.md` criterion §2 asserts that every entity with a
confirmed-URL `<llms_txt>` slot in the v2 catalog has a
`vendor/<id>/crawl.json` with that URL. spotify_confidence's
`<llms_txt>` is `https://confidence.spotify.com/llms.txt` — already
configured in `vendor/spotify-confidence/crawl.json` (PR #70).

This citation file ADDS the SDK package + GitHub repo inventory that
the v2 catalog's `<notes>` block alludes to but doesn't enumerate.
It's a discoverable source for any future tick that wants to
cross-reference the OpenFeature provider integration or the
multi-language SDK surface.
