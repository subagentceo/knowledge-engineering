---
runbook_id: RUNBOOK1001
worker: calendar-frontend
subdomain: calendar.subagentknowledge.com
created_unix: 1781919443
created_iso: "2026-06-20T01:37:23Z"
semver_target: "0.1.x"
status: active
owner: engineering-manager
---

# RUNBOOK1001 — deploy changes to `calendar-frontend`

> Durable, deterministic deploy procedure for **calendar.subagentknowledge.com**. Another agent
> (engineering-manager → engineering-subagents) follows this verbatim to ship a change. Every step has
> an exact command and a verifiable expected output — no judgement calls. Type-safe: the config, the
> upload metadata, and the tracking envelope all conform to declared schemas.
>
> @cite frontend/calendar-worker/ · frontend/CHANGELOG.md
> @cite cowork/schemas/envelope.ts (the DurableTask envelope this runbook dispatches)
> @cite cowork/standards/agent-hierarchy.md (manager → subagent deploy lane)

## Constants (do not improvise — copy verbatim)

```yaml
account_id: e6294e3ea89f8207af387d459824aaae   # Alex@jadecli.com
zone_id:    3f820e0424fd375d5b6f86acaad0d5d7   # subagentknowledge.com
script_name: calendar-frontend
hostname:   calendar.subagentknowledge.com
worker_dir: frontend/calendar-worker
compatibility_date: "2025-06-01"
compatibility_flags: ["nodejs_compat"]
durable_object: { binding: MCP_OBJECT, class_name: CalendarMcp, migration_tag: v1 }
actions: [list_events, check_availability, create_event]
```

## Preconditions (assert before any change)

```yaml
preconditions:
  - "node >= 18 and the worker_dir exists (frontend/calendar-worker)"
  - "src/worker.ts passes esbuild syntax check (see step 2)"
  - "deploy auth available via ONE of: wrangler CLOUDFLARE_API_TOKEN (Lane A) OR the authenticated
     Cloudflare API execute tool (Lane B). NEVER paste a token into a file."
```

## Procedure (ordered — execute top to bottom)

1. **Open a DurableTask** (track the deploy in e2m). Append this typed envelope to
   `cowork/data/queues/engineering.jsonl`:
   ```json
   {"_type":"task","id":"<uuid>","queue":"engineering","from":"engineering-manager",
    "subject":"Deploy calendar-frontend (RUNBOOK1001)","state":"pending",
    "ke_fit_score":4,"created_at":"<ISO>","updated_at":"<ISO>",
    "evaluator":{"pass_if":["workers_get_worker calendar-frontend returns an id",
                            "GET https://calendar.subagentknowledge.com/api/manifest .app == \"calendar\""],
                 "fail_if":["upload success false","domain success false"]}}
   ```
   `task_transition claim` → `in_progress`.

2. **Validate the source (type safety gate).**
   ```bash
   cd frontend/calendar-worker
   npx --yes esbuild@0.21.5 src/worker.ts --format=esm --loader:.ts=ts >/dev/null   # exit 0 = syntax OK
   python3 -c "import json,re; raw=open('wrangler.jsonc').read(); json.loads('\n'.join(l for l in raw.splitlines() if not l.strip().startswith('//')))"  # wrangler.jsonc parses
   ```
   STOP if either fails.

### Lane A — `wrangler deploy` (preferred; ships the full `McpAgent /mcp` Durable Object)

3A. ```bash
    cd frontend/calendar-worker && npm install
    CLOUDFLARE_API_TOKEN=<operator-token> npm run deploy   # applies the v1 CalendarMcp migration + custom domain from wrangler.jsonc
    ```
    Expected: `Deployed calendar-frontend` + the route `calendar.subagentknowledge.com`. The token is the
    operator's; it is never written to a file.

### Lane B — Cloudflare API (dependency-free shell; the build deployed 2026-06-20)

3B. Build the dependency-free bundle, then upload + attach the domain via the authenticated API:
    - script = `frontend/calendar-worker/dist/worker.js` (module worker, no imports).
    - metadata (typed): `{ "main_module":"worker.js", "compatibility_date":"2025-06-01", "compatibility_flags":["nodejs_compat"] }`.
    - `PUT /accounts/{account_id}/workers/scripts/calendar-frontend` — multipart: `metadata`
      (`application/json`) + `worker.js` (`application/javascript+module`).
    - On `success`, `PUT /accounts/{account_id}/workers/domains` with
      `{ "zone_id": "<zone_id>", "hostname": "calendar.subagentknowledge.com", "service": "calendar-frontend", "environment": "production" }`.

4. **Verify (the gate).**
   ```bash
   # worker registered:
   #   workers_get_worker(account_id, "calendar-frontend") → returns an id
   curl -s https://calendar.subagentknowledge.com/api/manifest | python3 -c "import sys,json; d=json.load(sys.stdin); assert d['app']=='calendar' and d['actions']==['list_events','check_availability','create_event']; print('OK', d['version'])"
   ```

5. **Close the DurableTask.** `task_transition complete` ONLY if step 4's `evaluator.pass_if` holds;
   else `task_transition fail` + escalate to the operator via iMessage (agent-hierarchy.md §durability).

6. **Record the release.** Add a Keep-a-Changelog entry under the next semver in `frontend/CHANGELOG.md`
   (patch for a fix, minor for an added action, major for a breaking route/contract change).

## Rollback

```yaml
rollback:
  - "re-deploy the previous dist/worker.js (git checkout the prior commit) via the same lane"
  - "or: Cloudflare dashboard → Workers → calendar-frontend → Deployments → roll back"
  - "custom domain stays attached; only the script changes — rollback is a script-only revert"
```

## Determinism guarantees

- Same `src/worker.ts` + same constants → byte-identical upload. No timestamps in the script.
- The verify step is a pure assertion on `/api/manifest` (typed) and `workers_get_worker` — pass/fail only.
- The DurableTask `evaluator` is the single source of "done"; green tools alone are not "done".
