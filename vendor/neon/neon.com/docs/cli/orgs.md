> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Org & network > orgs
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: The `neonctl orgs` CLI command lists all Neon organizations associated with the authenticated user, returning org ID, name, handle, and timestamps in table or JSON output. Use this command to identify which organizations your account belongs to before running project or branch commands scoped to a specific org.

# Neon CLI command: orgs

List the Neon organizations you belong to

The `orgs` command lists the organizations you belong to. Its subcommand takes only the [global options](https://neon.com/docs/cli#global-options).

Subcommands: [list](https://neon.com/docs/cli/orgs#list)

## neonctl orgs list

Lists all organizations associated with the authenticated Neon CLI user.

```bash
neonctl orgs list [options]
```

List your organizations with the default `table` output format:

```bash
neonctl orgs list
```

```text filename="Output"
Organizations
┌────────────────────────┬──────────────────┐
│ Id                     │ Name             │
├────────────────────────┼──────────────────┤
│ org-xxxxxxxx-xxxxxxxx  │ Example Org      │
└────────────────────────┴──────────────────┘
```

List your organizations with `--output json`, which also shows the `created_at` and `updated_at` timestamps omitted from the `table` output:

```bash
neonctl orgs list -o json
```

<details>

<summary>Show output</summary>

```json
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

</details>

---

## Related docs (Org & network)

- [ip-allow](https://neon.com/docs/cli/ip-allow)
- [vpc](https://neon.com/docs/cli/vpc)
