> This page location: Tools & Workflows > API, CLI & SDKs > CLI > connection-string
> Full Neon documentation index: https://neon.com/docs/llms.txt

# Neon CLI command: connection-string

Get Postgres connection strings for branches and databases

## Before you begin

- Before running the `connection-string` command, ensure that you have [installed the Neon CLI](https://neon.com/docs/reference/cli-install).
- If you have not authenticated with the [neon auth](https://neon.com/docs/reference/cli-auth) command, running a Neon CLI command automatically launches the Neon CLI browser authentication process. Alternatively, you can specify a Neon API key using the `--api-key` option when running a command. See [Connect](https://neon.com/docs/reference/neon-cli#connect).

For information about connecting to Neon, see [Connect from any application](https://neon.com/docs/connect/connect-from-any-app).

## The `connection-string` command

This command gets a Postgres connection string for connecting to a database in your Neon project. You can construct a connection string for any database in any branch. The connection string includes the password for the specified role.

### Usage

```bash
neon connection-string [branch[@timestamp|@LSN]] [options]
```

`branch` specifies the branch name or ID. If a branch name or ID is omitted, the default branch is used. `@timestamp|@LSN` is used to specify a specific point in the branch's history for time travel connections. If omitted, the current state (HEAD) is used.

### Options

In addition to the Neon CLI [global options](https://neon.com/docs/reference/neon-cli#global-options), the `connection-string` command supports these options:

| Option            | Description                                                                                                   | Type    |                       Required                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------- | :-------------------------------------------------: |
| `--context-file`  | [Context file](https://neon.com/docs/reference/cli-set-context#using-a-named-context-file) path and file name | string  |                                                     |
| `--project-id`    | Project ID                                                                                                    | string  | Only if your Neon account has more than one project |
| `--role-name`     | Role name                                                                                                     | string  |      Only if your branch has more than one role     |
| `--database-name` | Database name                                                                                                 | string  |    Only if your branch has more than one database   |
| `--pooled`        | Construct a pooled connection. The default is `false`.                                                        | boolean |                                                     |
| `--prisma`        | Construct a connection string for use with Prisma. The default is `false`.                                    | boolean |                                                     |
| `--endpoint-type` | The compute type. The default is `read-write`. The choices are `read_only` and `read_write`                   | string  |                                                     |
| `--extended`      | Show extended information. The default is `false`.                                                            | boolean |                                                     |
| `--psql`          | Connect to a database via psql using connection string. `psql` must be installed to use this option.          | boolean |                                                     |

### Examples

- Get a basic connection string for the current project, branch, and database:

  ```bash
  neon connection-string mybranch
  postgresql://alex:AbC123dEf@ep-cool-darkness-123456.us-east-2.aws.neon.tech/dbname?sslmode=require&channel_binding=require
  ```

- Get a pooled connection string for the current project, branch, and database with the `--pooled` option. This option adds a `-pooler` flag to the host name which enables connection pooling for clients that use this connection string.

  ```bash
  neon connection-string --pooled
  postgresql://alex:AbC123dEf@ep-cool-darkness-123456-pooler.us-east-2.aws.neon.tech/dbname?sslmode=require&channel_binding=require
  ```

- Get a connection string for use with Prisma for the current project, branch, and database. The `--prisma` options adds `connect_timeout=30` option to the connection string to ensure that connections from Prisma Client do not timeout.

  ```bash
  neon connection-string --prisma
  postgresql://alex:AbC123dEf@ep-cool-darkness-123456.us-east-2.aws.neon.tech/dbname?sslmode=require&channel_binding=require&connect_timeout=30
  ```

- Get a connection string to a specific point in a branch's history by appending `@timestamp` or `@lsn`. Availability depends on your configured [restore window](https://neon.com/docs/introduction/restore-window).

  ```bash
  neon connection-string @2024-04-21T00:00:00Z
  ```

  For additional examples, see [How to use Time Travel](https://neon.com/docs/guides/time-travel-assist#how-to-use-time-travel).

- Get a connection string and connect with `psql`.

  ```bash
  neon connection-string --psql
  ```

- Get a connection string, connect with `psql`, and run an `.sql` file.

  ```bash
  neon connection-string --psql -- -f dump.sql
  ```

- Get a connection string, connect with `psql`, and run a query.

  ```bash
  neon connection-string --psql -- -c "SELECT version()"
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
- [databases](https://neon.com/docs/reference/cli-databases)
- [roles](https://neon.com/docs/reference/cli-roles)
- [operations](https://neon.com/docs/reference/cli-operations)
- [set-context](https://neon.com/docs/reference/cli-set-context)
- [init](https://neon.com/docs/reference/cli-init)
- [completion](https://neon.com/docs/reference/cli-completion)
