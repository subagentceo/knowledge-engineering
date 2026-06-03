# Dreams

Let Claude reflect on past sessions to curate an agent's memory and surface new insights.

---

<Tip>
Dreaming is a Research Preview feature. [Request access](https://claude.com/form/claude-managed-agents) to try it.
</Tip>

Agents write to their [memory stores](/docs/en/managed-agents/memory) as they work, but these writes are local and incremental: over many sessions a memory store accumulates duplicates, contradictions, and stale entries.

**Dreams** let Claude clean that up. A dream reads an existing memory store alongside past session transcripts, then produces a new, reorganized memory store: duplicates merged, stale or contradicted entries replaced with the latest value, and new insights surfaced.

The input store is never modified, so you can review the output and discard it if you don't like the result.

<Note>
All Managed Agents API requests require the `managed-agents-2026-04-01` beta header. Dreams additionally require the `dreaming-2026-04-21` beta header. The SDK sets these automatically.
</Note>

## How it works

A **dream** is an asynchronous job that takes:

- a pre-existing **memory store**: the store Claude verifies, deduplicates, and reorganizes, and
- optionally, up to 100 **sessions**: past transcripts Claude mines for patterns and insights to fold into the output.

The dream produces another **output memory store**, separate from the input. The output store ID appears in the dream's `outputs[]` once it starts `running`.

## Create a dream

```python
dream = client.beta.dreams.create(
    inputs=[
        {"type": "memory_store", "memory_store_id": store_id},
        {"type": "sessions", "session_ids": [session_a, session_b]},
    ],
    model="claude-opus-4-7",
    instructions="Focus on coding-style preferences; ignore one-off debugging notes.",
)
print(dream.id)  # drm_01...
```

Dreaming inputs include the pre-existing memory store and an optional array of sessions. The model selected will run the dreaming pipeline; during the research preview `claude-opus-4-7` and `claude-sonnet-4-6` are supported.

The response is the full `dream` resource with `status: "pending"`.

<Tip>
If you only have session transcripts and no existing store, [create an empty memory store](/docs/en/managed-agents/memory#create-a-memory-store) first and pass it as the `memory_store` input.
</Tip>

## Track progress

Dreams run asynchronously and typically take minutes to tens of minutes depending on input size. Poll the dream by ID to check status:

```python
while dream.status in ("pending", "running"):
    time.sleep(10)
    dream = client.beta.dreams.retrieve(dream.id)
    print(f"status={dream.status} input_tokens={dream.usage.input_tokens}")
```

### Lifecycle

| `status` | Meaning |
| --- | --- |
| `pending` | Dream successfully created and queued.  |
| `running` | The pipeline is processing. `usage` updates as work progresses. |
| `completed` | Finished successfully. The `outputs[]` value is the new memory store. |
| `failed` | Dreaming run terminated with an error. |
| `canceled` | Dreaming run canceled. |

### Watch the pipeline run

Once a dream is `running`, its `session_id` field points at the underlying [session](/docs/en/managed-agents/sessions) executing the pipeline. You can stream that session's [events](/docs/en/managed-agents/events-and-streaming) to observe what the dream is reading and writing in real time.

## Use the output

When `status` reaches `completed`, the `memory_store` entry in `outputs[]` references a fully populated store. Review it or leverage it by attaching it to future sessions as a `memory_store` resource.

```python
# After the dream ends, the output holds the rebuilt memory store
output_store_id = next(
    output.memory_store_id for output in dream.outputs if output.type == "memory_store"
)

session = client.beta.sessions.create(
    agent=agent_id,
    environment_id=environment_id,
    resources=[
        {"type": "memory_store", "memory_store_id": output_store_id},
    ],
)
```

The dream itself never deletes or modifies its inputs. On `failed` or `canceled` the output store persists with partial contents.

<Warning>
While a dream is `pending` or `running`, archiving or deleting its output store is rejected with a 400. Archiving or deleting an *input* store or session mid-run will cause the dream to fail.
</Warning>

## Cancel a dream

Cancel moves a `pending` or `running` dream to `canceled` immediately.

```python
client.beta.dreams.cancel(dream.id)
```

## Archive a dream

Archive sets `archived_at` on a dream that has reached a terminal state (`completed`, `failed`, or `canceled`).

```python
client.beta.dreams.archive(dream.id)
```

## List dreams

```python
for listed_dream in client.beta.dreams.list(limit=20):
    print(listed_dream.id, listed_dream.status)
```

## Errors

| `error.type` | When |
| --- | --- |
| `timeout` | The pipeline exceeded its runtime budget. |
| `internal_error` | Unclassified pipeline failure. |
| `memory_store_org_limit_exceeded` | Your organization hit its memory-store cap while the pipeline was provisioning working storage. |
| `input_memory_store_too_large` | The input memory store exceeds the pipeline's size limit. |
| `input_memory_store_unavailable` | The input memory store was archived or deleted after the dream was created. |
| `input_session_unavailable` | An input session was archived or deleted after the dream was created. |

## Billing

Dreams are billed at standard API token rates for the model you select; `usage` on the resource reports the exact totals.

## Limits

| Limit | Value |
| --- | --- |
| Sessions per dream | 100 |
| `instructions` length | 4,096 characters |
| Supported models | `claude-opus-4-7`, `claude-sonnet-4-6` |
