# Cloud-agent container bring-up — task / subtask / todo decomposition

> Structured answer to "what cloud environment setup script and cloud environment variables were used to start up the container."
>
> Decomposed per the operator's task/subtask/todo discipline so each unit is a paste-prompt the orchestrator (or a sub-agent) can dispatch. Every todo is a single atomic commit unit.

## Authoritative sources (read in this order)

1. `infra/cloudflare/Dockerfile` — the container image
2. `infra/cloudflare/wrangler.jsonc` — bindings + vars declared for the Worker
3. `.github/workflows/cloudflare-preview.yml` — the bootstrap setup script (jobs: `bootstrap-secrets` → `deploy-preview`)
4. `infra/cloudflare/src/worker.ts` — per-task `sanitizeEnv()` + `setEnvVars()` for the Sandbox container
5. `docs/operator-runbooks/cloud-env-vars-contract.md` — canonical inventory (PR #123, currently open)
6. `seeds/posture/session-start.xml` v2 — defense-in-depth contract for forbidden values

## Task 1 — Container image layer (Dockerfile)

**Outcome:** the Sandbox container image `cloudflare/sandbox:latest` + `gh` CLI + `@anthropic-ai/claude-code` is buildable.

### Subtask 1.1 — Base image
- **Todo 1.1.1** `FROM docker.io/cloudflare/sandbox:latest` (citation: `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md`)

### Subtask 1.2 — System packages
- **Todo 1.2.1** `apt-get install curl ca-certificates gnupg`
- **Todo 1.2.2** Add GitHub CLI apt repo + gpg key
- **Todo 1.2.3** `apt-get install gh`

### Subtask 1.3 — Claude Code CLI
- **Todo 1.3.1** `npm install -g @anthropic-ai/claude-code`
- **Todo 1.3.2** Build-time verify: `which claude && claude --version`

### Subtask 1.4 — Auth-substitution discipline
- **Todo 1.4.1** Document that `CLAUDE_CODE_OAUTH_TOKEN` is the only auth path; `ANTHROPIC_API_KEY` is forbidden (cite `seeds/posture/session-start.xml` v2 `<auth>` block)

---

## Task 2 — Worker bindings + vars (wrangler.jsonc)

**Outcome:** the Worker has the correct Durable Object class, Container binding, Secrets Store bindings, and runtime vars declared.

### Subtask 2.1 — Container + DO
- **Todo 2.1.1** `containers: [{ class_name: "Sandbox", image: "./Dockerfile", max_instances: 50 }]`
- **Todo 2.1.2** `durable_objects.bindings: [{ name: "Sandbox", class_name: "Sandbox" }]`
- **Todo 2.1.3** `migrations: [{ new_sqlite_classes: ["Sandbox"], tag: "v1" }]`

### Subtask 2.2 — Secrets Store bindings (3)
- **Todo 2.2.1** `CLAUDE_CODE_OAUTH_TOKEN` binding → store `ke-cloud-agent` → secret `CLAUDE_CODE_OAUTH_TOKEN`
- **Todo 2.2.2** `NEON_API_KEY` binding → same store → secret `NEON_API_KEY`
- **Todo 2.2.3** `GITHUB_TOKEN` binding → same store → secret `GITHUB_TOKEN`

### Subtask 2.3 — Non-secret vars
- **Todo 2.3.1** `vars.IS_SANDBOX = "0"` (outer Worker) — flipped to `"1"` by `worker.ts` when spawning the inner Sandbox
- **Todo 2.3.2** `vars.NEON_PROJECT_ID = "divine-cloud-27295848"`

---

## Task 3 — CI bootstrap script (cloudflare-preview.yml `bootstrap-secrets` job)

**Outcome:** the account-level Secrets Store + 3 secrets exist on Cloudflare, populated from the corresponding GitHub Actions secrets. Idempotent — re-runs only update.

### Subtask 3.1 — Gate
- **Todo 3.1.1** `if: vars.CLOUDFLARE_WORKER_NAME != '' && secrets.CLOUDFLARE_API_TOKEN != ''` — skips the job when CF auth isn't provisioned yet

### Subtask 3.2 — Resolve or create the Secrets Store
- **Todo 3.2.1** `npm install -g wrangler@latest`
- **Todo 3.2.2** `wrangler secrets-store store list --output json --remote` → grep for name `ke-cloud-agent`
- **Todo 3.2.3** If absent: `wrangler secrets-store store create ke-cloud-agent --remote --output json` → capture `.id`
- **Todo 3.2.4** Emit `store_id` as job output for downstream steps

### Subtask 3.3 — Upsert 3 secrets (per-secret, identical pattern)
For each of `CLAUDE_CODE_OAUTH_TOKEN`, `NEON_API_KEY`, `GITHUB_TOKEN`:
- **Todo 3.3.x.1** `wrangler secrets-store secret list <store_id> --output json --remote` → filter by name → capture `.id`
- **Todo 3.3.x.2** If absent: `printf '%s' "$SECRET_VALUE" | wrangler secrets-store secret create <store_id> --name <NAME> --scopes workers --remote`
- **Todo 3.3.x.3** Else: `printf '%s' "$SECRET_VALUE" | wrangler secrets-store secret update <store_id> --secret-id <id> --remote`

### Subtask 3.4 — Forbidden-value defense
- **Todo 3.4.1** Verify no step references `ANTHROPIC_API_KEY` (greppable invariant; enforced by `seeds/posture/session-start.xml` v2)

---

## Task 4 — Per-task Sandbox env (worker.ts at request time)

**Outcome:** when the Worker spawns a Sandbox container for a `/run` task, the container receives only the OAuth-only env it needs.

### Subtask 4.1 — `sanitizeEnv()`
- **Todo 4.1.1** Reject `ANTHROPIC_API_KEY` if present in inbound env (defense layer 2)
- **Todo 4.1.2** Allowlist: `CLAUDE_CODE_OAUTH_TOKEN`, `DATABASE_URL`, `IS_SANDBOX`, `GITHUB_TOKEN`, `NEON_PROJECT_ID`

### Subtask 4.2 — `setEnvVars()` on the container
- **Todo 4.2.1** Forward `CLAUDE_CODE_OAUTH_TOKEN` from the Secrets Store binding
- **Todo 4.2.2** Inject per-task `DATABASE_URL` (the pooled URL from the just-created Neon branch)
- **Todo 4.2.3** Set `IS_SANDBOX=1` so any code in the container can detect runtime
- **Todo 4.2.4** Forward `GITHUB_TOKEN` from the Secrets Store binding (for `gh pr create` inside the Sandbox)

---

## Task 5 — Operator-action surface (the irreducible minimum)

**Outcome:** the GitHub Actions secret + var landscape required for the above to run.

### Subtask 5.1 — Required GitHub Actions secrets
- **Todo 5.1.1** `CLOUDFLARE_API_TOKEN` — gates `bootstrap-secrets` and the `wrangler deploy` step (**STILL MISSING** as of 2026-05-15 — see issue #114)
- **Todo 5.1.2** `CLOUDFLARE_ACCOUNT_ID` — account targeting (✅ set 08:43Z by PR #109)
- **Todo 5.1.3** `CLAUDE_CODE_OAUTH_TOKEN` — value sourced into the CF Secrets Store by `bootstrap-secrets` (needs rotation, see #115)
- **Todo 5.1.4** `NEON_API_KEY` — for Neon-branch creation in `neon-branch.yml` + bound to the Worker (rotated post-leak by PR #125 / issue #116)
- **Todo 5.1.5** `GITHUB_TOKEN` — provisioned by the Neon GitHub integration; flows into the CF Secrets Store

### Subtask 5.2 — Required GitHub Actions vars (non-secret)
- **Todo 5.2.1** `CLOUDFLARE_WORKER_NAME = ke-cloud-agent` (✅ set; gates the workflow's `if` condition)
- **Todo 5.2.2** `NEON_PROJECT_ID = divine-cloud-27295848` (✅ set; mirrored into `wrangler.jsonc` vars)

### Subtask 5.3 — Forbidden value (defense in depth)
- **Todo 5.3.1** `ANTHROPIC_API_KEY` must NEVER appear anywhere. Three layers:
  - `src/oauth/token.ts` — OAuth gate fails closed if set
  - `infra/cloudflare/src/worker.ts` `sanitizeEnv()` — rejects before forwarding to Sandbox
  - `.github/workflows/cloudflare-preview.yml` — never sets it in any job env

---

## End-to-end "first-deploy" sequence (when all of Task 5 is satisfied)

1. Operator opens a PR touching `infra/cloudflare/**` (or runs `workflow_dispatch`)
2. `cloudflare-preview.yml` triggers
3. `bootstrap-secrets` job (Task 3) resolves/creates the Secrets Store, upserts 3 secrets
4. `deploy-preview` job (downstream) runs `wrangler deploy --env preview` against the patched `wrangler.jsonc`
5. Worker starts; on `/run { task, repoUrl }` POST:
   - Worker calls `getSandbox(env.Sandbox, sessionId)` (DO binding from Task 2.1)
   - `sanitizeEnv()` strips forbidden vars (Task 4.1)
   - `setEnvVars()` injects the per-task env (Task 4.2)
   - Container exec: `git clone` → `git checkout -b <agentId>` → `claude --dangerously-skip-permissions -p "<task>"` → `git add . && git commit` → `git push origin <agentId>` → `gh pr create`
6. Worker destroys the Sandbox; returns `{ agentId, databaseUrl, prUrl }`

## Verification checklist

```bash
# After Task 5 is satisfied:
gh secret list   --repo subagentceo/knowledge-engineering | grep CLOUDFLARE_API_TOKEN     # required
gh secret list   --repo subagentceo/knowledge-engineering | grep CLOUDFLARE_ACCOUNT_ID    # required
gh variable list --repo subagentceo/knowledge-engineering | grep CLOUDFLARE_WORKER_NAME   # required
gh workflow run cloudflare-preview.yml                                                    # triggers Tasks 3 + 4
gh run list --workflow cloudflare-preview.yml --limit 1                                   # status=success
```

## Citations

- `infra/cloudflare/Dockerfile` (Task 1)
- `infra/cloudflare/wrangler.jsonc` (Task 2)
- `.github/workflows/cloudflare-preview.yml` (Task 3)
- `infra/cloudflare/src/worker.ts` (Task 4)
- `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md` (base architecture)
- `seeds/posture/session-start.xml` v2 (Task 5.3 forbidden-value contract)
- `docs/operator-runbooks/cloud-env-vars-contract.md` (canonical inventory, PR #123)

## See also

- `docs/unblock-sequence.md` — the queue-side playbook
- `docs/operator-runbooks/cli-only-unblock-path.md` — CLI alternative to the Chrome runbooks
- `docs/operator-runbooks/ci-cd-unblock.md` — one-shot Chrome paste-block for full CI/CD unblock (PR #124)
