#!/usr/bin/env python3
"""Apply the tags declared in resources.yaml to Cloudflare (GET -> merge -> PUT).

Requires:  CLOUDFLARE_API_TOKEN  (token with the *Tags* permission / Tag Admin)
Reads:     ../resources.yaml
Usage:     python3 apply_tags.py [--dry-run]
"""
import os, sys, json, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def load_yaml(path):
    import yaml  # pip install pyyaml
    with open(path) as fh:
        return yaml.safe_load(fh)

def api(method, path, token, body=None):
    url = "https://api.cloudflare.com/client/v4" + path
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", "Bearer " + token)
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read().decode())

def main():
    dry = "--dry-run" in sys.argv
    token = os.environ.get("CLOUDFLARE_API_TOKEN")
    if not token:
        sys.exit("set CLOUDFLARE_API_TOKEN (needs the Tags permission)")
    inv = load_yaml(os.path.join(ROOT, "resources.yaml"))
    acct = inv["account_id"]
    for r in inv["resources"]:
        rtype, rid, want = r["type"], r["id"], r["tags"]
        # GET current (beta: a never-tagged resource may 500 — treat as empty)
        cur = {}
        try:
            q = f"?resource_type={rtype}&resource_id={rid}"
            cur = (api("GET", f"/accounts/{acct}/tags{q}", token).get("result") or {}).get("tags", {})
        except urllib.error.HTTPError:
            cur = {}
        merged = {**cur, **want}
        print(("DRY " if dry else "PUT ") + f"{rtype}/{rid} -> {merged}")
        if not dry:
            api("PUT", f"/accounts/{acct}/tags", token,
                {"resource_type": rtype, "resource_id": rid, "tags": merged})
    print("done.")

if __name__ == "__main__":
    main()
