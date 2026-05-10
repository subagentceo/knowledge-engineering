> This page location: Tools & Workflows > API, CLI & SDKs > CLI > me
> Full Neon documentation index: https://neon.com/docs/llms.txt

# Neon CLI command: me

View current user info, login details, and project limits

## Before you begin

- Before running the `me` command, ensure that you have [installed the Neon CLI](https://neon.com/docs/reference/cli-install).
- If you have not authenticated with the [neon auth](https://neon.com/docs/reference/cli-auth) command, running a Neon CLI command automatically launches the Neon CLI browser authentication process. Alternatively, you can specify a Neon API key using the `--api-key` option when running a command. See [Connect](https://neon.com/docs/reference/neon-cli#connect).

## The `me` command

This command shows information about the current Neon CLI user.

### Usage

```bash
neon me
```

### Options

Only [global options](https://neon.com/docs/reference/neon-cli#global-options) apply.

### Examples

```bash
neon me
┌────────────────┬──────────────────────────┬─────────────┬────────────────┐
│ Login          │ Email                    │ Name        │ Projects Limit │
├────────────────┼──────────────────────────┼─────────────┼────────────────┤
│ sally          │ sally@example.com        │ Sally Smith |       1        │
└────────────────┴──────────────────────────┴─────────────┴────────────────┘
```

This example shows `neon me` with `--output json`, which provides additional data not shown with the default `table` output format.

```json
neon me -o json

{

  "active_seconds_limit": 360000,
  "billing_account": {
    "payment_source": {
      "type": ""
    },
    "subscription_type": "free",
    "quota_reset_at_last": "2023-07-01T00:00:00Z",
    "email": "sally@example.com",
    "address_city": "",
    "address_country": "",
    "address_line1": "",
    "address_line2": "",
    "address_postal_code": "",
    "address_state": ""
  },
  "auth_accounts": [
    {
      "email": "sally@example.com",
      "image": "https://lh3.googleusercontent.com/a/AItbvml5rjEQkmt-h_abcdef-MwVtfpek7Aa_xk3cIS_=s96-c",
      "login": "sally",
      "name": "Sally Smith",
      "provider": "google"
    },
    {
      "email": "sally@example.com",
      "image": "",
      "login": "sally",
      "name": "sally@example.com",
      "provider": "hasura"
    }
  ],
  "email": "sally@example.com",
  "id": "8a9f604e-d04e-1234-baf7-e78909a5d123",
  "image": "https://lh3.googleusercontent.com/a/AItbvml5rjEQkmt-h_abcdef-MwVtfpek7Aa_xk3cIS_=s96-c",
  "login": "sally",
  "name": "Sally Smith",
  "projects_limit": 10,
  "branches_limit": 10,
  "max_autoscaling_limit": 0.25,
  "plan": "free"
}
```

In JSON output, `max_autoscaling_limit` is a numeric value in compute units. A value of `0` means no autoscaling limit is configured.

---

## Related docs (CLI)

- [Overview](https://neon.com/docs/reference/neon-cli)
- [Quickstart](https://neon.com/docs/reference/cli-quickstart)
- [Install and connect](https://neon.com/docs/reference/cli-install)
- [auth](https://neon.com/docs/reference/cli-auth)
- [orgs](https://neon.com/docs/reference/cli-orgs)
- [projects](https://neon.com/docs/reference/cli-projects)
- [ip-allow](https://neon.com/docs/reference/cli-ip-allow)
- [vpc](https://neon.com/docs/reference/cli-vpc)
- [branches](https://neon.com/docs/reference/cli-branches)
- [databases](https://neon.com/docs/reference/cli-databases)
- [roles](https://neon.com/docs/reference/cli-roles)
- [operations](https://neon.com/docs/reference/cli-operations)
- [connection-string](https://neon.com/docs/reference/cli-connection-string)
- [set-context](https://neon.com/docs/reference/cli-set-context)
- [init](https://neon.com/docs/reference/cli-init)
- [completion](https://neon.com/docs/reference/cli-completion)
