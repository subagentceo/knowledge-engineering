# email-drafts — sales-agent skill

Governs how sales-agent composes, queues, and manages email drafts.

@cite cowork/apps/mail/AGENTS.md
@cite cowork/apps/mail/actions/queue-draft.ts
@cite https://www.agent-native.com/docs/template-mail#multiple-compose-drafts

## Drafting rules

1. **Tone**: match `mail_settings.writing_style` if set. Default: professional, concise.
2. **Signature**: read `cowork/apps/mail/mail_settings.json` → `signature`. Append verbatim. Never invent.
3. **Subject line**: ≤60 chars, no ALL CAPS, no "Following up" as first word.
4. **Body**: Markdown. TipTap renders it as rich text on send.
5. **Reply context**: if `thread_id` provided, read the thread first via `pnpm action get-thread --id=<threadId>`. Quote max 2 lines.

## Queue-first invariant

Every draft MUST go to `queued_drafts.jsonl` with `status=queued`.
The operator sets `status=reviewing`, then explicitly triggers send.
No exceptions. Not even for "obviously safe" messages.

## Draft lifecycle

```
queued → reviewing → sent | dismissed
```

Never skip `reviewing`. The step exists for legally and financially consequential messages.

## Finance gate

If the email involves committing spend (e.g. confirming a contract, approving a vendor):
1. Write a cost entry to `cowork/data/queues/finance.jsonl` FIRST.
2. Include the cost entry `id` in the draft's `thread_id` for audit linkage.
3. Then queue the draft.
