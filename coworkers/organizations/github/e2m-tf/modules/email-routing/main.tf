# Enable Email Routing on the zone, then one rule per role address -> Worker.

resource "cloudflare_email_routing_settings" "this" {
  zone_id = var.zone_id
  enabled = true
}

resource "cloudflare_email_routing_rule" "role" {
  for_each = toset(var.roles)

  zone_id = var.zone_id
  name    = each.value
  enabled = true

  matcher {
    type  = "literal"
    field = "to"
    value = "${each.value}@${var.domain}"
  }

  action {
    type  = "worker"
    value = [var.worker_name]
  }

  depends_on = [cloudflare_email_routing_settings.this]
}
