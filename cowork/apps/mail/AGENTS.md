# cowork/apps/mail — Agent Guide

Mail is the cowork/ outreach and communication surface. It extends e2m-mcp so every
draft, send request, and finance cost entry flows through the typed JSONL queue system
rather than being executed immediately.

This guide adapts the agent-native mail pattern (https://www.agent-native.com/docs/template-mail,
https://github.com/BuilderIO/agent-native/templates/mail/AGENTS.md) to the
knowledge-engineering design system and e2m-mcp mailbox.

@cite cowork/mcp/e2m-mcp/server.ts            (mailbox_send, envelope_write)
@cite cowork/agents/skills/sales-agent/SKILL.md
@cite cowork/agents/manifest.json
@cite https://www.agent-native.com/docs/template-mail
@cite https://raw.githubusercontent.com/BuilderIO/agent-native/main/templates/mail/AGENTS.md

## Core Rules (from agent-native, adapted)

- **Never send mail without operator approval.** Always write to `queued_drafts.jsonl` first.
- **Teammate/Slack-originated requests:** queue via `mailbox_send` type=task to sales-agent.
  The operator reviews at cowork/apps/mail/queued_drafts.jsonl and explicitly sends.
- **Finance tracking:** every third-party cost must be appended to `cowork/data/queues/finance.jsonl`
  via `envelope_write` domain=finance before the service is provisioned.
- **No API keys.** OAuth-only. `ANTHROPIC_API_KEY` is forbidden everywhere.
- **After any mutation**, route outcome to product-management-coworker mailbox via `mailbox_send` type=outcome.

## Application State

| Key | What it holds |
|---|---|
| `compose-{id}` | Open draft tabs — subject, body_md, to, thread_id |
| `navigation`   | Active view: inbox \| drafts \| sent \| finance |
| `navigate`     | One-shot navigation command consumed by the UI |

## Mailbox Bridge

The e2m-mcp mailbox IS the communication channel between cowork/ agents and mail:

```
product-management-coworker ──mailbox_send(type=task)──► sales-agent mailbox
sales-agent ──reads mailbox──► queues draft in queued_drafts.jsonl
operator ──reviews──► explicitly calls send action
sales-agent ──mailbox_send(type=outcome)──► product-management-coworker mailbox
```

## Skills

- `email-drafts.md`   — composing, signature, reply style, scheduling
- `draft-queue.md`    — queued draft review workflow
- `finance-track.md`  — third-party cost entry pattern

## Data Model

| File | What it holds |
|---|---|
| `cowork/apps/mail/queued_drafts.jsonl` | Drafts awaiting operator review/send |
| `cowork/apps/mail/mail_settings.json`  | Signature, tracking prefs, aliases |
| `cowork/data/queues/finance.jsonl`     | Third-party costs (vendor, amount, date) |
| `cowork/data/queues/sales.jsonl`       | Sales task queue |
| `cowork/data/mailbox/sales-agent.jsonl`| Sales agent inbox |

## Draft Schema

```json
{
  "id": "<uuidv4>",
  "to": "recipient@example.com",
  "cc": [],
  "subject": "...",
  "body_md": "... markdown ...",
  "status": "queued",
  "requested_by": "product-management-coworker | operator | slack",
  "queued_at": "<ISO-8601>",
  "thread_id": "<optional — reply context>"
}
```

Draft `status` lifecycle: `queued` → `reviewing` → `sent` | `dismissed`
Never jump from `queued` to `sent` without operator touching `status=reviewing` first.
