# The DEFENSIVE COMPONENT (organizations/cloudflare/compliance) under Terraform management —
# the safeguard follows the same rule it enforces.

resource "cloudflare_workers_script" "compliance" {
  account_id          = var.account_id
  name                = "compliance-worker"
  content             = file("${path.module}/workers/compliance-worker.js")
  module              = true
  compatibility_date  = "2025-06-01"
  compatibility_flags = ["nodejs_compat"]

  plain_text_binding {
    name = "MODE"
    text = "report" # report | quarantine | kill (kill also needs KILL_CONFIRM=yes)
  }
  plain_text_binding {
    name = "ACCOUNT_ID"
    text = var.account_id
  }
  kv_namespace_binding {
    name         = "INBOX"
    namespace_id = module.agent_inbox.kv_namespace_id
  }

  # CF_API_TOKEN (Workers Read + Email Send [+ Workers Edit to kill]) is a SECRET — sourced from
  # durable-vault-store, NOT `wrangler secret put` by hand, and NOT declared here (so it never lands in
  # Terraform state). Flow: agent requests credentialKey=CF_API_TOKEN for appId=compliance-worker -> admin
  # grants -> the vault syncs it onto this Worker as the env.CF_API_TOKEN secret binding.
  # See apps/agent-native/packages/dispatch (request-vault-secret / approve-vault-request / sync-vault-to-app).
}

resource "cloudflare_workers_cron_trigger" "compliance" {
  account_id  = var.account_id
  script_name = cloudflare_workers_script.compliance.name
  schedules   = ["0 */6 * * *"]
}
