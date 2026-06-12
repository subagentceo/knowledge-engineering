> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Setup & context > checkout
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: Covers the usage of the `checkout` command in the Neon CLI to switch the active branch in your local context, so subsequent commands target that branch without specifying `--branch` on every command.

# Neon CLI command: checkout

Pin a branch in your local .neon context file

The `checkout` command pins a branch in the local context so subsequent commands target it. It's a focused helper over [`set-context`](https://neon.com/docs/cli/set-context) for the common "switch the branch I'm working on" case. The `checkout` command requires neonctl 2.22.2 or later; check your version with `neonctl --version`.

`checkout` resolves the branch (by name or ID) against the project, then heals the `.neon` file: it always (re)writes `projectId`, `branchId`, and `orgId` (when the project has one), so a `.neon` that was missing fields or drifted ends up complete and consistent.

## Usage

```bash
neonctl checkout [id|name] [options]
```

The branch argument is optional. Run `neonctl checkout` with no branch in an interactive terminal to fetch the project's branches and pick one from a list. In a non-interactive context (CI or no TTY), you must pass a branch explicitly.

## Options

| Option         | Description                                                                                                                                                                                                                                 | Type    | Default | Required |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | :------: |
| `--project-id` | Project ID                                                                                                                                                                                                                                  | string  | —       |    No    |
| `--env-pull`   | Pull the branch's Neon env vars (DATABASE\_URL, ...) into a local .env after checkout. On by default; use --no-env-pull to skip, for example when injecting env at runtime with `neon-env run` (from `@neondatabase/env`) or `neonctl dev`. | boolean | `true`  |    No    |

By default, `checkout` pulls environment variables into a `.env` file after checking out the branch; use `--no-env-pull` to skip this.

## Branch ID vs name

Branch ID vs name is detected automatically (a `br-…` value is treated as an ID):

- **ID:** Matched strictly by ID. A non-existent ID is a hard "not found" error (IDs are server-assigned, so `checkout` never creates one).
- **Name:** Matched by name. If the name does not exist, in an interactive terminal `checkout` offers to create it (equivalent to `neonctl branches create --name <name>`: branched from the project's default branch with a read-write compute), then checks it out. In a non-interactive context, a missing name is the usual "not found" error.

## Project resolution

The project is resolved through the standard Neon CLI chain, each entry winning over the next:

1. `--project-id <id>` flag
2. `projectId` from the closest `.neon` file (found by walking up from the current directory)
3. If still unresolved and the API key maps to exactly one project, that project is auto-detected (same behavior as `branches` and `connection-string`)

If none of those resolve a project, `checkout` prints an error explaining the chain above. In an interactive terminal it then offers to run [`neonctl link`](https://neon.com/docs/cli/link) in the current folder so you can pick (or create) a project on the spot. In non-interactive contexts, it exits with a non-zero code instead of prompting.

## Examples

Pin a branch by name. New Neon projects create a default branch named `production`:

```bash
neonctl checkout production --project-id polished-snowflake-12345678
```

```text filename="Output"
INFO: Checked out branch br-steep-math-aiu3vve7 on project polished-snowflake-12345678. Updated /path/to/cwd/.neon.
```

The updated `.neon` file:

```json
{
  "orgId": "org-abc123",
  "projectId": "polished-snowflake-12345678",
  "branchId": "br-steep-math-aiu3vve7"
}
```

Pick a branch interactively (requires a linked project or `--project-id`):

```bash
neonctl checkout
```

Pin a branch by ID:

```bash
neonctl checkout br-cool-snow-12345678 --project-id polished-snowflake-12345678
```

After checking out a branch, commands such as [`connection-string`](https://neon.com/docs/cli/connection-string) and [`psql`](https://neon.com/docs/cli/psql) use the pinned branch by default.

---

## Related docs (Setup & context)

- [auth](https://neon.com/docs/cli/auth)
- [init](https://neon.com/docs/cli/init)
- [bootstrap](https://neon.com/docs/cli/bootstrap)
- [link](https://neon.com/docs/cli/link)
- [env](https://neon.com/docs/cli/env)
- [set-context](https://neon.com/docs/cli/set-context)
- [me](https://neon.com/docs/cli/me)
- [completion](https://neon.com/docs/cli/completion)
