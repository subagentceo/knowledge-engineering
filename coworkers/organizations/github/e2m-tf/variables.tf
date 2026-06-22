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
  description = "Manager role local-parts that each get an inbox address."
  type        = list(string)
  default     = ["operator-manager", "operator-coworker", "operator-subagent", "product-manager", "product-coworker", "product-subagent", "project-manager", "project-coworker", "project-subagent", "finance-manager", "finance-coworker", "finance-subagent", "legal-manager", "legal-coworker", "legal-subagent"]
}
