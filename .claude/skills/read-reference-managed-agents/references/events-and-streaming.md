# Session event stream

Send events, stream responses, and interrupt or redirect your session mid-execution.

---

Communication with Claude Managed Agents is event-based. You send user events to the agent, and receive agent and session events back to track status.

<Note>
All Managed Agents API requests require the `managed-agents-2026-04-01` beta header. The SDK sets the beta header automatically.
</Note>

## Event types

Events flow in two directions.
- **User events** are what you send to the agent to kick off a session and steer it as it progresses.
- **Session events**, **span events**, and **agent events** are sent to you for observability into your session state and agent progress.

Event type strings follow a `{domain}.{action}` naming convention.

### User events

| Type | Description |
| --- | --- |
| `user.message` | A user message with text content. |
| `user.interrupt` | Stop the agent mid-execution. |
| `user.custom_tool_result` | Response to a custom tool call from the agent. |
| `user.tool_confirmation` | Approve or deny an agent or MCP tool call when a permission policy requires confirmation. |
| `user.define_outcome` | Define an [outcome](/docs/en/managed-agents/define-outcomes) for the agent to work toward.  |

### Agent events

| Type | Description |
| --- | --- |
| `agent.message` | Agent response containing text content blocks. |
| `agent.thinking` | Agent thinking content, emitted separately from messages. |
| `agent.tool_use` | Agent invokes a pre-built agent tool (bash, file operations, and so on). |
| `agent.tool_result` | Result of a pre-built agent tool execution. |
| `agent.mcp_tool_use` | Agent invokes an MCP server tool. |
| `agent.mcp_tool_result` | Result of an MCP tool execution. |
| `agent.custom_tool_use` | Agent invokes one of your custom tools. Respond with a `user.custom_tool_result` event. |
| `agent.thread_context_compacted` | Conversation history was compacted to fit the context window. |
| `agent.thread_message_received` | In a [multiagent](/docs/en/managed-agents/multi-agent) session, an agent delivered its result to the coordinator. |
| `agent.thread_message_sent` | In a [multiagent](/docs/en/managed-agents/multi-agent) session, the coordinator sent a follow-up to another agent. |

### Session events

| Type | Description |
| --- | --- |
| `session.status_running` | Agent is actively processing. |
| `session.status_idle` | Agent finished its current task and is waiting for input. Includes a `stop_reason` indicating why the agent stopped. |
| `session.status_rescheduled` | A transient error occurred and the session is retrying automatically. |
| `session.status_terminated` | Session ended due to an unrecoverable error. |
| `session.error` | An error occurred during processing. Includes a typed `error` object with a `retry_status`. |
| `session.thread_created` | A [multiagent](/docs/en/managed-agents/multi-agent) thread was created. |
| `session.thread_status_running` | A [multiagent](/docs/en/managed-agents/multi-agent) thread started activity. |
| `session.thread_status_idle` | A [multiagent](/docs/en/managed-agents/multi-agent) thread finished its turn and is awaiting input. Includes `stop_reason`. |
| `session.thread_status_terminated` | A [multiagent](/docs/en/managed-agents/multi-agent) thread was archived or reached a terminal error. |

### Span events

Span events are observability markers that wrap activity for timing and usage tracking.

| Type | Description |
| --- | --- |
| `span.model_request_start` | A model inference call has started. |
| `span.model_request_end` | A model inference call has completed. Includes `model_usage` with token counts. |
| `span.outcome_evaluation_start` | [Outcome](/docs/en/managed-agents/define-outcomes) evaluation has started.  |
| `span.outcome_evaluation_ongoing` | Heartbeat during an ongoing [outcome](/docs/en/managed-agents/define-outcomes) evaluation.  |
| `span.outcome_evaluation_end` | [Outcome](/docs/en/managed-agents/define-outcomes) evaluation has completed.  |

Every event includes a `processed_at` timestamp indicating when the event was recorded server-side.

## Integrating events

### Sending events

Send a `user.message` event to start or continue the agent's work:

```python
client.beta.sessions.events.send(
    session.id,
    events=[
        {
            "type": "user.message",
            "content": [
                {
                    "type": "text",
                    "text": "Analyze the performance of the sort function in utils.py",
                },
            ],
        },
    ],
)
```

Send a `user.interrupt` event to stop the agent mid-execution, then follow up with a `user.message` event to redirect it:

```python
# Agent is currently analyzing a file...
# Interrupt with a new direction:
client.beta.sessions.events.send(
    session.id,
    events=[
        {"type": "user.interrupt"},
        {
            "type": "user.message",
            "content": [
                {
                    "type": "text",
                    "text": "Instead, focus on fixing the bug in line 42.",
                },
            ],
        },
    ],
)
```

### Streaming events

Stream events from the session to receive real-time updates as the agent works. Only events emitted after the stream is opened are delivered, so open the stream before sending events to avoid a race condition.

```python
# Open the stream first, then send the user message
with client.beta.sessions.events.stream(session.id) as stream:
    client.beta.sessions.events.send(
        session.id,
        events=[
            {
                "type": "user.message",
                "content": [{"type": "text", "text": "Summarize the repo README"}],
            },
        ],
    )

    for event in stream:
        match event.type:
            case "agent.message":
                for block in event.content:
                    if block.type == "text":
                        print(block.text, end="")
            case "session.status_idle":
                break
            case "session.error":
                msg = event.error.message if event.error else "unknown"
                print(f"\n[Error: {msg}]")
                break
```

To reconnect to an existing session without missing events, open a new stream and then list the full history to seed a set of seen event IDs. Tail the live stream while skipping any events already returned by the history list.

```python
with client.beta.sessions.events.stream(session.id) as stream:
    # Stream is open and buffering. List history before tailing live.
    seen_event_ids = {event.id for event in client.beta.sessions.events.list(session.id)}

    # Tail live events, skipping anything already seen
    for event in stream:
        if event.id in seen_event_ids:
            continue
        seen_event_ids.add(event.id)
        match event.type:
            case "agent.message":
                for block in event.content:
                    if block.type == "text":
                        print(block.text, end="")
            case "session.status_idle":
                break
```

### Listing past events

Retrieve the full event history for a session:

```python
events = client.beta.sessions.events.list(session.id)
for event in events.data:
    print(f"[{event.type}] {event.processed_at}")
```

Pass a `types` filter to return only specific event types:

```python
events = client.beta.sessions.events.list(
    session.id,
    types=["agent.tool_use", "agent.tool_result"],
)
```

## Additional scenarios

### Handling custom tool calls

When the agent invokes a [custom tool](/docs/en/managed-agents/tools#custom-tools):

1. The session emits an `agent.custom_tool_use` event containing the tool name and input.
2. The session pauses with a `session.status_idle` event containing `stop_reason: requires_action`. The blocking event IDs are in the `stop_reason.event_ids` array.
3. Execute the tool in your system and send a `user.custom_tool_result` event for each, passing the event ID in the `custom_tool_use_id` param along with the result content.
4. Once all blocking events are resolved, the session transitions back to `running`.

```python
with client.beta.sessions.events.stream(session.id) as stream:
    for event in stream:
        if event.type == "session.status_idle" and (stop := event.stop_reason):
            match stop.type:
                case "requires_action":
                    for event_id in stop.event_ids:
                        # Look up the custom tool use event and execute it
                        tool_event = events_by_id[event_id]
                        result = call_tool(tool_event.name, tool_event.input)

                        # Send the result back
                        client.beta.sessions.events.send(
                            session.id,
                            events=[
                                {
                                    "type": "user.custom_tool_result",
                                    "custom_tool_use_id": event_id,
                                    "content": [{"type": "text", "text": result}],
                                },
                            ],
                        )
                case "end_turn":
                    break
```

### Tool confirmation

When a [permission policy](/docs/en/managed-agents/permission-policies) requires confirmation before a tool executes:

1. The session emits an `agent.tool_use` or `agent.mcp_tool_use` event.
2. The session pauses with a `session.status_idle` event containing `stop_reason: requires_action`.
3. Send a `user.tool_confirmation` event for each, passing the event ID in the `tool_use_id` param. Set `result` to `"allow"` or `"deny"`.
4. Once all blocking events are resolved, the session transitions back to `running`.

```python
with client.beta.sessions.events.stream(session.id) as stream:
    for event in stream:
        if event.type == "session.status_idle" and (stop := event.stop_reason):
            match stop.type:
                case "requires_action":
                    for event_id in stop.event_ids:
                        # Approve the pending tool call
                        client.beta.sessions.events.send(
                            session.id,
                            events=[
                                {
                                    "type": "user.tool_confirmation",
                                    "tool_use_id": event_id,
                                    "result": "allow",
                                },
                            ],
                        )
                case "end_turn":
                    break
```

### Resuming an idle session

Sessions persist between interactions. Conversation history is preserved unless the session is explicitly deleted. When a session goes idle, its container is checkpointed, preserving the full container state.

<Note>
While session history is persisted until deleted, checkpoints are only preserved for 30 days after the session's last activity.
</Note>

To resume a session, send a `user.message` event to it as usual:

```python
# Resume a previously created session by ID
client.beta.sessions.events.send(
    "sesn_01...",
    events=[
        {
            "type": "user.message",
            "content": [
                {
                    "type": "text",
                    "text": "Now run the tests against the changes you made earlier.",
                },
            ],
        },
    ],
)
```

### Tracking usage

The session object includes a `usage` field with cumulative token statistics. Fetch the session after it goes idle to read the latest totals.

```json
{
  "id": "sesn_01...",
  "status": "idle",
  "usage": {
    "input_tokens": 5000,
    "output_tokens": 3200,
    "cache_creation_input_tokens": 2000,
    "cache_read_input_tokens": 20000
  }
}
```

## Console observability

The Console provides a visual timeline view of your agent sessions. Navigate to the Claude Managed Agents section in the Console to see:

- **Session list** - All sessions with their status, creation time, and model
- **Tracing view** - A chronological view of events (content, timestamps, token usage) within a session.
- **Tool execution** - Details of each tool call and its result

## Debugging tips

- **Check session events** - Session errors are conveyed through the `session.error` event
- **Review tool results** - Tool execution failures often explain unexpected agent behavior
- **Track token usage** - Monitor token consumption to optimize prompts and reduce costs
- **Use system prompts** - Add logging instructions to the system prompt to make the agent explain its reasoning
