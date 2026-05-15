> This page location: Tools & Workflows > API, CLI & SDKs > CLI > orgs
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: How to manage organizations within the Neon CLI using the `orgs` command, including listing all associated organizations and utilizing various output formats.

# Neon CLI command: orgs

List and manage Neon organizations

## Before you begin

- Before running the `orgs` command, ensure that you have [installed the Neon CLI](https://neon.com/docs/reference/cli-install).
- If you have not authenticated with the [neon auth](https://neon.com/docs/reference/cli-auth) command, running a Neon CLI command automatically launches the Neon CLI browser authentication process. Alternatively, you can specify a Neon API key using the `--api-key` option when running a command. See [Connect](https://neon.com/docs/reference/neon-cli#connect).

## The `orgs` command

Use this command to manage the organizations you belong to within the Neon CLI.

### Usage

```bash
neon orgs <sub-command> [options]
```

### Sub-commands

#### `list`

This sub-command lists all organizations associated with the authenticated Neon CLI user.

```bash
neon orgs list
```

### Options

Only [global options](https://neon.com/docs/reference/neon-cli#global-options) apply.

### Examples

Here is the default output in table format.

```bash
neon orgs list
Organizations
┌────────────────────────┬──────────────────┐
│ Id                     │ Name             │
├────────────────────────┼──────────────────┤
│ org-xxxxxxxx-xxxxxxxx  │ Example Org      │
└────────────────────────┴──────────────────┘
```

This next example shows `neon orgs list` with `--output json`, which also shows the `created_at` and `updated_at` timestamps not shown with the default `table` output format.

```json
neon orgs list -o json

[
  {
    "id": "org-xxxxxxxx-xxxxxxxx",
    "name": "Example Org",
    "handle": "example-org-xxxxxxxx",
    "created_at": "2024-04-22T16:50:41Z",
    "updated_at": "2024-06-28T15:38:26Z"
  }
]
```

---

## Related docs (CLI)

- [Overview](https://neon.com/docs/reference/neon-cli)
- [Quickstart](https://neon.com/docs/reference/cli-quickstart)
- [Install and connect](https://neon.com/docs/reference/cli-install)
- [auth](https://neon.com/docs/reference/cli-auth)
- [me](https://neon.com/docs/reference/cli-me)
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
