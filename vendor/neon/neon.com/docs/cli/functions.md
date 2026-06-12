> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Functions, storage & data > functions
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: The Neon CLI `neonctl functions` command manages Neon Functions on a branch: `neonctl functions deploy <slug>` bundles and deploys a function from a local directory (with --path, --entry, --runtime, --env, and --wait), and the list, get, and delete subcommands manage deployed functions. The slug is the permanent function identifier: 1 to 20 lowercase letters and digits.

# Neon CLI command: functions

Deploy, list, inspect, and delete Neon Functions

**Coming Soon: Private Preview**

This feature is in private preview: it's not ready for production use, and it may be briefly unavailable as we deploy updates. To get access, [sign up here](https://neon.com/blog/were-building-backends#access).

The `functions` command manages [Neon Functions](https://neon.com/docs/compute/functions/overview) on a branch. This is the command reference; for the full deployment workflow, see [Deploy functions](https://neon.com/docs/compute/functions/deploy). To run functions locally, see [`neonctl dev`](https://neon.com/docs/cli/dev).

Subcommands: [deploy](https://neon.com/docs/cli/functions#deploy), [list](https://neon.com/docs/cli/functions#list), [get](https://neon.com/docs/cli/functions#get), [delete](https://neon.com/docs/cli/functions#delete)

## neonctl functions deploy

Deploys a function from a local directory. The `<slug>` is the permanent function identifier: 1 to 20 lowercase letters and digits (`^[a-z0-9]{1,20}$`).

```bash
neonctl functions deploy <slug> [options]
```

| Option         | Description                                        | Type    | Default | Required |
| -------------- | -------------------------------------------------- | ------- | ------- | :------: |
| `--path`       | Base directory for the function (resolves --entry) | string  | —       |    No    |
| `--entry`      | Entry file to bundle, relative to --path           | string  | —       |    No    |
| `--runtime`    | Function runtime Possible values: `nodejs24`       | string  | —       |    No    |
| `--env`        | Environment variable as KEY=VALUE (repeatable)     | string  | —       |    No    |
| `--wait`       | Wait for the deployment to finish building         | boolean | `true`  |    No    |
| `--project-id` | Project ID                                         | string  | —       |    No    |
| `--branch`     | Branch ID or name                                  | string  | —       |    No    |

Use `--wait` to block until the deployment finishes building, which is the predictable path for scripts and CI.

Deploy a function from the current directory:

```bash
neonctl functions deploy hello --path . --entry functions/hello.ts
```

```text filename="Output"
INFO: Function deployment triggered for function hello.
┌────┬───────────┬──────────┬────────────┬─────────────────────────────┐
│ Id │ Status    │ Runtime  │ Memory Mib │ Created At                  │
├────┼───────────┼──────────┼────────────┼─────────────────────────────┤
│ 1  │ completed │ nodejs24 │ 2048       │ 2026-06-12T00:14:58.044690Z │
└────┴───────────┴──────────┴────────────┴─────────────────────────────┘
INFO: Function deployment hello/1 completed.
```

Deploy with environment variables and wait for the build:

```bash
neonctl functions deploy hello --entry functions/hello.ts --env LOG_LEVEL=info --wait
```

## neonctl functions list

Lists the functions on the branch.

```bash
neonctl functions list [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl functions list
```

```text filename="Output"
┌───────┬───────┬─────────────────────────────────────────────────────────────────────────────┬─────────────────────────────┐
│ Slug  │ Name  │ Invocation Url                                                              │ Created At                  │
├───────┼───────┼─────────────────────────────────────────────────────────────────────────────┼─────────────────────────────┤
│ hello │ hello │ https://br-cool-darkness-123456-hello.compute.c-1.us-east-2.aws.neon.build/ │ 2026-06-12T00:14:57.942988Z │
└───────┴───────┴─────────────────────────────────────────────────────────────────────────────┴─────────────────────────────┘
```

List with full deployment details for scripts and agents:

```bash
neonctl functions list --output json
```

<details>

<summary>Show output</summary>

```json
[
  {
    "id": "hello",
    "slug": "hello",
    "name": "hello",
    "invocation_url": "https://br-cool-darkness-123456-hello.compute.c-1.us-east-2.aws.neon.build/",
    "current_deployment": {
      "id": 1,
      "status": "completed",
      "memory_mib": 2048,
      "runtime": "nodejs24",
      "created_at": "2026-06-12T00:14:58.044690Z"
    },
    "active_deployment": {
      "id": 1,
      "status": "completed",
      "memory_mib": 2048,
      "runtime": "nodejs24",
      "created_at": "2026-06-12T00:14:58.044690Z"
    },
    "created_at": "2026-06-12T00:14:57.942988Z"
  }
]
```

</details>

## neonctl functions get

Shows a function's details.

```bash
neonctl functions get <slug> [options]
```

| Option                       | Description                                                  | Type    | Default | Required |
| ---------------------------- | ------------------------------------------------------------ | ------- | ------- | :------: |
| `--list-env-variables`, `-E` | List the environment variable names of the active deployment | boolean | `false` |    No    |
| `--project-id`               | Project ID                                                   | string  | —       |    No    |
| `--branch`                   | Branch ID or name                                            | string  | —       |    No    |

```bash
neonctl functions get hello
```

```text filename="Output"
function
┌───────┬───────┬─────────────────────────────────────────────────────────────────────────────┬─────────────────────────────┐
│ Slug  │ Name  │ Invocation Url                                                              │ Created At                  │
├───────┼───────┼─────────────────────────────────────────────────────────────────────────────┼─────────────────────────────┤
│ hello │ hello │ https://br-cool-darkness-123456-hello.compute.c-1.us-east-2.aws.neon.build/ │ 2026-06-12T00:14:57.942988Z │
└───────┴───────┴─────────────────────────────────────────────────────────────────────────────┴─────────────────────────────┘
active deployment
┌────┬───────────┬──────────┬────────────┬─────────────────────────────┐
│ Id │ Status    │ Runtime  │ Memory Mib │ Created At                  │
├────┼───────────┼──────────┼────────────┼─────────────────────────────┤
│ 1  │ completed │ nodejs24 │ 2048       │ 2026-06-12T00:14:58.044690Z │
└────┴───────────┴──────────┴────────────┴─────────────────────────────┘
```

## neonctl functions delete

Deletes a function on the branch.

```bash
neonctl functions delete <slug> [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl functions delete hello
```

```text filename="Output"
INFO: Function hello deleted from branch br-cool-darkness-123456
```

---

## Related docs (Functions, storage & data)

- [bucket](https://neon.com/docs/cli/bucket)
- [data-api](https://neon.com/docs/cli/data-api)
- [neon-auth](https://neon.com/docs/cli/neon-auth)
