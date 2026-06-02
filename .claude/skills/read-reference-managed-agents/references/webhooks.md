# Subscribe to webhooks

Get notified when major events happen without polling.

---

Sessions are long-running interactions. While most real-time interactions happen through the [SSE event stream](/docs/en/managed-agents/events-and-streaming), webhooks notify you of major state changes.

Webhook events return the event `type` and `id`, not the full object. When you receive a webhook event, you need to fetch the object directly with a `GET` call. This avoids delivering stale data on retries and keeps every delivery small.

## Supported event types

### Session events

| Event | Trigger |
| ----- | ------- |
| `session.status_run_started` | Agent execution kicked off. This triggers at every session status transition to `running`. |
| `session.status_idled` | Agent awaiting input, for example a tool permission approval or a new user message. |
| `session.status_rescheduled` | A transient error occurred and the session is retrying automatically. |
| `session.status_terminated` | The session hit a terminal error. |
| `session.thread_created` | New [multiagent thread](/docs/en/managed-agents/multi-agent) opened. |
| `session.thread_idled` | An agent in a [multiagent interaction](/docs/en/managed-agents/multi-agent) is waiting for input. |
| `session.thread_terminated` | A [multiagent thread](/docs/en/managed-agents/multi-agent) was archived. |
| `session.outcome_evaluation_ended` | [Outcome evaluation](/docs/en/managed-agents/define-outcomes) for a single iteration completed. |

### Vault events

| Event | Trigger |
| ----- | ------- |
| `vault.created` | Vault successfully created. |
| `vault.archived` | Vault archived. A `vault_credential.archived` event is also emitted for each underlying credential. |
| `vault.deleted` | Vault deleted. A `vault_credential.deleted` event is also emitted for each underlying credential. |
| `vault_credential.created` | Credential successfully created. |
| `vault_credential.archived` | Credential archived, either directly or as a result of vault archival. |
| `vault_credential.deleted` | Credential deleted, either directly or as a result of vault deletion. |
| `vault_credential.refresh_failed` | A `mcp_oauth` credential cannot be refreshed (invalid refresh token, or irrecoverable error from the OAuth server). |

## Register an endpoint

Visit **Manage > Webhooks** in [Console](https://platform.claude.com/settings/workspaces/default/webhooks).

A webhook endpoint consists of:

- **URL:** Must be HTTPS on port 443 with a publicly resolvable hostname.
- **Event types:** The list of `data.type` values this endpoint receives.
- **Signing secret:** A 32-byte `whsec_`-prefixed secret generated at creation. It's shown only once, so store it securely to verify webhook deliveries.

## Verify the signature

Every delivery carries an `X-Webhook-Signature` header. Use the SDK's `unwrap()` helper to verify the signature and parse the event in one step. It throws if the signature is invalid or the payload is more than five minutes old.

Set `ANTHROPIC_WEBHOOK_SIGNING_KEY` to the `whsec_`-prefixed secret shown at endpoint creation.

```python
from flask import Flask, request
import anthropic

client = anthropic.Anthropic()  # reads ANTHROPIC_WEBHOOK_SIGNING_KEY from env
app = Flask(__name__)


@app.route("/webhook", methods=["POST"])
def webhook():
    try:
        # unwrap() raises if the signature is invalid or the payload is stale
        event = client.beta.webhooks.unwrap(
            request.get_data(as_text=True),
            headers=dict(request.headers),
        )
    except Exception:
        return "invalid signature", 400

    if event.data.type == "session.status_idled":
        print("session idled:", event.data.id)
    # handle other event types

    return "", 200
```

## Handle an event

Parse the body, switch on `data.type`, and fetch the resource by ID. Return any `2xx` to acknowledge. Anything else (including `3xx`) counts as a failure and triggers a retry.

Every event payload has the same structure:

```json
{
  "type": "event",
  "id": "event_01ABC...",
  "created_at": "2026-03-18T14:05:22Z",
  "data": {
    "type": "session.status_idled",
    "id": "sesn_01XYZ...",
    "organization_id": "8a3d2f1e-...",
    "workspace_id": "c7b0e4d9-..."
  }
}
```

```python
if event.data.type == "session.status_idled":
    session = client.beta.sessions.retrieve(event.data.id)
    notify_user(session)
return "", 204
```

The top-level `event.id` is unique per event, not per delivery. If you receive the same `event.id` twice, it's a retry and you can discard it.

## Delivery behavior

- **Ordering is not guaranteed.** Use the `created_at` timestamp to sort if ordering matters.
- **Retries:** Anthropic retries at least once. The retry delivers the same `event.id`.
- **Redirects are not followed.** A `3xx` is treated as a failure. If your endpoint moves, update the URL in Console.
- **Auto-disable:** An endpoint is automatically set to `disabled` after roughly 20 consecutive failed deliveries, or immediately if the hostname resolves to a private IP or the endpoint returns a redirect.
