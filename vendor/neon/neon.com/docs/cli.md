> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Overview
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: Neon CLI (neonctl) is the terminal tool for managing Neon projects, branches, databases, roles, connection strings, functions, buckets, and the Data API without using the web console. This page indexes every command with its subcommands and documents the global options, including --output (json, yaml, table), --api-key (NEON_API_KEY), and --context-file. Built for terminal workflows, CI/CD automation, scripts, and AI agents.

# Neon CLI

The Neon command-line interface: every command, with options and examples

One CLI for every Neon surface: manage Postgres, Functions, Storage, the Data API, and Neon Auth from the terminal, with branch-scoped workflows built in.

```bash filename="Install"
npm i -g neonctl
```

## Commands

### auth (alias: `login`)

Authenticate.

Usage: `neonctl auth [options]`

### projects (alias: `project`)

Manage projects.

| Subcommand                      | Description                                                 |
| ------------------------------- | ----------------------------------------------------------- |
| `neonctl projects list`         | List projects                                               |
| `neonctl projects create`       | Create a project                                            |
| `neonctl projects update <id>`  | Update a project                                            |
| `neonctl projects delete <id>`  | Delete a project                                            |
| `neonctl projects recover <id>` | Recovers a deleted project during the deletion grace period |
| `neonctl projects get <id>`     | Get a project                                               |

### ip-allow

Manage IP Allow.

| Subcommand                         | Description                               |
| ---------------------------------- | ----------------------------------------- |
| `neonctl ip-allow list`            | List the IP allowlist                     |
| `neonctl ip-allow add [ips...]`    | Add IP addresses to the IP allowlist      |
| `neonctl ip-allow remove [ips...]` | Remove IP addresses from the IP allowlist |
| `neonctl ip-allow reset [ips...]`  | Reset the IP allowlist                    |

### vpc

Manage VPC endpoints and project VPC restrictions.

| Subcommand                          | Description                                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| `neonctl vpc endpoint list`         | List configured VPC endpoints for this organization.                                           |
| `neonctl vpc endpoint assign <id>`  | Add or update a VPC endpoint for this organization. Note: Azure regions are not yet supported. |
| `neonctl vpc endpoint remove <id>`  | Remove a VPC endpoint from this organization.                                                  |
| `neonctl vpc endpoint status <id>`  | Get the status of a VPC endpoint for this organization.                                        |
| `neonctl vpc project list`          | List VPC endpoint restrictions for this project.                                               |
| `neonctl vpc project restrict <id>` | Configure or update a VPC endpoint restriction for this project.                               |
| `neonctl vpc project remove <id>`   | Remove a VPC endpoint restriction from this project.                                           |

### me

Show current user.

Usage: `neonctl me [options]`

### orgs (alias: `org`)

Manage organizations.

| Subcommand          | Description        |
| ------------------- | ------------------ |
| `neonctl orgs list` | List organizations |

### branches (alias: `branch`)

Manage branches.

| Subcommand                                                                       | Description                                                                                                  |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `neonctl branches list`                                                          | List branches                                                                                                |
| `neonctl branches create`                                                        | Create a branch                                                                                              |
| `neonctl branches reset <id\|name>`                                              | Reset a branch                                                                                               |
| `neonctl branches restore <target-id\|name> <source>[@(timestamp\|lsn)>`         | Restores a branch to a specific point in time \<source> can be: ^self, ^parent, or \<source-branch-id\|name> |
| `neonctl branches rename <id\|name> <new-name>`                                  | Rename a branch                                                                                              |
| `neonctl branches set-default <id\|name>`                                        | Set a branch as default                                                                                      |
| `neonctl branches set-expiration <id\|name>`                                     | Set an expiration date for the branch                                                                        |
| `neonctl branches add-compute <id\|name>`                                        | Add a compute to a branch                                                                                    |
| `neonctl branches delete <id\|name>`                                             | Delete a branch                                                                                              |
| `neonctl branches get <id\|name>`                                                | Get a branch                                                                                                 |
| `neonctl branches schema-diff [base-branch] [compare-source[@(timestamp\|lsn)]]` | Compare the latest schemas of any two branches, or compare a branch to its own or another branch's history.  |

### databases (alias: `database`, `db`)

Manage databases.

| Subcommand                            | Description       |
| ------------------------------------- | ----------------- |
| `neonctl databases list`              | List databases    |
| `neonctl databases create`            | Create a database |
| `neonctl databases delete <database>` | Delete a database |

### roles (alias: `role`)

Manage roles.

| Subcommand                    | Description   |
| ----------------------------- | ------------- |
| `neonctl roles list`          | List roles    |
| `neonctl roles create`        | Create a role |
| `neonctl roles delete <role>` | Delete a role |

### operations (alias: `operation`)

Manage operations.

| Subcommand                | Description     |
| ------------------------- | --------------- |
| `neonctl operations list` | List operations |

### connection-string (alias: `cs`)

Get connection string.

Usage: `neonctl connection-string [branch] [options]`

### psql

Connect to a database via psql.

Usage: `neonctl psql [branch] [options]`

### set-context

Deprecated: use `neonctl link`. Set the .neon context (raw write).

Usage: `neonctl set-context [options]`

### checkout

Pin a branch in the local context (.neon) so subsequent commands target it.

Usage: `neonctl checkout [id|name] [options]`

### link

Link the current directory to a Neon project.

Usage: `neonctl link [options]`

### init

Initialize a project with Neon using your AI coding assistant.

Usage: `neonctl init [options]`

### data-api

Manage the Neon Data API for a database.

| Subcommand                        | Description                                                             |
| --------------------------------- | ----------------------------------------------------------------------- |
| `neonctl data-api create`         | Provision the Neon Data API for a database                              |
| `neonctl data-api get`            | Show the Neon Data API status and settings                              |
| `neonctl data-api update`         | Update Neon Data API settings (merges with current settings by default) |
| `neonctl data-api refresh-schema` | Refresh the Data API schema cache without changing settings             |
| `neonctl data-api delete`         | Tear down the Neon Data API for a database                              |

### neon-auth

Manage Neon Auth.

| Subcommand                                         | Description                         |
| -------------------------------------------------- | ----------------------------------- |
| `neonctl neon-auth enable`                         | Enable Neon Auth on a branch        |
| `neonctl neon-auth status`                         | Get Neon Auth status for a branch   |
| `neonctl neon-auth disable`                        | Disable Neon Auth on a branch       |
| `neonctl neon-auth oauth-provider list`            | List OAuth providers                |
| `neonctl neon-auth oauth-provider add`             | Add an OAuth provider               |
| `neonctl neon-auth oauth-provider update`          | Update an OAuth provider            |
| `neonctl neon-auth oauth-provider delete`          | Delete an OAuth provider            |
| `neonctl neon-auth domain list`                    | List trusted domains                |
| `neonctl neon-auth domain add <domain>`            | Add a trusted domain                |
| `neonctl neon-auth domain delete <domain>`         | Delete a trusted domain             |
| `neonctl neon-auth domain allow-localhost get`     | Get localhost connection setting    |
| `neonctl neon-auth domain allow-localhost enable`  | Allow localhost connections         |
| `neonctl neon-auth domain allow-localhost disable` | Restrict localhost connections      |
| `neonctl neon-auth config email-password get`      | Get email and password config       |
| `neonctl neon-auth config email-password update`   | Update email and password config    |
| `neonctl neon-auth config email-provider get`      | Get email provider config           |
| `neonctl neon-auth config email-provider update`   | Update email provider config        |
| `neonctl neon-auth config email-provider test`     | Send a test email                   |
| `neonctl neon-auth config organization get`        | Get organization plugin config      |
| `neonctl neon-auth config organization update`     | Update organization plugin config   |
| `neonctl neon-auth config webhook get`             | Get webhook config                  |
| `neonctl neon-auth config webhook update`          | Update webhook config               |
| `neonctl neon-auth plugins list`                   | List all plugin configurations      |
| `neonctl neon-auth plugins get <plugin-name>`      | Get a specific plugin configuration |
| `neonctl neon-auth user create`                    | Create an auth user                 |
| `neonctl neon-auth user delete <user-id>`          | Delete an auth user                 |
| `neonctl neon-auth user set-role <user-id>`        | Set roles for an auth user          |

### functions (alias: `function`)

Manage Neon Functions.

| Subcommand                        | Description                              |
| --------------------------------- | ---------------------------------------- |
| `neonctl functions deploy <slug>` | Deploy a function from a local directory |
| `neonctl functions list`          | List functions on the branch             |
| `neonctl functions get <slug>`    | Show a function's details                |
| `neonctl functions delete <slug>` | Delete a function on the branch          |

### dev

Run Neon Functions locally with a dev server.

Usage: `neonctl dev [options]`

### config

Manage a branch with a neon.ts policy.

| Subcommand              | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `neonctl config status` | Show the branch's live Neon state               |
| `neonctl config plan`   | Show what `config apply` would change (dry run) |
| `neonctl config apply`  | Apply a neon.ts policy to the branch            |

### deploy

Apply a neon.ts policy to a branch (alias for `config apply`).

Usage: `neonctl deploy [options]`

### env

Manage a branch's Neon env variables locally.

| Subcommand         | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `neonctl env pull` | Write the branch's Neon env variables to a local .env file |

### bucket

Manage branch object-storage buckets and their objects.

| Subcommand                              | Description                                      |
| --------------------------------------- | ------------------------------------------------ |
| `neonctl bucket create <name>`          | Create a bucket on a branch                      |
| `neonctl bucket list`                   | List the buckets on a branch                     |
| `neonctl bucket delete <name>`          | Delete a bucket from a branch                    |
| `neonctl bucket object list <target>`   | List objects in a bucket                         |
| `neonctl bucket object get <target>`    | Download an object from a bucket to a local file |
| `neonctl bucket object put <target>`    | Upload a local file to a bucket as an object     |
| `neonctl bucket object delete <target>` | Delete an object, or every object under a prefix |

### bootstrap

Scaffold a new project from a Neon starter template.

Usage: `neonctl bootstrap [directory] [options]`

## Agent mode

Every command supports `--output json` for machine-readable results, and setting the `NEON_API_KEY` environment variable authenticates non-interactively. For AI agents, [`neonctl link --agent`](https://neon.com/docs/cli/link) emits a JSON state-machine response with a discriminated `status` field describing the next step, instead of prompting.

## Global options

Global options are optional and work with any Neon CLI command.

| Option            | Description                                                                       | Type    | Default                                                         | Required |
| ----------------- | --------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------- | :------: |
| `--help`, `-h`    | Show help for a command or subcommand                                             | boolean | —                                                               |    No    |
| `--api-key`       | Neon API key, authenticates without `neonctl auth`                                | string  | NEON\_API\_KEY environment variable                             |    No    |
| `--context-file`  | Context file with default org, project, and branch IDs, created by `neonctl link` | string  | nearest .neon file, searching upward from the current directory |    No    |
| `--color`         | Colorize the output. Example: --no-color, --color false                           | boolean | `true`                                                          |    No    |
| `--analytics`     | Manage analytics. Example: --no-analytics, --analytics false                      | boolean | `true`                                                          |    No    |
| `--config-dir`    | Path to config directory                                                          | string  | \~/.config/neonctl (or $XDG\_CONFIG\_HOME/neonctl)              |    No    |
| `--output`, `-o`  | Set output format Possible values: `json`, `yaml`, `table`                        | string  | `table`                                                         |    No    |
| `--version`, `-v` | Show version number                                                               | boolean | —                                                               |    No    |

More about global options:

- **Output:** table output may omit fields. Use `--output json` or `--output yaml` to see all data.
- **Authentication:** the CLI checks credentials in this order: the `--api-key` option, the `NEON_API_KEY` environment variable (`export NEON_API_KEY=<neon_api_key>`), the `credentials.json` file that `neonctl auth` creates in the config directory (override its location with `--config-dir`), then interactive web authentication. To get a key, see [Create an API key](https://neon.com/docs/manage/api-keys#creating-api-keys).
- **Context file:** sets a default organization, project, or branch so you don't repeat IDs in every command. Create one with [`neonctl link`](https://neon.com/docs/cli/link) (preferred) or [`set-context`](https://neon.com/docs/cli/set-context).
- **Analytics:** Neon collects anonymous data about which commands and options are used, never user-defined data such as project IDs or command payloads. Opt out with `--no-analytics`.
- **Help:** `--help` works at every level: `neonctl --help`, `neonctl branches --help`, `neonctl branches create --help`.

## GitHub repository

The Neon CLI is open source. See the [neondatabase/neonctl](https://github.com/neondatabase/neonctl) repository.

---

## Related docs (CLI)

- [Install and connect](https://neon.com/docs/cli/install)
- [Quickstart](https://neon.com/docs/cli/quickstart)
