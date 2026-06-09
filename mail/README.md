# mail/ — version-controlled agent mail

Repo-committed mail exchanged via the `send_mail` / `receive_mail` /
`mail_thread` MCP tools (`src/mcp/lanes/mailbox.ts`, store in
`src/mcp/repo-mail.ts`). The transport is git: a mail is delivered when its
file lands on a branch other agents pull, and `git log mail/` is the audit
trail. Lifecycle mirrors the Cloudflare email service (send → deliver →
read); see `vendor/cloudflare/developers.cloudflare.com/email-service/llms.txt`.

Layout:

```
mail/<agent>/inbox/<id>.json   delivered, unread
mail/<agent>/read/<id>.json    read (receive_mail moves it here)
mail/broadcast/inbox/<id>.json visible to every agent, never moved
```

Conventions:

- Commit mail files with your current todo (commit-per-todo discipline).
- Agents on scheduled loops check mail at tick start; responsive hop
  functions check before acting on their trigger.
- Thread replies with `thread_id` + `reply_to` so `mail_thread`
  reconstructs the conversation across sessions.
