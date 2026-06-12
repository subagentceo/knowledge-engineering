> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Projects & branches > operations
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: The Neon CLI `neonctl operations list` command retrieves the history of system operations for a Neon project, showing each operation's ID, action type (such as `apply_config` or `suspend_compute`), status, and creation timestamp. Use this command to inspect or audit long-running or recently completed operations when debugging project state or configuration changes. Requires the Neon CLI to be installed and authenticated; scope to a specific project with `--project-id` when your account has multiple projects.

# Neon CLI command: operations

List and manage long-running operations for a Neon project

The `operations` command lists operations for a Neon project from the terminal. For information about operations in Neon, see [System operations](https://neon.com/docs/manage/operations). If `--project-id` is omitted, the CLI resolves it from your [context file](https://neon.com/docs/cli/set-context), auto-selects when your account has only one project, and prompts otherwise.

Subcommands: [list](https://neon.com/docs/cli/operations#list)

## neonctl operations list

Lists operations for a Neon project.

```bash
neonctl operations list [options]
```

| Option         | Description | Type   | Default | Required |
| -------------- | ----------- | ------ | ------- | :------: |
| `--project-id` | Project ID  | string | —       |    No    |

```bash
neonctl operations list
```

```text filename="Output"
┌──────────────────────────────────────┬────────────────────┬──────────┬──────────────────────┐
│ Id                                   │ Action             │ Status   │ Created At           │
├──────────────────────────────────────┼────────────────────┼──────────┼──────────────────────┤
│ fce8642e-259e-4662-bdce-518880aee723 │ apply_config       │ finished │ 2023-06-20T00:45:19Z │
├──────────────────────────────────────┼────────────────────┼──────────┼──────────────────────┤
│ dc1dfb0c-b854-474b-be20-2ea1d2172563 │ apply_config       │ finished │ 2023-06-20T00:43:17Z │
├──────────────────────────────────────┼────────────────────┼──────────┼──────────────────────┤
│ 7a83e300-cf5f-4c1a-b9b5-569b6d6feab9 │ suspend_compute    │ finished │ 2023-06-19T23:50:56Z │
└──────────────────────────────────────┴────────────────────┴──────────┴──────────────────────┘
```

---

## Related docs (Projects & branches)

- [projects](https://neon.com/docs/cli/projects)
- [branches](https://neon.com/docs/cli/branches)
- [databases](https://neon.com/docs/cli/databases)
- [roles](https://neon.com/docs/cli/roles)
