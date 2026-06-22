# The API token is read from CLOUDFLARE_API_TOKEN at apply time. Never commit it.
# `terraform validate` works without it; `plan`/`apply` need it exported.
provider "cloudflare" {}
