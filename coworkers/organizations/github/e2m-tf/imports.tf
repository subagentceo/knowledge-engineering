# Adopt the resources already created via the Cloudflare API (2026-06-20) so
# Terraform reconciles instead of recreating. Remove a block once adopted, or
# keep it — import blocks are idempotent.

import {
  to = module.agent_inbox.cloudflare_workers_kv_namespace.this[0]
  id = "e6294e3ea89f8207af387d459824aaae/4bcdd7b006cc42ba9bfebd9587ea5235"
}

import {
  to = module.agent_inbox.cloudflare_workers_script.this
  id = "e6294e3ea89f8207af387d459824aaae/agent-inbox"
}

import {
  to = module.role_email.cloudflare_email_routing_settings.this
  id = "3f820e0424fd375d5b6f86acaad0d5d7"
}

import {
  to = module.role_email.cloudflare_email_routing_rule.role["product-manager"]
  id = "3f820e0424fd375d5b6f86acaad0d5d7/17911df5ff654ea88a2f28f7e00c5e30"
}

import {
  to = module.role_email.cloudflare_email_routing_rule.role["project-manager"]
  id = "3f820e0424fd375d5b6f86acaad0d5d7/5e64d51170ab4224bddb3fc8d8ab0ac1"
}

import {
  to = module.role_email.cloudflare_email_routing_rule.role["legal-manager"]
  id = "3f820e0424fd375d5b6f86acaad0d5d7/53d2f368ec9840a0862961429bfd2a3f"
}

import {
  to = module.role_email.cloudflare_email_routing_rule.role["finance-manager"]
  id = "3f820e0424fd375d5b6f86acaad0d5d7/06838147ed4147529858e404429e8a00"
}

# Coworker + subagent tiers (added 2026-06-20).

import {
  to = module.role_email.cloudflare_email_routing_rule.role["product-coworker"]
  id = "3f820e0424fd375d5b6f86acaad0d5d7/8b773c9e42c6408d82d2713e246b29c2"
}

import {
  to = module.role_email.cloudflare_email_routing_rule.role["product-subagent"]
  id = "3f820e0424fd375d5b6f86acaad0d5d7/23eb157371a14dd4ae2ebebf21faf522"
}

import {
  to = module.role_email.cloudflare_email_routing_rule.role["project-coworker"]
  id = "3f820e0424fd375d5b6f86acaad0d5d7/546952de3a2b4684a5b2b1f396e600ac"
}

import {
  to = module.role_email.cloudflare_email_routing_rule.role["project-subagent"]
  id = "3f820e0424fd375d5b6f86acaad0d5d7/3776b6f56a2b435caee844cd46572ba2"
}

import {
  to = module.role_email.cloudflare_email_routing_rule.role["finance-coworker"]
  id = "3f820e0424fd375d5b6f86acaad0d5d7/d0ebfbfc1272467f96e34fa01b35f086"
}

import {
  to = module.role_email.cloudflare_email_routing_rule.role["finance-subagent"]
  id = "3f820e0424fd375d5b6f86acaad0d5d7/fb72ae6b7fe0414c9b64c0db5fd4bc57"
}

import {
  to = module.role_email.cloudflare_email_routing_rule.role["legal-coworker"]
  id = "3f820e0424fd375d5b6f86acaad0d5d7/e05e9dc2db0744b69624e406c541b6d1"
}

import {
  to = module.role_email.cloudflare_email_routing_rule.role["legal-subagent"]
  id = "3f820e0424fd375d5b6f86acaad0d5d7/72e42a9c87e048bf8a46791d91a772fa"
}

# Defensive component (deployed 2026-06-20, report-only).
import {
  to = cloudflare_workers_script.compliance
  id = "e6294e3ea89f8207af387d459824aaae/compliance-worker"
}
