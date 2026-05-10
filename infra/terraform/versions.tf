# Provider pin policy:
#   The pin string below MUST match $CLOUDFLARE_TERRAFORM_PROVIDER_VERSION
#   (currently "~> 4.52"). Terraform does not allow variable references in
#   `required_providers.version`, so this constraint is hardcoded; the env
#   var is the source of truth and CI re-renders this file from it before
#   `terraform init`. The plugin cache is shared via TF_PLUGIN_CACHE_DIR.

terraform {
  required_version = ">= 1.6.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.52"
    }
  }
}
