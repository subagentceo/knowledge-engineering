# Reusable infrastructure-as-code for the e2m agent email plane.
#
# Two modules, composed:
#   1. agent-worker   — uploads the inbox Worker (email handler) + a KV queue.
#   2. email-routing  — enables Email Routing on the zone and points each role
#                       address at that Worker.
#
# This reproduces, as code, the setup first created by hand via the Cloudflare
# API. The import blocks in imports.tf adopt those live resources so the first
# `terraform plan` reconciles instead of recreating.

module "agent_inbox" {
  source             = "./modules/agent-worker"
  account_id         = var.account_id
  name               = "agent-inbox"
  script_file        = "${path.module}/workers/agent-inbox.js"
  kv_binding         = "INBOX"
  compatibility_date = "2025-06-01"
}

module "role_email" {
  source      = "./modules/email-routing"
  zone_id     = var.zone_id
  domain      = var.domain
  worker_name = module.agent_inbox.script_name
  roles       = var.roles
}
