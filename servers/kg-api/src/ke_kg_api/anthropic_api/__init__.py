"""
ke_kg_api.anthropic_api — Pydantic mirrors of the canonical Anthropic API types.

The shapes in this package replicate exactly what's documented under
vendor/anthropics/platform.claude.com/docs/en/api/ so we never reinvent
data structures the SDK already defines. When the canonical doc changes,
these models update in lockstep.

Surfaces:
  messages         — POST /v1/messages (synchronous and streaming)
  messages.batches — POST /v1/messages/batches
  beta.messages    — beta header variant of messages
  beta.agents      — POST /v1/agents (Managed Agents)
  beta.sessions    — POST /v1/sessions
  beta.environments / files / memory_stores / skills / vaults / webhooks
  admin            — /v1/organizations/* (api_keys, users, workspaces, ...)
  admin.usage_report / cost_report
  compliance       — /v1/compliance/* (activities, apps, groups, organizations)
  models           — /v1/models

@cite vendor/anthropics/platform.claude.com/docs/en/api/
"""
