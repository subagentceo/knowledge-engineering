> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Config as code > config
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: The Neon CLI `neonctl config` command manages a branch declaratively with a neon.ts policy file. Use `neonctl config status` to show the branch's live Neon state, `neonctl config plan` for a dry run of what an apply would change, and `neonctl config apply` (or its top-level alias `neonctl deploy`) to apply the policy to the branch. Supports --config to point at a neon.ts file, --env to load environment variables before evaluating it, and --allow-protected and --update-existing confirmation flags for non-interactive use.

# Neon CLI command: config

Manage a branch with a neon.ts policy: status, plan, and apply

The `config` command manages a branch declaratively with a `neon.ts` policy file: inspect the branch's live state, preview what an apply would change, and apply the policy. For the `neon.ts` file format, see the [neon.ts reference](https://neon.com/docs/compute/functions/reference/neon-ts).

Subcommands: [status](https://neon.com/docs/cli/config#status), [plan](https://neon.com/docs/cli/config#plan), [apply](https://neon.com/docs/cli/config#apply)

The top-level [`neonctl deploy`](https://neon.com/docs/cli/config#deploy) command is an alias for `config apply`.

## neonctl config status

Shows the branch's live Neon state.

```bash
neonctl config status [options]
```

| Option          | Description                                                                                                                                                 | Type    | Default | Required |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | :------: |
| `--config-json` | Print only the branch's live config as neon.ts-shaped JSON (services + branch tuning + preview), to stdout. Useful for scripting or copying into a neon.ts. | boolean | `false` |    No    |
| `--project-id`  | Project ID                                                                                                                                                  | string  | —       |    No    |
| `--branch`      | Branch ID or name                                                                                                                                           | string  | —       |    No    |

```bash
neonctl config status
```

## neonctl config plan

Shows what `config apply` would change, as a dry run. Nothing is modified.

```bash
neonctl config plan [options]
```

| Option         | Description                                                                                                                                                | Type   | Default | Required |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | :------: |
| `--config`     | Path to a neon.ts policy (defaults to walking up from cwd)                                                                                                 | string | —       |    No    |
| `--env`        | Path to a .env file to load into the environment before evaluating neon.ts (so function env values resolve from it). Existing env vars are not overridden. | string | —       |    No    |
| `--project-id` | Project ID                                                                                                                                                 | string | —       |    No    |
| `--branch`     | Branch ID or name                                                                                                                                          | string | —       |    No    |

```bash
neonctl config plan --config ./neon.ts --env .env.local
```

## neonctl config apply

Applies a `neon.ts` policy to the branch.

```bash
neonctl config apply [options]
```

| Option              | Description                                                                                                                                                                                                    | Type    | Default | Required |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | :------: |
| `--config`          | Path to a neon.ts policy (defaults to walking up from cwd)                                                                                                                                                     | string  | —       |    No    |
| `--env`             | Path to a .env file to load into the environment before evaluating neon.ts (so function env values resolve from it). Existing env vars are not overridden.                                                     | string  | —       |    No    |
| `--update-existing` | Auto-confirm overriding existing remote settings on the branch                                                                                                                                                 | boolean | `false` |    No    |
| `--allow-protected` | Auto-confirm applying to a branch marked protected on Neon                                                                                                                                                     | boolean | `false` |    No    |
| `--env-pull`        | Pull the branch's Neon env vars (DATABASE\_URL, …) into a local .env after a successful apply. On by default; use --no-env-pull to skip (e.g. when injecting env at runtime with `neon-env run` / `neon dev`). | boolean | `true`  |    No    |
| `--project-id`      | Project ID                                                                                                                                                                                                     | string  | —       |    No    |
| `--branch`          | Branch ID or name                                                                                                                                                                                              | string  | —       |    No    |

For non-interactive use (scripts, CI, agents), pass `--update-existing` and `--allow-protected` to auto-confirm the corresponding prompts.

```bash
neonctl config apply --branch feature/auth --update-existing
```

## neonctl deploy

Top-level alias for [`config apply`](https://neon.com/docs/cli/config#apply), with the same options.

```bash
neonctl deploy [options]
```

| Option              | Description                                                                                                                                                                                                    | Type    | Default | Required |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | :------: |
| `--project-id`      | Project ID                                                                                                                                                                                                     | string  | —       |    No    |
| `--branch`          | Branch ID or name                                                                                                                                                                                              | string  | —       |    No    |
| `--config`          | Path to a neon.ts policy (defaults to walking up from cwd)                                                                                                                                                     | string  | —       |    No    |
| `--env`             | Path to a .env file to load into the environment before evaluating neon.ts (so function env values resolve from it). Existing env vars are not overridden.                                                     | string  | —       |    No    |
| `--update-existing` | Auto-confirm overriding existing remote settings on the branch                                                                                                                                                 | boolean | `false` |    No    |
| `--allow-protected` | Auto-confirm applying to a branch marked protected on Neon                                                                                                                                                     | boolean | `false` |    No    |
| `--env-pull`        | Pull the branch's Neon env vars (DATABASE\_URL, …) into a local .env after a successful apply. On by default; use --no-env-pull to skip (e.g. when injecting env at runtime with `neon-env run` / `neon dev`). | boolean | `true`  |    No    |

```bash
neonctl deploy --branch feature/auth
```

---

## Related docs (Config as code)

- [dev](https://neon.com/docs/cli/dev)
