variable "account_id" {
  description = "Cloudflare account id (Alex@jadecli.com)."
  type        = string
}

variable "zone_id" {
  description = "Cloudflare zone id for the email domain."
  type        = string
}

variable "domain" {
  description = "Email domain (the zone name)."
  type        = string
  default     = "subagentknowledge.com"
}

variable "roles" {
  description = "All coworker + manager local-parts that each get an inbox address."
  type        = list(string)
  default = [
    # 12 coworkers (canonical)
    "product-management-coworker",
    "project-management-coworker",
    "design-coworker",
    "engineering-coworker",
    "data-coworker",
    "sales-coworker",
    "operations-coworker",
    "finance-coworker",
    "legal-coworker",
    "marketing-coworker",
    "agent-resources-coworker",
    "human-resources-coworker",
    # 5×3 manager tier (operator, product, project, finance, legal × manager/coworker/subagent)
    "operator-manager", "operator-coworker", "operator-subagent",
    "product-manager", "product-coworker", "product-subagent",
    "project-manager", "project-coworker", "project-subagent",
    "finance-manager", "finance-coworker", "finance-subagent",
    "legal-manager", "legal-coworker", "legal-subagent",
  ]
}
