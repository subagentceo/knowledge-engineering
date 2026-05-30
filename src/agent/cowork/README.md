# cowork — the Python COWORK lane

The Python sibling of the TypeScript CODING lane (`src/agent/knowledge-agent/`).
Where the coding lane runs `claude -p` for code generation, the cowork lane does
**programmatic MCP tool calling** for knowledge work (product-management first),
with the same chassis discipline (typed boundaries, outcome+test per task,
durable steering memory).

## Files

| File | What |
| ---- | ---- |
| `models.py` | Pydantic `BaseModel` + `Enum` mirror of the TS zod models (SubagentSpec, TaskEnvelope, Lane, VerifyVerdict, …) + the cowork-only `JiraIssueDraft`. One shared contract — see `docs/architecture/knowledge-engineering-erd.md`. |
| `product_management.py` | **PEP-723 self-contained script** (inline deps, run via `uv run`). Emits typed `JiraIssueDraft`s and renders them into `createJiraIssue` MCP-call payloads (programmatic Atlassian tool calling). Uses redis-py against dragonfly :6379 for durable steering memory. |
| `test_models.py` | PEP-723 test for the pydantic models (7 cases). |

## Run

```bash
# self-test the product-management plan (offline; degrades memory to no-op if no dragonfly)
uv run src/agent/cowork/product_management.py --self-test

# emit the rest-of-day plan as createJiraIssue MCP-call payloads
uv run src/agent/cowork/product_management.py plan

# test the pydantic models
uv run src/agent/cowork/test_models.py
```

`uv run` reads the inline `# /// script` PEP-723 block, builds an isolated env
with the declared deps (`pydantic`, `redis`), and runs — no manifest, no install
step, no system-Python version skew. This is the "self-contained script bundled
in a skill" pattern: the agent invokes it with one command.

## Programmatic tool calling

`product_management.py` does NOT free-form-ask a model to make Jira calls. It
builds typed `JiraIssueDraft`s in code, then renders each into the exact
`mcp__claude_ai_Atlassian_Rovo__createJiraIssue` argument shape. The agent
runtime dispatches those payloads. Keeping the plan in a typed, tested script
(not model prose) is the cowork analogue of the coding lane's structured-output
discipline — the surface is the atlassian-mcp-server (`third_party/atlassian-mcp-server`).

## Why Python here

Per `docs/reference/self-steering-abstraction.md` §3: the TS loop is in-process
and ephemeral; the Python lane adds **durable, cross-session steering memory**
(dragonfly :6379 + alloydb :5433) so a dropped session resumes instead of
restarting. The two chassis share the ERD contract and the redis/postgres state,
not a runtime — that is the cross-language self-steering substrate.
