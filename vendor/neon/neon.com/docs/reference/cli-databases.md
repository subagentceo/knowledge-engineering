> This page location: Tools & Workflows > API, CLI & SDKs > CLI > databases
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: Covers the usage of the Neon CLI `databases` command for managing databases, including listing, creating, and deleting databases within a Neon project.

# Neon CLI command: databases

List, create, and delete databases in a Neon project

## Before you begin

- Before running the `databases` command, ensure that you have [installed the Neon CLI](https://neon.com/docs/reference/cli-install).
- If you have not authenticated with the [neon auth](https://neon.com/docs/reference/cli-auth) command, running a Neon CLI command automatically launches the Neon CLI browser authentication process. Alternatively, you can specify a Neon API key using the `--api-key` option when running a command. See [Connect](https://neon.com/docs/reference/neon-cli#connect).

For information about databases in Neon, see [Manage databases](https://neon.com/docs/manage/databases).

## The `databases` command

### Usage

The `databases` command allows you to list, create, and delete databases in a Neon project.

| Subcommand                                                     | Description       |
| -------------------------------------------------------------- | ----------------- |
| [list](https://neon.com/docs/reference/cli-databases#list)     | List databases    |
| [create](https://neon.com/docs/reference/cli-databases#create) | Create a database |
| [delete](https://neon.com/docs/reference/cli-databases#delete) | Delete a database |

### list

This subcommand allows you to list databases.

#### Usage

```bash
neon databases list [options]
```

#### Options

In addition to the Neon CLI [global options](https://neon.com/docs/reference/neon-cli#global-options), the `list` subcommand supports these options:

| Option           | Description                                                                                                   | Type   |                       Required                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------- | ------ | :-------------------------------------------------: |
| `--context-file` | [Context file](https://neon.com/docs/reference/cli-set-context#using-a-named-context-file) path and file name | string |                                                     |
| `--project-id`   | Project ID                                                                                                    | string | Only if your Neon account has more than one project |
| `--branch`       | Branch ID or name                                                                                             | string |                                                     |

If a branch ID or name is not provided, the command lists databases for the default branch of the project.

#### Example

```bash
neon databases list --branch br-autumn-dust-190886
┌────────┬────────────┬──────────────────────┐
│ Name   │ Owner Name │ Created At           │
├────────┼────────────┼──────────────────────┤
│ neondb │ daniel     │ 2023-06-19T18:27:19Z │
└────────┴────────────┴──────────────────────┘
```

### create

This subcommand allows you to create a database.

#### Usage

```bash
neon databases create [options]
```

#### Options

In addition to the Neon CLI [global options](https://neon.com/docs/reference/neon-cli#global-options), the `create` subcommand supports these options:

| Option           | Description                                                                                                   | Type   |                       Required                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------- | ------ | :-------------------------------------------------: |
| `--context-file` | [Context file](https://neon.com/docs/reference/cli-set-context#using-a-named-context-file) path and file name | string |                                                     |
| `--project-id`   | Project ID                                                                                                    | string | Only if your Neon account has more than one project |
| `--branch`       | Branch ID or name                                                                                             | string |                                                     |
| `--name`         | The name of the database                                                                                      | string |                          ✓                          |
| `--owner-name`   | The name of the role that owns the database                                                                   | string |                                                     |

- If a branch ID or name is not provided, the command creates the database in the default branch of the project.
- If the `--owner-name` option is not specified, the current user becomes the database owner.

#### Example

```bash
neon databases create --name mynewdb --owner-name john
┌─────────┬────────────┬──────────────────────┐
│ Name    │ Owner Name │ Created At           │
├─────────┼────────────┼──────────────────────┤
│ mynewdb │ john       │ 2023-06-19T23:45:45Z │
└─────────┴────────────┴──────────────────────┘
```

### delete

This subcommand allows you to delete a database.

#### Usage

```bash
neon databases delete <database> [options]
```

`<database>` is the database name.

#### Options

In addition to the Neon CLI [global options](https://neon.com/docs/reference/neon-cli#global-options), the `delete` subcommand supports these options:

| Option           | Description                                                                                                   | Type   |                       Required                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------- | ------ | :-------------------------------------------------: |
| `--context-file` | [Context file](https://neon.com/docs/reference/cli-set-context#using-a-named-context-file) path and file name | string |                                                     |
| `--project-id`   | Project ID                                                                                                    | string | Only if your Neon account has more than one project |
| `--branch`       | Branch ID or name                                                                                             | string |                                                     |

If a branch ID or name is not provided, it is assumed the database resides in the default branch of the project.

#### Example

```bash
neon databases delete mydb
┌─────────┬────────────┬──────────────────────┐
│ Name    │ Owner Name │ Created At           │
├─────────┼────────────┼──────────────────────┤
│ mydb    │ daniel     │ 2023-06-19T23:45:45Z │
└─────────┴────────────┴──────────────────────┘
```

---

## Related docs (CLI)

- [Overview](https://neon.com/docs/reference/neon-cli)
- [Quickstart](https://neon.com/docs/reference/cli-quickstart)
- [Install and connect](https://neon.com/docs/reference/cli-install)
- [auth](https://neon.com/docs/reference/cli-auth)
- [me](https://neon.com/docs/reference/cli-me)
- [orgs](https://neon.com/docs/reference/cli-orgs)
- [projects](https://neon.com/docs/reference/cli-projects)
- [ip-allow](https://neon.com/docs/reference/cli-ip-allow)
- [vpc](https://neon.com/docs/reference/cli-vpc)
- [branches](https://neon.com/docs/reference/cli-branches)
- [roles](https://neon.com/docs/reference/cli-roles)
- [operations](https://neon.com/docs/reference/cli-operations)
- [connection-string](https://neon.com/docs/reference/cli-connection-string)
- [set-context](https://neon.com/docs/reference/cli-set-context)
- [init](https://neon.com/docs/reference/cli-init)
- [completion](https://neon.com/docs/reference/cli-completion)
