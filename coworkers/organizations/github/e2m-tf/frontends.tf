# plan-frontend: the Agent-Native Plan template as a Cloudflare frontend worker, created via Terraform
# (dogfooding the e2m-tf creation path). The live build is a shell; the React-Router SSR build promotes
# via CI. Source app: apps/agent-native/templates/plan.

module "plan_frontend" {
  source      = "./modules/agent-worker"
  account_id  = var.account_id
  name        = "plan-frontend"
  script_file = "${path.module}/workers/plan-frontend.js"
}

resource "cloudflare_workers_domain" "plan" {
  account_id  = var.account_id
  hostname    = "plan.subagentknowledge.com"
  service     = module.plan_frontend.script_name
  zone_id     = var.zone_id
  environment = "production"
}
