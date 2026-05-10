provider "cloudflare" {
  # API token is read from CLOUDFLARE_API_TOKEN at runtime; left unconfigured
  # here so `terraform validate` and `terraform plan` work without
  # credentials in CI. Apply requires CLOUDFLARE_API_TOKEN to be exported.
}

# This skeleton intentionally declares NO data sources or resources. The
# zone is named by var.cloudflare_zone and is exposed as an output so
# downstream stacks can pin to it. To attach real resources (records,
# rulesets, workers), add a `data "cloudflare_zone" "this" { name = var.cloudflare_zone }`
# block in a sibling .tf file — that read DOES require CLOUDFLARE_API_TOKEN
# at plan time, so the verify:tf script keeps to validate + plan-without-data
# until credentials are wired.

output "zone_name" {
  value       = var.cloudflare_zone
  description = "Cloudflare zone name from var.cloudflare_zone (CLOUDFLARE_ZONE env)."
}

output "provider_version_pin" {
  value       = "~> 4.52"
  description = "Hardcoded to match $CLOUDFLARE_TERRAFORM_PROVIDER_VERSION; see versions.tf."
}
