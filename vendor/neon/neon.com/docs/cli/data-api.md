> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Functions, storage & data > data-api
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: Covers the usage of the `data-api` command in the Neon CLI to create, inspect, update, refresh, and delete the Neon Data API for a database.

# Neon CLI command: data-api

Provision and manage the Neon Data API from the CLI

The `data-api` command provisions and manages the [Neon Data API](https://neon.com/docs/data-api/overview) for a database. For Console-based management, see [Manage Data API](https://neon.com/docs/data-api/manage).

Requires neonctl 2.22.2 or later. Check your version with `neonctl --version`.

Subcommands: [create](https://neon.com/docs/cli/data-api#create), [get](https://neon.com/docs/cli/data-api#get), [update](https://neon.com/docs/cli/data-api#update), [refresh-schema](https://neon.com/docs/cli/data-api#refresh-schema), [delete](https://neon.com/docs/cli/data-api#delete)

If `--project-id`, `--branch`, or `--database` are omitted, the CLI resolves them from your [context file](https://neon.com/docs/cli/set-context), auto-selects when there is only one option, and prompts otherwise.

## Settings flags

The `create` and `update` subcommands share a set of settings flags that configure how the Data API serves your database:

| Flag                            | Description                                                 | Type    |
| ------------------------------- | ----------------------------------------------------------- | ------- |
| `--db-aggregates-enabled`       | Enable aggregate functions in queries                       | boolean |
| `--db-anon-role`                | Database role used for anonymous (unauthenticated) requests | string  |
| `--db-extra-search-path`        | Extra schemas appended to the search path                   | string  |
| `--db-max-rows`                 | Maximum number of rows returned by a single request         | number  |
| `--db-schemas`                  | Comma-separated list of schemas exposed via the Data API    | string  |
| `--jwt-role-claim-key`          | JWT claim path used to extract the role                     | string  |
| `--jwt-cache-max-lifetime`      | Maximum JWT cache lifetime in seconds                       | number  |
| `--openapi-mode`                | OpenAPI mode. Choices: `ignore-privileges`, `disabled`      | string  |
| `--server-cors-allowed-origins` | CORS allowed origins                                        | string  |
| `--server-timing-enabled`       | Enable Server-Timing response headers                       | boolean |

## neonctl data-api create

Provisions the Neon Data API for a database.

```bash
neonctl data-api create [options]
```

| Option                          | Description                                                                 | Type    | Default | Required |
| ------------------------------- | --------------------------------------------------------------------------- | ------- | ------- | :------: |
| `--auth-provider`               | Authentication provider Possible values: `neon_auth`, `external`            | string  | —       |    No    |
| `--jwks-url`                    | URL that lists the JWKS (used with external auth)                           | string  | —       |    No    |
| `--provider-name`               | Name of the auth provider (e.g. Clerk, Stytch, Auth0)                       | string  | —       |    No    |
| `--jwt-audience`                | Expected JWT audience claim                                                 | string  | —       |    No    |
| `--add-default-grants`          | Grant all permissions on tables in the public schema to authenticated users | boolean | —       |    No    |
| `--skip-auth-schema`            | Skip creating the auth schema and RLS functions                             | boolean | —       |    No    |
| `--db-aggregates-enabled`       | Enable aggregate functions in queries                                       | boolean | —       |    No    |
| `--db-anon-role`                | Database role used for anonymous (unauthenticated) requests                 | string  | —       |    No    |
| `--db-extra-search-path`        | Extra schemas appended to the search path                                   | string  | —       |    No    |
| `--db-max-rows`                 | Maximum number of rows returned by a single request                         | number  | —       |    No    |
| `--db-schemas`                  | Comma-separated list of schemas exposed via the Data API                    | string  | —       |    No    |
| `--jwt-role-claim-key`          | JWT claim path used to extract the role                                     | string  | —       |    No    |
| `--jwt-cache-max-lifetime`      | Maximum JWT cache lifetime in seconds                                       | number  | —       |    No    |
| `--openapi-mode`                | OpenAPI mode Possible values: `ignore-privileges`, `disabled`               | string  | —       |    No    |
| `--server-cors-allowed-origins` | CORS allowed origins                                                        | string  | —       |    No    |
| `--server-timing-enabled`       | Enable Server-Timing response headers                                       | boolean | —       |    No    |
| `--project-id`                  | Project ID                                                                  | string  | —       |    No    |
| `--branch`                      | Branch ID or name                                                           | string  | —       |    No    |
| `--database`                    | Database name                                                               | string  | —       |    No    |

`create` also accepts [settings flags](https://neon.com/docs/cli/data-api#settings-flags) to configure the Data API at provision time.

Provision the Data API with Neon Auth:

```bash
neonctl data-api create --database neondb --auth-provider neon_auth
```

## neonctl data-api get

Shows the Neon Data API status and settings.

```bash
neonctl data-api get [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |
| `--database`   | Database name     | string | —       |    No    |

```bash
neonctl data-api get --database neondb
```

## neonctl data-api update

Updates Neon Data API settings. By default, the flags you provide are merged with the current settings. Pass `--replace` to overwrite all settings with only the flags you provide.

```bash
neonctl data-api update [options]
```

| Option                          | Description                                                                                | Type    | Default | Required |
| ------------------------------- | ------------------------------------------------------------------------------------------ | ------- | ------- | :------: |
| `--replace`                     | Replace settings with only the flags provided. Omitted settings revert to server defaults. | boolean | `false` |    No    |
| `--db-aggregates-enabled`       | Enable aggregate functions in queries                                                      | boolean | —       |    No    |
| `--db-anon-role`                | Database role used for anonymous (unauthenticated) requests                                | string  | —       |    No    |
| `--db-extra-search-path`        | Extra schemas appended to the search path                                                  | string  | —       |    No    |
| `--db-max-rows`                 | Maximum number of rows returned by a single request                                        | number  | —       |    No    |
| `--db-schemas`                  | Comma-separated list of schemas exposed via the Data API                                   | string  | —       |    No    |
| `--jwt-role-claim-key`          | JWT claim path used to extract the role                                                    | string  | —       |    No    |
| `--jwt-cache-max-lifetime`      | Maximum JWT cache lifetime in seconds                                                      | number  | —       |    No    |
| `--openapi-mode`                | OpenAPI mode Possible values: `ignore-privileges`, `disabled`                              | string  | —       |    No    |
| `--server-cors-allowed-origins` | CORS allowed origins                                                                       | string  | —       |    No    |
| `--server-timing-enabled`       | Enable Server-Timing response headers                                                      | boolean | —       |    No    |
| `--project-id`                  | Project ID                                                                                 | string  | —       |    No    |
| `--branch`                      | Branch ID or name                                                                          | string  | —       |    No    |
| `--database`                    | Database name                                                                              | string  | —       |    No    |

`update` requires at least one [settings flag](https://neon.com/docs/cli/data-api#settings-flags). To refresh the schema cache without changing settings, use [`refresh-schema`](https://neon.com/docs/cli/data-api#refresh-schema) instead.

```bash
neonctl data-api update --database neondb --db-max-rows 1000
```

## neonctl data-api refresh-schema

Refreshes the Data API schema cache without changing settings.

```bash
neonctl data-api refresh-schema [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |
| `--database`   | Database name     | string | —       |    No    |

```bash
neonctl data-api refresh-schema --database neondb
```

## neonctl data-api delete

Deletes the Neon Data API for a database.

```bash
neonctl data-api delete [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |
| `--database`   | Database name     | string | —       |    No    |

```bash
neonctl data-api delete --database neondb
```

---

## Related docs (Functions, storage & data)

- [functions](https://neon.com/docs/cli/functions)
- [bucket](https://neon.com/docs/cli/bucket)
- [neon-auth](https://neon.com/docs/cli/neon-auth)
