# Session operations

Retrieve, list, update, archive, and delete Claude Managed Agents sessions.

---

Once a session exists, use these operations to read, update, archive, or delete it. See [Start a session](/docs/en/managed-agents/sessions) for creating a session and sending it work.

<Note>
All Managed Agents API requests require the `managed-agents-2026-04-01` beta header. The SDK sets the beta header automatically.
</Note>

## Session statuses

Sessions progress through these statuses. See [Start a session](/docs/en/managed-agents/sessions) for the session lifecycle.

| Status | Description |
|--------|-------------|
| `idle` | Agent is waiting for input, including user messages or tool confirmations. Sessions start in `idle`. |
| `running` | Agent is actively executing. |
| `rescheduling` | Transient error occurred, retrying automatically. |
| `terminated` | Session has ended because of an unrecoverable error. |

## Updating the agent configuration

You can update a session's `agent.tools` and `agent.mcp_servers`, including permission policies, mid-session without creating a new agent version. Updates are session-local and do not propagate back to the underlying agent.

The semantics of an update are full replacement: the provided array is the new value. To preserve existing entries, `GET` the session, modify the array, and `POST` it back.

The session must be `idle` to update the agent. [Interrupt](/docs/en/managed-agents/events-and-streaming#integrating-events) the session if you need to update the agent while it's running.

## Retrieving a session

```python
retrieved = client.beta.sessions.retrieve(session.id)
print(f"Status: {retrieved.status}")
```

## Listing sessions

```python
for listed_session in client.beta.sessions.list(agent_id=agent.id):
    print(f"{listed_session.id}: {listed_session.status}")
```

## Archiving a session

Archive a session to prevent new events from being sent while preserving its history. A `running` session cannot be archived; send an [interrupt event](/docs/en/managed-agents/events-and-streaming#integrating-events) if you need to archive it immediately.

```python
client.beta.sessions.archive(session.id)
```

## Deleting a session

Delete a session to permanently remove its record, events, and associated sandbox. A `running` session cannot be deleted; send an [interrupt event](/docs/en/managed-agents/events-and-streaming#integrating-events) if you need to delete it immediately.

Files, memory stores, vaults, skills, environments, and agents are independent resources and are not affected by session deletion.

```python
client.beta.sessions.delete(session.id)
```
