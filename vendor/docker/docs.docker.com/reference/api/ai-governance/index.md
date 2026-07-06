# Docker AI Governance API

HTTP API reference for managing Docker AI Governance policies and rules programmatically.

- **Version**: `1`
- **Base URL**: `https://hub.docker.com/v2`

- **OpenAPI specification**: [`api.yaml`](https://docs.docker.com/reference/api/ai-governance/api.yaml)

HTTP+JSON API for managing Docker governance policies and rules.

**Resource model.** An organization owns one or more policies. Each policy
contains a list of rules grouped into a single domain: either `network` or
`filesystem`. A policy's domain is derived from its rule actions; mixing
domains within a single policy is not permitted.

**Lifecycle.** Create a policy with CreatePolicy, then add rules with
CreateRule. Rules can be updated in place with UpdateRule or removed with
DeleteRule. Deleting all rules does not delete the policy itself.

**Rule evaluation.** All rules in a policy are tested against every request.
`deny` always wins: if any rule matches with `decision: deny`, the request
is denied regardless of any `allow` rules.

**Enforcement.** Organization policies take precedence over local sandbox
policies and cannot be overridden by individual users.

**Propagation.** Policy changes take up to five minutes to reach developer
machines after being written.

See https://docs.docker.com/ai/sandboxes/governance/ for product
documentation.



## Authentication


**`bearerAuth`** — type: `http`, scheme: `bearer`, bearer format: `JWT`

Short-lived JWT obtained by exchanging Docker Hub credentials at
`POST https://hub.docker.com/v2/auth/token`. Pass the JWT in the
`Authorization: Bearer <token>` header. Tokens expire after a short
period; request a fresh one when you receive a `401`.

The `password` field of the token request accepts any of the following
credential types:

| Type | Format | Notes |
|------|--------|-------|
| Password | Plain text | Your Docker Hub account password. |
| Personal Access Token (PAT) | `dckr_pat_*` | Recommended over passwords. Create one under Account Settings → Security. |
| Organization Access Token (OAT) | `dckr_oat_*` | Scoped to an organization. Create one under Organization Settings → Access Tokens. |

PAT and OAT strings can't be used directly as a bearer token. They must
be exchanged at the token endpoint first.

See [Docker Hub authentication](https://docs.docker.com/reference/api/hub/latest/#tag/authentication-api/operation/AuthCreateAccessToken)
for full details.


## Policies

Policy lifecycle management
### `GET` `/orgs/{org_name}/governance/policies`

**List policies**

Returns a shallow summary of all policies for the org. The rule set is not included; use GetPolicy to fetch the full object.

**Parameters**

- `org_name` (path, string, required) — Docker Hub organization name.

**Responses**


`200` — Object wrapping an array of policy summaries under `data`. Rule sets are not included; use GetPolicy to fetch a full policy.



```json
{
  "data": [
    {
      "created_at": "2026-04-22T00:00:00Z",
      "id": "pol_06evsmp24r1pg71cm8500546pkbn",
      "name": "Security Research — hardened",
      "org": "my-org",
      "scope": {
        "teams": [
          "d290f1ee-6c54-4b01-90e6-d701748f0851"
        ]
      },
      "type": "allowlist_v0",
      "updated_at": "2026-04-22T00:00:00Z"
    }
  ]
}
```


`401` — Missing or invalid credentials

Schema: `Error`

```json
{
  "error": {
    "code": "unauthenticated",
    "message": "unauthenticated"
  }
}
```


`403` — Caller lacks the required permission for this org, or the org is not entitled to use governance.

Schema: `Error`

```json
{
  "error": {
    "code": "permission_denied",
    "message": "permission denied"
  }
}
```


`404` — Not found

Schema: `Error`

```json
{
  "error": {
    "code": "not_found",
    "message": "policy not found"
  }
}
```


`500` — Internal server error

Schema: `Error`

```json
{
  "error": {
    "code": "internal",
    "message": "internal error"
  }
}
```



### `POST` `/orgs/{org_name}/governance/policies`

**Create policy**

Creates a new policy with an empty rule set. Rules are added separately via the rules sub-resource.

**Parameters**

- `org_name` (path, string, required) — Docker Hub organization name.

**Request body** — Policy name and optional scope.
Content type: `application/json`

Schema: `CreatePolicyRequest`

```json
{
  "name": "Security Research — hardened",
  "scope": {
    "teams": [
      "d290f1ee-6c54-4b01-90e6-d701748f0851"
    ]
  }
}
```

**Responses**


`201` — Policy created. Returns the new policy without its rule set.

Schema: `Policy`

```json
{
  "created_at": "2026-04-22T00:00:00Z",
  "id": "pol_06evsmp24r1pg71cm8500546pkbn",
  "name": "Security Research — hardened",
  "org": "my-org",
  "scope": {
    "teams": [
      "d290f1ee-6c54-4b01-90e6-d701748f0851"
    ]
  },
  "updated_at": "2026-04-22T00:00:00Z"
}
```


`400` — Bad request

Schema: `Error`

```json
{
  "error": {
    "code": "invalid_argument",
    "message": "name is required"
  }
}
```


`401` — Missing or invalid credentials

Schema: `Error`

```json
{
  "error": {
    "code": "unauthenticated",
    "message": "unauthenticated"
  }
}
```


`403` — Caller lacks the required permission for this org, the org is not entitled to use governance (`permission_denied`), or a creation limit has been reached (`limit_exceeded`): the org already has the maximum number of policies, or the policy already has the maximum number of rules.

Schema: `Error`

```json
{
  "error": {
    "code": "limit_exceeded",
    "message": "organization has reached the maximum of 100 policies"
  }
}
```

```json
{
  "error": {
    "code": "permission_denied",
    "message": "permission denied"
  }
}
```


`404` — Not found

Schema: `Error`

```json
{
  "error": {
    "code": "not_found",
    "message": "policy not found"
  }
}
```


`409` — Conflict

Schema: `Error`

```json
{
  "error": {
    "code": "conflict",
    "message": "policy name already in use"
  }
}
```


`500` — Internal server error

Schema: `Error`

```json
{
  "error": {
    "code": "internal",
    "message": "internal error"
  }
}
```



### `GET` `/orgs/{org_name}/governance/policies/{policy_id}`

**Get policy**

Returns the full policy including its `allowlist_v0` rule set.
**Parameters**

- `org_name` (path, string, required) — Docker Hub organization name.
- `policy_id` (path, string, required) — Unique policy identifier.

**Responses**


`200` — Full policy including its `allowlist_v0` rule set.

Schema: `Policy`

```json
{
  "allowlist_v0": {
    "domain": "network",
    "rules": [
      {
        "actions": [
          "connect:tcp",
          "connect:udp"
        ],
        "decision": "allow",
        "id": "rule_06evsm9qjm1pdsk0a8nkfaxy7jna",
        "name": "allow research mirrors",
        "resources": [
          "research.mitre.org",
          "cve.mitre.org"
        ]
      }
    ]
  },
  "created_at": "2026-04-22T00:00:00Z",
  "id": "pol_06evsmp24r1pg71cm8500546pkbn",
  "name": "Security Research — hardened",
  "org": "my-org",
  "scope": {
    "teams": [
      "d290f1ee-6c54-4b01-90e6-d701748f0851"
    ]
  },
  "updated_at": "2026-04-22T00:00:00Z"
}
```


`401` — Missing or invalid credentials

Schema: `Error`

```json
{
  "error": {
    "code": "unauthenticated",
    "message": "unauthenticated"
  }
}
```


`403` — Caller lacks the required permission for this org, or the org is not entitled to use governance.

Schema: `Error`

```json
{
  "error": {
    "code": "permission_denied",
    "message": "permission denied"
  }
}
```


`404` — Not found

Schema: `Error`

```json
{
  "error": {
    "code": "not_found",
    "message": "policy not found"
  }
}
```


`500` — Internal server error

Schema: `Error`

```json
{
  "error": {
    "code": "internal",
    "message": "internal error"
  }
}
```



### `PATCH` `/orgs/{org_name}/governance/policies/{policy_id}`

**Update policy**

Partially updates a policy's metadata. Only fields present in the
request body are updated; absent fields are left unchanged. The `scope`
object is patched per sub-field: sending `teams` replaces that list,
while an omitted sub-field is left untouched and an empty list clears
it (org-wide).

The rule set is not modified here — use the rule endpoints for that.
At least one field must be present. Returns the policy in both its old
and new states. Changes may take up to five minutes to reach developer
machines.

**Parameters**

- `org_name` (path, string, required) — Docker Hub organization name.
- `policy_id` (path, string, required) — Unique policy identifier.

**Request body** — Fields to update. Absent fields are left unchanged.
Content type: `application/json`

Schema: `UpdatePolicyRequest`

```json
{
  "name": "Security Research"
}
```

```json
{
  "scope": {
    "teams": [
      "d290f1ee-6c54-4b01-90e6-d701748f0851"
    ]
  }
}
```

**Responses**


`200` — Policy updated, returns old and new states.

Schema: `UpdatePolicyResponse`

```json
{
  "new": {
    "allowlist_v0": {
      "domain": "network",
      "rules": [
        {
          "actions": [
            "connect:tcp",
            "connect:udp"
          ],
          "decision": "allow",
          "id": "rule_06evsm9qjm1pdsk0a8nkfaxy7jna",
          "name": "allow research mirrors",
          "resources": [
            "research.mitre.org",
            "cve.mitre.org"
          ]
        }
      ]
    },
    "created_at": "2026-04-22T00:00:00Z",
    "id": "pol_06evsmp24r1pg71cm8500546pkbn",
    "name": "Security Research",
    "org": "my-org",
    "scope": {
      "teams": [
        "d290f1ee-6c54-4b01-90e6-d701748f0851"
      ]
    },
    "updated_at": "2026-04-22T10:00:00Z"
  },
  "old": {
    "allowlist_v0": {
      "domain": "network",
      "rules": [
        {
          "actions": [
            "connect:tcp",
            "connect:udp"
          ],
          "decision": "allow",
          "id": "rule_06evsm9qjm1pdsk0a8nkfaxy7jna",
          "name": "allow research mirrors",
          "resources": [
            "research.mitre.org",
            "cve.mitre.org"
          ]
        }
      ]
    },
    "created_at": "2026-04-22T00:00:00Z",
    "id": "pol_06evsmp24r1pg71cm8500546pkbn",
    "name": "Security Research — hardened",
    "org": "my-org",
    "scope": {
      "teams": [
        "d290f1ee-6c54-4b01-90e6-d701748f0851"
      ]
    },
    "updated_at": "2026-04-22T00:00:00Z"
  }
}
```


`400` — Bad request

Schema: `Error`

```json
{
  "error": {
    "code": "invalid_argument",
    "message": "name is required"
  }
}
```


`401` — Missing or invalid credentials

Schema: `Error`

```json
{
  "error": {
    "code": "unauthenticated",
    "message": "unauthenticated"
  }
}
```


`403` — Caller lacks the required permission for this org, the org is not entitled to use governance (`permission_denied`), or a creation limit has been reached (`limit_exceeded`): the org already has the maximum number of policies, or the policy already has the maximum number of rules.

Schema: `Error`

```json
{
  "error": {
    "code": "limit_exceeded",
    "message": "organization has reached the maximum of 100 policies"
  }
}
```

```json
{
  "error": {
    "code": "permission_denied",
    "message": "permission denied"
  }
}
```


`404` — Not found

Schema: `Error`

```json
{
  "error": {
    "code": "not_found",
    "message": "policy not found"
  }
}
```


`409` — Conflict

Schema: `Error`

```json
{
  "error": {
    "code": "conflict",
    "message": "policy name already in use"
  }
}
```


`500` — Internal server error

Schema: `Error`

```json
{
  "error": {
    "code": "internal",
    "message": "internal error"
  }
}
```



### `DELETE` `/orgs/{org_name}/governance/policies/{policy_id}`

**Delete policy**

Permanently deletes the policy and its rule set. Returns the deleted
policy as a courtesy; its `updated_at` is unchanged by the deletion.
Changes may take up to five minutes to reach developer machines.

**Parameters**

- `org_name` (path, string, required) — Docker Hub organization name.
- `policy_id` (path, string, required) — Unique policy identifier.

**Responses**


`200` — Policy deleted, returns the deleted policy.

Schema: `DeletePolicyResponse`

```json
{
  "deleted": {
    "allowlist_v0": {
      "domain": "network",
      "rules": [
        {
          "actions": [
            "connect:tcp",
            "connect:udp"
          ],
          "decision": "allow",
          "id": "rule_06evsm9qjm1pdsk0a8nkfaxy7jna",
          "name": "allow research mirrors",
          "resources": [
            "research.mitre.org",
            "cve.mitre.org"
          ]
        }
      ]
    },
    "created_at": "2026-04-22T00:00:00Z",
    "id": "pol_06evsmp24r1pg71cm8500546pkbn",
    "name": "Security Research — hardened",
    "org": "my-org",
    "scope": {
      "teams": [
        "d290f1ee-6c54-4b01-90e6-d701748f0851"
      ]
    },
    "updated_at": "2026-04-22T00:00:00Z"
  }
}
```


`401` — Missing or invalid credentials

Schema: `Error`

```json
{
  "error": {
    "code": "unauthenticated",
    "message": "unauthenticated"
  }
}
```


`403` — Caller lacks the required permission for this org, or the org is not entitled to use governance.

Schema: `Error`

```json
{
  "error": {
    "code": "permission_denied",
    "message": "permission denied"
  }
}
```


`404` — Not found

Schema: `Error`

```json
{
  "error": {
    "code": "not_found",
    "message": "policy not found"
  }
}
```


`500` — Internal server error

Schema: `Error`

```json
{
  "error": {
    "code": "internal",
    "message": "internal error"
  }
}
```



## Rules

Rule management within an allowlist policy
### `POST` `/orgs/{org_name}/governance/policies/{policy_id}/rules`

**Create rule**

Adds a rule to the policy's rule set. All rules in a policy must share
the same domain (network or filesystem); mixing domains is rejected.

**Network** actions: `connect:tcp`, `connect:udp`. Resources are
hostnames (for example, `example.com`), wildcard subdomains (`*.example.com`
for one level, `**.example.com` for any depth), hostnames with an optional
port (for example, `example.com:443`), or CIDRs in IPv4 or IPv6 notation
(for example, `10.0.0.0/8` or `2001:db8::/32`).

**Filesystem** actions: `read`, `write`. Resources are paths (for example,
`/data`). Use `*` to match within a single path segment and `**` to match
recursively across segments (for example, `/data/**`).

Changes may take up to five minutes to reach developer machines.

**Parameters**

- `org_name` (path, string, required) — Docker Hub organization name.
- `policy_id` (path, string, required) — Unique policy identifier.

**Request body** — Rule definition including actions, resources, and decision.
Content type: `application/json`

Schema: `CreateRuleRequest`

```json
{
  "actions": [
    "read",
    "write"
  ],
  "decision": "allow",
  "name": "allow data directory",
  "resources": [
    "/data"
  ]
}
```

```json
{
  "actions": [
    "connect:tcp",
    "connect:udp"
  ],
  "decision": "allow",
  "name": "allow research mirrors",
  "resources": [
    "research.mitre.org",
    "cve.mitre.org"
  ]
}
```

**Responses**


`201` — Rule created and added to the policy's rule set.

Schema: `Rule`

```json
{
  "actions": [
    "read",
    "write"
  ],
  "decision": "allow",
  "id": "rule_07fwtnr0kn2qetl1b9olfbyz8kob",
  "name": "allow data directory",
  "resources": [
    "/data"
  ]
}
```

```json
{
  "actions": [
    "connect:tcp",
    "connect:udp"
  ],
  "decision": "allow",
  "id": "rule_06evsm9qjm1pdsk0a8nkfaxy7jna",
  "name": "allow research mirrors",
  "resources": [
    "research.mitre.org",
    "cve.mitre.org"
  ]
}
```


`400` — Bad request

Schema: `Error`

```json
{
  "error": {
    "code": "invalid_argument",
    "message": "name is required"
  }
}
```


`401` — Missing or invalid credentials

Schema: `Error`

```json
{
  "error": {
    "code": "unauthenticated",
    "message": "unauthenticated"
  }
}
```


`403` — Caller lacks the required permission for this org, the org is not entitled to use governance (`permission_denied`), or a creation limit has been reached (`limit_exceeded`): the org already has the maximum number of policies, or the policy already has the maximum number of rules.

Schema: `Error`

```json
{
  "error": {
    "code": "limit_exceeded",
    "message": "organization has reached the maximum of 100 policies"
  }
}
```

```json
{
  "error": {
    "code": "permission_denied",
    "message": "permission denied"
  }
}
```


`404` — Not found

Schema: `Error`

```json
{
  "error": {
    "code": "not_found",
    "message": "policy not found"
  }
}
```


`409` — Conflict

Schema: `Error`

```json
{
  "error": {
    "code": "conflict",
    "message": "policy name already in use"
  }
}
```


`500` — Internal server error

Schema: `Error`

```json
{
  "error": {
    "code": "internal",
    "message": "internal error"
  }
}
```



### `PATCH` `/orgs/{org_name}/governance/policies/{policy_id}/rules/{rule_id}`

**Update rule**

Partially updates a rule. Only fields present in the request body are
updated; absent fields are left unchanged. Returns the rule in both its
old and new states.

Changing `actions` across domains (for example, from network actions to
filesystem actions) is rejected. Changes may take up to five minutes to
reach developer machines.

**Parameters**

- `org_name` (path, string, required) — Docker Hub organization name.
- `policy_id` (path, string, required) — Unique policy identifier.
- `rule_id` (path, string, required) — Unique rule identifier within the policy.

**Request body** — Fields to update. Absent fields are left unchanged.
Content type: `application/json`

Schema: `UpdateRuleRequest`

```json
{
  "resources": [
    "research.mitre.org"
  ]
}
```

**Responses**


`200` — Rule updated, returns old and new states.

Schema: `UpdateRuleResponse`

```json
{
  "new": {
    "actions": [
      "connect:tcp",
      "connect:udp"
    ],
    "decision": "allow",
    "id": "rule_06evsm9qjm1pdsk0a8nkfaxy7jna",
    "name": "allow research mirrors",
    "resources": [
      "research.mitre.org"
    ]
  },
  "old": {
    "actions": [
      "connect:tcp",
      "connect:udp"
    ],
    "decision": "allow",
    "id": "rule_06evsm9qjm1pdsk0a8nkfaxy7jna",
    "name": "allow research mirrors",
    "resources": [
      "research.mitre.org",
      "cve.mitre.org"
    ]
  }
}
```


`400` — Bad request

Schema: `Error`

```json
{
  "error": {
    "code": "invalid_argument",
    "message": "name is required"
  }
}
```


`401` — Missing or invalid credentials

Schema: `Error`

```json
{
  "error": {
    "code": "unauthenticated",
    "message": "unauthenticated"
  }
}
```


`403` — Caller lacks the required permission for this org, or the org is not entitled to use governance.

Schema: `Error`

```json
{
  "error": {
    "code": "permission_denied",
    "message": "permission denied"
  }
}
```


`404` — Not found

Schema: `Error`

```json
{
  "error": {
    "code": "not_found",
    "message": "policy not found"
  }
}
```


`409` — Conflict

Schema: `Error`

```json
{
  "error": {
    "code": "conflict",
    "message": "policy name already in use"
  }
}
```


`500` — Internal server error

Schema: `Error`

```json
{
  "error": {
    "code": "internal",
    "message": "internal error"
  }
}
```



### `DELETE` `/orgs/{org_name}/governance/policies/{policy_id}/rules/{rule_id}`

**Delete rule**

Deletes a rule from the policy. Returns the deleted rule. Changes may
take up to five minutes to reach developer machines.

**Parameters**

- `org_name` (path, string, required) — Docker Hub organization name.
- `policy_id` (path, string, required) — Unique policy identifier.
- `rule_id` (path, string, required) — Unique rule identifier within the policy.

**Responses**


`200` — Rule deleted, returns the deleted rule.

Schema: `DeleteRuleResponse`

```json
{
  "deleted": {
    "actions": [
      "connect:tcp",
      "connect:udp"
    ],
    "decision": "allow",
    "id": "rule_06evsm9qjm1pdsk0a8nkfaxy7jna",
    "name": "allow research mirrors",
    "resources": [
      "research.mitre.org",
      "cve.mitre.org"
    ]
  }
}
```


`401` — Missing or invalid credentials

Schema: `Error`

```json
{
  "error": {
    "code": "unauthenticated",
    "message": "unauthenticated"
  }
}
```


`403` — Caller lacks the required permission for this org, or the org is not entitled to use governance.

Schema: `Error`

```json
{
  "error": {
    "code": "permission_denied",
    "message": "permission denied"
  }
}
```


`404` — Not found

Schema: `Error`

```json
{
  "error": {
    "code": "not_found",
    "message": "policy not found"
  }
}
```


`500` — Internal server error

Schema: `Error`

```json
{
  "error": {
    "code": "internal",
    "message": "internal error"
  }
}
```



## Schemas


### `AllowlistV0`

Network or filesystem allowlist containing a list of rules. Present on
Policy when `PolicySummary.type` is `allowlist_v0`; omitted when the
policy has no rules yet. All rules in an allowlist share the same domain.
All rules are evaluated on every request: `deny` always wins over `allow`.


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `domain` | `string` | no | The access-control domain shared by all rules in this allowlist. Derived from rule actions: network actions (`connect:tcp`, `connect:udp`) produce `network`; filesystem actions (`read`, `write`) produce `filesystem`. Present when `rules` is non-empty; absent when the allowlist has no rules. |
| `rules` | `array<``Rule``>` | yes |  |


### `CreatePolicyRequest`

Fields required to create a new policy.


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `name` | `string` | yes | Policy name, unique within the organization. |
| `scope` | `Scope` | no |  |


### `CreateRuleRequest`

Fields required to create a new rule within a policy's rule set.


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `actions` | `RuleActions` | yes |  |
| `decision` | `RuleDecision` | yes |  |
| `name` | `string` | yes | Human-readable label for the rule. |
| `resources` | `RuleResources` | yes |  |


### `DeletePolicyResponse`

The full deleted policy.


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `deleted` | `Policy` | yes |  |


### `DeleteRuleResponse`

The deleted rule.


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `deleted` | `Rule` | yes |  |


### `Error`

Error envelope returned on all non-2xx responses.


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `error` | `object` | yes | Error detail. |


### `Policy`

Full policy representation including the allowlist rule set.


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `allowlist_v0` | `AllowlistV0` | no |  |
| `created_at` | `string` | yes |  |
| `id` | `string` | yes |  |
| `name` | `string` | yes | Human-readable label, unique within the organization. |
| `org` | `string` | yes |  |
| `scope` | `Scope` | yes |  |
| `updated_at` | `string` | yes |  |


### `PolicySummary`

Shallow policy representation returned by ListPolicies. Excludes the rule set.


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `created_at` | `string` | yes |  |
| `id` | `string` | yes |  |
| `name` | `string` | yes | Human-readable label, unique within the organization. |
| `org` | `string` | yes |  |
| `scope` | `Scope` | yes |  |
| `type` | `string` | yes | Identifies the rule-set format. Always `allowlist_v0`, corresponding to the `allowlist_v0` property on the full Policy object. |
| `updated_at` | `string` | yes |  |


### `Rule`

A single allow or deny rule within an allowlist policy.


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `actions` | `RuleActions` | yes |  |
| `decision` | `RuleDecision` | yes |  |
| `id` | `string` | yes |  |
| `name` | `string` | yes | Human-readable label for the rule. |
| `resources` | `RuleResources` | yes |  |


### `RuleActions`

Network actions: `connect:tcp`, `connect:udp`. Filesystem actions: `read`, `write`. All actions in a rule must belong to the same domain; mixing network and filesystem actions in one rule is rejected.


### `RuleDecision`

Outcome applied when this rule matches a request. `deny` always wins: if any rule in the policy matches with `decision: deny`, the request is denied even if other rules match with `decision: allow`.

Enum: `allow`, `deny`

### `RuleResources`

Network domain: hostnames (for example, `example.com`), wildcard subdomains (`*.example.com` or `**.example.com`), hostnames with port (for example, `example.com:443`), or CIDRs in IPv4 or IPv6 notation (for example, `10.0.0.0/8` or `2001:db8::/32`). Filesystem domain: paths (for example, `/data`); `*` matches within one path segment, `**` matches recursively (for example, `/data/**`).


### `Scope`

Restricts the policy to specific teams. An empty or absent list means the policy applies org-wide.


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `teams` | `array<``string``>` | no | Team UUIDs the policy applies to. Each must be a valid team in the org. |


### `ScopePatch`

Per-sub-field patch of a policy's scope. An omitted sub-field is left unchanged; a present list replaces that dimension, and an empty list clears it (making the policy org-wide for that dimension).


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `teams` | `array<``string``>` | no |  |


### `UpdatePolicyRequest`

Partial update of a policy's metadata. Only fields present in the body are updated; the rule set is not modified here. At least one field must be present.


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `name` | `string` | no | Policy name, unique within the organization. |
| `scope` | `ScopePatch` | no |  |


### `UpdatePolicyResponse`

The full policy before and after the update.


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `new` | `Policy` | yes |  |
| `old` | `Policy` | yes |  |


### `UpdateRuleRequest`

Partial update. Only fields present in the body are updated; absent fields are left unchanged.


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `actions` | `RuleActions` | no |  |
| `decision` | `RuleDecision` | no |  |
| `name` | `string` | no | Human-readable label for the rule. |
| `resources` | `RuleResources` | no |  |


### `UpdateRuleResponse`

The rule state before and after the update.


| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `new` | `Rule` | yes |  |
| `old` | `Rule` | yes |  |

