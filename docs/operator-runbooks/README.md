---
title: Operator runbooks
description: Claude-in-Chrome prompt templates for each remaining operator-side action. Paste into `claude --chrome` to let an authenticated browser agent drive the task.
---

# Operator runbooks

Each file in this directory is a **paste-into-`claude --chrome` prompt**
that drives the operator's authenticated browser session through a
specific task. Instead of the operator clicking through 6-10 pages of
forms, they paste the prompt and confirm 2FA/CAPTCHA when asked.

## Why this pattern

Cited from `vendor/anthropics/code.claude.com/docs/en/chrome.md`:

> Claude opens new tabs for browser tasks and **shares your browser's
> login state, so it can access any site you're already signed into.**
> Browser actions run in a visible Chrome window in real time. When
> Claude encounters a login page or CAPTCHA, it pauses and asks you
> to handle it manually.

Safety boundaries are preserved:

- **The agent acts AS the operator's logged-in identity**, not on its own.
- **2FA / CAPTCHA / login pages pause the run** until the operator confirms.
- **Site-level permissions are inherited from the Chrome extension settings**
  (`Settings → Extensions → Claude in Chrome → Site access`).
- **Secrets are never logged**: each runbook's prompt explicitly tells the
  agent not to print sensitive values into chat output.

## Prerequisites

1. **Google Chrome or Microsoft Edge** (the only browsers the extension
   supports today — not Brave, Arc, Vivaldi, etc., per the cited doc).
2. **Claude in Chrome extension** v1.0.36+ installed:
   <https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn>
3. **Claude Code** v2.0.73+ (`claude --version` to confirm).
4. **Operator signed into the relevant accounts in Chrome**:
   - `dash.cloudflare.com` (operator's CF account that owns `subagentceo`)
   - `github.com` (admin on `subagentceo/knowledge-engineering`)
   - `voyageai.com` (for the optional Phase 11.C embeddings runbook)
5. **A direct Anthropic plan** (Pro/Max/Team/Enterprise). Per the cited
   doc, Chrome integration is NOT available through Bedrock/Vertex/Foundry.

## How to invoke

```
claude --chrome
```

Or in an existing session:

```
/chrome
```

Then paste the runbook's prompt block.

**Recommended model: Opus 4.7** — the longest browser flows here have ~15
distinct steps and benefit from Opus 4.7's planning depth.

## Index

| Runbook | Outcome | Time-to-finish | Operator manual steps |
|---|---|---|---|
| [`cf-api-token.md`](./cf-api-token.md) | `secrets.CLOUDFLARE_API_TOKEN` provisioned | ~5 min | confirm 2FA on CF; confirm 2FA on GH |
| [`cf-account-id.md`](./cf-account-id.md) | `secrets.CLOUDFLARE_ACCOUNT_ID` + `vars.CLOUDFLARE_WORKER_NAME` | ~3 min | confirm 2FA on GH |
| [`voyage-api-key.md`](./voyage-api-key.md) | `secrets.VOYAGE_API_KEY` (Phase 11.C; optional) | ~10 min | email verification; confirm 2FA |
| [`code-scanning-toggle.md`](./code-scanning-toggle.md) | Code scanning enabled; `upload-sarif: true` | ~2 min | confirm 2FA on GH |
| [`github-pat.md`](./github-pat.md) | Fine-grained GitHub PAT created + setup:project/setup:branch-protection run | ~8 min | confirm 2FA on GH; run two CLI scripts |
| [`connector-decision.md`](./connector-decision.md) | Phase 12 ship-as-Connector decision recorded | varies | reading + decision only |

## Boris Cherny tie-in

These runbooks operationalize the publicly-documented Anthropic pattern of
"a sufficiently scaffolded agent system writes 100% of the code." The
agent has written everything in this repo. The remaining manual surface
is auth provisioning (which an agent can't autonomously bootstrap), and
even that has been collapsed into pasteable prompts that drive the
operator's authenticated browser — not a fresh-session manual task list.

## After all runbooks complete

Re-run `npm run verify:gates`. Expected result: **0 operator actions
pending across phases 1-12** (was 4 before).
