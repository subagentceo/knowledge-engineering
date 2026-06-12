> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Projects & branches > databases
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: The Neon CLI `databases` command lists, creates, and deletes Postgres databases within a Neon project branch directly from the terminal. Use `neonctl databases create --name <db> --owner-name <role>` to provision a database on a named branch, or omit `--branch` to target the project's default branch. Each subcommand accepts `--project-id` (required only for accounts with multiple projects) and `--context-file` for reusable context.

# Neon CLI command: databases

List, create, and delete databases in a Neon project

The `databases` command lists, creates, and deletes databases in a Neon project from the terminal. For information about databases in Neon, see [Manage databases](https://neon.com/docs/manage/databases). If `--project-id` is omitted, the CLI resolves it from your [context file](https://neon.com/docs/cli/set-context), auto-selects when your account has only one project, and prompts otherwise.

Subcommands: [list](https://neon.com/docs/cli/databases#list), [create](https://neon.com/docs/cli/databases#create), [delete](https://neon.com/docs/cli/databases#delete)

## neonctl databases list

Lists databases. If you don't specify a branch ID or name with `--branch`, the command targets the project's default branch. This applies to all `databases` subcommands.

```bash
neonctl databases list [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl databases list --branch br-autumn-dust-190886
```

```text filename="Output"
┌────────┬────────────┬──────────────────────┐
│ Name   │ Owner Name │ Created At           │
├────────┼────────────┼──────────────────────┤
│ neondb │ daniel     │ 2023-06-19T18:27:19Z │
└────────┴────────────┴──────────────────────┘
```

## neonctl databases create

Creates a database. If you don't specify `--owner-name`, the current user becomes the database owner.

```bash
neonctl databases create [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--name`       | Database name     | string | —       |    Yes   |
| `--owner-name` | Owner name        | string | —       |    No    |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl databases create --name mynewdb --owner-name john
```

```text filename="Output"
┌─────────┬────────────┬──────────────────────┐
│ Name    │ Owner Name │ Created At           │
├─────────┼────────────┼──────────────────────┤
│ mynewdb │ john       │ 2023-06-19T23:45:45Z │
└─────────┴────────────┴──────────────────────┘
```

## neonctl databases delete

Deletes a database. The `<database>` is the database name.

```bash
neonctl databases delete <database> [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl databases delete mydb
```

```text filename="Output"
┌─────────┬────────────┬──────────────────────┐
│ Name    │ Owner Name │ Created At           │
├─────────┼────────────┼──────────────────────┤
│ mydb    │ daniel     │ 2023-06-19T23:45:45Z │
└─────────┴────────────┴──────────────────────┘
```

---

## Related docs (Projects & branches)

- [projects](https://neon.com/docs/cli/projects)
- [branches](https://neon.com/docs/cli/branches)
- [roles](https://neon.com/docs/cli/roles)
- [operations](https://neon.com/docs/cli/operations)
