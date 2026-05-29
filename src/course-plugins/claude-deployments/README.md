# claude-deployments plugin

Skills for running the **same Claude models** through a cloud provider's gateway instead of the
first-party Anthropic API. Both providers host Sonnet/Haiku/Opus, so the *generic* API surface —
multi-turn message lists, system prompts, temperature, prefill + stop sequences, the tool-use
loop, RAG concepts, prompt caching, extended thinking, image support — is **identical to the
`claude-api` plugin**. This plugin captures only the **deployment-specific deltas**: how you
authenticate, which SDK/client you instantiate, how the model ID / region / project is wired, and
where the request/response shapes diverge.

- **Source courses:**
  - `projects/courses/claude-with-amazon-bedrock__bedrock.txt` (*Claude with Amazon Bedrock*)
  - `projects/courses/claude-with-google-cloud-s-vertex-ai__vertex.txt` (*Claude with Google Cloud Vertex AI*)
- **Grounding:** none into `src/` — this is API/deployment-side. Truth is the two transcripts.

## The core split (read this first)

| | **Amazon Bedrock** | **Google Cloud Vertex AI** |
|---|---|---|
| SDK | AWS `boto3` (`bedrock-runtime`) | Anthropic SDK `anthropic[vertex]` (`AnthropicVertex`) |
| Call shape | `client.converse(...)` / `converse_stream(...)` | `client.messages.create(...)` (native Anthropic shape) |
| Identity of model | inference-profile ID (per region) | model version string |
| Routing knobs | AWS region + cross-region inference profile | `region` + `project_id` |
| Message content | list of `{"text": ...}` dicts | Anthropic blocks (`content[0].text`) |
| Response text | `response["output"]["message"]["content"][0]["text"]` | `message.content[0].text` |

Bedrock speaks AWS's own `converse` schema; **Vertex uses the real Anthropic SDK**, so once the
Vertex client is constructed almost everything matches `claude-api` verbatim. Bedrock is the one
that re-shapes requests and responses.

## Skills

| Skill | One-liner |
|---|---|
| `bedrock-vs-vertex-access` | Side-by-side: access the API + make a first request on each platform. |
| `auth-and-setup` | AWS region + inference profiles vs Google project/region + `anthropic[vertex]` install. |
| `requests-and-streaming` | Request args, message shapes, and streaming event deltas per platform. |
| `tool-use-on-platforms` | The differing tool-use / tool-result block plumbing (converse vs Anthropic blocks). |
| `rag-on-platforms` | Embeddings, hybrid search, reranking, contextual retrieval — and which are Bedrock-only. |
| `structured-output` | Prefill+stop vs tool-based JSON extraction; identical across platforms. |

Where the two platforms agree, each skill says so briefly and points back to `claude-api` rather
than re-teaching the generic API.

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
