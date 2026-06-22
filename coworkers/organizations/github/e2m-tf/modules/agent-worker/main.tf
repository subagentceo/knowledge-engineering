# A Worker (optionally email-enabled) plus an optional KV namespace.
# Reusable for any agent worker: mail, calendar, agent-inbox, ...

resource "cloudflare_workers_kv_namespace" "this" {
  count      = var.kv_binding == "" ? 0 : 1
  account_id = var.account_id
  title      = "${var.name}_${var.kv_binding}"
}

resource "cloudflare_workers_script" "this" {
  account_id          = var.account_id
  name                = var.name
  content             = file(var.script_file)
  module              = true
  compatibility_date  = var.compatibility_date
  compatibility_flags = var.compatibility_flags

  dynamic "kv_namespace_binding" {
    for_each = var.kv_binding == "" ? [] : [1]
    content {
      name         = var.kv_binding
      namespace_id = cloudflare_workers_kv_namespace.this[0].id
    }
  }
}
