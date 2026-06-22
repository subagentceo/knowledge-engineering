#!/usr/bin/env python3
"""Fail if any inventoried resource is missing a required tag key. CI gate for the policy."""
import os, sys, json, urllib.request, urllib.error, yaml

REQUIRED = {"managed-by", "app", "env", "e2m-plane", "domain", "team"}
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def main():
    token = os.environ.get("CLOUDFLARE_API_TOKEN") or sys.exit("set CLOUDFLARE_API_TOKEN")
    inv = yaml.safe_load(open(os.path.join(ROOT, "resources.yaml")))
    acct = inv["account_id"]
    bad = 0
    for r in inv["resources"]:
        q = f"?resource_type={r['type']}&resource_id={r['id']}"
        req = urllib.request.Request(
            f"https://api.cloudflare.com/client/v4/accounts/{acct}/tags{q}",
            headers={"Authorization": "Bearer " + token})
        try:
            tags = (json.loads(urllib.request.urlopen(req).read()).get("result") or {}).get("tags", {})
        except urllib.error.HTTPError:
            tags = {}
        missing = REQUIRED - set(tags)
        if missing:
            bad += 1
            print(f"NON-COMPLIANT {r['type']}/{r['id']} missing {sorted(missing)}")
    sys.exit(1 if bad else 0)

if __name__ == "__main__":
    main()
