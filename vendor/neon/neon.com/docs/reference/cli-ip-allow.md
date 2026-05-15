> This page location: Tools & Workflows > API, CLI & SDKs > CLI > ip-allow
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: Covers the usage of the `ip-allow` command in the Neon CLI to manage the IP allowlist for a Neon project, including actions to list, add, remove, and reset IP addresses.

# Neon CLI command: ip-allow

Manage the IP allowlist: list, add, remove, and reset allowed IPs

## Before you begin

- Before running the `ip-allow` command, ensure that you have [installed the Neon CLI](https://neon.com/docs/reference/cli-install).
- If you have not authenticated with the [neon auth](https://neon.com/docs/reference/cli-auth) command, running a Neon CLI command automatically launches the Neon CLI browser authentication process. Alternatively, you can specify a Neon API key using the `--api-key` option when running a command. See [Connect](https://neon.com/docs/reference/neon-cli#connect).

For information about Neon's **IP Allow** feature, see [Configure IP Allow](https://neon.com/docs/manage/projects#configure-ip-allow).

## The `ip-allow` command

The `ip-allow` command allows you to perform `list`, `add`, `remove`, and `reset` actions on the IP allowlist for your Neon project. You can define an allowlist with individual IP addresses, IP ranges, or [CIDR notation](https://neon.com/docs/reference/glossary#cidr-notation).

### Usage

```bash
neon ip-allow <subcommand> [options]
```

| Subcommand                                                    | Description                               |
| ------------------------------------------------------------- | ----------------------------------------- |
| [list](https://neon.com/docs/reference/cli-ip-allow#list)     | List the IP allowlist                     |
| [add](https://neon.com/docs/reference/cli-ip-allow#add)       | Add IP addresses to the IP allowlist      |
| [remove](https://neon.com/docs/reference/cli-ip-allow#remove) | Remove IP addresses from the IP allowlist |
| [reset](https://neon.com/docs/reference/cli-ip-allow#reset)   | Reset the IP allowlist                    |

### list

This subcommand allows you to list addresses in the IP allowlist.

#### Usage

```bash
neon ip-allow list [options]
```

#### Options

In addition to the Neon CLI [global options](https://neon.com/docs/reference/neon-cli#global-options), the `list` subcommand supports these options:

| Option           | Description                                                                                                   | Type   |                       Required                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------- | ------ | :-------------------------------------------------: |
| `--context-file` | [Context file](https://neon.com/docs/reference/cli-set-context#using-a-named-context-file) path and file name | string |                                                     |
| `--project-id`   | Project ID                                                                                                    | string | Only if your Neon account has more than one project |

#### Examples

```bash
neon ip-allow list --project-id cold-grass-40154007
```

List the IP allowlist with the `--output` format set to `json`:

```bash
neon ip-allow list --project-id cold-grass-40154007 --output json
```

### add

This subcommand allows you to add IP addresses to the IP allowlist for your Neon project.

#### Usage

```bash
neon ip-allow add [ips ...] [options]
```

#### Options

In addition to the Neon CLI [global options](https://neon.com/docs/reference/neon-cli#global-options), the `add` subcommand supports these options:

| Option             | Description                                                                                                        | Type   |                       Required                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ | ------ | :-------------------------------------------------: |
| `--context-file`   | [Context file](https://neon.com/docs/reference/cli-set-context#using-a-named-context-file) path and file name      | string |                                                     |
| `--project-id`     | Project ID                                                                                                         | string | Only if your Neon account has more than one project |
| `--protected-only` | If true, the list will be applied only to protected branches. Use `--protected-only false` to remove this setting. | string |                                                     |

#### Example

```bash
neon ip-allow add 192.0.2.3 --project-id cold-grass-40154007
```

### remove

This subcommand allows you to remove IP addresses from the IP allowlist for your project.

#### Usage

```bash
neon ip-allow remove [ips ...] [options]
```

#### Options

In addition to the Neon CLI [global options](https://neon.com/docs/reference/neon-cli#global-options), the `remove` subcommand supports these options:

| Option           | Description                                                                                                   | Type   |                       Required                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------- | ------ | :-------------------------------------------------: |
| `--context-file` | [Context file](https://neon.com/docs/reference/cli-set-context#using-a-named-context-file) path and file name | string |                                                     |
| `--project-id`   | Project ID                                                                                                    | string | Only if your Neon account has more than one project |

#### Example

```bash
neon ip-allow remove 192.0.2.3 --project-id cold-grass-40154007
```

### reset

This subcommand allows you to reset the list of IP addresses. You can reset to different IP addresses. If you specify no addresses, currently defined IP addresses are removed.

#### Usage

```bash
neon ip-allow reset [ips ...] [options]
```

#### Options

In addition to the Neon CLI [global options](https://neon.com/docs/reference/neon-cli#global-options), the `reset` subcommand supports these options:

| Option           | Description                                                                                                   | Type   |                       Required                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------- | ------ | :-------------------------------------------------: |
| `--context-file` | [Context file](https://neon.com/docs/reference/cli-set-context#using-a-named-context-file) path and file name | string |                                                     |
| `--project-id`   | Project ID                                                                                                    | string | Only if your Neon account has more than one project |

#### Example

```bash
neon ip-allow reset 192.0.2.1 --project-id cold-grass-40154007
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
- [vpc](https://neon.com/docs/reference/cli-vpc)
- [branches](https://neon.com/docs/reference/cli-branches)
- [databases](https://neon.com/docs/reference/cli-databases)
- [roles](https://neon.com/docs/reference/cli-roles)
- [operations](https://neon.com/docs/reference/cli-operations)
- [connection-string](https://neon.com/docs/reference/cli-connection-string)
- [set-context](https://neon.com/docs/reference/cli-set-context)
- [init](https://neon.com/docs/reference/cli-init)
- [completion](https://neon.com/docs/reference/cli-completion)
