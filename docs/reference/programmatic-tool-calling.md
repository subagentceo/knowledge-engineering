# Programmatic tool calling

> Mirror of <https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md>
> Fetched 2026-05-29. Refresh against the live doc before relying on version strings / model lists.

Programmatic tool calling lets Claude write code that calls your tools **inside a
code-execution container**, instead of one model round-trip per tool call. It cuts
latency on multi-tool workflows and slashes token use by letting Claude filter /
aggregate tool output before any of it reaches the context window.

Example: checking budget compliance across 20 employees the traditional way is 20
round-trips that drag thousands of line items into context. Programmatically, one
script runs all 20 lookups, filters, and returns only the over-limit employees —
hundreds of KB down to a few lines.

> Requires the **code execution tool** to be enabled. **Not** ZDR-eligible.

## Model compatibility

Requires tool version `code_execution_20260120`, supported on:

| Model | ID |
|---|---|
| Claude Opus 4.8 | `claude-opus-4-8` |
| Claude Opus 4.7 | `claude-opus-4-7` |
| Claude Opus 4.6 | `claude-opus-4-6` |
| Claude Sonnet 4.6 | `claude-sonnet-4-6` |
| Claude Opus 4.5 | `claude-opus-4-5-20251101` |
| Claude Sonnet 4.5 | `claude-sonnet-4-5-20250929` |

Available on the **Claude API, Claude Platform on AWS, and Microsoft Foundry**.
**Not** on Amazon Bedrock or Vertex AI.

## How it works

1. Claude writes Python that invokes your tool as a function (possibly many calls + pre/post-processing).
2. The code runs in a sandboxed code-execution container.
3. When a tool function is called, execution pauses and the API returns a `tool_use` block.
4. You provide the tool result; execution continues — **intermediate results never enter Claude's context**.
5. When the code finishes, Claude receives only the final output.

Custom tools are exposed as **async** functions; Claude calls them with `await`
(`result = await query_database("<sql>")`).

## Enabling it: `allowed_callers`

Add `allowed_callers` to any tool you want callable from code:

```json
{
  "name": "query_database",
  "description": "Execute a SQL query. Returns a list of rows as JSON objects.",
  "input_schema": { "type": "object", "properties": { "sql": { "type": "string" } }, "required": ["sql"] },
  "allowed_callers": ["code_execution_20260120"]
}
```

Values:
- `["direct"]` — only Claude calls it directly (default if omitted)
- `["code_execution_20260120"]` — only callable from code execution
- `["direct", "code_execution_20260120"]` — both

Prefer picking **one** of direct vs. programmatic per tool — it gives Claude clearer guidance.

## Minimal request

Include the `code_execution` tool plus a tool marked with `allowed_callers`:

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=4096,
    messages=[{
        "role": "user",
        "content": "Query sales for West, East, and Central regions; tell me which had the highest revenue",
    }],
    tools=[
        {"type": "code_execution_20260120", "name": "code_execution"},
        {
            "name": "query_database",
            "description": "Execute a SQL query against the sales database. Returns a list of rows as JSON objects.",
            "input_schema": {
                "type": "object",
                "properties": {"sql": {"type": "string", "description": "SQL query to execute"}},
                "required": ["sql"],
            },
            "allowed_callers": ["code_execution_20260120"],
        },
    ],
)
print(response)
```

## The `caller` field in responses

Every `tool_use` block reports how it was invoked:

```json
{ "type": "tool_use", "name": "query_database", "input": { "sql": "<sql>" },
  "caller": { "type": "code_execution_20260120", "tool_id": "srvtoolu_abc123" } }
```

`{ "type": "direct" }` for traditional calls; the programmatic form references the
code-execution `tool_id` that made the call.

## Container lifecycle

- New container per request unless you pass an existing `container` id to reuse.
- **30-day** hard max lifetime; cleaned up after **4.5 min idle**.
- You must return a tool result **before the container expires** — watch `expires_at`,
  or Claude treats the call as timed out (`TimeoutError` in stderr) and may retry.

## Advanced patterns

- **Batch loops** — iterate N items in one code run; N round-trips → 1.
- **Early termination** — `break` as soon as a success criterion is met.
- **Conditional tool selection** — branch on an intermediate result (e.g. file size → full read vs. summary).
- **Data filtering** — return only the last 10 errors instead of the whole log.

## Constraints

- `strict: true` (structured outputs) **not** supported with programmatic calling.
- Can't force a specific tool via `tool_choice`; `disable_parallel_tool_use: true` unsupported.
- **MCP-connector tools cannot be called programmatically.**
- When responding to pending programmatic calls, the message must contain **only**
  `tool_result` blocks — no text, even after the results. (This restriction is
  programmatic-only; regular client-side tool results may be followed by text.)

## Token efficiency & pricing

- Tool results from programmatic calls are **not** added to context and **do not count**
  toward input/output tokens — only the final code-execution result + Claude's response do.
- Same pricing as the code execution tool.

## Best practices

- **Describe the output schema in detail** in the tool description — Claude deserializes
  results in code, so JSON shape / field types matter.
- Return concise, structured (JSON) data.
- Use for: large-dataset aggregation, 3+ dependent tool calls, filtering/sorting/transform,
  keeping intermediate data out of reasoning, parallel ops across many items.
- Avoid for: single simple calls, tools needing immediate user feedback, very fast ops
  where container overhead outweighs the benefit.
- **Reuse containers** across related requests; **batch** similar ops in one code run.

## Why it's relevant to this enterprise

This pattern is the efficient way to run the kind of fan-out this repo's tooling does —
e.g. "check open PRs / orphan branches across all 200+ repos" or "which orgs implement X":
a single script loops the orgs, filters, and returns only the conclusion, instead of
pulling every repo's data into context. The enterprise-mirror's `fetch.sh` / `build.py`
(see `enterprise-mirror/`) are the shell analog; programmatic tool calling is how an
Agent-SDK workload would do the same against live tools.

## Alternative implementations

- **Client-side direct execution** — you run Claude's code locally; simple, but executes untrusted code outside a sandbox.
- **Self-managed sandbox** — safe, but you build/maintain the container + IPC for external tool calls.
- **Anthropic-managed** (this feature) — sandboxed, secure by default, Python env tuned for Claude. Use on Claude API / AWS / Foundry.

## Related

- Code Execution Tool — `/docs/en/agents-and-tools/tool-use/code-execution-tool`
- Tool Use Overview — `/docs/en/agents-and-tools/tool-use/overview`
- Advanced tool use (engineering blog) — <https://www.anthropic.com/engineering/advanced-tool-use>
