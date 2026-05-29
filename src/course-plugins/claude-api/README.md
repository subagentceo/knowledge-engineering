# claude-api

A Claude Code plugin that packages the *Building with the Claude API* course into trigger-on-demand skills for building real applications on the Anthropic Messages API.

## What it covers

End-to-end application building against the Anthropic Messages API: how a request flows from client to API, multi-turn conversation state, system prompts and temperature, response streaming, steering and structured output, a full prompt-evaluation pipeline (datasets + model-based and code-based grading), the core prompt-engineering techniques, tool use (schemas, message blocks, tool results, multi-turn chains, multiple tools), built-in / server-side tools (batch, text editor, web search, code execution, structured-data extraction), retrieval-augmented generation (chunking, embeddings, hybrid BM25 + vector search, reranking, contextual retrieval), prompt caching, and the workflow-vs-agent design decision.

## Source course

All skills are distilled from a single transcript: `projects/courses/building-with-the-claude-api__1p.txt` (the byte-identical `claude-api-course-notes.txt` is the same source). Skills keep model IDs and API parameter names accurate to what the course shows.

## Skills

| Skill | One-liner |
|---|---|
| `making-requests` | Model selection, the API access flow, `client.messages.create()`, multi-turn history, system prompts, temperature. |
| `streaming-responses` | Stream output chunk-by-chunk with `messages.stream()` / `stream=True`, the event types, and final-message assembly. |
| `controlling-output` | Steer and shape output with assistant prefilling, stop sequences, and the structured-data extraction pattern. |
| `prompt-evaluation` | Build an eval pipeline: test datasets, run-prompt/run-eval loop, model-based grading, and code-based syntax grading. |
| `prompt-engineering` | Clear-and-direct first lines, being specific (attributes + steps), XML tags, and one-/multi-shot examples. |
| `tool-use` | Tool functions, JSON schemas, multi-block messages, tool-result blocks, and arbitrary multi-turn tool chains. |
| `built-in-tools` | Server-side and built-in tools: batch, text editor, web search, code execution + Files API, structured-data tools. |
| `rag` | Retrieval-augmented generation: chunking, embeddings, the full vector-search flow, BM25 hybrid search, RRF, reranking, contextual retrieval. |
| `prompt-caching` | Cut latency and cost by caching tools / system prompts / message prefixes with `cache_control` ephemeral breakpoints. |
| `workflows-and-agents` | Choose between deterministic workflows (chaining, routing, parallelization, evaluator-optimizer) and flexible tool-using agents. |

## Running the scripts (programmatic tool calling)

Every script under `skills/*/scripts/*.py` is **self-contained**: it declares its own
dependencies in a [PEP 723](https://peps.python.org/pep-0723/) inline block at the top of the
file. Run any of them with [uv](https://docs.astral.sh/uv/) — it creates an isolated env,
installs the declared deps (cached after first run), and executes:

```bash
uv run skills/<skill>/scripts/<name>.py
```

No virtualenv, no `pip install`, no global package churn. Scripts that call a hosted API
(Anthropic / Bedrock / Vertex / Voyage) read credentials from the environment — set the relevant
key (`ANTHROPIC_API_KEY`, AWS creds, `GOOGLE_*`, `VOYAGE_API_KEY`) before running. Some scripts
are intentionally library-style fragments (a function you import, or an illustrative snippet);
their PEP 723 block still names the SDK so the file is self-contained when wired up.
