# `compliance/` — defensive component

`compliance-worker` enforces `../POLICY.md`: it scans for Cloudflare resources created outside `e2m-tf`,
alerts the responsible `*-manager`, and acts per `MODE` (report → quarantine → kill, kill gated).

- **Process + rollout + arming:** `PROCESS.md`.
- **Worker source:** `compliance-worker.js` (deployed report-only; cron every 6h).
- **Governed by Terraform:** declared in `coworkers/organizations/github/e2m-tf` (the safeguard follows the
  rule it enforces) and listed in `../resources.yaml`.
- **Adoption tool:** `cf-terraforming` (`https://github.com/cloudflare/cf-terraforming`) brings the 44
  pre-policy workers into `e2m-tf` before enforcement is armed.
