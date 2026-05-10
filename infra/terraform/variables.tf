variable "cloudflare_zone" {
  description = "Cloudflare zone name (read from CLOUDFLARE_ZONE)."
  type        = string
  default     = "subagentceo.com"
}

variable "cloudflare_account_id" {
  description = "Cloudflare account id. Optional at plan time; required to apply."
  type        = string
  default     = ""
}
